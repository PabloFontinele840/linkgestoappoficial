import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SuppliersList } from '@/components/suppliers/SuppliersList'
import { NewSupplierForm } from '@/components/suppliers/NewSupplierForm'
import { SupplierDetails } from '@/components/suppliers/SupplierDetails'
import { Truck } from 'lucide-react'

export default function Suppliers() {
  const [activeTab, setActiveTab] = useState('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setActiveTab('details')
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
          <Truck className="size-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Fornecedores</h1>
          <p className="text-muted-foreground">Gerencie seus parceiros e prepare seu estoque.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[450px] lg:grid-cols-3 mb-6 bg-card border border-border/50">
          <TabsTrigger value="list" onClick={() => setSelectedId(null)}>
            Lista de Fornecedores
          </TabsTrigger>
          <TabsTrigger value="new" onClick={() => setSelectedId(null)}>
            Novo Fornecedor
          </TabsTrigger>
          {selectedId && <TabsTrigger value="details">Detalhes</TabsTrigger>}
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <SuppliersList onSelect={handleSelect} />
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <NewSupplierForm onCreated={() => setActiveTab('list')} />
        </TabsContent>

        {selectedId && (
          <TabsContent value="details" className="mt-0">
            <SupplierDetails
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
