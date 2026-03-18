import { supabase } from '@/lib/supabase/client'

export async function getServices(userId: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createService(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('services')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateService(id: string, payload: any, userId: string) {
  const { data, error } = await supabase
    .from('services')
    .update(payload)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteService(id: string, userId: string) {
  const { count } = await supabase
    .from('os_items')
    .select('id', { count: 'exact', head: true })
    .eq('service_id', id)

  if (count && count > 0) {
    throw new Error('SERVICE_IN_USE')
  }

  const { error } = await supabase.from('services').delete().eq('id', id).eq('user_id', userId)
  if (error) throw error
}
