import { useState, useRef } from 'react'
import { useSettings, ThemeMode, ThemeColor } from '@/hooks/use-settings'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  UploadCloud,
  Check,
  Save,
  Loader2,
  Sun,
  Moon,
  Laptop,
  Image as ImageIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const THEMES: { id: ThemeColor; color: string; label: string }[] = [
  { id: 'purple', color: '#7C3AED', label: 'Roxo' },
  { id: 'blue', color: '#3B82F6', label: 'Azul' },
  { id: 'green', color: '#10B981', label: 'Verde' },
  { id: 'red', color: '#EF4444', label: 'Vermelho' },
  { id: 'orange', color: '#F97316', label: 'Laranja' },
]

export default function Settings() {
  const { settings, updateSettings, saveSettings } = useSettings()
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setIsSaving(true)
    const { error } = await saveSettings()
    setIsSaving(false)

    if (error) {
      toast.error(error.message || 'Erro ao salvar as configurações.')
    } else {
      toast.success('Configurações salvas com sucesso!')
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      updateSettings({ logo_url: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const ModeButton = ({
    mode,
    icon: Icon,
    label,
  }: {
    mode: ThemeMode
    icon: any
    label: string
  }) => (
    <button
      onClick={() => updateSettings({ theme_mode: mode })}
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:bg-muted/50',
        settings.theme_mode === mode
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-border/60 text-muted-foreground',
      )}
    >
      <Icon className="size-6 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  )

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie a identidade e preferências da sua assistência.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Salvar Alterações
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Main Form Area */}
        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Informações do Negócio</CardTitle>
              <CardDescription>
                Detalhes que aparecem em relatórios, recibos e para seus clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business_name">Nome da assistência *</Label>
                <Input
                  id="business_name"
                  value={settings.business_name}
                  onChange={(e) => updateSettings({ business_name: e.target.value })}
                  placeholder="Ex: Tech Repair Solutions"
                  className="bg-background"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone / WhatsApp</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => updateSettings({ phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    placeholder="Rua principal, 123"
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Negócio</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => updateSettings({ description: e.target.value })}
                  placeholder="Especialistas em conserto de smartphones e tablets..."
                  className="bg-background min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Aparência do Sistema</CardTitle>
              <CardDescription>Personalize como a plataforma se parece para você.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Modo de Exibição</Label>
                <div className="grid grid-cols-3 gap-4">
                  <ModeButton mode="light" icon={Sun} label="Claro" />
                  <ModeButton mode="dark" icon={Moon} label="Escuro" />
                  <ModeButton mode="auto" icon={Laptop} label="Automático" />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Cor Principal</Label>
                <div className="flex flex-wrap gap-4 pt-1">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => updateSettings({ theme_color: theme.id })}
                      className={cn(
                        'flex size-12 items-center justify-center rounded-full ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        settings.theme_color === theme.id
                          ? 'ring-2 ring-foreground scale-110 shadow-lg'
                          : 'opacity-70 grayscale-[30%]',
                      )}
                      style={{ backgroundColor: theme.color }}
                      title={theme.label}
                    >
                      {settings.theme_color === theme.id && <Check className="size-5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle>Identidade Visual</CardTitle>
              <CardDescription>Logo da sua marca.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative overflow-hidden border-2 border-dashed border-border/60 rounded-xl flex flex-col items-center justify-center text-center hover:bg-muted/20 transition-all cursor-pointer group aspect-square max-h-[250px] bg-background/50"
                >
                  {settings.logo_url ? (
                    <>
                      <img
                        src={settings.logo_url}
                        alt="Logo preview"
                        className="w-full h-full object-contain p-4 group-hover:opacity-30 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium shadow-lg flex items-center gap-2">
                          <UploadCloud className="size-4" /> Trocar Logo
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 flex flex-col items-center">
                      <div className="p-4 bg-muted rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon className="size-8 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium">Fazer upload de logo</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        PNG, JPG ou SVG
                        <br />
                        (Max. 2MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
                  Pré-visualização do Header
                </Label>
                <div className="h-14 rounded-lg border border-border bg-card flex items-center px-4 gap-3 shadow-sm overflow-hidden">
                  <div className="size-8 rounded-md bg-background border border-border/50 flex items-center justify-center overflow-hidden shrink-0">
                    {settings.logo_url ? (
                      <img src={settings.logo_url} className="w-full h-full object-cover" />
                    ) : (
                      <div className="size-full bg-primary/20" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm whitespace-nowrap overflow-hidden">
                    <span className="font-semibold text-foreground truncate">
                      {settings.business_name || 'Sua Marca'}
                    </span>
                    <span className="text-muted-foreground/50">|</span>
                    <span className="text-muted-foreground text-xs">LinkGestor</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
