import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Layout from './components/Layout'
import Index from './pages/Index'
import Settings from './pages/Settings'
import Construction from './pages/Construction'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { NAV_ITEMS } from './lib/constants'

const App = () => {
  const implementedRoutes = ['/', '/configuracoes']

  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/configuracoes" element={<Settings />} />
                {NAV_ITEMS.filter((item) => !implementedRoutes.includes(item.path)).map((item) => (
                  <Route key={item.path} path={item.path} element={<Construction />} />
                ))}
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
