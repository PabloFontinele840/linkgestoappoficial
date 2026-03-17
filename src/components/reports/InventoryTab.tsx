import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function InventoryTab({ data }: { data: any }) {
  const lowStock = data.products.filter((p: any) => p.stock_quantity <= p.min_stock_level)
  const zeroStock = data.products.filter((p: any) => p.stock_quantity === 0)

  const movedMap = data.movements.reduce((acc: any, m: any) => {
    const name = m.inventory_items?.name || 'Item Removido'
    acc[name] = (acc[name] || 0) + m.quantity
    return acc
  }, {})

  const topMoved = Object.entries(movedMap)
    .map(([k, v]) => ({ name: k, q: v as number }))
    .sort((a, b) => b.q - a.q)
    .slice(0, 5)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Itens em Alerta de Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{lowStock.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Itens Esgotados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{zeroStock.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle>Itens Mais Movimentados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMoved.map((p: any, i) => (
              <div
                key={p.name}
                className="flex justify-between items-center border-b border-border/50 pb-2"
              >
                <span className="font-medium text-muted-foreground">
                  {i + 1}. {p.name}
                </span>
                <span className="font-bold">{p.q} un</span>
              </div>
            ))}
            {topMoved.length === 0 && (
              <p className="text-muted-foreground text-sm">Sem movimentações no período.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
