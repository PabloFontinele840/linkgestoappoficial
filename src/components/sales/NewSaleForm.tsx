import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createSale } from '@/services/sales'
import { createTransaction } from '@/services/finance'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import { Trash2, Plus, Loader2, Receipt } from 'lucide-react'
import { toast } from 'sonner'

export function NewSaleForm({ onCreated }: { onCreated: () => void }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [clientName, setClientName] = useState('Cliente Balcão')
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('Pix')
  const [status, setStatus] = useState('Concluída')
  const [items, setItems] = useState<any[]>([])

  const addItem = () =>
    setItems([
      ...items,
      { id: Date.now(), name: '', type: 'Produto', quantity: 1, unit_price: 0, subtotal: 0 },
    ])

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index][field] = value
    if (field === 'quantity' || field === 'unit_price') {
      newItems[index].subtotal =
        Number(newItems[index].quantity) * Number(newItems[index].unit_price)
    }
    setItems(newItems)
  }

  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))

  const subtotal = items.reduce((acc, i) => acc + i.subtotal, 0)
  const finalAmount = subtotal - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (items.length === 0) return toast.error('Adicione ao menos um item à venda.')

    setLoading(true)
    try {
      const payload = {
        client_name: clientName,
        total_amount: subtotal,
        discount,
        final_amount: finalAmount,
        payment_method: paymentMethod,
        status,
        sale_date: new Date().toISOString().split('T')[0],
      }

      const sale = await createSale(payload, items, user.id)

      if (status === 'Concluída') {
        await createTransaction(
          {
            type: 'entrada',
            description: `Venda #${sale.id.split('-')[0]} - ${clientName}`,
            category: 'Venda',
            amount: finalAmount,
            payment_method: paymentMethod,
            transaction_date: payload.sale_date,
            status: 'recebido',
            classification: 'Variável',
          },
          user.id,
        )
      }

      toast.success('Venda finalizada com sucesso!')
      onCreated()
    } catch {
      toast.error('Erro ao finalizar venda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_350px]">
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Itens da Venda</CardTitle>
          <CardDescription>Adicione os produtos ou serviços.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do Cliente</Label>
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)} required />
          </div>

          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Qtd.</TableHead>
                <TableHead>Preço Un.</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.name}
                      onChange={(e) => updateItem(i, 'name', e.target.value)}
                      required
                      placeholder="Ex: Capinha"
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={item.type} onValueChange={(v) => updateItem(i, 'type', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Produto">Produto</SelectItem>
                        <SelectItem value="Serviço">Serviço</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(i, 'quantity', e.target.value)}
                      required
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unit_price}
                      onChange={(e) => updateItem(i, 'unit_price', e.target.value)}
                      required
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-emerald-500">
                    R$ {item.subtotal.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(i)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            type="button"
            variant="outline"
            onClick={addItem}
            className="w-full border-dashed"
          >
            <Plus className="size-4 mr-2" /> Adicionar Item
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm sticky top-24 h-fit">
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <Label>Desconto (R$)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border/50 text-lg font-bold text-emerald-500">
            <span>Total</span>
            <span>R$ {finalAmount.toFixed(2)}</span>
          </div>
          <div className="space-y-2 pt-4">
            <Label>Forma de Pagamento</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pix">Pix</SelectItem>
                <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                <SelectItem value="Transferência">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 pb-4">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Concluída">Concluída</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Receipt className="mr-2 size-4" />
            )}{' '}
            Finalizar Venda
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
