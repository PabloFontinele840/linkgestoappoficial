import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { startOfMonth, subMonths, getDaysInMonth, format, isToday } from 'date-fns'
import { useAuth } from '@/hooks/use-auth'

export function useDashboardData() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    async function fetchData() {
      try {
        const now = new Date()
        const startCurrentMonth = startOfMonth(now)
        const startLastMonth = startOfMonth(subMonths(now, 1))

        const [
          { data: transactions },
          { data: orders },
          { data: goals },
          { data: products },
          { data: recentOrders },
        ] = await Promise.all([
          supabase
            .from('transactions')
            .select('*')
            .gte('date', startLastMonth.toISOString())
            .eq('user_id', user.id),
          supabase
            .from('service_orders')
            .select('*, services(name), customers(name)')
            .eq('user_id', user.id),
          supabase
            .from('monthly_goals')
            .select('*')
            .eq('month_year', format(startCurrentMonth, 'yyyy-MM-dd'))
            .eq('user_id', user.id)
            .maybeSingle(),
          supabase.from('products').select('*').eq('user_id', user.id),
          supabase
            .from('service_orders')
            .select('id, status, value, created_at, services(name), customers(name)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5),
        ])

        const safeOrders = orders || []
        const safeTxs = transactions || []
        const safeProducts = products || []

        // KPI Calculations
        const currentMonthTxs = safeTxs.filter((t) => new Date(t.date) >= startCurrentMonth)
        const revenue = currentMonthTxs
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0)
        const expenses = currentMonthTxs
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0)
        const profit = revenue - expenses

        const activeOrdersCount = safeOrders.filter(
          (o) => !['Finalizado', 'Cancelado'].includes(o.status),
        ).length
        const uniqueCustomers = new Set(
          safeOrders
            .filter((o) => new Date(o.created_at) >= startCurrentMonth && o.customer_id)
            .map((o) => o.customer_id),
        ).size

        // Chart Data
        const daysInMonth = getDaysInMonth(now)
        const chartData = Array.from({ length: daysInMonth }).map((_, i) => {
          const dayStr = (i + 1).toString().padStart(2, '0')
          const atual = currentMonthTxs
            .filter((t) => t.type === 'income' && format(new Date(t.date), 'dd') === dayStr)
            .reduce((sum, t) => sum + Number(t.amount), 0)
          const anterior = safeTxs
            .filter(
              (t) =>
                t.type === 'income' &&
                new Date(t.date) < startCurrentMonth &&
                format(new Date(t.date), 'dd') === dayStr,
            )
            .reduce((sum, t) => sum + Number(t.amount), 0)
          return { name: dayStr, atual, anterior }
        })

        // Daily Summary
        const createdToday = safeOrders.filter((o) => isToday(new Date(o.created_at))).length
        const finishedToday = safeOrders.filter(
          (o) => o.status === 'Finalizado' && isToday(new Date(o.updated_at)),
        )
        const revenueToday = finishedToday.reduce((sum, o) => sum + Number(o.value), 0)

        // Alerts Logic
        const lowStock = safeProducts.filter((p) => p.stock_quantity <= p.min_stock_level)
        const pendingTxs = safeTxs.filter((t) => t.status === 'Pendente')
        const overdueOrders = safeOrders.filter(
          (o) =>
            !['Finalizado', 'Cancelado'].includes(o.status) &&
            new Date(o.created_at) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        )

        // Monthly Ranking Logic (Current Month Only)
        const currentMonthOrders = safeOrders.filter(
          (o) => new Date(o.created_at) >= startCurrentMonth,
        )
        const topServicesCount = currentMonthOrders.reduce((acc: any, o) => {
          const name = o.services?.name || 'Serviço'
          acc[name] = (acc[name] || 0) + 1
          return acc
        }, {})
        const topServices = Object.entries(topServicesCount)
          .map(([name, count]) => ({ name, count: count as number, type: 'Serviço' }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4)

        setData({
          kpis: { revenue, profit, activeOrders: activeOrdersCount, customers: uniqueCustomers },
          goal: { target: goals?.target_value || 0, revenue },
          chart: chartData,
          recentOrders: recentOrders || [],
          summary: { createdToday, finishedToday: finishedToday.length, revenueToday },
          alerts: { lowStock, pendingTxs, overdueOrders },
          rankings: topServices,
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  return { data, loading }
}
