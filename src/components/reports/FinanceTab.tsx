import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export function FinanceTab({ data }: { data: any }) {
  const classificationMap = data.transactions
    .filter((t: any) => t.type === 'saida')
    .reduce((acc: any, t: any) => {
      acc[t.classification] = (acc[t.classification] || 0) + Number(t.amount)
      return acc
    }, {})

  const catMap = data.transactions
    .filter((t: any) => t.type === 'saida')
    .reduce((acc: any, t: any) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
      return acc
    }, {})

  const topCats = Object.entries(catMap)
    .map(([k, v]) => ({ name: k, amount: v as number }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle>Despesas (Fixa vs Variável)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 pt-4">
            <div className="flex justify-between p-4 bg-muted/20 rounded-lg">
              <span className="font-medium">Custos Fixos</span>
              <span className="font-bold text-blue-500">
                R$ {(classificationMap['Fixa'] || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between p-4 bg-muted/20 rounded-lg">
              <span className="font-medium">Custos Variáveis</span>
              <span className="font-bold text-orange-500">
                R$ {(classificationMap['Variável'] || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          {topCats.length > 0 ? (
            <ChartContainer
              config={{ amount: { label: 'Valor', color: 'hsl(var(--destructive))' } }}
              className="h-[200px] w-full"
            >
              <BarChart data={topCats} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  width={100}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          ) : (
            <p className="text-muted-foreground text-sm">Sem dados suficientes.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
