import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, LineChart, Wrench, Users } from 'lucide-react'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export function StatCards({ data }: { data: any }) {
  const stats = [
    {
      title: 'Faturamento do mês',
      value: formatCurrency(data.revenue),
      icon: DollarSign,
      color: 'text-emerald-500',
    },
    {
      title: 'Lucro do mês',
      value: formatCurrency(data.profit),
      icon: LineChart,
      color: data.profit >= 0 ? 'text-emerald-500' : 'text-red-500',
    },
    {
      title: 'Ordens de serviço ativas',
      value: data.activeOrders.toString(),
      icon: Wrench,
      color: 'text-primary',
    },
    {
      title: 'Clientes atendidos no mês',
      value: data.customers.toString(),
      icon: Users,
      color: 'text-blue-500',
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors shadow-sm"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <stat.icon className="size-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.value}</h2>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
