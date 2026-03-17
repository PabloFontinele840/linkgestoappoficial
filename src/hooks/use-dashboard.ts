import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { startOfMonth, subMonths, getDaysInMonth, format, isToday } from 'date-fns'

export function useDashboardData() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
          supabase.from('transactions').select('*').gte('date', startLastMonth.toISOString()),
          supabase.from('service_orders').select('*, services(name), customers(name)'),
          supabase
            .from('monthly_goals')
            .select('*')
            .eq('month_year', format(startCurrentMonth, 'yyyy-MM-dd'))
            .single(),
          supabase.from('products').select('*'),
          supabase
            .from('service_orders')
            .select('id, status, value, created_at, services(name), customers(name)')
            .order('created_at', { ascending: false })
            .limit(5),
        ])

        // KPI Calculations
        const currentMonthTxs =
          transactions?.filter((t) => new Date(t.date) >= startCurrentMonth) || []
        const revenue = currentMonthTxs
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0)
        const expenses = currentMonthTxs
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0)
        const profit = revenue - expenses

        const activeOrdersCount =
          orders?.filter((o) => !['Finalizado', 'Cancelado'].includes(o.status)).length || 0
        const uniqueCustomers = new Set(
          orders
            ?.filter((o) => new Date(o.created_at) >= startCurrentMonth)
            .map((o) => o.customer_id),
        ).size

        // Chart Data
        const daysInMonth = getDaysInMonth(now)
        const chartData = Array.from({ length: daysInMonth }).map((_, i) => {
          const dayStr = (i + 1).toString().padStart(2, '0')
          const atual = currentMonthTxs
            .filter((t) => t.type === 'income' && format(new Date(t.date), 'dd') === dayStr)
            .reduce((sum, t) => sum + Number(t.amount), 0)
          const anterior = (transactions || [])
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
        const createdToday = orders?.filter((o) => isToday(new Date(o.created_at))).length || 0
        const finishedToday =
          orders?.filter((o) => o.status === 'Finalizado' && isToday(new Date(o.updated_at))) || []
        const revenueToday = finishedToday.reduce((sum, o) => sum + Number(o.value), 0)

        // Alerts
        const lowStock = products?.filter((p) => p.stock_quantity <= p.min_stock_level) || []
        const pendingTxs = transactions?.filter((t) => t.status === 'Pendente') || []
        const overdueOrders =
          orders?.filter(
            (o) =>
              !['Finalizado', 'Cancelado'].includes(o.status) &&
              new Date(o.created_at) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          ) || []

        // Rankings (simplified)
        const topServicesCount =
          orders?.reduce((acc: any, o) => {
            const name = o.services?.name || 'Serviço'
            acc[name] = (acc[name] || 0) + 1
            return acc
          }, {}) || {}
        const topServices = Object.entries(topServicesCount)
          .map(([name, count]) => ({ name, count: count as number, type: 'Serviço' }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3)

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
  }, [])

  return { data, loading }
}
