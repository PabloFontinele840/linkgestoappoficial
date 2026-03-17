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
      service_orders: {
        Row: {
          created_at: string
          customer_id: string | null
          id: string
          product_id: string | null
          service_id: string | null
          status: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: string
          product_id?: string | null
          service_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
          value?: number
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: string
          product_id?: string | null
          service_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          value?: number
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
// Table: service_orders
//   FOREIGN KEY service_orders_customer_id_fkey: FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
//   PRIMARY KEY service_orders_pkey: PRIMARY KEY (id)
//   FOREIGN KEY service_orders_product_id_fkey: FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
//   FOREIGN KEY service_orders_service_id_fkey: FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
//   CHECK service_orders_status_check: CHECK ((status = ANY (ARRAY['Pendente'::text, 'Em Andamento'::text, 'Finalizado'::text, 'Cancelado'::text])))
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
//     RETURN NEW;
//   END;
//   $function$
//

// --- INDEXES ---
// Table: monthly_goals
//   CREATE UNIQUE INDEX monthly_goals_user_id_month_year_key ON public.monthly_goals USING btree (user_id, month_year)
