import { useState } from 'react'
import { updateTransactionStatus, deleteTransaction } from '@/services/finance'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { TransactionForm } from './TransactionForm'
import { Plus, Trash2, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function TransactionsList({
  data,
  mode,
  onRefresh,
}: {
  data: any[]
  mode: 'entrada' | 'saida' | 'contas' | 'historico'
  onRefresh: () => void
}) {
  const [filterConta, setFilterConta] = useState('pendente')
  const [formOpen, setFormOpen] = useState(false)

  let filtered = data
  if (mode === 'entrada') filtered = data.filter((d) => d.type === 'entrada')
  if (mode === 'saida') filtered = data.filter((d) => d.type === 'saida')
  if (mode === 'contas')
    filtered = data.filter((d) => d.status === filterConta || d.status === 'vencido')

  const handleStatus = async (id: string, st: string) => {
    try {
      await updateTransactionStatus(id, st)
      toast.success('Status atualizado')
      onRefresh()
    } catch {
      toast.error('Erro ao atualizar status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir transação?')) return
    try {
      await deleteTransaction(id)
      toast.success('Excluída')
      onRefresh()
    } catch {
      toast.error('Erro ao excluir')
    }
  }

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/10">
          <div className="flex gap-4">
            {mode === 'contas' && (
              <Select value={filterConta} onValueChange={setFilterConta}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendentes/A Vencer</SelectItem>
                  <SelectItem value="vencido">Atrasadas</SelectItem>
                </SelectContent>
              </Select>
            )}
            {mode !== 'contas' && mode !== 'historico' && (
              <h3 className="font-medium text-lg capitalize">{mode}s</h3>
            )}
            {mode === 'historico' && <h3 className="font-medium text-lg">Extrato Completo</h3>}
          </div>
          {(mode === 'entrada' || mode === 'saida' || mode === 'contas') && (
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="size-4 mr-2" /> Nova {mode === 'contas' ? 'Conta' : mode}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <TransactionForm
                  defaultType={mode}
                  onCreated={() => {
                    setFormOpen(false)
                    onRefresh()
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                {mode === 'historico' && <TableHead>Tipo</TableHead>}
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma transação.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(t.transaction_date), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 items-start">
                        <span className="font-medium">{t.description}</span>
                        {t.classification && (
                          <Badge
                            variant="outline"
                            className={cn(
                              'h-4 px-1 text-[10px] uppercase font-bold tracking-wider',
                              t.classification === 'Fixa'
                                ? 'border-blue-500/50 text-blue-500'
                                : 'border-muted-foreground/30 text-muted-foreground',
                            )}
                          >
                            {t.classification}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {t.category}
                      </Badge>
                    </TableCell>
                    {mode === 'historico' && (
                      <TableCell>
                        <Badge
                          className={
                            t.type === 'entrada'
                              ? 'bg-emerald-500/20 text-emerald-500'
                              : 'bg-red-500/20 text-red-500'
                          }
                          variant="outline"
                        >
                          {t.type}
                        </Badge>
                      </TableCell>
                    )}
                    <TableCell
                      className={cn(
                        'font-medium',
                        t.type === 'entrada' ? 'text-emerald-500' : 'text-red-500',
                      )}
                    >
                      R$ {t.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          t.status === 'pago' || t.status === 'recebido'
                            ? 'border-emerald-500 text-emerald-500'
                            : t.status === 'vencido'
                              ? 'border-red-500 text-red-500'
                              : 'border-orange-500 text-orange-500',
                        )}
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {(t.status === 'pendente' || t.status === 'vencido') && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleStatus(t.id, t.type === 'entrada' ? 'recebido' : 'pago')
                          }
                          title="Marcar como Pago/Recebido"
                        >
                          <CheckCircle className="size-4 text-emerald-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(t.id)}
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
