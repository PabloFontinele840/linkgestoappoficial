import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getSales, deleteSale } from '@/services/sales'
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
import { Button } from '@/components/ui/button'
import { Trash2, Loader2, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

export function SalesList({ onSelect }: { onSelect: (id: string) => void }) {
  const { user } = useAuth()
  const [sales, setSales] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSales = async () => {
    if (!user) return
    try {
      const data = await getSales(user.id)
      setSales(data)
    } catch {
      toast.error('Erro ao carregar vendas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSales()
  }, [user])

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir esta venda?')) return
    try {
      await deleteSale(id)
      toast.success('Venda excluída')
      fetchSales()
    } catch {
      toast.error('Erro ao excluir venda')
    }
  }

  if (loading)
    return (
      <div className="p-10 flex justify-center">
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
                <TableHead>Cliente</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma venda registrada.
                  </TableCell>
                </TableRow>
              ) : (
                sales.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(s.sale_date), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="font-medium">{s.client_name}</TableCell>
                    <TableCell>
                      {s.sale_items?.reduce((a: any, b: any) => a + b.quantity, 0) || 0} itens
                    </TableCell>
                    <TableCell className="text-emerald-500 font-medium">
                      R$ {s.final_amount}
                    </TableCell>
                    <TableCell>{s.payment_method}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          s.status === 'Concluída' ? 'text-emerald-500 border-emerald-500' : ''
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => onSelect(s.id)}>
                        <Eye className="size-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(s.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
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
