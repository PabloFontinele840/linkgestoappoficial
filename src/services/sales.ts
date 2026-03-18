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
  let sessionId = null
  if (payload.status === 'Concluída') {
    const { data: session } = await supabase
      .from('cash_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'aberto')
      .maybeSingle()
    if (!session) throw new Error('O caixa está fechado. Abra o caixa para finalizar a venda.')
    sessionId = session.id
  }

  const { data: sale, error } = await supabase
    .from('sales')
    .insert({ ...payload, user_id: userId })
    .select()
    .single()
  if (error) throw error

  if (items.length > 0) {
    const formatted = items.map((i: any) => ({ ...i, sale_id: sale.id, user_id: userId }))
    await supabase.from('sale_items').insert(formatted)
  }

  if (sessionId && payload.status === 'Concluída') {
    await supabase.from('cash_movements').insert([
      {
        session_id: sessionId,
        user_id: userId,
        type: 'entrada',
        amount: payload.final_amount,
        origin: 'venda',
        reference_id: sale.id,
        description: `Venda ${sale.id.split('-')[0]}`,
        payment_method: payload.payment_method,
      },
    ])
    await supabase.from('financial_transactions').insert([
      {
        user_id: userId,
        type: 'entrada',
        status: 'recebido',
        amount: payload.final_amount,
        category: 'Venda',
        classification: 'Variável',
        description: `Venda ${sale.id.split('-')[0]}`,
        transaction_date: payload.sale_date,
        origin_id: sale.id,
        origin_type: 'venda',
      },
    ])
  }

  return sale
}

export async function deleteSale(id: string) {
  const { error } = await supabase.from('sales').delete().eq('id', id)
  if (error) throw error
}
