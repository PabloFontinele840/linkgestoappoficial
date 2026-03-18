import { useEffect, useState } from 'react'
import { getOrderById, updateOrderStatus, deleteOrder } from '@/services/orders'
import { useAuth } from '@/hooks/use-auth'
import { OrderTimeline } from './OrderTimeline'
import { EditOrderModal } from './EditOrderModal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import {
  Loader2,
  ArrowLeft,
  Calendar,
  User,
  Smartphone,
  ShieldCheck,
  Trash2,
  Wallet,
  Edit3,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

export function OrderDetails({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const { user } = useAuth()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(orderId)
      setOrder(data)
    } catch (error) {
      toast.error('Erro ao carregar OS')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true)
    try {
      await updateOrderStatus(
        order.id,
        newStatus,
        order.payment_status,
        order.payment_method,
        order.value,
        user!.id,
      )
      toast.success('Status da OS atualizado')
      fetchOrder()
    } catch (e: any) {
      toast.error(e.message || 'Erro ao atualizar status')
    } finally {
      setUpdating(false)
    }
  }

  const handlePaymentChange = async (newPayStatus: string) => {
    setUpdating(true)
    try {
      await updateOrderStatus(
        order.id,
        order.status,
        newPayStatus,
        order.payment_method,
        order.value,
        user!.id,
      )
      toast.success('Pagamento atualizado')
      fetchOrder()
    } catch (e: any) {
      toast.error(e.message || 'Erro ao atualizar pagamento')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteOrder(orderId)
      toast.success('OS excluída.')
      onClose()
    } catch (e: any) {
      toast.error('Erro ao excluir: ' + e.message)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )
  if (!order) return null

  const isFinished = ['Finalizada', 'Entregue'].includes(order.status)
  const warrantyActive =
    order.warranty_expiry_date && new Date() < new Date(order.warranty_expiry_date)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
            <ArrowLeft className="mr-2 size-4" /> Voltar
          </Button>
          <Button variant="outline" onClick={() => setEditModalOpen(true)}>
            <Edit3 className="size-4 mr-2" /> Editar OS
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10 border-destructive/20"
              >
                <Trash2 className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir OS?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação removerá todos os dados desta Ordem de Serviço permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex items-center gap-4 bg-card p-2 rounded-xl border border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground pl-2">Status:</span>
            <Select value={order.status} onValueChange={handleStatusChange} disabled={updating}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Aberta',
                  'Em análise',
                  'Aguardando aprovação',
                  'Aguardando peça',
                  'Em andamento',
                  'Finalizada',
                  'Entregue',
                  'Cancelada',
                ].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pr-2 border-l border-border/50 pl-4">
            <span className="text-sm text-muted-foreground">Pagamento:</span>
            <Select
              value={order.payment_status || 'Pendente'}
              onValueChange={handlePaymentChange}
              disabled={updating}
            >
              <SelectTrigger
                className={cn(
                  'w-[130px]',
                  order.payment_status === 'Pago'
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50'
                    : '',
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
        <div className="bg-muted/20 px-6 py-8 border-b border-border/50 overflow-x-auto">
          <OrderTimeline currentStatus={order.status} />
        </div>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium border-b border-border/50 pb-2">
              <User className="size-4" /> Cliente
            </div>
            <div>
              <p className="font-semibold text-lg">{order.customers?.name}</p>
              <p className="text-muted-foreground">{order.customers?.phone || 'Sem telefone'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium border-b border-border/50 pb-2">
              <Smartphone className="size-4" /> Aparelho
            </div>
            <div>
              <p className="font-semibold text-lg">
                {order.device_brand} {order.device_model}
              </p>
              <p className="text-muted-foreground text-sm">
                Cor: {order.device_color || 'N/I'} | IMEI: {order.device_serial || 'N/A'}
              </p>
            </div>
            <p className="text-sm bg-muted/30 p-2 rounded-md border border-border/50">
              {order.reported_problem || 'Não relatado'}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium border-b border-border/50 pb-2">
              <Calendar className="size-4" /> Detalhes Gerais
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Abertura</p>
                <p className="font-medium">{format(new Date(order.created_at), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Forma Pgto</p>
                <p className="font-medium">{order.payment_method || '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground text-xs">Valor Total (OS)</p>
                <p className="font-bold text-lg text-emerald-500">R$ {order.value}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {order.os_items?.length > 0 && (
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-2 bg-muted/10 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="size-5 text-primary" /> Itens e Serviços
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6">Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">V. Unitário</TableHead>
                  <TableHead className="text-right pr-6">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.os_items.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="pl-6">
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      R$ {item.price}
                    </TableCell>
                    <TableCell className="text-right pr-6 font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-6 bg-muted/10 border-t border-border/50 flex justify-end">
              <div className="text-right">
                <p className="text-sm text-muted-foreground font-semibold">Total a receber</p>
                <p className="text-3xl font-bold text-primary">R$ {order.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {editModalOpen && (
        <EditOrderModal
          order={order}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onUpdated={() => {
            setEditModalOpen(false)
            fetchOrder()
          }}
        />
      )}
    </div>
  )
}
