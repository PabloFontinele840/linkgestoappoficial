import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createCustomer } from '@/services/customers'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function NewCustomerForm({ onCreated }: { onCreated: () => void }) {
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
      toast.success('Cliente cadastrado com sucesso!')
      onCreated()
    } catch (error: any) {
      toast.error('Erro ao cadastrar cliente')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Cliente</CardTitle>
        <CardDescription>
          Preencha os dados do cliente (todos os campos são opcionais).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input name="name" placeholder="Ex: Maria Silva" />
            </div>
            <div className="space-y-2">
              <Label>CPF</Label>
              <Input name="cpf" placeholder="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="cliente@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Telefone / WhatsApp</Label>
              <Input name="phone" placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Endereço Completo</Label>
              <Input name="address" placeholder="Rua, Número, Bairro, Cidade - Estado" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Status</Label>
              <Select name="status" defaultValue="Ativo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Recorrente">Recorrente</SelectItem>
                  <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Observações</Label>
              <Textarea
                name="notes"
                placeholder="Informações adicionais relevantes..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={onCreated}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Salvar Cliente
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
