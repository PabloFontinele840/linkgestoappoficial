import { Outlet, Link, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useSettings } from '@/hooks/use-settings'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { NAV_ITEMS } from '@/lib/constants'

export default function Layout() {
  const location = useLocation()
  const { user, profile, signOut } = useAuth()
  const { settings } = useSettings()

  const handleSignOut = () => signOut()

  const displayName = settings?.business_name || profile?.store_name || 'Minha Assistência'

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50">
        <SidebarHeader className="p-4">
          <Link to="/" className="flex items-center gap-2 px-2 transition-opacity hover:opacity-80">
            {settings?.logo_url ? (
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden bg-white shadow-sm border border-border/50">
                <img src={settings.logo_url} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                {displayName.substring(0, 1).toUpperCase()}
              </div>
            )}
            <span className="text-xl font-bold tracking-tight truncate pr-2" title={displayName}>
              {displayName}
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium transition-all"
                    >
                      <Link to={item.path}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between rounded-xl bg-card p-2 border border-border/50">
            <div className="flex flex-col text-sm leading-tight pl-2">
              <span className="font-semibold truncate w-32">{profile?.full_name || 'Usuário'}</span>
              <span className="text-xs text-muted-foreground truncate w-32">{user?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              title="Sair"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 glass-header px-6">
          <SidebarTrigger className="-ml-2 md:hidden" />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium text-foreground hidden sm:inline-block">
                {displayName}
              </span>
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <span className="text-muted-foreground hidden sm:inline-block">por LinkGestor</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/configuracoes"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Configurações
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
