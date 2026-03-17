import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Clock, PackageX, Trophy, DollarSign } from 'lucide-react'

export function SidePanels({ alerts, rankings }: { alerts: any; rankings: any[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Alertas Importantes */}
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle className="size-5" />
            Alertas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {alerts.lowStock.length === 0 &&
          alerts.overdueOrders.length === 0 &&
          alerts.pendingTxs.length === 0 ? (
            <div className="text-center text-muted-foreground py-4 text-sm">
              Tudo sob controle! Nenhum alerta.
            </div>
          ) : (
            <>
              {alerts.lowStock.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors"
                >
                  <PackageX className="size-5 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-red-200">Estoque baixo</p>
                    <p className="text-xs text-red-400/80">
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
                  <DollarSign className="size-5 text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-yellow-200">Pagamento Pendente</p>
                    <p className="text-xs text-yellow-500/80">
                      {t.description} - R$ {t.amount}
                    </p>
                  </div>
                </div>
              ))}
              {alerts.overdueOrders.map((o: any) => (
                <div
                  key={o.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 transition-colors"
                >
                  <Clock className="size-5 text-orange-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-orange-200">Ordem Atrasada</p>
                    <p className="text-xs text-orange-400/80">
                      OS-{o.id.split('-')[0]} excedeu 7 dias
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>

      {/* Ranking do Mês */}
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            Ranking do Mês (Serviços)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {rankings.length === 0 ? (
            <div className="text-center text-muted-foreground py-4 text-sm">
              Sem dados suficientes este mês.
            </div>
          ) : (
            rankings.map((r, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full font-bold text-xs ${index === 0 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}
                  >
                    {index + 1}º
                  </div>
                  <div>
                    <p className="font-medium text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">Mais requisitado</p>
                  </div>
                </div>
                <span className="text-sm font-bold">{r.count} OS</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
