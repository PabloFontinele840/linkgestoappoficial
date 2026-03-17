import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import {
  getAutoModels,
  createAutoModel,
  deleteAutoModel,
  getAutoBrands,
} from '@/services/auto_service'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Trash2, Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'

export function ModelsTab() {
  const { user } = useAuth()
  const [models, setModels] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [brandId, setBrandId] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchData = async () => {
    if (!user) return
    const [m, b] = await Promise.all([getAutoModels(user.id), getAutoBrands(user.id)])
    setModels(m)
    setBrands(b)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !brandId || !user) return
    setCreating(true)
    try {
      await createAutoModel(user.id, brandId, name)
      toast.success('Modelo adicionado')
      setName('')
      fetchData()
    } catch {
      toast.error('Erro ao adicionar')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir modelo?')) return
    try {
      await deleteAutoModel(id)
      toast.success('Modelo excluído')
      fetchData()
    } catch {
      toast.error('Erro ao excluir')
    }
  }

  if (loading)
    return (
      <div className="p-10 flex justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    )

  return (
    <div className="space-y-6 max-w-3xl">
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
        <Select value={brandId} onValueChange={setBrandId}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Selecione a Marca" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
            {brands.length === 0 && (
              <SelectItem value="none" disabled>
                Nenhuma marca cadastrada
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <Input
          placeholder="Novo Modelo (ex: iPhone 13)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={creating}>
          <Plus className="size-4 mr-2" /> Adicionar
        </Button>
      </form>
      <Card className="bg-card/40 backdrop-blur-sm border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    Nenhum modelo cadastrado.
                  </TableCell>
                </TableRow>
              )}
              {models.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="text-muted-foreground">{m.auto_brands?.name}</TableCell>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
