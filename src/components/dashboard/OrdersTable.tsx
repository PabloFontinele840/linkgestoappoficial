import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Pendente':
      return (
        <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
          Pendente
        </Badge>
      )
    case 'Em Andamento':
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          Em Andamento
        </Badge>
      )
    case 'Finalizado':
      return (
        <Badge
          variant="outline"
          className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
        >
          Finalizado
        </Badge>
      )
    case 'Cancelado':
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
          Cancelado
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function OrdersTable({ orders }: { orders: any[] }) {
  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Últimas Ordens de Serviço</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nenhuma ordem encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <TableCell className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      {order.id.split('-')[0]}
                    </TableCell>
                    <TableCell className="font-medium">{order.customers?.name || 'N/A'}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.services?.name || 'N/A'}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(order.value)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">
                      {format(new Date(order.created_at), 'dd MMM, HH:mm', { locale: ptBR })}
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
