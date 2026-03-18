import { useState } from 'react'
import { CustomersList } from '@/components/customers/CustomersList'
import { NewCustomerModal } from '@/components/customers/NewCustomerModal'
import { CustomerDetails } from '@/components/customers/CustomerDetails'
import { Button } from '@/components/ui/button'
import { Users, Plus } from 'lucide-react'

export default function Customers() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  if (selectedId) {
    return <CustomerDetails id={selectedId} onClose={() => setSelectedId(null)} />
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Users className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Clientes</h1>
            <p className="text-muted-foreground">Gerencie o relacionamento com seus clientes.</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> Novo Cliente
        </Button>
      </div>

      <CustomersList key={refreshKey} onSelect={setSelectedId} />

      <NewCustomerModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreated={() => {
          setIsModalOpen(false)
          setRefreshKey((k) => k + 1)
        }}
      />
    </div>
  )
}
