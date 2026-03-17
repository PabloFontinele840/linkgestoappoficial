CREATE TABLE IF NOT EXISTS public.business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL DEFAULT 'Minha Assistência',
  phone TEXT,
  address TEXT,
  description TEXT,
  logo_url TEXT,
  theme_mode TEXT NOT NULL DEFAULT 'dark',
  theme_color TEXT NOT NULL DEFAULT 'purple',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can select own settings" ON public.business_settings
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can insert own settings" ON public.business_settings
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own settings" ON public.business_settings
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Seed existing users
INSERT INTO public.business_settings (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- Update trigger for new users to also create business_settings
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, store_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'Minha Assistência');

  INSERT INTO public.business_settings (user_id, business_name)
  VALUES (NEW.id, 'Minha Assistência');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
