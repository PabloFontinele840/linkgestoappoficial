import { useState } from 'react'
import { SalesList } from '@/components/sales/SalesList'
import { NewSaleModal } from '@/components/sales/NewSaleModal'
import { SaleDetails } from '@/components/sales/SaleDetails'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus } from 'lucide-react'

export default function Sales() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  if (selectedId) {
    return <SaleDetails id={selectedId} onClose={() => setSelectedId(null)} />
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <ShoppingCart className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Vendas (PDV)</h1>
            <p className="text-muted-foreground">Histórico de vendas e faturamento de balcão.</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> Nova Venda
        </Button>
      </div>

      <SalesList key={refreshKey} onSelect={setSelectedId} />

      <NewSaleModal
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
