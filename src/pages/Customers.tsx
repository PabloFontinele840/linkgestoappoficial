import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomersList } from '@/components/customers/CustomersList'
import { NewCustomerForm } from '@/components/customers/NewCustomerForm'
import { CustomerDetails } from '@/components/customers/CustomerDetails'
import { Users } from 'lucide-react'

export default function Customers() {
  const [activeTab, setActiveTab] = useState('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setActiveTab('details')
  }

  const handleCreated = () => {
    setActiveTab('list')
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Users className="size-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie o relacionamento com seus clientes (CRM).
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex w-auto mb-6 bg-card border border-border/50">
          <TabsTrigger value="list" onClick={() => setSelectedId(null)}>
            Lista de Clientes
          </TabsTrigger>
          <TabsTrigger value="new" onClick={() => setSelectedId(null)}>
            Novo Cliente
          </TabsTrigger>
          {selectedId && <TabsTrigger value="details">Detalhes</TabsTrigger>}
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <CustomersList onSelect={handleSelect} />
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <NewCustomerForm onCreated={handleCreated} />
        </TabsContent>

        {selectedId && (
          <TabsContent value="details" className="mt-0">
            <CustomerDetails
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
