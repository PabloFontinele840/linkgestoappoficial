import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getOrders } from '@/services/orders'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function OrdersList({ onSelectOrder }: { onSelectOrder: (id: string) => void }) {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (user) {
      getOrders(user.id).then((data) => {
        setOrders(data)
        setLoading(false)
      })
    }
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'Em análise':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'Aguardando aprovação':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'Aguardando peça':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'Em andamento':
        return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
      case 'Finalizada':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      case 'Entregue':
        return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
      case 'Cancelada':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getWarrantyBadge = (order: any) => {
    if (!order.warranty_days || order.warranty_days === 0) {
      return (
        <Badge variant="outline" className="text-xs text-muted-foreground">
          Sem garantia
        </Badge>
      )
    }
    if (!order.warranty_expiry_date) return null
    const isExpired = new Date() > new Date(order.warranty_expiry_date)
    return isExpired ? (
      <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500 border-red-500/20">
        Vencida
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      >
        Em garantia
      </Badge>
    )
  }

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.customers?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.device_model || '').toLowerCase().includes(search.toLowerCase()),
  )

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm">
      <CardContent className="p-0">
        <div className="p-4 border-b border-border/50 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, modelo ou ID..."
              className="pl-9 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/50">
                <TableHead className="w-[100px]">OS</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Aparelho</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Garantia</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma OS encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-border/50 hover:bg-muted/30 cursor-pointer"
                    onClick={() => onSelectOrder(order.id)}
                  >
                    <TableCell className="font-medium text-muted-foreground">
                      {order.id.split('-')[0]}
                    </TableCell>
                    <TableCell className="font-medium truncate max-w-[150px]">
                      {order.customers?.name || 'N/A'}
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      {order.device_brand} {order.device_model}
                      <span className="block text-xs text-muted-foreground truncate">
                        {order.reported_problem}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(order.value || order.estimated_value || 0)}
                    </TableCell>
                    <TableCell>{getWarrantyBadge(order)}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">
                      {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
