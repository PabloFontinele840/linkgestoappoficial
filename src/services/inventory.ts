import { supabase } from '@/lib/supabase/client'

export async function getInventoryItems(userId: string) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*, suppliers(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getInventoryItemById(id: string) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*, suppliers(name)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createInventoryItem(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('inventory_items')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteInventoryItem(id: string) {
  const { error } = await supabase.from('inventory_items').delete().eq('id', id)
  if (error) throw error
}

export async function getInventoryMovements(userId: string, itemId?: string) {
  let query = supabase
    .from('inventory_movements')
    .select('*, inventory_items(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (itemId) {
    query = query.eq('item_id', itemId)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function createInventoryMovement(payload: any, userId: string) {
  const { data, error } = await supabase
    .from('inventory_movements')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}
