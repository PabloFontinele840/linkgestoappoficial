import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

export function OpenSessionModal({ open, onOpenChange, onSubmit }: any) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await onSubmit({
      opening_balance: parseFloat(fd.get('opening_balance') as string) || 0,
      notes: fd.get('notes') as string,
    })
    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Abrir Caixa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Saldo Inicial em Caixa (R$)</Label>
            <Input name="opening_balance" type="number" step="0.01" defaultValue="0.00" required />
          </div>
          <div className="space-y-2">
            <Label>Observações (Opcional)</Label>
            <Textarea name="notes" placeholder="Ex: Fundo de troco da manhã..." />
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="size-4 mr-2 animate-spin" />} Confirmar Abertura
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
