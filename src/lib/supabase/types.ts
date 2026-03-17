// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      business_settings: {
        Row: {
          address: string | null
          business_name: string
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          phone: string | null
          theme_color: string
          theme_mode: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          business_name?: string
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          theme_color?: string
          theme_mode?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          business_name?: string
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          theme_color?: string
          theme_mode?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      monthly_goals: {
        Row: {
          created_at: string
          id: string
          month_year: string
          target_value: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          month_year: string
          target_value?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          month_year?: string
          target_value?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          id: string
          min_stock_level: number
          name: string
          price: number
          stock_quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          min_stock_level?: number
          name: string
          price?: number
          stock_quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          min_stock_level?: number
          name?: string
          price?: number
          stock_quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          logo_url: string | null
          store_name: string | null
          theme_color: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          logo_url?: string | null
          store_name?: string | null
          theme_color?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          logo_url?: string | null
          store_name?: string | null
          theme_color?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_order_attachments: {
        Row: {
          created_at: string
          file_type: string | null
          file_url: string
          id: string
          service_order_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_type?: string | null
          file_url: string
          id?: string
          service_order_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_type?: string | null
          file_url?: string
          id?: string
          service_order_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'service_order_attachments_service_order_id_fkey'
            columns: ['service_order_id']
            isOneToOne: false
            referencedRelation: 'service_orders'
            referencedColumns: ['id']
          },
        ]
      }
      service_order_logs: {
        Row: {
          created_at: string
          id: string
          new_status: string
          old_status: string | null
          service_order_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_status: string
          old_status?: string | null
          service_order_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          new_status?: string
          old_status?: string | null
          service_order_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'service_order_logs_service_order_id_fkey'
            columns: ['service_order_id']
            isOneToOne: false
            referencedRelation: 'service_orders'
            referencedColumns: ['id']
          },
        ]
      }
      service_orders: {
        Row: {
          accessories_delivered: Json | null
          created_at: string
          customer_id: string | null
          device_brand: string | null
          device_color: string | null
          device_condition: Json | null
          device_model: string | null
          device_serial: string | null
          estimated_value: number | null
          finished_at: string | null
          id: string
          is_value_to_be_defined: boolean | null
          needs_parts: boolean | null
          priority: string | null
          product_id: string | null
          reported_problem: string | null
          service_id: string | null
          service_type: string | null
          status: string
          technician_name: string | null
          updated_at: string
          user_id: string
          value: number
          warranty_days: number | null
          warranty_expiry_date: string | null
        }
        Insert: {
          accessories_delivered?: Json | null
          created_at?: string
          customer_id?: string | null
          device_brand?: string | null
          device_color?: string | null
          device_condition?: Json | null
          device_model?: string | null
          device_serial?: string | null
          estimated_value?: number | null
          finished_at?: string | null
          id?: string
          is_value_to_be_defined?: boolean | null
          needs_parts?: boolean | null
          priority?: string | null
          product_id?: string | null
          reported_problem?: string | null
          service_id?: string | null
          service_type?: string | null
          status?: string
          technician_name?: string | null
          updated_at?: string
          user_id: string
          value?: number
          warranty_days?: number | null
          warranty_expiry_date?: string | null
        }
        Update: {
          accessories_delivered?: Json | null
          created_at?: string
          customer_id?: string | null
          device_brand?: string | null
          device_color?: string | null
          device_condition?: Json | null
          device_model?: string | null
          device_serial?: string | null
          estimated_value?: number | null
          finished_at?: string | null
          id?: string
          is_value_to_be_defined?: boolean | null
          needs_parts?: boolean | null
          priority?: string | null
          product_id?: string | null
          reported_problem?: string | null
          service_id?: string | null
          service_type?: string | null
          status?: string
          technician_name?: string | null
          updated_at?: string
          user_id?: string
          value?: number
          warranty_days?: number | null
          warranty_expiry_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'service_orders_customer_id_fkey'
            columns: ['customer_id']
            isOneToOne: false
            referencedRelation: 'customers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'service_orders_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'service_orders_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          id: string
          name: string
          price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          price?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string | null
          id: string
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          category: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: business_settings
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   business_name: text (not null, default: 'Minha Assistência'::text)
//   phone: text (nullable)
//   address: text (nullable)
//   description: text (nullable)
//   logo_url: text (nullable)
//   theme_mode: text (not null, default: 'dark'::text)
//   theme_color: text (not null, default: 'purple'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: customers
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   email: text (nullable)
//   phone: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: monthly_goals
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   month_year: date (not null)
//   target_value: numeric (not null, default: 0)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: products
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   stock_quantity: integer (not null, default: 0)
//   min_stock_level: integer (not null, default: 5)
//   price: numeric (not null, default: 0)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: profiles
//   id: uuid (not null)
//   full_name: text (nullable)
//   store_name: text (nullable)
//   logo_url: text (nullable)
//   theme_color: text (nullable, default: 'Roxo'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: service_order_attachments
//   id: uuid (not null, default: gen_random_uuid())
//   service_order_id: uuid (not null)
//   user_id: uuid (not null)
//   file_url: text (not null)
//   file_type: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: service_order_logs
//   id: uuid (not null, default: gen_random_uuid())
//   service_order_id: uuid (not null)
//   user_id: uuid (not null)
//   old_status: text (nullable)
//   new_status: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: service_orders
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   customer_id: uuid (nullable)
//   service_id: uuid (nullable)
//   product_id: uuid (nullable)
//   status: text (not null, default: 'Pendente'::text)
//   value: numeric (not null, default: 0)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
//   device_brand: text (nullable)
//   device_model: text (nullable)
//   device_color: text (nullable)
//   device_serial: text (nullable)
//   service_type: text (nullable, default: 'Balcão'::text)
//   priority: text (nullable, default: 'Normal'::text)
//   reported_problem: text (nullable)
//   device_condition: jsonb (nullable, default: '[]'::jsonb)
//   accessories_delivered: jsonb (nullable, default: '[]'::jsonb)
//   technician_name: text (nullable)
//   needs_parts: boolean (nullable, default: false)
//   is_value_to_be_defined: boolean (nullable, default: false)
//   estimated_value: numeric (nullable, default: 0)
//   warranty_days: integer (nullable, default: 0)
//   warranty_expiry_date: timestamp with time zone (nullable)
//   finished_at: timestamp with time zone (nullable)
// Table: services
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   price: numeric (not null, default: 0)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: transactions
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   type: text (not null)
//   status: text (not null, default: 'Pago'::text)
//   amount: numeric (not null, default: 0)
//   category: text (not null)
//   description: text (nullable)
//   date: timestamp with time zone (not null, default: now())
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: business_settings
//   PRIMARY KEY business_settings_pkey: PRIMARY KEY (id)
//   FOREIGN KEY business_settings_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   UNIQUE business_settings_user_id_key: UNIQUE (user_id)
// Table: customers
//   PRIMARY KEY customers_pkey: PRIMARY KEY (id)
//   FOREIGN KEY customers_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: monthly_goals
//   PRIMARY KEY monthly_goals_pkey: PRIMARY KEY (id)
//   FOREIGN KEY monthly_goals_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   UNIQUE monthly_goals_user_id_month_year_key: UNIQUE (user_id, month_year)
// Table: products
//   PRIMARY KEY products_pkey: PRIMARY KEY (id)
//   FOREIGN KEY products_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: service_order_attachments
//   PRIMARY KEY service_order_attachments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY service_order_attachments_service_order_id_fkey: FOREIGN KEY (service_order_id) REFERENCES service_orders(id) ON DELETE CASCADE
//   FOREIGN KEY service_order_attachments_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: service_order_logs
//   PRIMARY KEY service_order_logs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY service_order_logs_service_order_id_fkey: FOREIGN KEY (service_order_id) REFERENCES service_orders(id) ON DELETE CASCADE
//   FOREIGN KEY service_order_logs_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: service_orders
//   FOREIGN KEY service_orders_customer_id_fkey: FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
//   PRIMARY KEY service_orders_pkey: PRIMARY KEY (id)
//   FOREIGN KEY service_orders_product_id_fkey: FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
//   FOREIGN KEY service_orders_service_id_fkey: FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
//   CHECK service_orders_status_check: CHECK ((status = ANY (ARRAY['Aberta'::text, 'Em análise'::text, 'Aguardando aprovação'::text, 'Aguardando peça'::text, 'Em andamento'::text, 'Finalizada'::text, 'Entregue'::text, 'Cancelada'::text])))
//   FOREIGN KEY service_orders_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: services
//   PRIMARY KEY services_pkey: PRIMARY KEY (id)
//   FOREIGN KEY services_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: transactions
//   PRIMARY KEY transactions_pkey: PRIMARY KEY (id)
//   CHECK transactions_status_check: CHECK ((status = ANY (ARRAY['Pendente'::text, 'Pago'::text])))
//   CHECK transactions_type_check: CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text])))
//   FOREIGN KEY transactions_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: business_settings
//   Policy "Users can insert own settings" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Users can select own settings" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can update own settings" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: customers
//   Policy "Users can access own customers" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: monthly_goals
//   Policy "Users can access own goals" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: products
//   Policy "Users can access own products" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: profiles
//   Policy "Users can access own profile" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (id = auth.uid())
// Table: service_order_attachments
//   Policy "Users can access own attachments" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: service_order_logs
//   Policy "Users can access own logs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: service_orders
//   Policy "Users can access own orders" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: services
//   Policy "Users can access own services" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: transactions
//   Policy "Users can access own transactions" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id, full_name, store_name)
//     VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'Minha Assistência');
//
//     INSERT INTO public.business_settings (user_id, business_name)
//     VALUES (NEW.id, 'Minha Assistência');
//
//     RETURN NEW;
//   END;
//   $function$
//
// FUNCTION handle_os_created()
//   CREATE OR REPLACE FUNCTION public.handle_os_created()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.service_order_logs (service_order_id, user_id, old_status, new_status)
//     VALUES (NEW.id, NEW.user_id, NULL, NEW.status);
//     RETURN NEW;
//   END;
//   $function$
//
// FUNCTION handle_os_finalized()
//   CREATE OR REPLACE FUNCTION public.handle_os_finalized()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     -- Handle status change to Finalizada or Entregue
//     IF NEW.status IN ('Finalizada', 'Entregue') AND OLD.status NOT IN ('Finalizada', 'Entregue') THEN
//       -- Insert a transaction for the revenue
//       INSERT INTO public.transactions (
//         user_id, type, status, amount, category, description, date
//       ) VALUES (
//         NEW.user_id,
//         'income',
//         'Pago',
//         COALESCE(NEW.value, NEW.estimated_value, 0),
//         'Serviço',
//         'OS ' || split_part(NEW.id::text, '-', 1),
//         NOW()
//       );
//
//       -- Set finished_at and warranty_expiry_date if not set
//       IF NEW.finished_at IS NULL THEN
//         NEW.finished_at := NOW();
//         IF NEW.warranty_days > 0 THEN
//           NEW.warranty_expiry_date := NOW() + (NEW.warranty_days || ' days')::interval;
//         END IF;
//       END IF;
//     END IF;
//
//     -- Create log entry
//     IF NEW.status != OLD.status THEN
//       INSERT INTO public.service_order_logs (service_order_id, user_id, old_status, new_status)
//       VALUES (NEW.id, NEW.user_id, OLD.status, NEW.status);
//     END IF;
//
//     -- Always update updated_at
//     NEW.updated_at := NOW();
//
//     RETURN NEW;
//   END;
//   $function$
//

// --- TRIGGERS ---
// Table: service_orders
//   on_os_created: CREATE TRIGGER on_os_created AFTER INSERT ON public.service_orders FOR EACH ROW EXECUTE FUNCTION handle_os_created()
//   on_os_status_change: CREATE TRIGGER on_os_status_change BEFORE UPDATE ON public.service_orders FOR EACH ROW EXECUTE FUNCTION handle_os_finalized()

// --- INDEXES ---
// Table: business_settings
//   CREATE UNIQUE INDEX business_settings_user_id_key ON public.business_settings USING btree (user_id)
// Table: monthly_goals
//   CREATE UNIQUE INDEX monthly_goals_user_id_month_year_key ON public.monthly_goals USING btree (user_id, month_year)
