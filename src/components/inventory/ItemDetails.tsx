import { useEffect, useState } from 'react'
import { getInventoryItemById, deleteInventoryItem } from '@/services/inventory'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft, Trash2, Edit3, TrendingUp, Package } from 'lucide-react'
import { toast } from 'sonner'
import { MovementDialog } from './MovementDialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function ItemDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [movementOpen, setMovementOpen] = useState(false)

  const fetchItem = () => {
    getInventoryItemById(id).then((res) => {
      setData(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchItem()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteInventoryItem(id)
      toast.success('Item excluído.')
      onClose()
    } catch (e: any) {
      toast.error('Erro ao excluir: ' + e.message)
    }
  }

  if (loading || !data)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onClose} className="text-muted-foreground -ml-4">
          <ArrowLeft className="mr-2 size-4" /> Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setMovementOpen(true)}>
            <TrendingUp className="size-4 mr-2" /> Movimentar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10 border-destructive/20"
              >
                <Trash2 className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Item</AlertDialogTitle>
                <AlertDialogDescription>Esta ação é irreversível.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Package className="text-primary size-6" /> {data.name}
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{data.category}</Badge>
              <Badge variant="outline">{data.sku || 'Sem SKU'}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 pt-2">
            <div>
              <p className="text-xs text-muted-foreground">Marca/Modelo</p>
              <p className="font-medium">
                {data.device_brand} {data.device_model}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Qualidade</p>
              <p className="font-medium">{data.part_brand || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fornecedor</p>
              <p className="font-medium">{data.suppliers?.name || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Localização</p>
              <p className="font-medium">{data.location || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Preço de Custo</p>
              <p className="font-medium text-red-400">R$ {data.cost_price}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Preço Sugerido</p>
              <p className="font-medium text-emerald-400">R$ {data.suggested_price}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Observações</p>
              <div className="bg-muted/30 p-3 rounded-md text-sm border border-border/50 mt-1">
                {data.notes || 'Nenhuma'}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/50 bg-card/40">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Quantidade Atual</p>
              <p
                className={`text-5xl font-bold ${data.quantity <= data.minimum_stock ? 'text-red-500' : 'text-primary'}`}
              >
                {data.quantity}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Estoque Mínimo: {data.minimum_stock}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {movementOpen && (
        <MovementDialog
          itemId={id}
          open={movementOpen}
          onOpenChange={setMovementOpen}
          onCreated={() => {
            setMovementOpen(false)
            fetchItem()
          }}
        />
      )}
    </div>
  )
}
