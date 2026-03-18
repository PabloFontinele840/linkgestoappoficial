import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Target, Pencil } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { startOfMonth, format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export function GoalCard({ data, onUpdate }: { data: any; onUpdate?: () => void }) {
  const [open, setOpen] = useState(false)
  const [targetValue, setTargetValue] = useState(data.target.toString())
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  // Update local state when data changes externally
  useEffect(() => {
    setTargetValue(data.target.toString())
  }, [data.target])

  const percent =
    data.target > 0 ? Math.min(Math.round((data.revenue / data.target) * 100), 100) : 0
  const remaining = Math.max(data.target - data.revenue, 0)
  const hasGoal = data.target > 0

  const handleSave = async () => {
    if (!user) return
    const value = parseFloat(targetValue.replace(',', '.'))
    if (isNaN(value) || value < 0) {
      toast({
        title: 'Valor inválido',
        description: 'Por favor, insira um valor numérico positivo.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const monthYear = format(startOfMonth(new Date()), 'yyyy-MM-dd')
      const { error } = await supabase.from('monthly_goals').upsert(
        {
          user_id: user.id,
          month_year: monthYear,
          target_value: value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id, month_year' },
      )

      if (error) throw error

      toast({
        title: 'Meta atualizada!',
        description: 'A meta mensal foi definida com sucesso.',
      })
      setOpen(false)
      onUpdate?.()
    } catch (error: any) {
      console.error('Error saving goal:', error)
      toast({
        title: 'Erro ao salvar meta',
        description: error.message || 'Ocorreu um erro ao tentar salvar a meta.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm relative overflow-hidden group shadow-sm flex flex-col justify-center min-h-[160px]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Target className="size-4 text-primary" />
            Meta Mensal {hasGoal && `(${formatCurrency(data.target)})`}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setOpen(true)}
            title="Definir Meta"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="z-10 flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-3xl font-bold">{formatCurrency(data.revenue)}</span>
              <span className="text-sm text-muted-foreground ml-2">atingido</span>
            </div>
            {hasGoal && <span className="text-lg font-bold text-primary">{percent}%</span>}
          </div>
          <Progress value={percent} className="h-3 bg-secondary mt-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {!hasGoal ? (
              <span>Nenhuma meta definida para este mês.</span>
            ) : remaining > 0 ? (
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Definir Meta Mensal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="targetValue">Valor da Meta (R$)</Label>
              <Input
                id="targetValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
