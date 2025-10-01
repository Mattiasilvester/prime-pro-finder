export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          target_user_id: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_user_id?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_user_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_audit_logs_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_sessions: {
        Row: {
          admin_id: string | null
          created_at: string | null
          expires_at: string
          id: string
          token: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          token: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "admin_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_workouts: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          exercises: Json
          id: string
          scheduled_date: string
          title: string
          total_duration: number | null
          updated_at: string
          user_id: string
          workout_type: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          exercises?: Json
          id?: string
          scheduled_date: string
          title: string
          total_duration?: number | null
          updated_at?: string
          user_id: string
          workout_type: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          exercises?: Json
          id?: string
          scheduled_date?: string
          title?: string
          total_duration?: number | null
          updated_at?: string
          user_id?: string
          workout_type?: string
        }
        Relationships: []
      }
      monthly_workout_stats: {
        Row: {
          created_at: string
          id: string
          month: string
          total_hours: number
          total_workouts: number
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          month: string
          total_hours?: number
          total_workouts?: number
          user_id: string
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          month?: string
          total_hours?: number
          total_workouts?: number
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      openai_usage_logs: {
        Row: {
          cost: number | null
          created_at: string | null
          id: string
          model: string | null
          prompt: string | null
          response: string | null
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          id?: string
          model?: string | null
          prompt?: string | null
          response?: string | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          id?: string
          model?: string | null
          prompt?: string | null
          response?: string | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      professionals: {
        Row: {
          birth_date: string
          birth_place: string
          category: Database["public"]["Enums"]["professional_category"]
          company_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          office_phone: string | null
          password_hash: string
          password_salt: string
          payment_method: string | null
          pec_email: string | null
          phone: string
          reset_requested_at: string | null
          reset_token: string | null
          sdi_code: string | null
          updated_at: string
          vat_address: string
          vat_city: string
          vat_number: string
          vat_postal_code: string
        }
        Insert: {
          birth_date: string
          birth_place: string
          category: Database["public"]["Enums"]["professional_category"]
          company_name: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          office_phone?: string | null
          password_hash: string
          password_salt: string
          payment_method?: string | null
          pec_email?: string | null
          phone: string
          reset_requested_at?: string | null
          reset_token?: string | null
          sdi_code?: string | null
          updated_at?: string
          vat_address: string
          vat_city: string
          vat_number: string
          vat_postal_code: string
        }
        Update: {
          birth_date?: string
          birth_place?: string
          category?: Database["public"]["Enums"]["professional_category"]
          company_name?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          office_phone?: string | null
          password_hash?: string
          password_salt?: string
          payment_method?: string | null
          pec_email?: string | null
          phone?: string
          reset_requested_at?: string | null
          reset_token?: string | null
          sdi_code?: string | null
          updated_at?: string
          vat_address?: string
          vat_city?: string
          vat_number?: string
          vat_postal_code?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birth_date: string | null
          birth_place: string | null
          created_at: string
          email: string | null
          feedback_15d_sent: boolean | null
          first_name: string | null
          full_name: string | null
          id: string
          last_login: string | null
          last_name: string | null
          phone: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          created_at?: string
          email?: string | null
          feedback_15d_sent?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          created_at?: string
          email?: string | null
          feedback_15d_sent?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_objectives: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          description: string
          id: string
          progress: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description: string
          id?: string
          progress?: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          description?: string
          id?: string
          progress?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_workout_stats: {
        Row: {
          created_at: string
          id: string
          total_hours: number | null
          total_workouts: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          total_hours?: number | null
          total_workouts?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          total_hours?: number | null
          total_workouts?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          category: Database["public"]["Enums"]["user_category"]
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          password_hash: string
          password_salt: string
          payment_method: string | null
          phone: string
          reset_requested_at: string | null
          reset_token: string | null
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["user_category"]
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          password_hash: string
          password_salt: string
          payment_method?: string | null
          phone: string
          reset_requested_at?: string | null
          reset_token?: string | null
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["user_category"]
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          password_hash?: string
          password_salt?: string
          payment_method?: string | null
          phone?: string
          reset_requested_at?: string | null
          reset_token?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      waiting_list: {
        Row: {
          created_at: string
          email: string
          id: string
          notes: string | null
          source: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          notes?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          notes?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      users_public: {
        Row: {
          category: Database["public"]["Enums"]["user_category"] | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["user_category"] | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["user_category"] | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      validate_password_strength: {
        Args: { password_text: string }
        Returns: boolean
      }
    }
    Enums: {
      professional_category:
        | "fisioterapista"
        | "nutrizionista"
        | "mental_coach"
        | "osteopata"
        | "pt"
      user_category: "amatori" | "atleti" | "agonisti"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      professional_category: [
        "fisioterapista",
        "nutrizionista",
        "mental_coach",
        "osteopata",
        "pt",
      ],
      user_category: ["amatori", "atleti", "agonisti"],
    },
  },
} as const
