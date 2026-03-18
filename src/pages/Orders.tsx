import { useState } from 'react'
import { OrdersList } from '@/components/orders/OrdersList'
import { NewOrderModal } from '@/components/orders/NewOrderModal'
import { OrderDetails } from '@/components/orders/OrderDetails'
import { Button } from '@/components/ui/button'
import { Wrench, Plus } from 'lucide-react'

export default function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  if (selectedOrderId) {
    return (
      <OrderDetails
        orderId={selectedOrderId}
        onClose={() => {
          setSelectedOrderId(null)
          setRefreshKey((k) => k + 1)
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Wrench className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Ordens de Serviço</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe todos os reparos da sua assistência.
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          <Plus className="size-4 mr-2" /> Nova OS
        </Button>
      </div>

      <OrdersList key={refreshKey} onSelectOrder={setSelectedOrderId} />

      {isModalOpen && (
        <NewOrderModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onCreated={() => {
            setIsModalOpen(false)
            setRefreshKey((k) => k + 1)
          }}
        />
      )}
    </div>
  )
}
