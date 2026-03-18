import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import {
  getOpenSession,
  getCashMovements,
  createCashMovement,
  openSession,
  closeSession,
  deleteCashMovement,
} from '@/services/cashier'
import { OpenSessionModal } from './OpenSessionModal'
import { CloseSessionModal } from './CloseSessionModal'
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
  LockKeyhole,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function CashierDashboard() {
  const { user } = useAuth()
  const [session, setSession] = useState<any>(null)
  const [movements, setMovements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [openModalOpen, setOpenModalOpen] = useState(false)
  const [closeModalOpen, setCloseModalOpen] = useState(false)

  const fetchData = async () => {
    if (!user) return
    setLoading(true)
    try {
      const s = await getOpenSession(user.id)
      setSession(s)
      if (s) {
        const movs = await getCashMovements(s.id)
        setMovements(movs)
      }
    } catch (e) {
      toast.error('Erro ao carregar sessão')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const handleOpenSession = async (payload: any) => {
    try {
      await openSession(payload, user!.id)
      toast.success('Caixa aberto com sucesso!')
      fetchData()
    } catch {
      toast.error('Erro ao abrir caixa')
    }
  }

  const entries = movements
    .filter((m) => m.type === 'entrada')
    .reduce((a, b) => a + Number(b.amount), 0)
  const exits = movements
    .filter((m) => m.type === 'saida')
    .reduce((a, b) => a + Number(b.amount), 0)
  const currentBalance = (session?.opening_balance || 0) + entries - exits

  const handleCloseSession = async (payload: any) => {
    try {
      await closeSession(session.id, {
        ...payload,
        closing_balance: currentBalance,
        total_entries: entries,
        total_exits: exits,
      })
      toast.success('Caixa fechado com sucesso!')
      fetchData()
    } catch {
      toast.error('Erro ao fechar caixa')
    }
  }

  const handleManualSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    payload.amount = parseFloat(payload.amount as string) || 0
    payload.origin = 'manual'
    payload.session_id = session.id

    try {
      await createCashMovement(payload, user!.id)
      toast.success('Lançamento realizado!')
      setFormOpen(false)
      fetchData()
    } catch {
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
    } catch {
      toast.error('Erro ao excluir')
    }
  }

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card/40 border border-border/50 rounded-xl animate-fade-in text-center shadow-sm">
        <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <LockKeyhole className="size-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">O Caixa está Fechado</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Abra uma nova sessão de caixa para começar a registrar recebimentos de ordens de serviço,
          vendas e movimentações avulsas.
        </p>
        <Button
          size="lg"
          onClick={() => setOpenModalOpen(true)}
          className="px-8 text-lg font-medium h-12"
        >
          Abrir Caixa Agora
        </Button>
        <OpenSessionModal
          open={openModalOpen}
          onOpenChange={setOpenModalOpen}
          onSubmit={handleOpenSession}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-primary/10 border border-primary/20 p-4 rounded-xl">
        <div>
          <h2 className="font-semibold text-primary flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Sessão Aberta
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Aberta em: {format(new Date(session.opened_at), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-background">
                <Plus className="size-4 mr-2" /> Movimentar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Lançamento Manual</DialogTitle>
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

          <Button variant="destructive" onClick={() => setCloseModalOpen(true)}>
            Fechar Caixa
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Inicial
            </CardTitle>
            <Wallet className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(session.opening_balance)}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entradas da Sessão
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
              Saídas da Sessão
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
          <CardTitle className="text-lg">Movimentações da Sessão</CardTitle>
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
                    Nenhuma movimentação registrada.
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
                      <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">
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
                      {m.origin === 'manual' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(m.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CloseSessionModal
        open={closeModalOpen}
        onOpenChange={setCloseModalOpen}
        computedBalance={currentBalance}
        onSubmit={handleCloseSession}
      />
    </div>
  )
}
