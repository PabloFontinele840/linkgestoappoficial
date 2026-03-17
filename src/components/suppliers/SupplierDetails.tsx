import { useEffect, useState } from 'react'
import { getSupplierById } from '@/services/suppliers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft, PackageSearch } from 'lucide-react'

export function SupplierDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSupplierById(id).then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [id])

  if (loading || !data)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )

  return (
    <div className="space-y-6 animate-fade-in">
      <Button
        variant="ghost"
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground -ml-4"
      >
        <ArrowLeft className="mr-2 size-4" /> Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm">
          <CardHeader className="pb-4 border-b border-border/50 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{data.name}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{data.specialty}</Badge>
                <Badge
                  variant="outline"
                  className={
                    data.status === 'Ativo'
                      ? 'text-emerald-500 border-emerald-500/20'
                      : 'text-muted-foreground'
                  }
                >
                  {data.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Telefone Fixo</p>
                <p className="font-medium">{data.phone || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">WhatsApp</p>
                <p className="font-medium text-emerald-500">{data.whatsapp || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{data.email || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Localização</p>
                <p className="font-medium">
                  {data.city || '-'} / {data.state || '-'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                Condições & Observações
              </p>
              <div className="bg-muted/30 p-3 rounded-md text-sm min-h-[120px] border border-border/50">
                {data.notes || 'Nenhuma observação registrada.'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-border/50 bg-background shadow-none opacity-70">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="p-4 bg-muted rounded-full mb-4">
              <PackageSearch className="size-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Peças Fornecidas</h3>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              A integração de fornecedores com o módulo de estoque estará disponível em breve.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
