import { CashierDashboard } from '@/components/cashier/CashierDashboard'

export default function Cashier() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Caixa</h1>
        <p className="text-muted-foreground">Gerencie as entradas e saídas financeiras diárias.</p>
      </div>
      <CashierDashboard />
    </div>
  )
}
