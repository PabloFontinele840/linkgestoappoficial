import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import {
  getAutoModels,
  getAutoDefects,
  getAutoServices,
  saveAutoService,
  deleteAutoService,
} from '@/services/auto_service'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

export function ServicesTab() {
  const { user } = useAuth()
  const [services, setServices] = useState<any[]>([])
  const [models, setModels] = useState<any[]>([])
  const [defects, setDefects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [modelId, setModelId] = useState('')
  const [defectId, setDefectId] = useState('')
  const [price, setPrice] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    if (!user) return
    const [s, m, d] = await Promise.all([
      getAutoServices(user.id),
      getAutoModels(user.id),
      getAutoDefects(user.id),
    ])
    setServices(s)
    setModels(m)
    setDefects(d)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!modelId || !defectId || !price || !user) return
    setSaving(true)
    try {
      await saveAutoService(user.id, {
        model_id: modelId,
        defect_id: defectId,
        price: Number(price),
        estimated_time: estimatedTime,
      })
      toast.success('Serviço salvo com sucesso!')
      setPrice('')
      setEstimatedTime('')
      fetchData()
    } catch {
      toast.error('Erro ao salvar serviço')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir preço de serviço?')) return
    try {
      await deleteAutoService(id)
      toast.success('Serviço excluído')
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
    <div className="space-y-6">
      <Card className="bg-card/40 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Modelo</label>
              <Select value={modelId} onValueChange={setModelId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.auto_brands?.name} {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Defeito</label>
              <Select value={defectId} onValueChange={setDefectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {defects.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Preço (R$)</label>
              <Input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Ex: 150.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Tempo (Opcional)</label>
              <Input
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="Ex: 2 horas"
              />
            </div>
            <Button type="submit" disabled={saving}>
              <Save className="size-4 mr-2" /> Salvar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-card/40 backdrop-blur-sm border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Aparelho</TableHead>
                <TableHead>Defeito</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Tempo Estimado</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Nenhum serviço mapeado.
                  </TableCell>
                </TableRow>
              )}
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">
                    {s.auto_models?.auto_brands?.name} {s.auto_models?.name}
                  </TableCell>
                  <TableCell>{s.auto_defects?.name}</TableCell>
                  <TableCell className="text-emerald-500 font-bold">R$ {s.price}</TableCell>
                  <TableCell className="text-muted-foreground">{s.estimated_time || '-'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
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
