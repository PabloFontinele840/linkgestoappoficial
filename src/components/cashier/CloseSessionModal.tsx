import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

export function CloseSessionModal({ open, onOpenChange, computedBalance, onSubmit }: any) {
  const [loading, setLoading] = useState(false)
  const [reportedBalance, setReportedBalance] = useState(computedBalance.toFixed(2))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await onSubmit({
      reported_closing_balance: parseFloat(fd.get('reported_closing_balance') as string) || 0,
      notes: fd.get('notes') as string,
    })
    setLoading(false)
    onOpenChange(false)
  }

  const difference = parseFloat(reportedBalance) - computedBalance

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fechar Caixa</DialogTitle>
          <DialogDescription>
            Confira os valores e confirme o fechamento do caixa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="bg-muted/30 p-4 rounded-xl text-center">
            <p className="text-sm text-muted-foreground mb-1">Saldo Final Calculado pelo Sistema</p>
            <p className="text-3xl font-bold text-primary">R$ {computedBalance.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <Label>Saldo Físico Informado (R$)</Label>
            <Input
              name="reported_closing_balance"
              type="number"
              step="0.01"
              value={reportedBalance}
              onChange={(e) => setReportedBalance(e.target.value)}
              required
            />
            {difference !== 0 && (
              <p className={`text-xs mt-1 ${difference > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                Diferença: R$ {difference.toFixed(2)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Observações de Fechamento</Label>
            <Textarea name="notes" placeholder="Justifique possíveis diferenças..." />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {loading && <Loader2 className="size-4 mr-2 animate-spin" />} Confirmar Fechamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
