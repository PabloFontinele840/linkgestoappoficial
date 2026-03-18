import { useState } from 'react'
import { CashierDashboard } from '@/components/cashier/CashierDashboard'
import { CashSessionHistory } from '@/components/cashier/CashSessionHistory'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Cashier() {
  const [activeTab, setActiveTab] = useState('atual')

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Caixa Diário</h1>
        <p className="text-muted-foreground">
          Gerencie a abertura, fechamento e as movimentações do seu caixa.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-card border border-border/50">
          <TabsTrigger value="atual">Caixa Atual</TabsTrigger>
          <TabsTrigger value="historico">Histórico de Sessões</TabsTrigger>
        </TabsList>
        <TabsContent value="atual" className="mt-0">
          <CashierDashboard />
        </TabsContent>
        <TabsContent value="historico" className="mt-0">
          <CashSessionHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
