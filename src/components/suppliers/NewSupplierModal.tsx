import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createSupplier } from '@/services/suppliers'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function NewSupplierModal({ open, onOpenChange, onCreated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())

    try {
      await createSupplier(payload, user.id)
      toast.success('Fornecedor cadastrado!')
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
          <DialogTitle>Novo Fornecedor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome / Empresa</Label>
              <Input name="name" required />
            </div>
            <div className="space-y-2">
              <Label>Especialidade</Label>
              <Input name="specialty" defaultValue="Geral" />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input name="phone" />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input name="whatsapp" />
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
