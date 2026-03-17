import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function ExportsTab({ data }: { data: any }) {
  const exportCSV = (filename: string, rows: any[]) => {
    if (!rows || rows.length === 0) return alert('Sem dados para exportar.')
    const keys = Object.keys(rows[0]).filter((k) => typeof rows[0][k] !== 'object')
    const csv = [
      keys.join(','),
      ...rows.map((row) =>
        keys.map((k) => `"${String(row[k] || '').replace(/"/g, '""')}"`).join(','),
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Financeiro</CardTitle>
          <CardDescription>Transações e fluxo de caixa.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => exportCSV('relatorio_financeiro', data.transactions)}
            className="w-full"
          >
            <Download className="mr-2 size-4" /> CSV / Excel
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Ordens de Serviço</CardTitle>
          <CardDescription>Histórico de OS do período.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => exportCSV('relatorio_os', data.orders)} className="w-full">
            <Download className="mr-2 size-4" /> CSV / Excel
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Vendas (PDV)</CardTitle>
          <CardDescription>Histórico de vendas diretas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => exportCSV('relatorio_vendas', data.sales)} className="w-full">
            <Download className="mr-2 size-4" /> CSV / Excel
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Geral Completo PDF</CardTitle>
          <CardDescription>Imprimir visão geral em PDF.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => window.print()} className="w-full">
            <Download className="mr-2 size-4" /> Imprimir / Salvar PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
