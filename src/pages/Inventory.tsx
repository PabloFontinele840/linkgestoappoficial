import { useState } from 'react'
import { InventoryList } from '@/components/inventory/InventoryList'
import { NewItemModal } from '@/components/inventory/NewItemModal'
import { ItemDetails } from '@/components/inventory/ItemDetails'
import { InventoryMovements } from '@/components/inventory/InventoryMovements'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Package, Plus } from 'lucide-react'

export default function Inventory() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  if (selectedId) {
    return <ItemDetails id={selectedId} onClose={() => setSelectedId(null)} />
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Package className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Estoque</h1>
            <p className="text-muted-foreground">Gerencie peças e movimentações.</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> Novo Item
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6 bg-card border border-border/50">
          <TabsTrigger value="list">Lista de Itens</TabsTrigger>
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <InventoryList key={refreshKey} onSelect={setSelectedId} />
        </TabsContent>
        <TabsContent value="movements" className="mt-0">
          <InventoryMovements />
        </TabsContent>
      </Tabs>

      <NewItemModal
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
