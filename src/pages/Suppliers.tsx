import { useState } from 'react'
import { SuppliersList } from '@/components/suppliers/SuppliersList'
import { NewSupplierModal } from '@/components/suppliers/NewSupplierModal'
import { SupplierDetails } from '@/components/suppliers/SupplierDetails'
import { Button } from '@/components/ui/button'
import { Truck, Plus } from 'lucide-react'

export default function Suppliers() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  if (selectedId) {
    return <SupplierDetails id={selectedId} onClose={() => setSelectedId(null)} />
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
            <Truck className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Fornecedores</h1>
            <p className="text-muted-foreground">Gerencie seus parceiros de peças e serviços.</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> Novo Fornecedor
        </Button>
      </div>

      <SuppliersList key={refreshKey} onSelect={setSelectedId} />

      <NewSupplierModal
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
