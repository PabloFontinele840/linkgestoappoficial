import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Clock, PackageX, Trophy, Star } from 'lucide-react'

export function SidePanels() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle className="size-5" />
            Alertas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
            <PackageX className="size-5 text-red-400 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-red-200">Estoque baixo</p>
              <p className="text-xs text-red-400/80">Telas iPhone 11 (Restam 2 un.)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 transition-colors">
            <AlertTriangle className="size-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-yellow-200">Contas pendentes</p>
              <p className="text-xs text-yellow-500/80">2 faturas vencem amanhã</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 transition-colors">
            <Clock className="size-5 text-orange-400 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-orange-200">Ordens atrasadas</p>
              <p className="text-xs text-orange-400/80">OS-1028 ultrapassou o prazo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            Ranking do Mês
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
                1º
              </div>
              <div>
                <p className="font-medium text-sm">Troca de Tela Frontal</p>
                <p className="text-xs text-muted-foreground">Serviço mais vendido</p>
              </div>
            </div>
            <span className="text-sm font-bold">48 un.</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-bold text-xs">
                2º
              </div>
              <div>
                <p className="font-medium text-sm">Película 3D Premium</p>
                <p className="text-xs text-muted-foreground">Produto mais vendido</p>
              </div>
            </div>
            <span className="text-sm font-bold">124 un.</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Star className="size-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Satisfação Média</p>
                <p className="text-xs text-muted-foreground">Avaliações de clientes</p>
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-500">4.9/5</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
