import { supabase } from '@/lib/supabase/client'

export async function getSales(userId: string) {
  const { data, error } = await supabase
    .from('sales')
    .select('*, sale_items(*)')
    .eq('user_id', userId)
    .order('sale_date', { ascending: false })

  if (error) throw error
  return data
}

export async function getSaleById(id: string) {
  const { data, error } = await supabase
    .from('sales')
    .select('*, sale_items(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createSale(payload: any, items: any[], userId: string) {
  const { data: sale, error } = await supabase
    .from('sales')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()

  if (error) throw error

  if (items.length > 0) {
    const itemsToInsert = items.map((item) => ({
      ...item,
      sale_id: sale.id,
      user_id: userId,
    }))

    const { error: itemsError } = await supabase.from('sale_items').insert(itemsToInsert)

    if (itemsError) throw itemsError
  }

  return sale
}

export async function deleteSale(id: string) {
  const { error } = await supabase.from('sales').delete().eq('id', id)
  if (error) throw error
}
