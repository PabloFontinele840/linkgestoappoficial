import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getPublicSettings,
  getPublicBrands,
  getPublicModels,
  getPublicDefects,
  getPublicService,
} from '@/services/auto_service'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowLeft, CheckCircle2, ChevronRight, Smartphone } from 'lucide-react'

const COLOR_MAP: Record<string, string> = {
  purple: '262 83% 58%',
  blue: '217 91% 60%',
  green: '142 71% 45%',
  red: '0 84% 60%',
  orange: '24 95% 53%',
}

export default function PublicPortal() {
  const { slug } = useParams()
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [step, setStep] = useState(1)
  const [brands, setBrands] = useState<any[]>([])
  const [models, setModels] = useState<any[]>([])
  const [defects, setDefects] = useState<any[]>([])

  const [selectedBrand, setSelectedBrand] = useState<any>(null)
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [selectedDefect, setSelectedDefect] = useState<any>(null)
  const [service, setService] = useState<any>(null)

  useEffect(() => {
    if (slug) {
      getPublicSettings(slug).then(async (s) => {
        if (s) {
          setSettings(s)
          const bs = await getPublicBrands(s.user_id)
          setBrands(bs)

          const hslColor = COLOR_MAP[s.theme_color] || COLOR_MAP.purple
          document.documentElement.style.setProperty('--primary', hslColor)
          document.documentElement.style.setProperty('--ring', hslColor)
        }
        setLoading(false)
      })
    }
  }, [slug])

  useEffect(() => {
    if (selectedBrand) getPublicModels(selectedBrand.id).then(setModels)
  }, [selectedBrand])

  useEffect(() => {
    if (selectedModel && settings) getPublicDefects(settings.user_id).then(setDefects)
  }, [selectedModel])

  useEffect(() => {
    if (selectedModel && selectedDefect)
      getPublicService(selectedModel.id, selectedDefect.id).then(setService)
  }, [selectedDefect])

  if (loading)
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary size-8" />
      </div>
    )
  if (!settings)
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center">
        <Smartphone className="size-12 text-muted-foreground mb-4" />
        <p className="text-xl font-medium mb-2">Portal Indisponível</p>
        <p className="text-muted-foreground">
          Esta página não existe ou foi desativada pela assistência técnica.
        </p>
      </div>
    )

  const handleWhatsApp = () => {
    const text = `Olá! Fiz um orçamento pelo autoatendimento.%0A*Aparelho:* ${selectedBrand.name} ${selectedModel.name}%0A*Defeito:* ${selectedDefect.name}%0A${service?.price ? `*Valor Estimado:* R$ ${service.price}` : `*Status:* Preciso de uma análise mais detalhada.`}`
    const url = `https://wa.me/${settings.whatsapp_number}?text=${text}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans">
      <header className="p-6 flex flex-col items-center justify-center gap-3 bg-card border-b border-border/50 shadow-sm">
        {settings.logo_url ? (
          <img src={settings.logo_url} alt="Logo" className="h-12 object-contain" />
        ) : (
          <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            {settings.business_name.substring(0, 1).toUpperCase()}
          </div>
        )}
        <h1 className="text-lg font-bold tracking-tight">{settings.business_name}</h1>
      </header>

      <main className="flex-1 p-6 max-w-md mx-auto w-full">
        {step > 1 && (
          <Button
            variant="ghost"
            onClick={() => {
              if (step === 2) {
                setSelectedBrand(null)
                setStep(1)
              }
              if (step === 3) {
                setSelectedModel(null)
                setStep(2)
              }
              if (step === 4) {
                setSelectedDefect(null)
                setStep(3)
              }
            }}
            className="mb-6 -ml-4 text-muted-foreground"
          >
            <ArrowLeft className="mr-2 size-4" /> Voltar
          </Button>
        )}

        <div className="animate-fade-in-up">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">1. Qual a marca do seu aparelho?</h2>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBrand(b)
                      setStep(2)
                    }}
                    className="p-4 border border-border/50 rounded-xl bg-card hover:border-primary hover:bg-primary/5 transition-all text-center flex flex-col items-center justify-center gap-2 min-h-[100px] shadow-sm"
                  >
                    <span className="font-medium">{b.name}</span>
                  </button>
                ))}
                {brands.length === 0 && (
                  <p className="col-span-2 text-center py-10 text-muted-foreground">
                    Nenhuma marca disponível.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">2. Qual é o modelo?</h2>
              <div className="flex flex-col gap-3">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m)
                      setStep(3)
                    }}
                    className="p-4 border border-border/50 rounded-xl bg-card hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center shadow-sm"
                  >
                    <span className="font-medium text-left">{m.name}</span>
                    <ChevronRight className="size-5 text-muted-foreground shrink-0 ml-2" />
                  </button>
                ))}
                {models.length === 0 && (
                  <p className="text-muted-foreground text-center py-10">
                    Nenhum modelo disponível para esta marca.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">3. Qual é o problema principal?</h2>
              <div className="flex flex-col gap-3">
                {defects.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDefect(d)
                      setStep(4)
                    }}
                    className="p-4 border border-border/50 rounded-xl bg-card hover:border-primary hover:bg-primary/5 transition-all text-left flex justify-between items-center shadow-sm"
                  >
                    <div>
                      <span className="font-medium block">{d.name}</span>
                      {d.description && (
                        <span className="text-xs text-muted-foreground mt-1 block">
                          {d.description}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="size-5 text-muted-foreground shrink-0 ml-2" />
                  </button>
                ))}
                {defects.length === 0 && (
                  <p className="text-muted-foreground text-center py-10">
                    Nenhum defeito cadastrado.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center pt-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-2">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Pré-Avaliação Concluída</h2>

              <div className="bg-card p-5 rounded-2xl border border-border/50 space-y-3 text-left mb-6 shadow-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Aparelho
                  </p>
                  <p className="font-medium text-lg">
                    {selectedBrand.name} {selectedModel.name}
                  </p>
                </div>
                <div className="border-t border-border/50 pt-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Problema Relatado
                  </p>
                  <p className="font-medium">{selectedDefect.name}</p>
                </div>
              </div>

              {service?.price ? (
                <div className="space-y-2 pb-6">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Valor Estimado
                  </p>
                  <p className="text-5xl font-bold text-primary tracking-tight">
                    R$ {service.price}
                  </p>
                  {service.estimated_time && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Tempo estimado de reparo: {service.estimated_time}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 pb-6">
                  <p className="text-xl font-semibold">Análise Técnica Necessária</p>
                  <p className="text-sm text-muted-foreground px-4">
                    Este tipo de reparo requer uma avaliação do aparelho em bancada. Fale conosco
                    para agendar um orçamento exato sem compromisso.
                  </p>
                </div>
              )}

              <Button
                onClick={handleWhatsApp}
                className="w-full text-lg h-14 rounded-xl font-semibold shadow-lg"
                disabled={!settings.whatsapp_number}
              >
                Falar no WhatsApp
              </Button>
              {!settings.whatsapp_number && (
                <p className="text-xs text-destructive mt-2">
                  Atendimento via WhatsApp indisponível no momento.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
