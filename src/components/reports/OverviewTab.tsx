import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { format } from 'date-fns'

export function OverviewTab({ data }: { data: any }) {
  const income = data.transactions
    .filter((t: any) => t.type === 'entrada')
    .reduce((a: any, b: any) => a + Number(b.amount), 0)
  const expense = data.transactions
    .filter((t: any) => t.type === 'saida')
    .reduce((a: any, b: any) => a + Number(b.amount), 0)
  const profit = income - expense
  const salesTotal = data.sales.reduce((a: any, b: any) => a + Number(b.final_amount), 0)

  const totalRevenue = income + salesTotal // rough metric depending on whether sales are in txs
  const activeOS = data.orders.filter(
    (o: any) => !['Finalizada', 'Entregue', 'Cancelada'].includes(o.status),
  ).length

  // Revenue chart data
  const revMap: any = {}
  data.transactions
    .filter((t: any) => t.type === 'entrada')
    .forEach((t: any) => {
      const d = t.transaction_date.substring(5, 10) // MM-DD
      revMap[d] = (revMap[d] || 0) + Number(t.amount)
    })
  const chartData = Object.keys(revMap)
    .sort()
    .map((k) => ({ date: k, revenue: revMap[k] }))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Faturamento (Serviços)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">R$ {income.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Vendas (PDV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">R$ {salesTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Lucro Estimado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {profit.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">OS em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOS}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle>Evolução de Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ChartContainer
              config={{ revenue: { label: 'Receita', color: 'hsl(var(--primary))' } }}
              className="h-[300px] w-full"
            >
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `R$ ${v}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Sem dados suficientes para o período.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
