import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, LineChart, Wrench, Users } from 'lucide-react'

export function StatCards() {
  const stats = [
    {
      title: 'Faturamento do mês',
      value: 'R$ 45.230,00',
      trend: '+12.5%',
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: 'Lucro do mês',
      value: 'R$ 18.400,00',
      trend: '+4.2%',
      isPositive: true,
      icon: LineChart,
    },
    {
      title: 'Ordens de serviço ativas',
      value: '42',
      trend: '-2',
      isPositive: false,
      icon: Wrench,
    },
    {
      title: 'Clientes atendidos no mês',
      value: '128',
      trend: '+18',
      isPositive: true,
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <stat.icon className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold tracking-tight">{stat.value}</h2>
              <span
                className={`text-xs font-medium ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}
              >
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
