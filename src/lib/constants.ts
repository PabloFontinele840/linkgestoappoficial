import {
  LayoutDashboard,
  Wrench,
  Users,
  Package,
  Truck,
  DollarSign,
  ShoppingCart,
  BarChart,
  Calendar,
  Phone,
  Bot,
  Settings,
} from 'lucide-react'

export const NAV_ITEMS = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Ordens de Serviço', icon: Wrench, path: '/ordens' },
  { title: 'Clientes', icon: Users, path: '/clientes' },
  { title: 'Estoque', icon: Package, path: '/estoque' },
  { title: 'Fornecedores', icon: Truck, path: '/fornecedores' },
  { title: 'Financeiro', icon: DollarSign, path: '/financeiro' },
  { title: 'Vendas', icon: ShoppingCart, path: '/vendas' },
  { title: 'Relatórios', icon: BarChart, path: '/relatorios' },
  { title: 'Agendamentos', icon: Calendar, path: '/agendamentos' },
  { title: 'Autoatendimento', icon: Phone, path: '/autoatendimento' },
  { title: 'Inteligência Artificial', icon: Bot, path: '/ia' },
  { title: 'Configurações', icon: Settings, path: '/configuracoes' },
]

export const MOCK_ORDERS = [
  {
    id: 'OS-1042',
    client: 'Carlos Silva',
    service: 'Troca de Tela - iPhone 13',
    status: 'Em Análise',
    value: 'R$ 850,00',
    date: 'Hoje, 14:30',
  },
  {
    id: 'OS-1041',
    client: 'Mariana Costa',
    service: 'Bateria - Samsung S22',
    status: 'Em Aberto',
    value: 'R$ 320,00',
    date: 'Hoje, 11:15',
  },
  {
    id: 'OS-1040',
    client: 'Roberto Alves',
    service: 'Conector de Carga - Moto G',
    status: 'Finalizado',
    value: 'R$ 150,00',
    date: 'Ontem, 16:45',
  },
  {
    id: 'OS-1039',
    client: 'Ana Paula',
    service: 'Recuperação de Placa - Xiaomi',
    status: 'Cancelado',
    value: 'R$ 400,00',
    date: 'Ontem, 10:20',
  },
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
