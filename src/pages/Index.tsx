import { StatCards } from '@/components/dashboard/StatCards'
import { GoalCard } from '@/components/dashboard/GoalCard'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { OrdersTable } from '@/components/dashboard/OrdersTable'
import { SidePanels } from '@/components/dashboard/SidePanels'

export default function Index() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Visão Geral</h1>
        <p className="text-muted-foreground">
          Acompanhe os principais indicadores da sua assistência.
        </p>
      </div>

      {/* Top Metrics Grid */}
      <StatCards />

      {/* Main Grid: Goal & Chart */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <GoalCard />
        <RevenueChart />
      </div>

      {/* Secondary Grid: Orders & Side Panels */}
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <OrdersTable />

          {/* Daily Summary Footer Grid */}
          <div className="grid grid-cols-3 gap-4 rounded-xl border border-border/50 bg-card/20 p-4 backdrop-blur-sm">
            <div className="text-center border-r border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Ordens criadas hoje</p>
              <p className="text-xl font-bold">12</p>
            </div>
            <div className="text-center border-r border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Finalizadas hoje</p>
              <p className="text-xl font-bold text-emerald-500">8</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Faturamento do dia</p>
              <p className="text-xl font-bold text-primary">R$ 1.850</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SidePanels />
        </div>
      </div>
    </div>
  )
}
