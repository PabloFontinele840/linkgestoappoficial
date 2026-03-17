import { supabase } from '@/lib/supabase/client'

export async function getSuppliers(userId: string) {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getSupplierById(id: string) {
  const { data, error } = await supabase.from('suppliers').select('*').eq('id', id).single()

  if (error) throw error
  return data
}

export async function createSupplier(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('suppliers')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}
