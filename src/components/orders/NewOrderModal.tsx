import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createOrder } from '@/services/orders'
import { getSuppliers } from '@/services/suppliers'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CustomerSelector } from './CustomerSelector'
import { ServiceAutocomplete } from './ServiceAutocomplete'
import { Trash2, Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'

type OSItem = {
  id: string
  type: string
  description: string
  supplier_id: string | null
  newSupplierName: string
  cost: number
  price: number
  quantity: number
}

export function NewOrderModal({ open, onOpenChange, onCreated }: any) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState<any[]>([])

  // Section 1: Cliente
  const [isNewCustomer, setIsNewCustomer] = useState(false)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [newCustomerName, setNewCustomerName] = useState('')

  // Section 2: Aparelho
  const [device, setDevice] = useState({ brand: '', model: '', color: '', serial: '', problem: '' })

  // Section 3: Itens
  const [items, setItems] = useState<OSItem[]>([])
  const [tempItem, setTempItem] = useState({
    type: 'Peça',
    description: '',
    supplier_id: '',
    newSupplierName: '',
    cost: '',
    price: '',
    quantity: '1',
  })

  // Section 5: Finalização
  const [status, setStatus] = useState('Aberta')
  const [paymentStatus, setPaymentStatus] = useState('Pendente')
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro')

  useEffect(() => {
    if (user && open) {
      getSuppliers(user.id).then(setSuppliers)
    }
  }, [user, open])

  const handleAddItem = () => {
    if (!tempItem.description) return toast.error('Informe a descrição do item')

    setItems([
      ...items,
      {
        id: Date.now().toString(),
        type: tempItem.type,
        description: tempItem.description,
        supplier_id:
          tempItem.supplier_id === 'NEW' || !tempItem.supplier_id ? null : tempItem.supplier_id,
        newSupplierName: tempItem.supplier_id === 'NEW' ? tempItem.newSupplierName : '',
        cost: parseFloat(tempItem.cost) || 0,
        price: parseFloat(tempItem.price) || 0,
        quantity: parseInt(tempItem.quantity) || 1,
      },
    ])
    setTempItem({
      type: 'Peça',
      description: '',
      supplier_id: '',
      newSupplierName: '',
      cost: '',
      price: '',
      quantity: '1',
    })
  }

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id))

  const totalCost = items.reduce((acc, i) => acc + i.cost * i.quantity, 0)
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const profit = totalPrice - totalCost

  const handleSave = async () => {
    if (!user) return
    if (!customerId && !newCustomerName) return toast.error('Selecione ou crie um cliente')
    if (items.length === 0) return toast.error('Adicione pelo menos um item à OS')

    setLoading(true)
    try {
      const payload = {
        customer_id: customerId,
        new_customer_name: isNewCustomer ? newCustomerName : null,
        device_brand: device.brand,
        device_model: device.model,
        device_color: device.color,
        device_serial: device.serial,
        reported_problem: device.problem,
        status,
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        value: totalPrice,
        estimated_value: totalPrice,
      }

      await createOrder(payload, items, user.id)
      toast.success('Ordem de serviço criada com sucesso!')
      onCreated()
    } catch (err: any) {
      toast.error('Erro ao criar OS')
    } finally {
      setLoading(false)
    }
  }

  const isSaveDisabled =
    loading || items.length === 0 || (!customerId && !newCustomerName && !isNewCustomer)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden bg-card border-border">
        <DialogHeader className="px-6 py-4 border-b border-border/50 shrink-0">
          <DialogTitle className="text-xl">Nova Ordem de Serviço</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Section 1: Cliente */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary flex items-center gap-2">
              1. Cliente
            </h3>
            <div className="flex items-end gap-4 max-w-2xl">
              <div className="flex-1 space-y-1">
                {isNewCustomer ? (
                  <Input
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    placeholder="Nome completo do novo cliente"
                  />
                ) : (
                  <CustomerSelector onSelect={(id) => setCustomerId(id)} />
                )}
              </div>
              <Button variant="outline" onClick={() => setIsNewCustomer(!isNewCustomer)}>
                {isNewCustomer ? 'Selecionar Existente' : 'Criar Novo'}
              </Button>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Section 2: Aparelho */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">2. Aparelho</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder="Marca (ex: Apple)"
                value={device.brand}
                onChange={(e) => setDevice({ ...device, brand: e.target.value })}
              />
              <Input
                placeholder="Modelo (ex: iPhone 13)"
                value={device.model}
                onChange={(e) => setDevice({ ...device, model: e.target.value })}
              />
              <Input
                placeholder="Cor"
                value={device.color}
                onChange={(e) => setDevice({ ...device, color: e.target.value })}
              />
              <Input
                placeholder="Serial / IMEI"
                value={device.serial}
                onChange={(e) => setDevice({ ...device, serial: e.target.value })}
              />
            </div>
            <Textarea
              placeholder="Defeito relatado pelo cliente..."
              className="min-h-[80px]"
              value={device.problem}
              onChange={(e) => setDevice({ ...device, problem: e.target.value })}
            />
          </div>

          <Separator className="bg-border/50" />

          {/* Section 3: Itens */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">
              3. Itens da OS (Peças e Serviços)
            </h3>

            <div className="bg-muted/20 p-4 rounded-xl border border-border/50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="md:col-span-1">
                  <Select
                    value={tempItem.type}
                    onValueChange={(v) => setTempItem({ ...tempItem, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Peça">Peça</SelectItem>
                      <SelectItem value="Serviço">Serviço</SelectItem>
                      <SelectItem value="Mão de obra">Mão de obra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <ServiceAutocomplete
                    value={tempItem.description}
                    onChange={(val) => setTempItem({ ...tempItem, description: val })}
                    onSelectService={(s) => {
                      setTempItem({
                        ...tempItem,
                        description: s.name,
                        cost: s.cost.toString(),
                        price: s.final_price.toString(),
                      })
                    }}
                  />
                </div>
                <div className="md:col-span-1">
                  {tempItem.type === 'Peça' ? (
                    tempItem.supplier_id === 'NEW' ? (
                      <Input
                        placeholder="Nome fornec."
                        value={tempItem.newSupplierName}
                        onChange={(e) =>
                          setTempItem({ ...tempItem, newSupplierName: e.target.value })
                        }
                      />
                    ) : (
                      <Select
                        value={tempItem.supplier_id}
                        onValueChange={(v) => setTempItem({ ...tempItem, supplier_id: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Fornecedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW" className="text-primary font-medium">
                            + Novo
                          </SelectItem>
                          {suppliers.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  ) : (
                    <Input disabled placeholder="N/A" />
                  )}
                </div>
                <div className="md:col-span-1">
                  <Input
                    type="number"
                    placeholder="Custo"
                    value={tempItem.cost}
                    onChange={(e) => setTempItem({ ...tempItem, cost: e.target.value })}
                  />
                </div>
                <div className="md:col-span-1">
                  <Input
                    type="number"
                    placeholder="Venda"
                    value={tempItem.price}
                    onChange={(e) => setTempItem({ ...tempItem, price: e.target.value })}
                  />
                </div>
                <div className="md:col-span-1 flex gap-2">
                  <Input
                    type="number"
                    placeholder="Qtd"
                    value={tempItem.quantity}
                    onChange={(e) => setTempItem({ ...tempItem, quantity: e.target.value })}
                  />
                  <Button size="icon" onClick={handleAddItem}>
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
              {tempItem.supplier_id === 'NEW' && (
                <p className="text-xs text-muted-foreground ml-[40%]">
                  Deixe vazio se não quiser vincular fornecedor.
                </p>
              )}
            </div>

            {items.length > 0 && (
              <div className="border border-border/50 rounded-xl overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Custo</TableHead>
                      <TableHead>Venda</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <span className="text-xs px-2 py-1 bg-muted rounded-md">{item.type}</span>
                        </TableCell>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {item.newSupplierName ||
                            suppliers.find((s) => s.id === item.supplier_id)?.name ||
                            '-'}
                        </TableCell>
                        <TableCell className="text-red-400">R$ {item.cost}</TableCell>
                        <TableCell className="text-emerald-400">R$ {item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="font-medium">
                          R$ {item.price * item.quantity}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <Separator className="bg-border/50" />

          {/* Section 5: Finalização */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">4. Finalização e Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label>Status da OS</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aberta">Aberta</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Finalizada">Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
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
              <div className="space-y-1">
                <Label>Forma de Pagamento</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pix">Pix</SelectItem>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="Cartão">Cartão</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Resumo Financeiro (Footer) */}
        <div className="bg-card border-t border-border/50 p-4 shrink-0 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.2)] z-10">
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Custo Total
              </p>
              <p className="text-xl font-bold text-red-400">R$ {totalCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Valor Total (Venda)
              </p>
              <p className="text-xl font-bold text-emerald-400">R$ {totalPrice.toFixed(2)}</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Lucro Estimado
              </p>
              <p className="text-xl font-bold text-primary">R$ {profit.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaveDisabled}
              className="bg-primary hover:bg-primary/90 text-white min-w-[120px]"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : 'Salvar OS'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
