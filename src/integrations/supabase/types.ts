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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      corporate_profiles: {
        Row: {
          company_name: string
          company_size: string | null
          created_at: string
          id: string
          industry: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          company_size?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          company_size?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mentor_profiles: {
        Row: {
          background_info: string | null
          company: string | null
          corporate_id: string | null
          created_at: string
          full_name: string
          id: string
          job_title: string | null
          pending_school_id: string | null
          school_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          background_info?: string | null
          company?: string | null
          corporate_id?: string | null
          created_at?: string
          full_name: string
          id?: string
          job_title?: string | null
          pending_school_id?: string | null
          school_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          background_info?: string | null
          company?: string | null
          corporate_id?: string | null
          created_at?: string
          full_name?: string
          id?: string
          job_title?: string | null
          pending_school_id?: string | null
          school_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_profiles_corporate_id_fkey"
            columns: ["corporate_id"]
            isOneToOne: false
            referencedRelation: "corporate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_profiles_pending_school_id_fkey"
            columns: ["pending_school_id"]
            isOneToOne: false
            referencedRelation: "pending_schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "school_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_schools: {
        Row: {
          corporate_id: string | null
          created_at: string
          created_by_mentor_id: string | null
          id: string
          invited_at: string | null
          invited_email: string | null
          school_name: string
          updated_at: string
        }
        Insert: {
          corporate_id?: string | null
          created_at?: string
          created_by_mentor_id?: string | null
          id?: string
          invited_at?: string | null
          invited_email?: string | null
          school_name: string
          updated_at?: string
        }
        Update: {
          corporate_id?: string | null
          created_at?: string
          created_by_mentor_id?: string | null
          id?: string
          invited_at?: string | null
          invited_email?: string | null
          school_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_schools_corporate_id_fkey"
            columns: ["corporate_id"]
            isOneToOne: false
            referencedRelation: "corporate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_schools_created_by_mentor_id_fkey"
            columns: ["created_by_mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      school_directory: {
        Row: {
          created_at: string
          id: string
          school_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          school_name: string
        }
        Update: {
          created_at?: string
          id?: string
          school_name?: string
        }
        Relationships: []
      }
      school_profiles: {
        Row: {
          contact_name: string | null
          contact_role: string | null
          corporate_id: string | null
          created_at: string
          fsm_percentage: string | null
          id: string
          location: string | null
          phone: string | null
          school_name: string
          school_type: string | null
          student_count: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_name?: string | null
          contact_role?: string | null
          corporate_id?: string | null
          created_at?: string
          fsm_percentage?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          school_name: string
          school_type?: string | null
          student_count?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_name?: string | null
          contact_role?: string | null
          corporate_id?: string | null
          created_at?: string
          fsm_percentage?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          school_name?: string
          school_type?: string | null
          student_count?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_profiles_corporate_id_fkey"
            columns: ["corporate_id"]
            isOneToOne: false
            referencedRelation: "corporate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "corporate" | "school" | "mentor"
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
      app_role: ["corporate", "school", "mentor"],
    },
  },
} as const
