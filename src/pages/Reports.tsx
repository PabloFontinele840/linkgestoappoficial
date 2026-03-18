import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BarChart as BarChartIcon, Loader2, Calendar } from 'lucide-react'
import { useReports } from '@/hooks/use-reports'
import { OverviewTab } from '@/components/reports/OverviewTab'
import { OSTab } from '@/components/reports/OSTab'
import { FinanceTab } from '@/components/reports/FinanceTab'
import { SalesTab } from '@/components/reports/SalesTab'
import { InventoryTab } from '@/components/reports/InventoryTab'
import { ExportsTab } from '@/components/reports/ExportsTab'

export default function Reports() {
  const t = new Date()
  const todayStr = t.toISOString().split('T')[0]
  const d30 = new Date(t)
  d30.setDate(t.getDate() - 30)

  const [dateRange, setDateRange] = useState({
    start: d30.toISOString().split('T')[0],
    end: todayStr,
  })
  const { data, loading } = useReports(dateRange.start, dateRange.end)

  const applyShortcut = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - days)
    setDateRange({ start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] })
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <BarChartIcon className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Relatórios & BI</h1>
            <p className="text-muted-foreground">Analise o desempenho da sua assistência.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 bg-card p-2 rounded-xl border border-border/50">
          <Calendar className="size-4 text-muted-foreground ml-2" />
          <Input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange((p) => ({ ...p, start: e.target.value }))}
            className="w-36 h-8 bg-background"
          />
          <span className="text-muted-foreground text-sm">até</span>
          <Input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange((p) => ({ ...p, end: e.target.value }))}
            className="w-36 h-8 bg-background"
          />
          <div className="flex gap-1 ml-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 text-xs"
              onClick={() => applyShortcut(0)}
            >
              Hoje
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-8 text-xs"
              onClick={() => applyShortcut(7)}
            >
              7d
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-8 text-xs"
              onClick={() => applyShortcut(30)}
            >
              30d
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6 bg-card border border-border/50">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="os">Ordens de Serviço</TabsTrigger>
          <TabsTrigger value="finance">Financeiro</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="inventory">Serviços</TabsTrigger>
          <TabsTrigger value="exports">Exportações</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="size-10 animate-spin text-primary" />
          </div>
        ) : !data ? null : (
          <>
            <TabsContent value="overview">
              <OverviewTab data={data} />
            </TabsContent>
            <TabsContent value="os">
              <OSTab data={data} />
            </TabsContent>
            <TabsContent value="finance">
              <FinanceTab data={data} />
            </TabsContent>
            <TabsContent value="sales">
              <SalesTab data={data} />
            </TabsContent>
            <TabsContent value="inventory">
              <InventoryTab data={data} />
            </TabsContent>
            <TabsContent value="exports">
              <ExportsTab data={data} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
