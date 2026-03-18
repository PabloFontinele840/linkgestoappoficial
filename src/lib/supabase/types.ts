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
      appointments: {
        Row: {
          created_at: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          scheduled_at: string
          service_type: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          scheduled_at: string
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          scheduled_at?: string
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      auto_brands: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      auto_defects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      auto_models: {
        Row: {
          brand_id: string
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          brand_id: string
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          brand_id?: string
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'auto_models_brand_id_fkey'
            columns: ['brand_id']
            isOneToOne: false
            referencedRelation: 'auto_brands'
            referencedColumns: ['id']
          },
        ]
      }
      auto_services: {
        Row: {
          created_at: string
          defect_id: string
          estimated_time: string | null
          id: string
          model_id: string
          notes: string | null
          price: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          defect_id: string
          estimated_time?: string | null
          id?: string
          model_id: string
          notes?: string | null
          price?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          defect_id?: string
          estimated_time?: string | null
          id?: string
          model_id?: string
          notes?: string | null
          price?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'auto_services_defect_id_fkey'
            columns: ['defect_id']
            isOneToOne: false
            referencedRelation: 'auto_defects'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'auto_services_model_id_fkey'
            columns: ['model_id']
            isOneToOne: false
            referencedRelation: 'auto_models'
            referencedColumns: ['id']
          },
        ]
      }
      business_settings: {
        Row: {
          address: string | null
          auto_active: boolean | null
          business_name: string
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          phone: string | null
          slug: string | null
          theme_color: string
          theme_mode: string
          updated_at: string
          user_id: string
          whatsapp_number: string | null
        }
        Insert: {
          address?: string | null
          auto_active?: boolean | null
          business_name?: string
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          slug?: string | null
          theme_color?: string
          theme_mode?: string
          updated_at?: string
          user_id: string
          whatsapp_number?: string | null
        }
        Update: {
          address?: string | null
          auto_active?: boolean | null
          business_name?: string
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          slug?: string | null
          theme_color?: string
          theme_mode?: string
          updated_at?: string
          user_id?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          cpf: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          cpf?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          cpf?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          amount: number
          category: string | null
          classification: string
          created_at: string
          description: string
          id: string
          notes: string | null
          origin: string | null
          payment_method: string | null
          status: string
          transaction_date: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          category?: string | null
          classification?: string
          created_at?: string
          description: string
          id?: string
          notes?: string | null
          origin?: string | null
          payment_method?: string | null
          status: string
          transaction_date: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          classification?: string
          created_at?: string
          description?: string
          id?: string
          notes?: string | null
          origin?: string | null
          payment_method?: string | null
          status?: string
          transaction_date?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      inventory_items: {
        Row: {
          category: string | null
          cost_price: number | null
          created_at: string
          device_brand: string | null
          device_model: string | null
          id: string
          location: string | null
          minimum_stock: number | null
          name: string
          notes: string | null
          part_brand: string | null
          quantity: number | null
          sku: string | null
          suggested_price: number | null
          supplier_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          cost_price?: number | null
          created_at?: string
          device_brand?: string | null
          device_model?: string | null
          id?: string
          location?: string | null
          minimum_stock?: number | null
          name: string
          notes?: string | null
          part_brand?: string | null
          quantity?: number | null
          sku?: string | null
          suggested_price?: number | null
          supplier_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          cost_price?: number | null
          created_at?: string
          device_brand?: string | null
          device_model?: string | null
          id?: string
          location?: string | null
          minimum_stock?: number | null
          name?: string
          notes?: string | null
          part_brand?: string | null
          quantity?: number | null
          sku?: string | null
          suggested_price?: number | null
          supplier_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'inventory_items_supplier_id_fkey'
            columns: ['supplier_id']
            isOneToOne: false
            referencedRelation: 'suppliers'
            referencedColumns: ['id']
          },
        ]
      }
      inventory_movements: {
        Row: {
          created_at: string
          id: string
          item_id: string
          notes: string | null
          quantity: number
          reason: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          notes?: string | null
          quantity: number
          reason?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          notes?: string | null
          quantity?: number
          reason?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'inventory_movements_item_id_fkey'
            columns: ['item_id']
            isOneToOne: false
            referencedRelation: 'inventory_items'
            referencedColumns: ['id']
          },
        ]
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
      sale_items: {
        Row: {
          created_at: string
          id: string
          name: string
          quantity: number
          sale_id: string
          subtotal: number
          type: string
          unit_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          quantity?: number
          sale_id: string
          subtotal?: number
          type: string
          unit_price?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          quantity?: number
          sale_id?: string
          subtotal?: number
          type?: string
          unit_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sale_items_sale_id_fkey'
            columns: ['sale_id']
            isOneToOne: false
            referencedRelation: 'sales'
            referencedColumns: ['id']
          },
        ]
      }
      sales: {
        Row: {
          client_id: string | null
          client_name: string
          created_at: string
          discount: number
          final_amount: number
          id: string
          notes: string | null
          payment_method: string | null
          sale_date: string
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          client_name: string
          created_at?: string
          discount?: number
          final_amount?: number
          id?: string
          notes?: string | null
          payment_method?: string | null
          sale_date?: string
          status?: string
          total_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          client_name?: string
          created_at?: string
          discount?: number
          final_amount?: number
          id?: string
          notes?: string | null
          payment_method?: string | null
          sale_date?: string
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sales_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'customers'
            referencedColumns: ['id']
          },
        ]
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
      suppliers: {
        Row: {
          city: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          notes: string | null
          phone: string | null
          specialty: string | null
          state: string | null
          status: string | null
          updated_at: string
          user_id: string
          whatsapp: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          specialty?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
          whatsapp?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          phone?: string | null
          specialty?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
          whatsapp?: string | null
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
      get_public_os_status: {
        Args: { p_search: string; p_user_id: string }
        Returns: {
          created_at: string
          device_brand: string
          device_model: string
          id: string
          reported_problem: string
          short_id: string
          status: string
          value: number
        }[]
      }
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
// Table: appointments
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   customer_name: text (not null)
//   customer_phone: text (nullable)
//   scheduled_at: timestamp with time zone (not null)
//   service_type: text (nullable)
//   status: text (nullable, default: 'Agendado'::text)
//   notes: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: auto_brands
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   logo_url: text (nullable)
//   is_active: boolean (nullable, default: true)
//   created_at: timestamp with time zone (not null, default: now())
// Table: auto_defects
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   description: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: auto_models
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   brand_id: uuid (not null)
//   name: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: auto_services
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   model_id: uuid (not null)
//   defect_id: uuid (not null)
//   price: numeric (nullable)
//   estimated_time: text (nullable)
//   notes: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
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
//   slug: text (nullable)
//   auto_active: boolean (nullable, default: false)
//   whatsapp_number: text (nullable)
// Table: customers
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   email: text (nullable)
//   phone: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
//   cpf: text (nullable)
//   address: text (nullable)
//   status: text (nullable, default: 'Ativo'::text)
//   notes: text (nullable)
// Table: financial_transactions
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   type: text (not null)
//   description: text (not null)
//   category: text (nullable)
//   amount: numeric (not null, default: 0)
//   payment_method: text (nullable)
//   transaction_date: date (not null)
//   status: text (not null)
//   origin: text (nullable, default: 'manual'::text)
//   notes: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
//   classification: text (not null, default: 'Variável'::text)
// Table: inventory_items
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   category: text (nullable)
//   device_brand: text (nullable)
//   device_model: text (nullable)
//   part_brand: text (nullable)
//   supplier_id: uuid (nullable)
//   sku: text (nullable)
//   quantity: integer (nullable, default: 0)
//   minimum_stock: integer (nullable, default: 0)
//   cost_price: numeric (nullable, default: 0)
//   suggested_price: numeric (nullable, default: 0)
//   location: text (nullable)
//   notes: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: inventory_movements
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   item_id: uuid (not null)
//   type: text (not null)
//   quantity: integer (not null)
//   reason: text (nullable)
//   notes: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
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
// Table: sale_items
//   id: uuid (not null, default: gen_random_uuid())
//   sale_id: uuid (not null)
//   user_id: uuid (not null)
//   name: text (not null)
//   type: text (not null)
//   quantity: integer (not null, default: 1)
//   unit_price: numeric (not null, default: 0)
//   subtotal: numeric (not null, default: 0)
//   created_at: timestamp with time zone (not null, default: now())
// Table: sales
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   client_id: uuid (nullable)
//   client_name: text (not null)
//   total_amount: numeric (not null, default: 0)
//   discount: numeric (not null, default: 0)
//   final_amount: numeric (not null, default: 0)
//   payment_method: text (nullable)
//   status: text (not null, default: 'Concluída'::text)
//   sale_date: date (not null, default: CURRENT_DATE)
//   notes: text (nullable)
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
// Table: suppliers
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (nullable)
//   phone: text (nullable)
//   whatsapp: text (nullable)
//   email: text (nullable)
//   city: text (nullable)
//   state: text (nullable)
//   specialty: text (nullable, default: 'Geral'::text)
//   status: text (nullable, default: 'Ativo'::text)
//   notes: text (nullable)
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
// Table: appointments
//   PRIMARY KEY appointments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY appointments_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: auto_brands
//   PRIMARY KEY auto_brands_pkey: PRIMARY KEY (id)
//   FOREIGN KEY auto_brands_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: auto_defects
//   PRIMARY KEY auto_defects_pkey: PRIMARY KEY (id)
//   FOREIGN KEY auto_defects_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: auto_models
//   FOREIGN KEY auto_models_brand_id_fkey: FOREIGN KEY (brand_id) REFERENCES auto_brands(id) ON DELETE CASCADE
//   PRIMARY KEY auto_models_pkey: PRIMARY KEY (id)
//   FOREIGN KEY auto_models_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: auto_services
//   FOREIGN KEY auto_services_defect_id_fkey: FOREIGN KEY (defect_id) REFERENCES auto_defects(id) ON DELETE CASCADE
//   UNIQUE auto_services_model_id_defect_id_key: UNIQUE (model_id, defect_id)
//   FOREIGN KEY auto_services_model_id_fkey: FOREIGN KEY (model_id) REFERENCES auto_models(id) ON DELETE CASCADE
//   PRIMARY KEY auto_services_pkey: PRIMARY KEY (id)
//   FOREIGN KEY auto_services_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: business_settings
//   PRIMARY KEY business_settings_pkey: PRIMARY KEY (id)
//   UNIQUE business_settings_slug_key: UNIQUE (slug)
//   FOREIGN KEY business_settings_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   UNIQUE business_settings_user_id_key: UNIQUE (user_id)
// Table: customers
//   PRIMARY KEY customers_pkey: PRIMARY KEY (id)
//   FOREIGN KEY customers_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: financial_transactions
//   PRIMARY KEY financial_transactions_pkey: PRIMARY KEY (id)
//   CHECK financial_transactions_status_check: CHECK ((status = ANY (ARRAY['recebido'::text, 'pago'::text, 'pendente'::text, 'vencido'::text])))
//   CHECK financial_transactions_type_check: CHECK ((type = ANY (ARRAY['entrada'::text, 'saida'::text])))
//   FOREIGN KEY financial_transactions_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: inventory_items
//   PRIMARY KEY inventory_items_pkey: PRIMARY KEY (id)
//   FOREIGN KEY inventory_items_supplier_id_fkey: FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
//   FOREIGN KEY inventory_items_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: inventory_movements
//   FOREIGN KEY inventory_movements_item_id_fkey: FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
//   PRIMARY KEY inventory_movements_pkey: PRIMARY KEY (id)
//   CHECK inventory_movements_type_check: CHECK ((type = ANY (ARRAY['Entrada'::text, 'Saída'::text, 'Ajuste'::text])))
//   FOREIGN KEY inventory_movements_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
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
// Table: sale_items
//   PRIMARY KEY sale_items_pkey: PRIMARY KEY (id)
//   FOREIGN KEY sale_items_sale_id_fkey: FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
//   CHECK sale_items_type_check: CHECK ((type = ANY (ARRAY['Produto'::text, 'Serviço'::text])))
//   FOREIGN KEY sale_items_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: sales
//   FOREIGN KEY sales_client_id_fkey: FOREIGN KEY (client_id) REFERENCES customers(id) ON DELETE SET NULL
//   PRIMARY KEY sales_pkey: PRIMARY KEY (id)
//   FOREIGN KEY sales_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
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
// Table: suppliers
//   PRIMARY KEY suppliers_pkey: PRIMARY KEY (id)
//   FOREIGN KEY suppliers_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: transactions
//   PRIMARY KEY transactions_pkey: PRIMARY KEY (id)
//   CHECK transactions_status_check: CHECK ((status = ANY (ARRAY['Pendente'::text, 'Pago'::text])))
//   CHECK transactions_type_check: CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text])))
//   FOREIGN KEY transactions_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: appointments
//   Policy "Users can manage own appointments" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: auto_brands
//   Policy "Public select brands" (SELECT, PERMISSIVE) roles={public}
//     USING: (is_active = true)
//   Policy "Users can manage their brands" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: auto_defects
//   Policy "Public select defects" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Users can manage their defects" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: auto_models
//   Policy "Public select models" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Users can manage their models" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: auto_services
//   Policy "Public select services" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Users can manage their services" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: business_settings
//   Policy "Public select settings" (SELECT, PERMISSIVE) roles={public}
//     USING: (auto_active = true)
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
// Table: financial_transactions
//   Policy "Users can delete own financial transactions" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can insert own financial transactions" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Users can select own financial transactions" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can update own financial transactions" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: inventory_items
//   Policy "Users can delete own inventory items" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can insert own inventory items" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Users can select own inventory items" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can update own inventory items" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: inventory_movements
//   Policy "Users can delete own inventory movements" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can insert own inventory movements" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Users can select own inventory movements" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can update own inventory movements" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: monthly_goals
//   Policy "Users can access own goals" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: products
//   Policy "Users can access own products" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: profiles
//   Policy "Users can access own profile" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (id = auth.uid())
// Table: sale_items
//   Policy "Users can delete own sale items" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can insert own sale items" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Users can select own sale items" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can update own sale items" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: sales
//   Policy "Users can delete own sales" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can insert own sales" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (user_id = auth.uid())
//   Policy "Users can select own sales" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//   Policy "Users can update own sales" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
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
// Table: suppliers
//   Policy "Users can access own suppliers" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: transactions
//   Policy "Users can access own transactions" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())

// --- DATABASE FUNCTIONS ---
// FUNCTION get_public_os_status(uuid, text)
//   CREATE OR REPLACE FUNCTION public.get_public_os_status(p_user_id uuid, p_search text)
//    RETURNS TABLE(id uuid, short_id text, status text, created_at timestamp with time zone, device_brand text, device_model text, reported_problem text, value numeric)
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     RETURN QUERY
//     SELECT
//       so.id,
//       split_part(so.id::text, '-', 1) as short_id,
//       so.status,
//       so.created_at,
//       so.device_brand,
//       so.device_model,
//       so.reported_problem,
//       COALESCE(so.value, so.estimated_value, 0) as value
//     FROM public.service_orders so
//     LEFT JOIN public.customers c ON c.id = so.customer_id
//     WHERE so.user_id = p_user_id
//       AND (
//         split_part(so.id::text, '-', 1) ILIKE '%' || p_search || '%'
//         OR c.cpf ILIKE '%' || p_search || '%'
//         OR c.phone ILIKE '%' || p_search || '%'
//       )
//     ORDER BY so.created_at DESC
//     LIMIT 10;
//   END;
//   $function$
//
// FUNCTION handle_inventory_movement()
//   CREATE OR REPLACE FUNCTION public.handle_inventory_movement()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//       IF NEW.type = 'Entrada' THEN
//           UPDATE public.inventory_items SET quantity = quantity + NEW.quantity WHERE id = NEW.item_id;
//       ELSIF NEW.type = 'Saída' THEN
//           IF (SELECT quantity FROM public.inventory_items WHERE id = NEW.item_id) < NEW.quantity THEN
//               RAISE EXCEPTION 'Estoque insuficiente para a saída.';
//           END IF;
//           UPDATE public.inventory_items SET quantity = quantity - NEW.quantity WHERE id = NEW.item_id;
//       ELSIF NEW.type = 'Ajuste' THEN
//           UPDATE public.inventory_items SET quantity = NEW.quantity WHERE id = NEW.item_id;
//       END IF;
//       RETURN NEW;
//   END;
//   $function$
//
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
// Table: inventory_movements
//   on_inventory_movement: CREATE TRIGGER on_inventory_movement AFTER INSERT ON public.inventory_movements FOR EACH ROW EXECUTE FUNCTION handle_inventory_movement()
// Table: service_orders
//   on_os_created: CREATE TRIGGER on_os_created AFTER INSERT ON public.service_orders FOR EACH ROW EXECUTE FUNCTION handle_os_created()
//   on_os_status_change: CREATE TRIGGER on_os_status_change BEFORE UPDATE ON public.service_orders FOR EACH ROW EXECUTE FUNCTION handle_os_finalized()

// --- INDEXES ---
// Table: auto_services
//   CREATE UNIQUE INDEX auto_services_model_id_defect_id_key ON public.auto_services USING btree (model_id, defect_id)
// Table: business_settings
//   CREATE UNIQUE INDEX business_settings_slug_key ON public.business_settings USING btree (slug)
//   CREATE UNIQUE INDEX business_settings_user_id_key ON public.business_settings USING btree (user_id)
// Table: monthly_goals
//   CREATE UNIQUE INDEX monthly_goals_user_id_month_year_key ON public.monthly_goals USING btree (user_id, month_year)
