-- Create Tables
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  store_name TEXT,
  logo_url TEXT,
  theme_color TEXT DEFAULT 'Roxo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  min_stock_level INTEGER NOT NULL DEFAULT 5,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('Pendente', 'Em Andamento', 'Finalizado', 'Cancelado')) DEFAULT 'Pendente',
  value NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.monthly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month_year DATE NOT NULL,
  target_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, month_year)
);

CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  status TEXT NOT NULL DEFAULT 'Pago' CHECK (status IN ('Pendente', 'Pago')),
  amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can access own profile" ON public.profiles FOR ALL TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can access own customers" ON public.customers FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can access own products" ON public.products FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can access own services" ON public.services FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can access own orders" ON public.service_orders FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can access own goals" ON public.monthly_goals FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can access own transactions" ON public.transactions FOR ALL TO authenticated USING (user_id = auth.uid());

-- Trigger to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, store_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'Minha Assistência');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed Data for Testing
DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  cust1_id uuid := gen_random_uuid();
  cust2_id uuid := gen_random_uuid();
  prod1_id uuid := gen_random_uuid();
  prod2_id uuid := gen_random_uuid();
  serv1_id uuid := gen_random_uuid();
  serv2_id uuid := gen_random_uuid();
  target_date date := date_trunc('month', NOW())::date;
BEGIN
  -- 1. Insert Admin User
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, role, aud,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current,
    phone, phone_change, phone_change_token, reauthentication_token
  ) VALUES (
    admin_id, '00000000-0000-0000-0000-000000000000', 'admin@linkgestor.com', crypt('Admin123!', gen_salt('bf')), NOW(), NOW(), NOW(),
    '{"provider": "email", "providers": ["email"]}', '{"full_name": "Admin Demo"}', false, 'authenticated', 'authenticated',
    '', '', '', '', '', NULL, '', '', ''
  );

  -- Update auto-created profile
  UPDATE public.profiles SET store_name = 'LinkGestor Tech' WHERE id = admin_id;

  -- 2. Insert Customers
  INSERT INTO public.customers (id, user_id, name, email, phone) VALUES 
  (cust1_id, admin_id, 'Carlos Silva', 'carlos@ex.com', '11999999999'),
  (cust2_id, admin_id, 'Mariana Costa', 'mariana@ex.com', '11988888888');

  -- 3. Insert Products
  INSERT INTO public.products (id, user_id, name, stock_quantity, min_stock_level, price) VALUES 
  (prod1_id, admin_id, 'Tela iPhone 13', 2, 5, 450.00), -- Low stock
  (prod2_id, admin_id, 'Bateria Samsung S22', 15, 5, 120.00);

  -- 4. Insert Services
  INSERT INTO public.services (id, user_id, name, price) VALUES 
  (serv1_id, admin_id, 'Troca de Tela', 150.00),
  (serv2_id, admin_id, 'Troca de Bateria', 80.00);

  -- 5. Insert Orders (Mix of today and older)
  INSERT INTO public.service_orders (user_id, customer_id, service_id, product_id, status, value, created_at, updated_at) VALUES 
  (admin_id, cust1_id, serv1_id, prod1_id, 'Pendente', 600.00, NOW() - interval '8 days', NOW()), -- Overdue
  (admin_id, cust2_id, serv2_id, prod2_id, 'Em Andamento', 200.00, NOW(), NOW()),
  (admin_id, cust1_id, serv1_id, prod1_id, 'Finalizado', 600.00, NOW(), NOW()),
  (admin_id, cust2_id, serv1_id, prod1_id, 'Finalizado', 600.00, NOW() - interval '2 days', NOW() - interval '2 days');

  -- 6. Insert Goal
  INSERT INTO public.monthly_goals (user_id, month_year, target_value) VALUES 
  (admin_id, target_date, 15000.00);

  -- 7. Insert Transactions (Current and past month for charts)
  INSERT INTO public.transactions (user_id, type, amount, category, description, date) VALUES 
  (admin_id, 'income', 600.00, 'Serviço', 'OS 1', NOW()),
  (admin_id, 'income', 600.00, 'Serviço', 'OS 2', NOW() - interval '2 days'),
  (admin_id, 'income', 1200.00, 'Serviço', 'OS Vendas', NOW() - interval '5 days'),
  (admin_id, 'expense', 400.00, 'Peças', 'Fornecedor XYZ', NOW() - interval '1 day'),
  (admin_id, 'expense', 150.00, 'Contas', 'Luz pendente', NOW()),
  -- Past month
  (admin_id, 'income', 5000.00, 'Serviço', 'Mes passado', NOW() - interval '1 month'),
  (admin_id, 'expense', 2000.00, 'Peças', 'Mes passado', NOW() - interval '1 month');

  -- Insert pending transaction
  INSERT INTO public.transactions (user_id, type, status, amount, category, description, date) VALUES 
  (admin_id, 'expense', 'Pendente', 350.00, 'Fornecedor', 'Peças iPhone', NOW());

END $$;
