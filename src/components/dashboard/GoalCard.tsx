import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Target } from 'lucide-react'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export function GoalCard({ data }: { data: any }) {
  const percent =
    data.target > 0 ? Math.min(Math.round((data.revenue / data.target) * 100), 100) : 0
  const remaining = Math.max(data.target - data.revenue, 0)

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm relative overflow-hidden group shadow-sm flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Target className="size-4 text-primary" />
          Meta Mensal ({formatCurrency(data.target)})
        </CardTitle>
      </CardHeader>
      <CardContent className="z-10 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-3xl font-bold">{formatCurrency(data.revenue)}</span>
            <span className="text-sm text-muted-foreground ml-2">atingido</span>
          </div>
          <span className="text-lg font-bold text-primary">{percent}%</span>
        </div>
        <Progress value={percent} className="h-3 bg-secondary mt-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {remaining > 0 ? (
            <>
              Faltam <strong className="text-foreground">{formatCurrency(remaining)}</strong> para
              atingir a meta.
            </>
          ) : (
            <strong className="text-emerald-500">Meta atingida! Parabéns!</strong>
          )}
        </p>
      </CardContent>
    </Card>
  )
}
