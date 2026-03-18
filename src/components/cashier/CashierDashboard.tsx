import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import {
  getCashMovements,
  getStartingBalance,
  createCashMovement,
  deleteCashMovement,
} from '@/services/cashier'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Plus,
  Loader2,
  Trash2,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function CashierDashboard() {
  const { user } = useAuth()
  const todayStr = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(todayStr)
  const [movements, setMovements] = useState<any[]>([])
  const [startBalance, setStartBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    if (!user) return
    setLoading(true)
    try {
      const [movs, sBalance] = await Promise.all([
        getCashMovements(user.id, date),
        getStartingBalance(user.id, date),
      ])
      setMovements(movs)
      setStartBalance(sBalance)
    } catch (e) {
      toast.error('Erro ao carregar movimentações do caixa')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user, date])

  const handleManualSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    payload.amount = parseFloat(payload.amount as string) || 0
    payload.origin = 'manual'

    try {
      await createCashMovement(payload, user.id)
      toast.success('Lançamento realizado com sucesso!')
      setFormOpen(false)
      fetchData()
    } catch (e) {
      toast.error('Erro ao salvar lançamento')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir esta movimentação?')) return
    try {
      await deleteCashMovement(id)
      toast.success('Movimentação excluída')
      fetchData()
    } catch (e) {
      toast.error('Erro ao excluir')
    }
  }

  const entries = movements
    .filter((m) => m.type === 'entrada')
    .reduce((a, b) => a + Number(b.amount), 0)
  const exits = movements
    .filter((m) => m.type === 'saida')
    .reduce((a, b) => a + Number(b.amount), 0)
  const currentBalance = startBalance + entries - exits

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card/40 p-4 rounded-xl border border-border/50">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40 bg-background"
          />
          <Button variant="outline" onClick={() => setDate(todayStr)}>
            Hoje
          </Button>
        </div>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="size-4 mr-2" /> Novo Lançamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lançamento Manual de Caixa</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleManualSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select name="type" defaultValue="entrada">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input name="amount" type="number" step="0.01" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input name="description" required placeholder="Ex: Suprimentos, Ajuste..." />
              </div>
              <div className="space-y-2">
                <Label>Forma de Pagamento</Label>
                <Select name="payment_method" defaultValue="Dinheiro">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="Pix">Pix</SelectItem>
                    <SelectItem value="Cartão">Cartão</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="size-4 mr-2 animate-spin" />} Lançar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saldo Inicial
                </CardTitle>
                <Wallet className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fmt(startBalance)}</div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Entradas do Dia
                </CardTitle>
                <TrendingUp className="size-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-500">{fmt(entries)}</div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saídas do Dia
                </CardTitle>
                <TrendingDown className="size-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{fmt(exits)}</div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-primary">Saldo Atual</CardTitle>
                <ArrowRightLeft className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{fmt(currentBalance)}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                Movimentações ({format(new Date(`${date}T00:00:00`), 'dd/MM/yyyy')})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Forma</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhuma movimentação neste dia.
                      </TableCell>
                    </TableRow>
                  ) : (
                    movements.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="text-muted-foreground text-sm">
                          {format(new Date(m.created_at), 'HH:mm')}
                        </TableCell>
                        <TableCell className="font-medium">{m.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{m.payment_method || '-'}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="uppercase text-[10px] tracking-wider"
                          >
                            {m.origin}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={cn(
                            'text-right font-medium',
                            m.type === 'entrada' ? 'text-emerald-500' : 'text-red-500',
                          )}
                        >
                          {m.type === 'entrada' ? '+' : '-'} {fmt(m.amount)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(m.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
