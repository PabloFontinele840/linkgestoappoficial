-- Create Inventory Items Table
CREATE TABLE IF NOT EXISTS public.inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    device_brand TEXT,
    device_model TEXT,
    part_brand TEXT,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    sku TEXT,
    quantity INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 0,
    cost_price NUMERIC DEFAULT 0,
    suggested_price NUMERIC DEFAULT 0,
    location TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Inventory Movements Table
CREATE TABLE IF NOT EXISTS public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.inventory_items(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('Entrada', 'Saída', 'Ajuste')),
    quantity INTEGER NOT NULL,
    reason TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Financial Transactions Table
CREATE TABLE IF NOT EXISTS public.financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('entrada', 'saida')),
    description TEXT NOT NULL,
    category TEXT,
    amount NUMERIC NOT NULL DEFAULT 0,
    payment_method TEXT,
    transaction_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('recebido', 'pago', 'pendente', 'vencido')),
    origin TEXT DEFAULT 'manual',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS inventory_items
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own inventory items" ON public.inventory_items FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own inventory items" ON public.inventory_items FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own inventory items" ON public.inventory_items FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own inventory items" ON public.inventory_items FOR DELETE TO authenticated USING (user_id = auth.uid());

-- RLS inventory_movements
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own inventory movements" ON public.inventory_movements FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own inventory movements" ON public.inventory_movements FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own inventory movements" ON public.inventory_movements FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own inventory movements" ON public.inventory_movements FOR DELETE TO authenticated USING (user_id = auth.uid());

-- RLS financial_transactions
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own financial transactions" ON public.financial_transactions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own financial transactions" ON public.financial_transactions FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own financial transactions" ON public.financial_transactions FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own financial transactions" ON public.financial_transactions FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Trigger for stock updates
CREATE OR REPLACE FUNCTION public.handle_inventory_movement()
RETURNS trigger AS $$
BEGIN
    IF NEW.type = 'Entrada' THEN
        UPDATE public.inventory_items SET quantity = quantity + NEW.quantity WHERE id = NEW.item_id;
    ELSIF NEW.type = 'Saída' THEN
        IF (SELECT quantity FROM public.inventory_items WHERE id = NEW.item_id) < NEW.quantity THEN
            RAISE EXCEPTION 'Estoque insuficiente para a saída.';
        END IF;
        UPDATE public.inventory_items SET quantity = quantity - NEW.quantity WHERE id = NEW.item_id;
    ELSIF NEW.type = 'Ajuste' THEN
        UPDATE public.inventory_items SET quantity = NEW.quantity WHERE id = NEW.item_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_inventory_movement
    AFTER INSERT ON public.inventory_movements
    FOR EACH ROW EXECUTE FUNCTION public.handle_inventory_movement();
