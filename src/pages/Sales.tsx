import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart } from 'lucide-react'
import { SalesList } from '@/components/sales/SalesList'
import { NewSaleForm } from '@/components/sales/NewSaleForm'
import { SaleDetails } from '@/components/sales/SaleDetails'

export default function Sales() {
  const [activeTab, setActiveTab] = useState('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setActiveTab('details')
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
          <ShoppingCart className="size-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Vendas (PDV)</h1>
          <p className="text-muted-foreground">Registre vendas rápidas de produtos e acessórios.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] lg:grid-cols-3 mb-6 bg-card border border-border/50">
          <TabsTrigger value="list" onClick={() => setSelectedId(null)}>
            Histórico
          </TabsTrigger>
          <TabsTrigger value="new" onClick={() => setSelectedId(null)}>
            Nova Venda
          </TabsTrigger>
          {selectedId && <TabsTrigger value="details">Detalhes</TabsTrigger>}
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <SalesList onSelect={handleSelect} />
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <NewSaleForm onCreated={() => setActiveTab('list')} />
        </TabsContent>

        {selectedId && (
          <TabsContent value="details" className="mt-0">
            <SaleDetails
              id={selectedId}
              onClose={() => {
                setSelectedId(null)
                setActiveTab('list')
              }}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
