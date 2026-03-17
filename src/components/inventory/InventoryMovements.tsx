import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getInventoryMovements } from '@/services/inventory'
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
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'

export function InventoryMovements() {
  const { user } = useAuth()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      getInventoryMovements(user.id).then((res) => {
        setData(res)
        setLoading(false)
      })
    }
  }, [user])

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Motivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhuma movimentação.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="text-xs text-muted-foreground">
                      {format(new Date(m.created_at), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="font-medium">{m.inventory_items?.name}</TableCell>
                    <TableCell>
                      {m.type === 'Entrada' && (
                        <Badge className="bg-emerald-500/20 text-emerald-500 border-none">
                          Entrada
                        </Badge>
                      )}
                      {m.type === 'Saída' && (
                        <Badge className="bg-red-500/20 text-red-500 border-none">Saída</Badge>
                      )}
                      {m.type === 'Ajuste' && (
                        <Badge className="bg-blue-500/20 text-blue-500 border-none">Ajuste</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-bold">{m.quantity}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{m.reason}</TableCell>
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
