import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createInventoryItem } from '@/services/inventory'
import { getSuppliers } from '@/services/suppliers'
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

export function NewItemForm({ onCreated }: { onCreated: () => void }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState<any[]>([])

  useEffect(() => {
    if (user) getSuppliers(user.id).then(setSuppliers)
  }, [user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())

    // Formatting numbers
    payload.quantity = parseInt(payload.quantity as string) || 0
    payload.minimum_stock = parseInt(payload.minimum_stock as string) || 0
    payload.cost_price = parseFloat(payload.cost_price as string) || 0
    payload.suggested_price = parseFloat(payload.suggested_price as string) || 0

    try {
      await createInventoryItem(payload, user.id)
      toast.success('Item cadastrado com sucesso!')
      onCreated()
    } catch (err) {
      toast.error('Erro ao cadastrar item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Item de Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome do Item *</Label>
              <Input name="name" required placeholder="Ex: Tela Frontal" />
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
                  <SelectItem value="Aparelho">Aparelho</SelectItem>
                  <SelectItem value="Insumo">Insumo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Marca Aparelho</Label>
              <Input name="device_brand" placeholder="Ex: Apple" />
            </div>
            <div className="space-y-2">
              <Label>Modelo Aparelho</Label>
              <Input name="device_model" placeholder="Ex: iPhone 13" />
            </div>
            <div className="space-y-2">
              <Label>Qualidade/Marca Peça</Label>
              <Input name="part_brand" placeholder="Ex: Original / Incell" />
            </div>
            <div className="space-y-2">
              <Label>SKU / Código</Label>
              <Input name="sku" placeholder="Opcional" />
            </div>

            <div className="space-y-2">
              <Label>Fornecedor</Label>
              <Select name="supplier_id">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Localização Prateleira</Label>
              <Input name="location" placeholder="Ex: Gaveta 3A" />
            </div>

            <div className="space-y-2">
              <Label>Quantidade Inicial</Label>
              <Input name="quantity" type="number" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label>Estoque Mínimo</Label>
              <Input name="minimum_stock" type="number" defaultValue="2" />
            </div>
            <div className="space-y-2">
              <Label>Preço de Custo (R$)</Label>
              <Input name="cost_price" type="number" step="0.01" defaultValue="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Preço Sugerido (R$)</Label>
              <Input name="suggested_price" type="number" step="0.01" defaultValue="0.00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea name="notes" className="min-h-[80px]" />
          </div>

          <div className="flex justify-end gap-4 border-t border-border/50 pt-4">
            <Button type="button" variant="ghost" onClick={onCreated}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Salvar Item
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
