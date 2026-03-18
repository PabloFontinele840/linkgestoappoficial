ALTER TABLE public.services RENAME COLUMN price TO final_price;
ALTER TABLE public.services ADD COLUMN cost NUMERIC DEFAULT 0;
ALTER TABLE public.services ADD COLUMN status TEXT DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Inativo'));

ALTER TABLE public.os_items ADD COLUMN service_id UUID REFERENCES public.services(id) ON DELETE SET NULL;

-- Update RLS policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public select services" ON public.services;
DROP POLICY IF EXISTS "Users can manage their services" ON public.services;
DROP POLICY IF EXISTS "Users can access own services" ON public.services;
DROP POLICY IF EXISTS "Users can select own services" ON public.services;
DROP POLICY IF EXISTS "Users can insert own services" ON public.services;
DROP POLICY IF EXISTS "Users can update own services" ON public.services;
DROP POLICY IF EXISTS "Users can delete own services" ON public.services;

CREATE POLICY "Users can select own services" ON public.services FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own services" ON public.services FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own services" ON public.services FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own services" ON public.services FOR DELETE TO authenticated USING (user_id = auth.uid());
