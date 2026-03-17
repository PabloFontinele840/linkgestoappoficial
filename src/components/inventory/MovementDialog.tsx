import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createInventoryMovement } from '@/services/inventory'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function MovementDialog({ itemId, open, onOpenChange, onCreated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = {
      item_id: itemId,
      type: fd.get('type') as string,
      quantity: parseInt(fd.get('quantity') as string) || 0,
      reason: fd.get('reason') as string,
      notes: fd.get('notes') as string,
    }

    try {
      await createInventoryMovement(payload, user.id)
      toast.success('Movimentação registrada!')
      onCreated()
    } catch (err: any) {
      toast.error('Erro: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Movimentação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select name="type" defaultValue="Entrada">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entrada">Entrada (+)</SelectItem>
                  <SelectItem value="Saída">Saída (-)</SelectItem>
                  <SelectItem value="Ajuste">Ajuste (=)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Qtd / Novo Total (Ajuste)</Label>
              <Input name="quantity" type="number" required min="0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Motivo / Origem</Label>
            <Input name="reason" placeholder="Ex: Compra, OS-1040, Perda..." required />
          </div>
          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea name="notes" placeholder="Detalhes adicionais..." />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
