import { supabase } from '@/lib/supabase/client'

export async function getCustomers(userId: string) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getCustomerById(id: string) {
  const { data, error } = await supabase.from('customers').select('*').eq('id', id).single()

  if (error) throw error
  return data
}

export async function createCustomer(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('customers')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCustomerStats(customerId: string) {
  const { data, error } = await supabase
    .from('service_orders')
    .select('id, status, value, created_at, device_brand, device_model')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })

  if (error) throw error

  const finishedOrders = data.filter((o) => ['Finalizada', 'Entregue'].includes(o.status))
  const totalInvested = finishedOrders.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0)

  return {
    orders: data,
    totalOrders: data.length,
    totalInvested,
  }
}
