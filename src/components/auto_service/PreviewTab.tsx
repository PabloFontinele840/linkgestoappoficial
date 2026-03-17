import { useSettings } from '@/hooks/use-settings'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PreviewTab() {
  const { settings } = useSettings()

  if (!settings.slug || !settings.auto_active) {
    return (
      <Card className="border-dashed bg-transparent shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <p className="text-muted-foreground mb-4 max-w-md">
            Você precisa configurar um identificador (slug) e ativar o portal na aba de
            Configurações para visualizar a página pública.
          </p>
        </CardContent>
      </Card>
    )
  }

  const portalUrl = `${window.location.origin}/check/${settings.slug}`

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border border-border/50">
        <span className="text-sm font-medium text-muted-foreground">
          Link Público:{' '}
          <a
            href={portalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            {portalUrl}
          </a>
        </span>
        <Button variant="outline" size="sm" asChild>
          <a href={portalUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4 mr-2" /> Abrir em nova aba
          </a>
        </Button>
      </div>
      <div className="w-full max-w-[400px] h-[750px] mx-auto border-[8px] border-black dark:border-white/10 rounded-[2.5rem] overflow-hidden bg-background relative shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black dark:bg-white/10 rounded-b-2xl z-10" />
        <iframe
          src={portalUrl}
          className="w-full h-full bg-background border-none"
          title="Preview"
        />
      </div>
    </div>
  )
}
