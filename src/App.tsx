import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { SettingsProvider } from '@/hooks/use-settings'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Layout from './components/Layout'
import Index from './pages/Index'
import Settings from './pages/Settings'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import Inventory from './pages/Inventory'
import Finance from './pages/Finance'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import AutoServiceAdmin from './pages/AutoServiceAdmin'
import PublicPortal from './pages/PublicPortal'
import Construction from './pages/Construction'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { NAV_ITEMS } from './lib/constants'

const App = () => {
  const implementedRoutes = [
    '/',
    '/configuracoes',
    '/ordens',
    '/clientes',
    '/fornecedores',
    '/estoque',
    '/financeiro',
    '/vendas',
    '/relatorios',
    '/autoatendimento',
  ]

  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <AuthProvider>
        <SettingsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/check/:slug" element={<PublicPortal />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/configuracoes" element={<Settings />} />
                  <Route path="/ordens" element={<Orders />} />
                  <Route path="/clientes" element={<Customers />} />
                  <Route path="/fornecedores" element={<Suppliers />} />
                  <Route path="/estoque" element={<Inventory />} />
                  <Route path="/financeiro" element={<Finance />} />
                  <Route path="/vendas" element={<Sales />} />
                  <Route path="/relatorios" element={<Reports />} />
                  <Route path="/autoatendimento" element={<AutoServiceAdmin />} />

                  {NAV_ITEMS.filter((item) => !implementedRoutes.includes(item.path)).map(
                    (item) => (
                      <Route key={item.path} path={item.path} element={<Construction />} />
                    ),
                  )}
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
