import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getAutoBrands, createAutoBrand, deleteAutoBrand } from '@/services/auto_service'
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
import { Trash2, Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'

export function BrandsTab() {
  const { user } = useAuth()
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchBrands = async () => {
    if (!user) return
    const data = await getAutoBrands(user.id)
    setBrands(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchBrands()
  }, [user])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !user) return
    setCreating(true)
    try {
      await createAutoBrand(user.id, name)
      toast.success('Marca adicionada')
      setName('')
      fetchBrands()
    } catch {
      toast.error('Erro ao adicionar')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir marca? Todos os modelos associados serão removidos.')) return
    try {
      await deleteAutoBrand(id)
      toast.success('Marca excluída')
      fetchBrands()
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
    <div className="space-y-6 max-w-2xl">
      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          placeholder="Nova Marca (ex: Apple)"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                    Nenhuma marca cadastrada.
                  </TableCell>
                </TableRow>
              )}
              {brands.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)}>
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
