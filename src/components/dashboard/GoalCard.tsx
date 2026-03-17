import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Target } from 'lucide-react'

export function GoalCard() {
  const percent = 75

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Target className="size-4 text-primary" />
          Meta Mensal (R$ 60.000,00)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-2xl font-bold">R$ 45.230,00</span>
            <span className="text-sm text-muted-foreground ml-2">atingido</span>
          </div>
          <span className="text-sm font-medium text-primary">{percent}%</span>
        </div>
        <Progress value={percent} className="h-2 bg-secondary" />
        <p className="text-xs text-muted-foreground mt-3">
          Faltam <strong className="text-foreground">R$ 14.770,00</strong> para atingir a meta.
        </p>
      </CardContent>
    </Card>
  )
}
