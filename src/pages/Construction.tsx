import { Wrench } from 'lucide-react'

export default function Construction() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center animate-fade-in-up">
      <div className="flex aspect-square size-20 items-center justify-center rounded-2xl bg-card border border-border/50 mb-6 shadow-elevation">
        <Wrench className="size-10 text-primary animate-pulse" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-3">Página em construção 🚧</h1>
      <p className="text-muted-foreground max-w-[400px]">
        Estamos trabalhando duro para trazer essa funcionalidade em breve. Fique ligado nas próximas
        atualizações!
      </p>
    </div>
  )
}
