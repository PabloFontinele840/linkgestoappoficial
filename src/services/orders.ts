import { supabase } from '@/lib/supabase/client'

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

  const orderData = {
    user_id: userId,
    customer_id: customerId,
    status: payload.status || 'Aberta',
    payment_status: payload.payment_status || 'Pendente',
    payment_method: payload.payment_method || null,
    device_brand: payload.device_brand,
    device_model: payload.device_model,
    device_color: payload.device_color,
    device_serial: payload.device_serial,
    reported_problem: payload.reported_problem,
    value: payload.value,
    estimated_value: payload.estimated_value,
  }

  const { data: order, error } = await supabase
    .from('service_orders')
    .insert(orderData)
    .select()
    .single()
  if (error) throw error

  if (items && items.length > 0) {
    const formattedItems = []
    for (const item of items) {
      let suppId = item.supplier_id
      if (suppId === 'NEW' && item.newSupplierName) {
        const { data: supp } = await supabase
          .from('suppliers')
          .insert({ name: item.newSupplierName, user_id: userId })
          .select('id')
          .single()
        if (supp) suppId = supp.id
      } else if (suppId === 'NEW' || !suppId) {
        suppId = null
      }

      formattedItems.push({
        os_id: order.id,
        user_id: userId,
        type: item.type,
        description: item.description,
        supplier_id: suppId,
        cost: item.cost,
        price: item.price,
        quantity: item.quantity,
      })
    }
    const { error: itemsErr } = await supabase.from('os_items').insert(formattedItems)
    if (itemsErr) throw itemsErr
  }

  return order
}

export async function updateOrderStatus(id: string, status: string, finalValue?: number) {
  const updates: any = { status }
  if (finalValue !== undefined) updates.value = finalValue

  const { data, error } = await supabase
    .from('service_orders')
    .update(updates)
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
