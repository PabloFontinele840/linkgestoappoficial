import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getTransactions } from '@/services/finance'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DollarSign, Loader2 } from 'lucide-react'
import { FinanceSummary } from '@/components/finance/FinanceSummary'
import { TransactionsList } from '@/components/finance/TransactionsList'

export default function Finance() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('resumo')
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    if (!user) return
    getTransactions(user.id).then((res) => {
      setTransactions(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [user])

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-primary size-10" />
      </div>
    )

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <DollarSign className="size-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Financeiro</h1>
          <p className="text-muted-foreground">Controle de entradas, saídas e previsões.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px] lg:grid-cols-5 mb-6 bg-card border border-border/50">
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="entradas">Entradas</TabsTrigger>
          <TabsTrigger value="saidas">Saídas</TabsTrigger>
          <TabsTrigger value="contas">Contas</TabsTrigger>
          <TabsTrigger value="movimentacoes">Extrato</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="mt-0">
          <FinanceSummary data={transactions} />
        </TabsContent>

        <TabsContent value="entradas" className="mt-0">
          <TransactionsList data={transactions} mode="entrada" onRefresh={fetchData} />
        </TabsContent>

        <TabsContent value="saidas" className="mt-0">
          <TransactionsList data={transactions} mode="saida" onRefresh={fetchData} />
        </TabsContent>

        <TabsContent value="contas" className="mt-0">
          <TransactionsList data={transactions} mode="contas" onRefresh={fetchData} />
        </TabsContent>

        <TabsContent value="movimentacoes" className="mt-0">
          <TransactionsList data={transactions} mode="historico" onRefresh={fetchData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
