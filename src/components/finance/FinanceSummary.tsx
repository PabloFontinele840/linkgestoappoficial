import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, TrendingUp, TrendingDown, Clock, Wallet } from 'lucide-react'

export function FinanceSummary({ data }: { data: any[] }) {
  const currentMonth = new Date().getMonth()
  const thisMonthData = data.filter((d) => {
    if (!d.transaction_date) return false
    return new Date(d.transaction_date).getMonth() === currentMonth
  })

  const faturamento = thisMonthData
    .filter((d) => d.type === 'entrada' && d.status === 'recebido')
    .reduce((a, b) => a + Number(b.amount), 0)
  const saidasPago = thisMonthData
    .filter((d) => d.type === 'saida' && d.status === 'pago')
    .reduce((a, b) => a + Number(b.amount), 0)
  const lucro = faturamento - saidasPago

  const aReceber = thisMonthData
    .filter((d) => d.type === 'entrada' && d.status === 'pendente')
    .reduce((a, b) => a + Number(b.amount), 0)
  const aPagar = thisMonthData
    .filter((d) => d.type === 'saida' && d.status === 'pendente')
    .reduce((a, b) => a + Number(b.amount), 0)

  const format = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Faturamento Recebido
          </CardTitle>
          <Wallet className="size-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">{format(faturamento)}</div>
          <p className="text-xs text-muted-foreground mt-1">Neste mês</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesas Pagas
          </CardTitle>
          <TrendingDown className="size-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">{format(saidasPago)}</div>
          <p className="text-xs text-muted-foreground mt-1">Neste mês</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Lucro Estimado
          </CardTitle>
          <TrendingUp className="size-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">{format(lucro)}</div>
          <p className="text-xs text-muted-foreground mt-1">Faturamento - Despesas</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Contas Pendentes
          </CardTitle>
          <Clock className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium text-muted-foreground mb-1">
            A Pagar: <span className="text-red-400">{format(aPagar)}</span>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            A Receber: <span className="text-emerald-400">{format(aReceber)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
