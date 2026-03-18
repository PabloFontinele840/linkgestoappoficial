-- Create cash_sessions table
CREATE TABLE IF NOT EXISTS public.cash_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opening_balance NUMERIC NOT NULL DEFAULT 0,
  closing_balance NUMERIC,
  reported_closing_balance NUMERIC,
  total_entries NUMERIC NOT NULL DEFAULT 0,
  total_exits NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('aberto', 'fechado')) DEFAULT 'aberto',
  opened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at TIMESTAMPTZ,
  notes TEXT
);

ALTER TABLE public.cash_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own cash_sessions" ON public.cash_sessions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own cash_sessions" ON public.cash_sessions FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own cash_sessions" ON public.cash_sessions FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can delete own cash_sessions" ON public.cash_sessions FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Update cash_movements
ALTER TABLE public.cash_movements ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES public.cash_sessions(id) ON DELETE CASCADE;

-- Update financial_transactions
ALTER TABLE public.financial_transactions ADD COLUMN IF NOT EXISTS origin_id UUID;
ALTER TABLE public.financial_transactions ADD COLUMN IF NOT EXISTS origin_type TEXT;

-- Remove old triggers that might interfere with app-layer financial sync
DROP TRIGGER IF EXISTS on_os_payment_status_change ON public.service_orders;
DROP TRIGGER IF EXISTS on_os_payment_status_insert ON public.service_orders;
DROP TRIGGER IF EXISTS on_os_status_change ON public.service_orders;

-- Keep log trigger
CREATE OR REPLACE FUNCTION public.handle_os_status_log()
RETURNS trigger AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    INSERT INTO public.service_order_logs (service_order_id, user_id, old_status, new_status)
    VALUES (NEW.id, NEW.user_id, OLD.status, NEW.status);
  END IF;
  
  IF NEW.status IN ('Finalizada', 'Entregue') AND OLD.status NOT IN ('Finalizada', 'Entregue') THEN
    IF NEW.finished_at IS NULL THEN
      NEW.finished_at := NOW();
      IF NEW.warranty_days > 0 THEN
        NEW.warranty_expiry_date := NOW() + (NEW.warranty_days || ' days')::interval;
      END IF;
    END IF;
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_os_status_log
  BEFORE UPDATE ON public.service_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_os_status_log();
