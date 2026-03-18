import { supabase } from '@/lib/supabase/client'

export async function getCashMovements(userId: string, date: string) {
  const start = new Date(`${date}T00:00:00`)
  const end = new Date(`${date}T23:59:59.999`)

  const { data, error } = await supabase
    .from('cash_movements')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString())
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getStartingBalance(userId: string, date: string) {
  const start = new Date(`${date}T00:00:00`).toISOString()

  const { data, error } = await supabase
    .from('cash_movements')
    .select('type, amount')
    .eq('user_id', userId)
    .lt('created_at', start)

  if (error) throw error

  let balance = 0
  for (const row of data) {
    if (row.type === 'entrada') balance += Number(row.amount)
    if (row.type === 'saida') balance -= Number(row.amount)
  }
  return balance
}

export async function createCashMovement(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('cash_movements')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCashMovement(id: string) {
  const { error } = await supabase.from('cash_movements').delete().eq('id', id)
  if (error) throw error
}
