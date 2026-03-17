import { useEffect, useState } from 'react'
import { getSaleById } from '@/services/sales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft, Receipt } from 'lucide-react'
import { format } from 'date-fns'

export function SaleDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const [sale, setSale] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSaleById(id).then((data) => {
      setSale(data)
      setLoading(false)
    })
  }, [id])

  if (loading)
    return (
      <div className="p-10 flex justify-center">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )
  if (!sale) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="mr-2 size-4" /> Voltar para Histórico
        </Button>
        <Badge
          variant="outline"
          className={sale.status === 'Concluída' ? 'border-emerald-500 text-emerald-500' : ''}
        >
          {sale.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="size-5" /> Informações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Data da Venda</p>
                <p className="font-medium">{format(new Date(sale.sale_date), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="font-medium">{sale.client_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pagamento</p>
                <p className="font-medium">{sale.payment_method}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID da Venda</p>
                <p className="font-medium text-xs uppercase">{sale.id.split('-')[0]}</p>
              </div>
            </div>
            {sale.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Observações</p>
                <p className="text-sm">{sale.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R$ {sale.total_amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Desconto</span>
              <span className="text-red-400">- R$ {sale.discount}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border/50 text-lg font-bold text-emerald-500">
              <span>Total Final</span>
              <span>R$ {sale.final_amount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Itens Vendidos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Preço Un.</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sale.sale_items?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    R$ {item.unit_price}
                  </TableCell>
                  <TableCell className="text-right text-emerald-500 font-medium">
                    R$ {item.subtotal}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
