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

export async function deleteSupplier(id: string) {
  const { data } = await supabase
    .from('inventory_items')
    .select('id')
    .eq('supplier_id', id)
    .limit(1)
  if (data && data.length > 0) {
    throw new Error('Não é possível excluir. O fornecedor está vinculado a itens de estoque.')
  }
  const { error } = await supabase.from('suppliers').delete().eq('id', id)
  if (error) throw error
}
