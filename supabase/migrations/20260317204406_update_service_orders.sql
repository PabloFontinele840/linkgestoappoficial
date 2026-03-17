-- 1. Drop old constraint first to allow updates
ALTER TABLE public.service_orders DROP CONSTRAINT IF EXISTS service_orders_status_check;

-- 2. Update existing statuses to match new constraint
UPDATE public.service_orders SET status = 'Aberta' WHERE status = 'Pendente';
UPDATE public.service_orders SET status = 'Em andamento' WHERE status = 'Em Andamento';
UPDATE public.service_orders SET status = 'Finalizada' WHERE status = 'Finalizado';
UPDATE public.service_orders SET status = 'Cancelada' WHERE status = 'Cancelado';

-- 3. Add new columns to service_orders
ALTER TABLE public.service_orders
  ADD COLUMN IF NOT EXISTS device_brand TEXT,
  ADD COLUMN IF NOT EXISTS device_model TEXT,
  ADD COLUMN IF NOT EXISTS device_color TEXT,
  ADD COLUMN IF NOT EXISTS device_serial TEXT,
  ADD COLUMN IF NOT EXISTS service_type TEXT DEFAULT 'Balcão',
  ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'Normal',
  ADD COLUMN IF NOT EXISTS reported_problem TEXT,
  ADD COLUMN IF NOT EXISTS device_condition JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS accessories_delivered JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS technician_name TEXT,
  ADD COLUMN IF NOT EXISTS needs_parts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_value_to_be_defined BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS estimated_value NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS warranty_days INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS warranty_expiry_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS finished_at TIMESTAMPTZ;

-- 4. Add new constraint
ALTER TABLE public.service_orders ADD CONSTRAINT service_orders_status_check
  CHECK (status IN ('Aberta', 'Em análise', 'Aguardando aprovação', 'Aguardando peça', 'Em andamento', 'Finalizada', 'Entregue', 'Cancelada'));

-- 5. Create new tables for Logs and Attachments
CREATE TABLE IF NOT EXISTS public.service_order_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID NOT NULL REFERENCES public.service_orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.service_order_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID NOT NULL REFERENCES public.service_orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Setup RLS
ALTER TABLE public.service_order_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_order_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own logs" ON public.service_order_logs FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can access own attachments" ON public.service_order_attachments FOR ALL TO authenticated USING (user_id = auth.uid());

-- 7. Automated Warranty & Revenue Triggers
CREATE OR REPLACE FUNCTION public.handle_os_finalized()
RETURNS trigger AS $$
BEGIN
  -- Handle status change to Finalizada or Entregue
  IF NEW.status IN ('Finalizada', 'Entregue') AND OLD.status NOT IN ('Finalizada', 'Entregue') THEN
    -- Insert a transaction for the revenue
    INSERT INTO public.transactions (
      user_id, type, status, amount, category, description, date
    ) VALUES (
      NEW.user_id,
      'income',
      'Pago',
      COALESCE(NEW.value, NEW.estimated_value, 0),
      'Serviço',
      'OS ' || split_part(NEW.id::text, '-', 1),
      NOW()
    );

    -- Set finished_at and warranty_expiry_date if not set
    IF NEW.finished_at IS NULL THEN
      NEW.finished_at := NOW();
      IF NEW.warranty_days > 0 THEN
        NEW.warranty_expiry_date := NOW() + (NEW.warranty_days || ' days')::interval;
      END IF;
    END IF;
  END IF;

  -- Create log entry
  IF NEW.status != OLD.status THEN
    INSERT INTO public.service_order_logs (service_order_id, user_id, old_status, new_status)
    VALUES (NEW.id, NEW.user_id, OLD.status, NEW.status);
  END IF;

  -- Always update updated_at
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_os_status_change
  BEFORE UPDATE ON public.service_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_os_finalized();

CREATE OR REPLACE FUNCTION public.handle_os_created()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.service_order_logs (service_order_id, user_id, old_status, new_status)
  VALUES (NEW.id, NEW.user_id, NULL, NEW.status);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_os_created
  AFTER INSERT ON public.service_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_os_created();

