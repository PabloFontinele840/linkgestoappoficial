import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  'Aberta',
  'Em análise',
  'Aguardando aprovação',
  'Aguardando peça',
  'Em andamento',
  'Finalizada',
  'Entregue',
]

export function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  // Determine logical progression index. Cancelada stops the timeline.
  const isCanceled = currentStatus === 'Cancelada'
  let currentIndex = STEPS.indexOf(currentStatus)
  if (currentIndex === -1 && !isCanceled) currentIndex = 0

  return (
    <div className="py-6 px-2">
      <div className="relative flex justify-between">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-muted -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-primary transition-all duration-500 -translate-y-1/2 z-0"
          style={{ width: isCanceled ? '0%' : `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx <= currentIndex && !isCanceled
          const isActive = idx === currentIndex && !isCanceled

          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2 group">
              <div
                className={cn(
                  'flex size-8 items-center justify-center rounded-full border-2 transition-colors duration-300 bg-background',
                  isCompleted
                    ? 'border-primary text-primary'
                    : 'border-muted text-muted-foreground',
                  isActive && 'ring-4 ring-primary/20 bg-primary/10',
                  isCanceled && 'border-red-500/50 text-red-500/50',
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : (
                  <div className="size-2 rounded-full bg-current opacity-50" />
                )}
              </div>
              <span
                className={cn(
                  'absolute -bottom-6 w-max text-[10px] sm:text-xs font-medium text-center transition-colors',
                  isCompleted ? 'text-foreground' : 'text-muted-foreground',
                  isActive && 'text-primary',
                )}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
      {isCanceled && (
        <div className="mt-8 text-center text-red-500 font-medium">
          Esta Ordem de Serviço foi Cancelada.
        </div>
      )}
    </div>
  )
}
