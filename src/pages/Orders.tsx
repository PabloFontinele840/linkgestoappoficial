import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrdersList } from '@/components/orders/OrdersList'
import { NewOrderForm } from '@/components/orders/NewOrderForm'
import { OrderDetails } from '@/components/orders/OrderDetails'

export default function Orders() {
  const [activeTab, setActiveTab] = useState('list')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id)
    setActiveTab('details')
  }

  const handleOrderCreated = () => {
    setActiveTab('list')
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Ordens de Serviço</h1>
        <p className="text-muted-foreground">
          Gerencie e acompanhe todos os reparos da sua assistência.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex w-auto mb-6 bg-card border border-border/50">
          <TabsTrigger value="list" onClick={() => setSelectedOrderId(null)}>
            Lista de OS
          </TabsTrigger>
          <TabsTrigger value="new" onClick={() => setSelectedOrderId(null)}>
            Nova OS
          </TabsTrigger>
          {selectedOrderId && <TabsTrigger value="details">Detalhes</TabsTrigger>}
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <OrdersList onSelectOrder={handleSelectOrder} />
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <NewOrderForm onCreated={handleOrderCreated} />
        </TabsContent>

        {selectedOrderId && (
          <TabsContent value="details" className="mt-0">
            <OrderDetails
              orderId={selectedOrderId}
              onClose={() => {
                setSelectedOrderId(null)
                setActiveTab('list')
              }}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
