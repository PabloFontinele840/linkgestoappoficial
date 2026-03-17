import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Clock, PackageX, Trophy, DollarSign, CalendarDays } from 'lucide-react'

export function DailySummaryCard({
  data,
}: {
  data: { createdToday: number; finishedToday: number; revenueToday: number }
}) {
  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" />
          Resumo do Dia
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
          <span className="text-sm font-medium">Ordens Criadas</span>
          <span className="text-xl font-bold">{data.createdToday}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Finalizadas Hoje
          </span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {data.finishedToday}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
          <span className="text-sm font-medium text-primary">Faturamento</span>
          <span className="text-xl font-bold text-primary">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              data.revenueToday,
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function AlertsCard({ alerts }: { alerts: any }) {
  const hasAlerts =
    alerts.lowStock.length > 0 || alerts.overdueOrders.length > 0 || alerts.pendingTxs.length > 0

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-red-500">
          <AlertTriangle className="size-5" />
          Alertas Importantes
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto max-h-[250px] grid gap-3 pr-2 scrollbar-thin">
        {!hasAlerts ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-4">
            <p className="text-sm">Tudo sob controle!</p>
            <p className="text-xs">Nenhum alerta no momento.</p>
          </div>
        ) : (
          <>
            {alerts.lowStock.map((p: any) => (
              <div
                key={p.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors"
              >
                <PackageX className="size-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-red-600 dark:text-red-400">
                    Estoque baixo
                  </p>
                  <p className="text-xs text-red-600/80 dark:text-red-400/80">
                    {p.name} (Restam {p.stock_quantity} un.)
                  </p>
                </div>
              </div>
            ))}
            {alerts.pendingTxs.map((t: any) => (
              <div
                key={t.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 transition-colors"
              >
                <DollarSign className="size-5 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-yellow-700 dark:text-yellow-400">
                    Pagamento Pendente
                  </p>
                  <p className="text-xs text-yellow-600/80 dark:text-yellow-500/80">
                    {t.description || t.category} - R${' '}
                    {Number(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
            {alerts.overdueOrders.map((o: any) => (
              <div
                key={o.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 transition-colors"
              >
                <Clock className="size-5 text-orange-500 dark:text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-orange-600 dark:text-orange-400">
                    Ordem Atrasada
                  </p>
                  <p className="text-xs text-orange-600/80 dark:text-orange-400/80">
                    OS-{o.id.split('-')[0]} excedeu 7 dias
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export function RankingsCard({ rankings }: { rankings: any[] }) {
  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="size-5 text-primary" />
          Ranking do Mês
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 grid gap-3">
        {rankings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-4">
            <p className="text-sm">Sem dados suficientes.</p>
            <p className="text-xs">Registre mais ordens este mês.</p>
          </div>
        ) : (
          rankings.map((r, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-8 items-center justify-center rounded-full font-bold text-xs ${
                    index === 0 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}º
                </div>
                <div>
                  <p className="font-medium text-sm leading-none">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                    {r.type}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold bg-background px-2 py-1 rounded-md shadow-sm">
                {r.count} OS
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
