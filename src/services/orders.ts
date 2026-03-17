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
    .select('*, customers(name, phone), service_order_logs(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createOrder(payload: any, userId: string) {
  // Simple customer creation/fetch logic for demo purposes
  let customerId = null
  if (payload.customer_name) {
    const { data: cust } = await supabase
      .from('customers')
      .insert({ user_id: userId, name: payload.customer_name, phone: payload.customer_phone })
      .select('id')
      .single()
    if (cust) customerId = cust.id
  }

  const orderData = {
    user_id: userId,
    customer_id: customerId,
    status: 'Aberta',
    device_brand: payload.device_brand,
    device_model: payload.device_model,
    device_color: payload.device_color,
    device_serial: payload.device_serial,
    service_type: payload.service_type || 'Balcão',
    priority: payload.priority || 'Normal',
    reported_problem: payload.reported_problem,
    device_condition: payload.device_condition || [],
    accessories_delivered: payload.accessories_delivered || [],
    technician_name: payload.technician_name,
    needs_parts: payload.needs_parts === 'true',
    is_value_to_be_defined: payload.is_value_to_be_defined === 'true',
    estimated_value: parseFloat(payload.estimated_value || '0'),
    value: parseFloat(payload.estimated_value || '0'),
    warranty_days: parseInt(payload.warranty_days || '0', 10),
  }

  const { data, error } = await supabase.from('service_orders').insert(orderData).select().single()
  if (error) throw error
  return data
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
