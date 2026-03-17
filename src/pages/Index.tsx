import { StatCards } from '@/components/dashboard/StatCards'
import { GoalCard } from '@/components/dashboard/GoalCard'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { OrdersTable } from '@/components/dashboard/OrdersTable'
import { SidePanels } from '@/components/dashboard/SidePanels'
import { useDashboardData } from '@/hooks/use-dashboard'
import { Loader2 } from 'lucide-react'

export default function Index() {
  const { data, loading } = useDashboardData()

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Visão Geral</h1>
        <p className="text-muted-foreground">
          Acompanhe os principais indicadores da sua assistência.
        </p>
      </div>

      {/* 1. Top Cards (KPIs) */}
      <StatCards data={data.kpis} />

      {/* 2. Goal Card & Main Chart */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <GoalCard data={data.goal} />
        <RevenueChart data={data.chart} />
      </div>

      {/* 3. Recent Orders Table */}
      <OrdersTable orders={data.recentOrders} />

      {/* 4. Resumo do Dia */}
      <div className="grid grid-cols-3 gap-4 rounded-xl border border-border/50 bg-card/20 p-4 backdrop-blur-sm shadow-sm">
        <div className="text-center border-r border-border/50">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Ordens criadas hoje</p>
          <p className="text-2xl font-bold">{data.summary.createdToday}</p>
        </div>
        <div className="text-center border-r border-border/50">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Finalizadas hoje</p>
          <p className="text-2xl font-bold text-emerald-500">{data.summary.finishedToday}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Faturamento do dia</p>
          <p className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              data.summary.revenueToday,
            )}
          </p>
        </div>
      </div>

      {/* 5. Alertas & 6. Rankings */}
      <SidePanels alerts={data.alerts} rankings={data.rankings} />
    </div>
  )
}
