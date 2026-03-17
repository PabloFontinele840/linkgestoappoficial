import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Phone } from 'lucide-react'
import { ConfigTab } from '@/components/auto_service/ConfigTab'
import { BrandsTab } from '@/components/auto_service/BrandsTab'
import { ModelsTab } from '@/components/auto_service/ModelsTab'
import { DefectsTab } from '@/components/auto_service/DefectsTab'
import { ServicesTab } from '@/components/auto_service/ServicesTab'
import { PreviewTab } from '@/components/auto_service/PreviewTab'

export default function AutoServiceAdmin() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
          <Phone className="size-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Autoatendimento</h1>
          <p className="text-muted-foreground">
            Gerencie seu portal público para orçamentos expressos.
          </p>
        </div>
      </div>

      <Tabs defaultValue="config" className="w-full">
        <TabsList className="inline-flex w-auto mb-6 bg-card border border-border/50 flex-wrap h-auto">
          <TabsTrigger value="config">Configurações</TabsTrigger>
          <TabsTrigger value="brands">Marcas</TabsTrigger>
          <TabsTrigger value="models">Modelos</TabsTrigger>
          <TabsTrigger value="defects">Defeitos</TabsTrigger>
          <TabsTrigger value="services">Serviços/Preços</TabsTrigger>
          <TabsTrigger value="preview">Visão Pública</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-0">
          <ConfigTab />
        </TabsContent>
        <TabsContent value="brands" className="mt-0">
          <BrandsTab />
        </TabsContent>
        <TabsContent value="models" className="mt-0">
          <ModelsTab />
        </TabsContent>
        <TabsContent value="defects" className="mt-0">
          <DefectsTab />
        </TabsContent>
        <TabsContent value="services" className="mt-0">
          <ServicesTab />
        </TabsContent>
        <TabsContent value="preview" className="mt-0">
          <PreviewTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
