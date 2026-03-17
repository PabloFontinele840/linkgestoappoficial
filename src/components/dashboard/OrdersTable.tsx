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
import { MOCK_ORDERS } from '@/lib/constants'

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Em Aberto':
      return (
        <Badge
          variant="outline"
          className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20"
        >
          Em Aberto
        </Badge>
      )
    case 'Em Análise':
      return (
        <Badge
          variant="outline"
          className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20"
        >
          Em Análise
        </Badge>
      )
    case 'Finalizado':
      return (
        <Badge
          variant="outline"
          className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
        >
          Finalizado
        </Badge>
      )
    case 'Cancelado':
      return (
        <Badge
          variant="outline"
          className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
        >
          Cancelado
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function OrdersTable() {
  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Ordens Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="w-[100px]">OS</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ORDERS.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <TableCell className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium">{order.client}</TableCell>
                  <TableCell className="text-muted-foreground">{order.service}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.value}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
