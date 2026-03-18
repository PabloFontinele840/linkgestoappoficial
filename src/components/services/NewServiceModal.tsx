import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createService } from '@/services/services'
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

export function NewServiceModal({ open, onOpenChange, onCreated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name'),
      cost: parseFloat(fd.get('cost') as string) || 0,
      final_price: parseFloat(fd.get('final_price') as string) || 0,
      status: fd.get('status'),
    }

    try {
      await createService(payload, user.id)
      toast.success('Serviço criado com sucesso!')
      onCreated()
    } catch (err: any) {
      toast.error('Erro ao criar serviço: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Serviço / Peça</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Nome do Serviço / Peça</Label>
            <Input name="name" required placeholder="Ex: Troca de Tela iPhone 13" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Custo (R$)</Label>
              <Input name="cost" type="number" step="0.01" defaultValue="0" required />
            </div>
            <div className="space-y-2">
              <Label>Preço Final (R$)</Label>
              <Input name="final_price" type="number" step="0.01" defaultValue="0" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select name="status" defaultValue="Ativo">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Cadastrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
