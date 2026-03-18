import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createCustomer } from '@/services/customers'
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
import { toast } from 'sonner'

export function NewCustomerModal({ open, onOpenChange, onCreated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    if (!payload.name) payload.name = 'Cliente sem nome'

    try {
      await createCustomer(payload, user.id)
      toast.success('Cliente cadastrado!')
      onCreated()
    } catch {
      toast.error('Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>Preencha os dados do cliente.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input name="name" required />
            </div>
            <div className="space-y-2">
              <Label>CPF</Label>
              <Input name="cpf" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Telefone / WhatsApp</Label>
              <Input name="phone" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Endereço</Label>
              <Input name="address" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Observações</Label>
              <Textarea name="notes" />
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
