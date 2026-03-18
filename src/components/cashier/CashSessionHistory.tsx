import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getSessionHistory } from '@/services/cashier'
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

export function CashSessionHistory() {
  const { user } = useAuth()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      getSessionHistory(user.id).then((res) => {
        setData(res)
        setLoading(false)
      })
    }
  }, [user])

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0)

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
                <TableHead>Data de Abertura</TableHead>
                <TableHead>Fechamento</TableHead>
                <TableHead>Entradas</TableHead>
                <TableHead>Saídas</TableHead>
                <TableHead className="text-right">Saldo Final</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma sessão encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">
                      {format(new Date(s.opened_at), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.closed_at ? format(new Date(s.closed_at), 'dd/MM/yyyy HH:mm') : '-'}
                    </TableCell>
                    <TableCell className="text-emerald-500">{fmt(s.total_entries)}</TableCell>
                    <TableCell className="text-red-500">{fmt(s.total_exits)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {fmt(s.closing_balance)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={
                          s.status === 'aberto'
                            ? 'text-primary border-primary/50'
                            : 'text-muted-foreground'
                        }
                      >
                        {s.status}
                      </Badge>
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
