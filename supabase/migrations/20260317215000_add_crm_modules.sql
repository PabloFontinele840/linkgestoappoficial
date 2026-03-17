-- Create Suppliers Table
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    city TEXT,
    state TEXT,
    specialty TEXT DEFAULT 'Geral',
    status TEXT DEFAULT 'Ativo',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS and create policy for suppliers
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own suppliers" ON public.suppliers
    FOR ALL TO authenticated USING (user_id = auth.uid());

-- Update Customers Table
ALTER TABLE public.customers
    ADD COLUMN IF NOT EXISTS cpf TEXT,
    ADD COLUMN IF NOT EXISTS address TEXT,
    ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Ativo',
    ADD COLUMN IF NOT EXISTS notes TEXT;
