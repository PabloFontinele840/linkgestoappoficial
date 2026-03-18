import { supabase } from '@/lib/supabase/client'

export async function getOpenSession(userId: string) {
  const { data, error } = await supabase
    .from('cash_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'aberto')
    .maybeSingle()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getSessionHistory(userId: string) {
  const { data, error } = await supabase
    .from('cash_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('opened_at', { ascending: false })
  if (error) throw error
  return data
}

export async function openSession(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('cash_sessions')
    .insert({ ...payload, user_id: userId, status: 'aberto' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function closeSession(id: string, payload: any) {
  const { error } = await supabase
    .from('cash_sessions')
    .update({ ...payload, status: 'fechado', closed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function getCashMovements(sessionId: string) {
  const { data, error } = await supabase
    .from('cash_movements')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
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
