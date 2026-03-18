-- Add payment columns to service_orders
ALTER TABLE public.service_orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Pendente';
ALTER TABLE public.service_orders ADD COLUMN IF NOT EXISTS payment_method TEXT;

-- Create os_items table
CREATE TABLE IF NOT EXISTS public.os_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  os_id UUID NOT NULL REFERENCES public.service_orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('Peça', 'Serviço', 'Mão de obra')),
  description TEXT NOT NULL,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  cost NUMERIC DEFAULT 0,
  price NUMERIC DEFAULT 0,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.os_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own os_items" ON public.os_items 
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can insert own os_items" ON public.os_items 
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own os_items" ON public.os_items 
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own os_items" ON public.os_items 
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Create cash_movements table
CREATE TABLE IF NOT EXISTS public.cash_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('entrada', 'saida')),
  amount NUMERIC NOT NULL,
  origin TEXT CHECK (origin IN ('os', 'venda', 'manual')),
  reference_id UUID,
  description TEXT NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.cash_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own cash_movements" ON public.cash_movements 
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can insert own cash_movements" ON public.cash_movements 
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own cash_movements" ON public.cash_movements 
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own cash_movements" ON public.cash_movements 
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Triggers for automatic cash movement on OS payment
CREATE OR REPLACE FUNCTION public.handle_os_payment()
RETURNS trigger AS $$
BEGIN
  IF NEW.payment_status = 'Pago' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'Pago') THEN
    INSERT INTO public.cash_movements (user_id, type, amount, origin, reference_id, description, payment_method)
    VALUES (NEW.user_id, 'entrada', COALESCE(NEW.value, 0), 'os', NEW.id, 'OS ' || split_part(NEW.id::text, '-', 1), NEW.payment_method);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_os_payment_status_change
  AFTER UPDATE ON public.service_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_os_payment();

CREATE OR REPLACE FUNCTION public.handle_os_payment_insert()
RETURNS trigger AS $$
BEGIN
  IF NEW.payment_status = 'Pago' THEN
    INSERT INTO public.cash_movements (user_id, type, amount, origin, reference_id, description, payment_method)
    VALUES (NEW.user_id, 'entrada', COALESCE(NEW.value, 0), 'os', NEW.id, 'OS ' || split_part(NEW.id::text, '-', 1), NEW.payment_method);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_os_payment_status_insert
  AFTER INSERT ON public.service_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_os_payment_insert();
