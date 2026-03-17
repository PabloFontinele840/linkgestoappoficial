import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import Settings from './pages/Settings'
import Construction from './pages/Construction'
import NotFound from './pages/NotFound'
import { NAV_ITEMS } from './lib/constants'

const App = () => {
  // Routes that have actual implementations
  const implementedRoutes = ['/', '/configuracoes']

  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/configuracoes" element={<Settings />} />

            {/* Generate construction pages for all other sidebar items dynamically */}
            {NAV_ITEMS.filter((item) => !implementedRoutes.includes(item.path)).map((item) => (
              <Route key={item.path} path={item.path} element={<Construction />} />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
