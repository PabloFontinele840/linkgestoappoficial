import { useState } from 'react'
import { useSettings } from '@/hooks/use-settings'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function ConfigTab() {
  const { settings, updateSettings, saveSettings } = useSettings()
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const { error } = await saveSettings()
    setSaving(false)
    if (error) {
      if (error.code === '23505') {
        toast.error('Este link já está em uso por outra loja. Escolha outro.')
      } else {
        toast.error('Erro ao salvar configurações')
      }
    } else {
      toast.success('Configurações salvas!')
    }
  }

  return (
    <Card className="max-w-xl border-border/50 bg-card/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Configuração do Portal Público</CardTitle>
        <CardDescription>Personalize o link e os contatos do seu autoatendimento.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div>
            <Label className="text-base">Ativar Portal Público</Label>
            <p className="text-sm text-muted-foreground">
              Permitir que clientes acessem a página de autoatendimento.
            </p>
          </div>
          <Switch
            checked={settings.auto_active}
            onCheckedChange={(v) => updateSettings({ auto_active: v })}
          />
        </div>
        <div className="space-y-2">
          <Label>Identificador do Link (Slug)</Label>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <span className="text-muted-foreground text-sm truncate bg-muted p-2 rounded-md">
              linkgestor.com/check/
            </span>
            <Input
              value={settings.slug || ''}
              onChange={(e) =>
                updateSettings({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })
              }
              placeholder="sua-assistencia"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Número do WhatsApp</Label>
          <Input
            value={settings.whatsapp_number || ''}
            onChange={(e) => updateSettings({ whatsapp_number: e.target.value })}
            placeholder="Ex: 5511999999999"
          />
          <p className="text-xs text-muted-foreground">
            Inclua código do país e DDD, apenas números. Ex: 5511988887777
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="size-4 mr-2 animate-spin" />}
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  )
}
