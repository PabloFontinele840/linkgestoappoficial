import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Smartphone, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        const isInvalidCredentials =
          error.status === 400 ||
          (error.message && error.message.toLowerCase().includes('invalid login credentials'))

        if (isInvalidCredentials) {
          toast({
            variant: 'destructive',
            title: 'Falha na autenticação',
            description:
              'E-mail ou senha inválidos. Por favor, verifique seus dados e tente novamente.',
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Ocorreu um erro ao realizar o login. Tente novamente mais tarde.',
          })
        }
      } else {
        toast({
          title: 'Sucesso',
          description: 'Login realizado com sucesso!',
        })

        // Prevent redirects to the removed /ia route if it was stored in location state
        const from = location.state?.from?.pathname || '/'
        const safeRedirect = from.startsWith('/ia') ? '/' : from
        navigate(safeRedirect, { replace: true })
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao realizar o login. Tente novamente mais tarde.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 animate-fade-in">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(124,58,237,0.5)]">
          <Smartphone className="size-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight">LinkGestor</span>
      </div>

      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Acesse sua conta</CardTitle>
          <CardDescription>
            Entre com seu e-mail e senha para gerenciar sua assistência.
            <br />
            <span className="text-xs text-primary/80 mt-1 block">
              Demo: admin@linkgestor.com / Admin123!
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@linkgestor.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Entrar na plataforma
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Cadastre-se grátis
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
