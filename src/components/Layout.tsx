import { Outlet, Link, useLocation } from 'react-router-dom'
import { Bell, LogOut, Smartphone } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { NAV_ITEMS } from '@/lib/constants'

export default function Layout() {
  const location = useLocation()
  const { user, profile, signOut } = useAuth()

  const handleSignOut = () => signOut()

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50">
        <SidebarHeader className="p-4">
          <Link to="/" className="flex items-center gap-2 px-2 transition-opacity hover:opacity-80">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <Smartphone className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">LinkGestor</span>
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
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${user?.id}`} />
                <AvatarFallback className="rounded-md">
                  {profile?.full_name?.substring(0, 2).toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm leading-tight">
                <span className="font-semibold truncate w-24">
                  {profile?.full_name || 'Usuário'}
                </span>
                <span className="text-xs text-muted-foreground truncate w-24">{user?.email}</span>
              </div>
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
                {profile?.store_name || 'Minha Assistência'}
              </span>
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <span className="text-muted-foreground">por LinkGestor</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground relative"
              >
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              </Button>
              <Avatar className="h-8 w-8 rounded-md border border-border/50 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage
                  src={
                    profile?.logo_url ||
                    'https://img.usecurling.com/i?q=tech%20store&shape=fill&color=violet'
                  }
                />
                <AvatarFallback className="rounded-md">LG</AvatarFallback>
              </Avatar>
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
