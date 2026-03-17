import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SalesTab({ data }: { data: any }) {
  const itemsSold = data.sales.reduce((acc: any[], s: any) => [...acc, ...(s.sale_items || [])], [])

  const productMap = itemsSold
    .filter((i) => i.type === 'Produto')
    .reduce((acc: any, i: any) => {
      acc[i.name] = (acc[i.name] || 0) + i.quantity
      return acc
    }, {})

  const topProducts = Object.entries(productMap)
    .map(([k, v]) => ({ name: k, q: v as number }))
    .sort((a, b) => b.q - a.q)
    .slice(0, 5)

  const totalItems = itemsSold.reduce((acc: number, i: any) => acc + i.quantity, 0)
  const totalSalesValue = data.sales.reduce((a: any, b: any) => a + Number(b.final_amount), 0)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Vendido (R$)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">
              R$ {totalSalesValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Qtd. Itens Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{totalItems} itens</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle>Produtos Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((p: any, i) => (
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
            {topProducts.length === 0 && (
              <p className="text-muted-foreground text-sm">Sem produtos vendidos.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
