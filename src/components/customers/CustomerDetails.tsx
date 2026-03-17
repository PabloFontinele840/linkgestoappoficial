import { useEffect, useState } from 'react'
import { getCustomerById, getCustomerStats } from '@/services/customers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft, Mail, Phone, MapPin, CreditCard, ClipboardList } from 'lucide-react'
import { format } from 'date-fns'

export function CustomerDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const [data, setData] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getCustomerById(id), getCustomerStats(id)]).then(([customer, customerStats]) => {
      setData(customer)
      setStats(customerStats)
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

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-1">{data.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    CPF: {data.cpf || 'Não informado'}
                  </p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {data.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 text-muted-foreground" /> {data.phone || '-'}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-muted-foreground" /> {data.email || '-'}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="size-4 text-muted-foreground" /> {data.address || '-'}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                  Observações
                </p>
                <div className="bg-muted/30 p-3 rounded-md text-sm min-h-[80px] border border-border/50">
                  {data.notes || 'Nenhuma observação.'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="size-5" /> Histórico de OS
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.orders?.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma ordem de serviço registrada.
                </p>
              ) : (
                <div className="space-y-4">
                  {stats?.orders?.map((os: any) => (
                    <div
                      key={os.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">
                          OS-{os.id.split('-')[0]}{' '}
                          <span className="text-muted-foreground font-normal ml-2">
                            {os.device_brand} {os.device_model}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(os.created_at), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {os.status}
                        </Badge>
                        <p className="text-sm font-medium">R$ {os.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="size-4" /> Total Investido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-500 mb-1">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  stats?.totalInvested || 0,
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Em {stats?.totalOrders || 0} ordens de serviço
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
