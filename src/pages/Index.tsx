import { StatCards } from '@/components/dashboard/StatCards'
import { GoalCard } from '@/components/dashboard/GoalCard'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { OrdersTable } from '@/components/dashboard/OrdersTable'
import { DailySummaryCard, AlertsCard, RankingsCard } from '@/components/dashboard/LowerPanels'
import { useDashboardData } from '@/hooks/use-dashboard'
import { Skeleton } from '@/components/ui/skeleton'

export default function Index() {
  const { data, loading } = useDashboardData()

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        {/* StatCards Skeleton */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
        </div>
        {/* Middle Section Skeleton */}
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
        {/* Table Skeleton */}
        <Skeleton className="h-[300px] rounded-xl" />
        {/* Lower Section Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-[250px] rounded-xl" />
          <Skeleton className="h-[250px] rounded-xl" />
          <Skeleton className="h-[250px] rounded-xl" />
        </div>
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

      {/* 1. Top Section */}
      <StatCards data={data.kpis} />

      {/* 2. Middle Section */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <GoalCard data={data.goal} />
        <RevenueChart data={data.chart} />
      </div>

      {/* 3. Operational Section */}
      <OrdersTable orders={data.recentOrders} />

      {/* 4. Lower Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <DailySummaryCard data={data.summary} />
        <AlertsCard alerts={data.alerts} />
        <RankingsCard rankings={data.rankings} />
      </div>
    </div>
  )
}
