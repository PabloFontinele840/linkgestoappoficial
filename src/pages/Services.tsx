import { useState } from 'react'
import { ServicesList } from '@/components/services/ServicesList'
import { NewServiceModal } from '@/components/services/NewServiceModal'
import { Button } from '@/components/ui/button'
import { Briefcase, Plus } from 'lucide-react'

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Briefcase className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Catálogo de Serviços</h1>
            <p className="text-muted-foreground">Gerencie serviços, peças e mão de obra.</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> Novo Serviço
        </Button>
      </div>

      <ServicesList key={refreshKey} />

      <NewServiceModal
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
