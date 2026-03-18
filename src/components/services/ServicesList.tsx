import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getServices, deleteService, updateService } from '@/services/services'
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
import { Button } from '@/components/ui/button'
import { Search, Loader2, Edit3, Trash2, PowerOff, CheckCircle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { EditServiceModal } from './EditServiceModal'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function ServicesList() {
  const { user } = useAuth()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('ativos')

  const [editingService, setEditingService] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null)

  const fetchData = () => {
    if (!user) return
    getServices(user.id).then((res) => {
      setData(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const filtered = data.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    if (!matchSearch) return false
    if (tab === 'ativos') return s.status === 'Ativo'
    if (tab === 'inativos') return s.status === 'Inativo'
    return true
  })

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await deleteService(deleteConfirm.id, user!.id)
      toast.success('Serviço excluído permanentemente.')
      fetchData()
    } catch (e: any) {
      if (e.message === 'SERVICE_IN_USE') {
        toast.error('O serviço está vinculado a uma OS e foi marcado como Inativo.')
        await updateService(deleteConfirm.id, { status: 'Inativo' }, user!.id)
        fetchData()
      } else {
        toast.error('Erro ao excluir: ' + e.message)
      }
    } finally {
      setDeleteConfirm(null)
    }
  }

  const toggleStatus = async (s: any) => {
    const newStatus = s.status === 'Ativo' ? 'Inativo' : 'Ativo'
    try {
      await updateService(s.id, { status: newStatus }, user!.id)
      toast.success(`Status alterado para ${newStatus}.`)
      fetchData()
    } catch {
      toast.error('Erro ao alterar status')
    }
  }

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm">
      <CardContent className="p-0">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar serviço..."
              className="pl-9 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Tabs value={tab} onValueChange={setTab} className="w-full sm:w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="inativos">Inativos</TabsTrigger>
              <TabsTrigger value="todos">Todos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-6">Nome</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Preço Final</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead className="text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum serviço encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => (
                  <TableRow key={s.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 font-medium">{s.name}</TableCell>
                    <TableCell className="text-red-400">R$ {s.cost}</TableCell>
                    <TableCell className="text-emerald-500 font-medium">
                      R$ {s.final_price}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          s.status === 'Ativo'
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-muted text-muted-foreground border-border',
                        )}
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(s.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          title={s.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                          onClick={() => toggleStatus(s)}
                          className={s.status === 'Ativo' ? 'text-orange-500' : 'text-emerald-500'}
                        >
                          {s.status === 'Ativo' ? (
                            <PowerOff className="size-4" />
                          ) : (
                            <CheckCircle className="size-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingService(s)}
                          className="text-blue-500"
                        >
                          <Edit3 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(s)}
                          className="text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {editingService && (
        <EditServiceModal
          service={editingService}
          open={!!editingService}
          onOpenChange={(open: boolean) => !open && setEditingService(null)}
          onUpdated={() => {
            setEditingService(null)
            fetchData()
          }}
        />
      )}

      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Serviço?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deleteConfirm?.name}"? <br />
              <br />
              <strong>Nota:</strong> Se o serviço já tiver sido utilizado em alguma Ordem de
              Serviço, ele não será excluído, mas seu status será alterado para{' '}
              <strong>Inativo</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
