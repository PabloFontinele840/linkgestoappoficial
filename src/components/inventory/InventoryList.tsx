import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getInventoryItems } from '@/services/inventory'
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
import { cn } from '@/lib/utils'

export function InventoryList({ onSelect }: { onSelect: (id: string) => void }) {
  const { user } = useAuth()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (user) {
      getInventoryItems(user.id).then((res) => {
        setData(res)
        setLoading(false)
      })
    }
  }, [user])

  const filtered = data.filter(
    (i) =>
      (i.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.sku || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.category || '').toLowerCase().includes(search.toLowerCase()),
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
              placeholder="Buscar por nome, categoria ou SKU..."
              className="pl-9 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Marca/Modelo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum item encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((item) => {
                  const isLow = item.quantity <= item.minimum_stock
                  const isOut = item.quantity === 0
                  return (
                    <TableRow
                      key={item.id}
                      className={cn(
                        'cursor-pointer hover:bg-muted/30 transition-colors',
                        isLow && 'bg-red-500/5',
                      )}
                      onClick={() => onSelect(item.id)}
                    >
                      <TableCell className="text-xs text-muted-foreground">
                        {item.sku || '-'}
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.device_brand} {item.device_model}
                      </TableCell>
                      <TableCell className={cn('font-medium', isLow && 'text-red-500')}>
                        {item.quantity}
                      </TableCell>
                      <TableCell>
                        {isOut ? (
                          <Badge variant="destructive">Sem Estoque</Badge>
                        ) : isLow ? (
                          <Badge variant="outline" className="border-orange-500 text-orange-500">
                            Baixo
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-emerald-500/30 text-emerald-500"
                          >
                            Normal
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
