-- Add new columns to business_settings
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS auto_active BOOLEAN DEFAULT false;
ALTER TABLE public.business_settings ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- Create auto_brands table
CREATE TABLE public.auto_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create auto_models table
CREATE TABLE public.auto_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES public.auto_brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create auto_defects table
CREATE TABLE public.auto_defects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create auto_services table
CREATE TABLE public.auto_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  model_id UUID NOT NULL REFERENCES public.auto_models(id) ON DELETE CASCADE,
  defect_id UUID NOT NULL REFERENCES public.auto_defects(id) ON DELETE CASCADE,
  price NUMERIC,
  estimated_time TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(model_id, defect_id)
);

-- Enable RLS
ALTER TABLE public.auto_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_defects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_services ENABLE ROW LEVEL SECURITY;

-- Policies for Authenticated users
CREATE POLICY "Users can manage their brands" ON public.auto_brands 
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their models" ON public.auto_models 
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their defects" ON public.auto_defects 
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their services" ON public.auto_services 
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Policies for Public (Anon) users
CREATE POLICY "Public select settings" ON public.business_settings 
  FOR SELECT TO public USING (auto_active = true);

CREATE POLICY "Public select brands" ON public.auto_brands 
  FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Public select models" ON public.auto_models 
  FOR SELECT TO public USING (true);

CREATE POLICY "Public select defects" ON public.auto_defects 
  FOR SELECT TO public USING (true);

CREATE POLICY "Public select services" ON public.auto_services 
  FOR SELECT TO public USING (true);
