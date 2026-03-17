import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createSupplier } from '@/services/suppliers'
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

export function NewSupplierForm({ onCreated }: { onCreated: () => void }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())

    if (!payload.name) payload.name = 'Fornecedor sem nome'

    try {
      await createSupplier(payload, user.id)
      toast.success('Fornecedor cadastrado com sucesso!')
      onCreated()
    } catch (error: any) {
      toast.error('Erro ao cadastrar fornecedor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Fornecedor</CardTitle>
        <CardDescription>
          Cadastre um novo parceiro (todos os campos são opcionais).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome / Empresa</Label>
              <Input name="name" placeholder="Nome do fornecedor" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="contato@empresa.com" />
            </div>
            <div className="space-y-2">
              <Label>Telefone Fixo</Label>
              <Input name="phone" placeholder="(00) 0000-0000" />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input name="whatsapp" placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input name="city" placeholder="Sua Cidade" />
            </div>
            <div className="space-y-2">
              <Label>Estado (UF)</Label>
              <Input name="state" placeholder="SP" maxLength={2} />
            </div>
            <div className="space-y-2">
              <Label>Especialidade</Label>
              <Select name="specialty" defaultValue="Geral">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Telas">Telas</SelectItem>
                  <SelectItem value="Conectores">Conectores</SelectItem>
                  <SelectItem value="Placas">Placas</SelectItem>
                  <SelectItem value="Acessórios">Acessórios</SelectItem>
                  <SelectItem value="Aparelhos">Aparelhos</SelectItem>
                  <SelectItem value="Geral">Geral</SelectItem>
                </SelectContent>
              </Select>
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
            <div className="space-y-2 md:col-span-2">
              <Label>Observações</Label>
              <Textarea
                name="notes"
                placeholder="Prazos, garantias, condições comerciais..."
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
              Salvar Fornecedor
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
