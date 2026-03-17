import { useEffect, useState } from 'react'
import { getOrderById, updateOrderStatus, deleteOrder } from '@/services/orders'
import { OrderTimeline } from './OrderTimeline'
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
import { Loader2, ArrowLeft, Calendar, User, Smartphone, ShieldCheck, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

export function OrderDetails({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

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
      await updateOrderStatus(order.id, newStatus, order.value || order.estimated_value)
      toast.success('Status atualizado')
      fetchOrder()
    } catch (e) {
      toast.error('Erro ao atualizar status')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteOrder(orderId)
      toast.success('Ordem de serviço excluída.')
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 size-4" /> Voltar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
              >
                <Trash2 className="size-4 mr-2" /> Excluir OS
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação é irreversível e removerá todos os dados desta Ordem de Serviço.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Status Atual:</span>
          <Select value={order.status} onValueChange={handleStatusChange} disabled={updating}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aberta">Aberta</SelectItem>
              <SelectItem value="Em análise">Em análise</SelectItem>
              <SelectItem value="Aguardando aprovação">Aguardando aprovação</SelectItem>
              <SelectItem value="Aguardando peça">Aguardando peça</SelectItem>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Finalizada">Finalizada</SelectItem>
              <SelectItem value="Entregue">Entregue</SelectItem>
              <SelectItem value="Cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm overflow-hidden">
        <div className="bg-muted/20 px-6 py-8 border-b border-border/50 mb-4 overflow-x-auto">
          <OrderTimeline currentStatus={order.status} />
        </div>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium border-b border-border/50 pb-2">
              <User className="size-4" /> Cliente
            </div>
            <div>
              <p className="font-semibold text-lg">{order.customers?.name}</p>
              <p className="text-muted-foreground">{order.customers?.phone || 'Sem telefone'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Acessórios Deixados
              </p>
              <div className="flex flex-wrap gap-1">
                {order.accessories_delivered?.length > 0 ? (
                  order.accessories_delivered.map((a: string) => (
                    <Badge key={a} variant="secondary" className="text-[10px]">
                      {a}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Nenhum</span>
                )}
              </div>
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
                Cor: {order.device_color} | IMEI: {order.device_serial || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Condição Física
              </p>
              <div className="flex flex-wrap gap-1">
                {order.device_condition?.length > 0 ? (
                  order.device_condition.map((c: string) => (
                    <Badge
                      key={c}
                      variant="outline"
                      className="text-[10px] border-orange-500/20 text-orange-500"
                    >
                      {c}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Bom estado</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium border-b border-border/50 pb-2">
              <Calendar className="size-4" /> Detalhes
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Abertura</p>
                <p className="font-medium">{format(new Date(order.created_at), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Técnico</p>
                <p className="font-medium">{order.technician_name || 'Não atribuído'}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Valor Estimado</p>
                <p className="font-medium text-emerald-500">R$ {order.estimated_value}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Valor Final</p>
                <p className="font-medium text-emerald-500">R$ {order.value}</p>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Problema Relatado
              </p>
              <p className="text-sm bg-muted/30 p-2 rounded-md border border-border/50">
                {order.reported_problem}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isFinished && order.warranty_days > 0 && (
        <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-emerald-500">
              <ShieldCheck className="size-5" /> Informações de Garantia
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Período Concedido</p>
              <p className="font-bold text-lg">{order.warranty_days} dias</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Encerramento</p>
              <p className="font-medium">
                {order.finished_at ? format(new Date(order.finished_at), 'dd/MM/yyyy') : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vencimento</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {order.warranty_expiry_date
                    ? format(new Date(order.warranty_expiry_date), 'dd/MM/yyyy')
                    : '-'}
                </p>
                {warrantyActive ? (
                  <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 border-none">
                    Ativa
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="bg-red-500/20 text-red-500 hover:bg-red-500/20 border-none"
                  >
                    Vencida
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
