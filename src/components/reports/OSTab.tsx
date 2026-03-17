import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function OSTab({ data }: { data: any }) {
  const statusMap = data.orders.reduce((acc: any, o: any) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  const serviceMap = data.orders.reduce((acc: any, o: any) => {
    const s = o.services?.name || 'Serviço Personalizado'
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  const topServices = Object.entries(serviceMap)
    .map(([k, v]) => ({ name: k, count: v }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle>Ordens por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(statusMap).map(([k, v]: any) => (
              <div
                key={k}
                className="flex justify-between items-center border-b border-border/50 pb-2"
              >
                <span className="font-medium text-muted-foreground">{k}</span>
                <span className="font-bold">{v} OS</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle>Top Serviços Executados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topServices.map((s: any, i) => (
              <div
                key={s.name}
                className="flex justify-between items-center border-b border-border/50 pb-2"
              >
                <span className="font-medium text-muted-foreground">
                  {i + 1}. {s.name}
                </span>
                <span className="font-bold text-primary">{s.count} vezes</span>
              </div>
            ))}
            {topServices.length === 0 && (
              <p className="text-muted-foreground text-sm">Sem dados suficientes.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
