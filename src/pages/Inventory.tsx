import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package } from 'lucide-react'
import { InventoryList } from '@/components/inventory/InventoryList'
import { NewItemForm } from '@/components/inventory/NewItemForm'
import { ItemDetails } from '@/components/inventory/ItemDetails'
import { InventoryMovements } from '@/components/inventory/InventoryMovements'

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setActiveTab('details')
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Package className="size-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Estoque</h1>
          <p className="text-muted-foreground">
            Gerencie peças, acessórios e movimentações do seu inventário.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[500px] lg:grid-cols-4 mb-6 bg-card border border-border/50">
          <TabsTrigger value="list" onClick={() => setSelectedId(null)}>
            Lista de Itens
          </TabsTrigger>
          <TabsTrigger value="new" onClick={() => setSelectedId(null)}>
            Novo Item
          </TabsTrigger>
          <TabsTrigger value="movements" onClick={() => setSelectedId(null)}>
            Movimentações
          </TabsTrigger>
          {selectedId && <TabsTrigger value="details">Detalhes</TabsTrigger>}
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <InventoryList onSelect={handleSelect} />
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <NewItemForm onCreated={() => setActiveTab('list')} />
        </TabsContent>

        <TabsContent value="movements" className="mt-0">
          <InventoryMovements />
        </TabsContent>

        {selectedId && (
          <TabsContent value="details" className="mt-0">
            <ItemDetails
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
