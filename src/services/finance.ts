import { supabase } from '@/lib/supabase/client'

export async function getTransactions(userId: string) {
  const { data, error } = await supabase
    .from('financial_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('transaction_date', { ascending: false })
  if (error) throw error
  return data
}

export async function createTransaction(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('financial_transactions')
    .insert({ ...payload, user_id: userId, origin_type: payload.origin_type || 'manual' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase.from('financial_transactions').delete().eq('id', id)
  if (error) throw error
}

export async function updateTransactionStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('financial_transactions')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}
