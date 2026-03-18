import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { createTransaction } from '@/services/finance'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function TransactionForm({
  defaultType,
  onCreated,
}: {
  defaultType: string
  onCreated: () => void
}) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const actualType = defaultType === 'contas' ? 'saida' : defaultType

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    payload.amount = parseFloat(payload.amount as string) || 0

    try {
      await createTransaction(payload, user.id)
      toast.success('Transação registrada!')
      onCreated()
    } catch {
      toast.error('Erro ao registrar transação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="capitalize">
          Nova {defaultType === 'contas' ? 'Conta' : defaultType}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <input type="hidden" name="type" value={actualType} />
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Input name="description" required placeholder="Ex: Conta de Luz..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Valor (R$)</Label>
            <Input name="amount" type="number" step="0.01" required />
          </div>
          <div className="space-y-2">
            <Label>Data</Label>
            <Input
              name="transaction_date"
              type="date"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Input name="category" defaultValue="Outros" />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              name="status"
              defaultValue={
                defaultType === 'contas'
                  ? 'pendente'
                  : actualType === 'entrada'
                    ? 'recebido'
                    : 'pago'
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {actualType === 'entrada' ? (
                  <>
                    <SelectItem value="recebido">Recebido</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Classificação</Label>
            <Select name="classification" defaultValue="Fixa">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fixa">Fixa</SelectItem>
                <SelectItem value="Variável">Variável</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Salvar
          </Button>
        </div>
      </form>
    </>
  )
}
