import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createSale } from '@/services/sales'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function NewSaleModal({ open, onOpenChange, onCreated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState('Cliente Balcão')
  const [items, setItems] = useState<any[]>([])
  const [status, setStatus] = useState('Concluída')
  const [payment, setPayment] = useState('Pix')

  const addItem = () =>
    setItems([
      ...items,
      { id: Date.now(), name: '', type: 'Produto', quantity: 1, unit_price: 0, subtotal: 0 },
    ])
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index][field] = value
    newItems[index].subtotal = Number(newItems[index].quantity) * Number(newItems[index].unit_price)
    setItems(newItems)
  }
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))

  const subtotal = items.reduce((acc, i) => acc + i.subtotal, 0)

  const handleSubmit = async () => {
    if (items.length === 0) return toast.error('Adicione itens à venda.')
    setLoading(true)
    try {
      await createSale(
        {
          client_name: client,
          total_amount: subtotal,
          final_amount: subtotal,
          discount: 0,
          payment_method: payment,
          status,
          sale_date: new Date().toISOString().split('T')[0],
        },
        items,
        user!.id,
      )
      toast.success('Venda concluída!')
      onCreated()
    } catch (e: any) {
      toast.error(e.message || 'Erro ao registrar venda')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Venda (PDV)</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Cliente</Label>
              <Input value={client} onChange={(e) => setClient(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-4">
            <Label className="flex justify-between items-center">
              Itens{' '}
              <Button size="sm" variant="outline" onClick={addItem}>
                <Plus className="size-3 mr-1" /> Adicionar
              </Button>
            </Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Sub</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((it, i) => (
                  <TableRow key={it.id}>
                    <TableCell>
                      <Input
                        value={it.name}
                        onChange={(e) => updateItem(i, 'name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={it.quantity}
                        onChange={(e) => updateItem(i, 'quantity', e.target.value)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={it.unit_price}
                        onChange={(e) => updateItem(i, 'unit_price', e.target.value)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-emerald-500">R$ {it.subtotal}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(i)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center bg-muted/20 p-4 rounded-xl border border-border/50">
            <div className="space-y-1 w-[200px]">
              <Label>Meio de Pagamento</Label>
              <Select value={payment} onValueChange={setPayment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pix">Pix</SelectItem>
                  <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="Cartão">Cartão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                Total Final
              </p>
              <p className="text-3xl font-bold text-primary">R$ {subtotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSubmit} disabled={loading} size="lg">
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Finalizar Venda
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
