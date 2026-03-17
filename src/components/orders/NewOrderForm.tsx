import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createOrder } from '@/services/orders'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { CustomerSelector } from './CustomerSelector'

export function NewOrderForm({ onCreated }: { onCreated: () => void }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())

    // Add arrays manually
    payload.device_condition = fd.getAll('condition')
    payload.accessories_delivered = fd.getAll('accessory')

    try {
      await createOrder(payload, user.id)
      toast.success('Ordem de serviço criada com sucesso!')
      onCreated()
    } catch (error: any) {
      toast.error('Erro ao criar OS', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Nova Ordem de Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4 bg-muted/20 p-4 rounded-xl border border-border/50">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider">
              Vincular Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <CustomerSelector onSelect={(id) => setSelectedCustomerId(id)} />
                <input type="hidden" name="customer_id" value={selectedCustomerId || ''} />
              </div>
              {!selectedCustomerId && (
                <>
                  <div className="space-y-2">
                    <Label>Nome (Novo Cliente)</Label>
                    <Input name="customer_name" placeholder="Ex: João da Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone / WhatsApp</Label>
                    <Input name="customer_phone" placeholder="Ex: (11) 99999-9999" />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider">
              Detalhes do Aparelho
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Marca</Label>
                <Input name="device_brand" required placeholder="Ex: Apple" />
              </div>
              <div className="space-y-2">
                <Label>Modelo</Label>
                <Input name="device_model" required placeholder="Ex: iPhone 13" />
              </div>
              <div className="space-y-2">
                <Label>Cor</Label>
                <Input name="device_color" placeholder="Ex: Azul" />
              </div>
              <div className="space-y-2">
                <Label>IMEI / Serial</Label>
                <Input name="device_serial" placeholder="Opcional" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Problema Relatado</Label>
              <Textarea
                name="reported_problem"
                required
                placeholder="Descreva o defeito..."
                className="min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <Label>Condição</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {['Trincado', 'Riscado', 'Amassado', 'Oxidado'].map((c) => (
                    <label key={c} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="condition"
                        value={c}
                        className="rounded border-primary text-primary bg-background"
                      />{' '}
                      {c}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Acessórios</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {['Capa', 'Chip', 'Cartão SD', 'Carregador'].map((a) => (
                    <label key={a} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="accessory"
                        value={a}
                        className="rounded border-primary text-primary bg-background"
                      />{' '}
                      {a}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider">Serviço</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Técnico</Label>
                <Input name="technician_name" placeholder="Nome do técnico" />
              </div>
              <div className="space-y-2">
                <Label>Atendimento</Label>
                <Select name="service_type" defaultValue="Balcão">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Balcão">Balcão</SelectItem>
                    <SelectItem value="Domicílio">Domicílio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select name="priority" defaultValue="Normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor Estimado (R$)</Label>
                <Input type="number" step="0.01" name="estimated_value" defaultValue="0.00" />
                <label className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <input
                    type="checkbox"
                    name="is_value_to_be_defined"
                    value="true"
                    className="rounded"
                  />{' '}
                  A definir
                </label>
              </div>
              <div className="space-y-2">
                <Label>Garantia</Label>
                <Select name="warranty_days" defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sem garantia</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={onCreated}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Criar Ordem
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
