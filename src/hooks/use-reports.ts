import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './use-auth'

export function useReports(start: string, end: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user || !start || !end) return
    async function fetch() {
      setLoading(true)
      try {
        const [orders, sales, txs, movements, products] = await Promise.all([
          supabase
            .from('service_orders')
            .select('*, services(name)')
            .eq('user_id', user.id)
            .gte('created_at', `${start}T00:00:00Z`)
            .lte('created_at', `${end}T23:59:59Z`),
          supabase
            .from('sales')
            .select('*, sale_items(*)')
            .eq('user_id', user.id)
            .gte('sale_date', start)
            .lte('sale_date', end),
          supabase
            .from('financial_transactions')
            .select('*')
            .eq('user_id', user.id)
            .gte('transaction_date', start)
            .lte('transaction_date', end),
          supabase
            .from('inventory_movements')
            .select('*, inventory_items(name)')
            .eq('user_id', user.id)
            .gte('created_at', `${start}T00:00:00Z`)
            .lte('created_at', `${end}T23:59:59Z`),
          supabase.from('products').select('*').eq('user_id', user.id),
        ])
        setData({
          orders: orders.data || [],
          sales: sales.data || [],
          transactions: txs.data || [],
          movements: movements.data || [],
          products: products.data || [],
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user, start, end])

  return { data, loading }
}
