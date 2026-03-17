import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { UploadCloud, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const THEMES = [
  { id: 'purple', color: '#7C3AED' },
  { id: 'blue', color: '#3B82F6' },
  { id: 'green', color: '#10B981' },
  { id: 'red', color: '#EF4444' },
  { id: 'orange', color: '#F97316' },
]

export default function Settings() {
  const [activeTheme, setActiveTheme] = useState('purple')

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie a identidade e preferências da sua assistência.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Identidade do Negócio</CardTitle>
            <CardDescription>Informações básicas que aparecem para seus clientes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da assistência</Label>
              <Input id="name" defaultValue="Tech Repair Solutions" className="bg-background" />
            </div>
            <div className="space-y-2 pt-2">
              <Label>Logo da empresa</Label>
              <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/20 transition-colors cursor-pointer group">
                <div className="p-3 bg-muted rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="size-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">Clique para fazer upload</span>
                <span className="text-xs text-muted-foreground mt-1">
                  SVG, PNG, JPG ou GIF (max. 2MB)
                </span>
              </div>
            </div>
            <Button className="w-full mt-4">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Aparência (Temas)</CardTitle>
            <CardDescription>
              Personalize a cor principal da plataforma. Os temas adaptam-se automaticamente ao modo
              claro e escuro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 pt-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={cn(
                    'flex size-12 items-center justify-center rounded-full ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeTheme === theme.id ? 'ring-2 ring-foreground scale-110 shadow-lg' : '',
                  )}
                  style={{ backgroundColor: theme.color }}
                  title={`Tema ${theme.id}`}
                >
                  {activeTheme === theme.id && <Check className="size-5 text-white" />}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-background border border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: THEMES.find((t) => t.id === activeTheme)?.color }}
                />
                <span className="text-sm font-medium">Pré-visualização</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full w-2/3 transition-colors duration-500"
                  style={{ backgroundColor: THEMES.find((t) => t.id === activeTheme)?.color }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
