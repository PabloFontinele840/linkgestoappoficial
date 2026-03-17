import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const chartConfig = {
  atual: { label: 'Mês Atual', color: 'hsl(var(--primary))' },
  anterior: { label: 'Mês Anterior', color: 'hsl(var(--muted-foreground))' },
}

export function RevenueChart({ data }: { data: any[] }) {
  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm h-full flex flex-col shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Faturamento Diário</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4 min-h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fillAtual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-atual)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-atual)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillAnterior" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-anterior)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="var(--color-anterior)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border)/0.5)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `R$${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Area
                type="monotone"
                dataKey="anterior"
                stroke="var(--color-anterior)"
                fillOpacity={1}
                fill="url(#fillAnterior)"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="atual"
                stroke="var(--color-atual)"
                fillOpacity={1}
                fill="url(#fillAtual)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
