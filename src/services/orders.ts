import { supabase } from '@/lib/supabase/client'

// Helper for synchronizing financials
async function syncFinancials(
  userId: string,
  id: string,
  payload: any,
  oldOrder: any,
  items: any[],
) {
  const isNowPaid =
    ['Finalizada', 'Entregue'].includes(payload.status) && payload.payment_status === 'Pago'
  const wasPaid =
    ['Finalizada', 'Entregue'].includes(oldOrder.status) && oldOrder.payment_status === 'Pago'
  const totalCost = items.reduce(
    (a: any, b: any) => a + Number(b.cost || 0) * Number(b.quantity || 1),
    0,
  )

  if (isNowPaid && !wasPaid) {
    const { data: session } = await supabase
      .from('cash_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'aberto')
      .maybeSingle()
    if (!session)
      throw new Error(
        'O caixa está fechado. É necessário abrir o caixa para realizar este recebimento.',
      )

    await supabase.from('cash_movements').insert([
      {
        session_id: session.id,
        user_id: userId,
        type: 'entrada',
        amount: payload.value,
        origin: 'os',
        reference_id: id,
        description: `Recebimento OS ${id.split('-')[0]}`,
        payment_method: payload.payment_method,
      },
    ])
    if (totalCost > 0) {
      await supabase.from('cash_movements').insert([
        {
          session_id: session.id,
          user_id: userId,
          type: 'saida',
          amount: totalCost,
          origin: 'os',
          reference_id: id,
          description: `Custo OS ${id.split('-')[0]}`,
          payment_method: 'Dinheiro',
        },
      ])
    }

    await supabase.from('financial_transactions').insert([
      {
        user_id: userId,
        type: 'entrada',
        status: 'recebido',
        amount: payload.value,
        category: 'Serviço',
        classification: 'Variável',
        description: `Recebimento OS ${id.split('-')[0]}`,
        transaction_date: new Date().toISOString().split('T')[0],
        origin_id: id,
        origin_type: 'os',
        payment_method: payload.payment_method,
      },
      ...(totalCost > 0
        ? [
            {
              user_id: userId,
              type: 'saida',
              status: 'pago',
              amount: totalCost,
              category: 'Custo Peças',
              classification: 'Variável',
              description: `Custo OS ${id.split('-')[0]}`,
              transaction_date: new Date().toISOString().split('T')[0],
              origin_id: id,
              origin_type: 'os',
              payment_method: 'Dinheiro',
            },
          ]
        : []),
    ])
  } else if (isNowPaid && wasPaid) {
    await supabase
      .from('cash_movements')
      .update({ amount: payload.value, payment_method: payload.payment_method })
      .eq('origin', 'os')
      .eq('reference_id', id)
      .eq('type', 'entrada')
    await supabase
      .from('cash_movements')
      .update({ amount: totalCost })
      .eq('origin', 'os')
      .eq('reference_id', id)
      .eq('type', 'saida')
    await supabase
      .from('financial_transactions')
      .update({ amount: payload.value, payment_method: payload.payment_method })
      .eq('origin_id', id)
      .eq('type', 'entrada')
    await supabase
      .from('financial_transactions')
      .update({ amount: totalCost })
      .eq('origin_id', id)
      .eq('type', 'saida')
  }
}

async function resolveServices(items: any[], userId: string) {
  if (!items || items.length === 0) return items

  const resolvedItems = []
  for (const item of items) {
    let serviceId = item.service_id

    if (!serviceId && item.description) {
      const { data: existing } = await supabase
        .from('services')
        .select('id')
        .eq('user_id', userId)
        .eq('name', item.description)
        .eq('cost', item.cost || 0)
        .eq('final_price', item.price || 0)
        .maybeSingle()

      if (existing) {
        serviceId = existing.id
      } else {
        const { data: newSvc } = await supabase
          .from('services')
          .insert({
            user_id: userId,
            name: item.description,
            cost: item.cost || 0,
            final_price: item.price || 0,
            status: 'Ativo',
          })
          .select('id')
          .single()
        if (newSvc) serviceId = newSvc.id
      }
    }

    resolvedItems.push({
      ...item,
      service_id: serviceId || null,
    })
  }
  return resolvedItems
}

export async function getOrders(userId: string) {
  const { data, error } = await supabase
    .from('service_orders')
    .select('*, customers(name, phone)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from('service_orders')
    .select('*, customers(name, phone), service_order_logs(*), os_items(*)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createOrder(payload: any, items: any[], userId: string) {
  let customerId = payload.customer_id || null
  if (!customerId && payload.new_customer_name) {
    const { data: cust, error: custErr } = await supabase
      .from('customers')
      .insert({ user_id: userId, name: payload.new_customer_name })
      .select('id')
      .single()
    if (custErr) throw custErr
    customerId = cust.id
  }

  const orderData = { ...payload, user_id: userId, customer_id: customerId }
  delete orderData.new_customer_name

  const { data: order, error } = await supabase
    .from('service_orders')
    .insert(orderData)
    .select()
    .single()
  if (error) throw error

  if (items && items.length > 0) {
    const resolvedItems = await resolveServices(items, userId)
    const formattedItems = resolvedItems.map((i) => ({
      type: i.type,
      description: i.description,
      cost: i.cost,
      price: i.price,
      quantity: i.quantity,
      os_id: order.id,
      user_id: userId,
      supplier_id: i.supplier_id === 'NEW' || !i.supplier_id ? null : i.supplier_id,
      service_id: i.service_id,
    }))
    await supabase.from('os_items').insert(formattedItems)
  }

  // Handle financials if created as Paid
  const mockOldOrder = { status: 'Aberta', payment_status: 'Pendente' }
  await syncFinancials(userId, order.id, orderData, mockOldOrder, items)

  return order
}

export async function updateOrder(id: string, payload: any, items: any[], userId: string) {
  const { data: oldOrder } = await supabase
    .from('service_orders')
    .select('status, payment_status')
    .eq('id', id)
    .single()

  let customerId = payload.customer_id || null
  if (!customerId && payload.new_customer_name) {
    const { data: cust } = await supabase
      .from('customers')
      .insert({ user_id: userId, name: payload.new_customer_name })
      .select('id')
      .single()
    if (cust) customerId = cust.id
  }

  const orderData = { ...payload, customer_id: customerId }
  delete orderData.new_customer_name

  const { data: order, error } = await supabase
    .from('service_orders')
    .update(orderData)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error

  await supabase.from('os_items').delete().eq('os_id', id)
  if (items && items.length > 0) {
    const resolvedItems = await resolveServices(items, userId)
    const formattedItems = resolvedItems.map((i) => ({
      type: i.type,
      description: i.description,
      cost: i.cost,
      price: i.price,
      quantity: i.quantity,
      os_id: order.id,
      user_id: userId,
      supplier_id: i.supplier_id === 'NEW' || !i.supplier_id ? null : i.supplier_id,
      service_id: i.service_id,
    }))
    await supabase.from('os_items').insert(formattedItems)
  }

  await syncFinancials(userId, id, orderData, oldOrder, items)

  return order
}

export async function updateOrderStatus(
  id: string,
  status: string,
  payment_status: string,
  payment_method: string,
  finalValue: number,
  userId: string,
) {
  const { data: oldOrder } = await supabase
    .from('service_orders')
    .select('status, payment_status')
    .eq('id', id)
    .single()
  const { data: items } = await supabase.from('os_items').select('*').eq('os_id', id)

  const payload = { status, payment_status, payment_method, value: finalValue }

  await syncFinancials(userId, id, payload, oldOrder, items || [])

  const { data, error } = await supabase
    .from('service_orders')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from('service_orders').delete().eq('id', id)
  if (error) throw error
}
