import {
  LayoutDashboard,
  Wrench,
  Users,
  Package,
  Truck,
  DollarSign,
  ShoppingCart,
  BarChart,
  Settings,
  Wallet,
} from 'lucide-react'

export const NAV_ITEMS = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Caixa', icon: Wallet, path: '/caixa' },
  { title: 'Ordens de Serviço', icon: Wrench, path: '/ordens' },
  { title: 'Clientes', icon: Users, path: '/clientes' },
  { title: 'Estoque', icon: Package, path: '/estoque' },
  { title: 'Fornecedores', icon: Truck, path: '/fornecedores' },
  { title: 'Financeiro', icon: DollarSign, path: '/financeiro' },
  { title: 'Vendas', icon: ShoppingCart, path: '/vendas' },
  { title: 'Relatórios', icon: BarChart, path: '/relatorios' },
  { title: 'Configurações', icon: Settings, path: '/configuracoes' },
]

export const CHART_DATA = [
  { name: '01', atual: 1200, anterior: 900 },
  { name: '05', atual: 2100, anterior: 1500 },
  { name: '10', atual: 1800, anterior: 2000 },
  { name: '15', atual: 3200, anterior: 2400 },
  { name: '20', atual: 3800, anterior: 3100 },
  { name: '25', atual: 4500, anterior: 3800 },
  { name: '30', atual: 5100, anterior: 4200 },
]
