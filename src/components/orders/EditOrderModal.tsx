import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { updateOrder } from '@/services/orders'
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
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CustomerSelector } from './CustomerSelector'

export function EditOrderModal({ order, open, onOpenChange, onUpdated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [device, setDevice] = useState({
    brand: order.device_brand || '',
    model: order.device_model || '',
    problem: order.reported_problem || '',
  })
  const [items, setItems] = useState<any[]>(order.os_items || [])
  const [customerId, setCustomerId] = useState<string | null>(order.customer_id)

  const [paymentStatus, setPaymentStatus] = useState(order.payment_status || 'Pendente')
  const [status, setStatus] = useState(order.status)

  const addItem = () =>
    setItems([
      ...items,
      { id: Date.now().toString(), type: 'Peça', description: '', cost: 0, price: 0, quantity: 1 },
    ])
  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id))

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const totalPrice = items.reduce((acc, i) => acc + Number(i.price) * Number(i.quantity), 0)

  const handleSave = async () => {
    if (!user) return
    setLoading(true)
    try {
      const payload = {
        customer_id: customerId,
        device_brand: device.brand,
        device_model: device.model,
        reported_problem: device.problem,
        status,
        payment_status: paymentStatus,
        value: totalPrice,
        estimated_value: totalPrice,
      }
      await updateOrder(order.id, payload, items, user.id)
      toast.success('OS atualizada com sucesso!')
      onUpdated()
    } catch (e: any) {
      toast.error(e.message || 'Erro ao atualizar OS')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Ordem de Serviço</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Cliente</Label>
              <CustomerSelector onSelect={(id) => setCustomerId(id)} />
              <p className="text-xs text-muted-foreground">Atual: {order.customers?.name}</p>
            </div>
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input
                value={device.brand}
                onChange={(e) => setDevice({ ...device, brand: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input
                value={device.model}
                onChange={(e) => setDevice({ ...device, model: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Defeito</Label>
              <Input
                value={device.problem}
                onChange={(e) => setDevice({ ...device, problem: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Status da OS</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Aberta', 'Em análise', 'Em andamento', 'Finalizada', 'Entregue'].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status de Pagamento</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Pago">Pago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 border-t border-border/50 pt-4">
            <Label className="flex justify-between items-center mb-2">
              Itens da OS{' '}
              <Button size="sm" variant="outline" onClick={addItem}>
                <Plus className="size-3 mr-1" /> Item
              </Button>
            </Label>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Custo</TableHead>
                    <TableHead>Venda</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((it, i) => (
                    <TableRow key={it.id}>
                      <TableCell>
                        <Select
                          value={it.type}
                          onValueChange={(v) => handleItemChange(i, 'type', v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Peça">Peça</SelectItem>
                            <SelectItem value="Serviço">Serviço</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={it.description}
                          onChange={(e) => handleItemChange(i, 'description', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={it.cost}
                          onChange={(e) => handleItemChange(i, 'cost', e.target.value)}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={it.price}
                          onChange={(e) => handleItemChange(i, 'price', e.target.value)}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={it.quantity}
                          onChange={(e) => handleItemChange(i, 'quantity', e.target.value)}
                          className="w-16"
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(it.id)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
