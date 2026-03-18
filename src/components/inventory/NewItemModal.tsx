import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createInventoryItem } from '@/services/inventory'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function NewItemModal({ open, onOpenChange, onCreated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    payload.quantity = parseInt(payload.quantity as string) || 0
    payload.cost_price = parseFloat(payload.cost_price as string) || 0
    payload.suggested_price = parseFloat(payload.suggested_price as string) || 0

    try {
      await createInventoryItem(payload, user!.id)
      toast.success('Item cadastrado!')
      onCreated()
    } catch {
      toast.error('Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Novo Item no Estoque</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input name="name" required />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select name="category" defaultValue="Peça">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Peça">Peça</SelectItem>
                  <SelectItem value="Acessório">Acessório</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input name="device_brand" />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input name="device_model" />
            </div>
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input name="quantity" type="number" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label>Custo (R$)</Label>
              <Input name="cost_price" type="number" step="0.01" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
