export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      community_events: {
        Row: {
          created_at: string | null
          current_participants: number | null
          description: string | null
          event_date: string
          id: string
          image_url: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          max_participants: number | null
          organizer_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_participants?: number | null
          organizer_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_participants?: number | null
          organizer_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          category: string | null
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      eco_challenges: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          difficulty: string | null
          duration_days: number | null
          id: string
          image_url: string | null
          points: number | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          difficulty?: string | null
          duration_days?: number | null
          id?: string
          image_url?: string | null
          points?: number | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          difficulty?: string | null
          duration_days?: number | null
          id?: string
          image_url?: string | null
          points?: number | null
          title?: string
        }
        Relationships: []
      }
      event_participants: {
        Row: {
          event_id: string | null
          id: string
          joined_at: string | null
          user_id: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recycling_centers: {
        Row: {
          accepted_materials: string[] | null
          address: string
          city: string
          contact_info: Json | null
          created_at: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          operating_hours: Json | null
          postal_code: string | null
          state: string
          updated_at: string | null
        }
        Insert: {
          accepted_materials?: string[] | null
          address: string
          city: string
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          operating_hours?: Json | null
          postal_code?: string | null
          state: string
          updated_at?: string | null
        }
        Update: {
          accepted_materials?: string[] | null
          address?: string
          city?: string
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          operating_hours?: Json | null
          postal_code?: string | null
          state?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      recycling_items: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          is_recyclable: boolean | null
          material_type: string
          name: string
          preparation_instructions: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_recyclable?: boolean | null
          material_type: string
          name: string
          preparation_instructions?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_recyclable?: boolean | null
          material_type?: string
          name?: string
          preparation_instructions?: string | null
        }
        Relationships: []
      }
      sustainable_businesses: {
        Row: {
          address: string
          business_type: string
          city: string
          contact_info: Json | null
          created_at: string | null
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          operating_hours: Json | null
          postal_code: string | null
          state: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address: string
          business_type: string
          city: string
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          operating_hours?: Json | null
          postal_code?: string | null
          state: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          business_type?: string
          city?: string
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          operating_hours?: Json | null
          postal_code?: string | null
          state?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      traditional_recipes: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          ingredients: string[] | null
          instructions: string[] | null
          submitted_by: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          instructions?: string[] | null
          submitted_by?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          instructions?: string[] | null
          submitted_by?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "traditional_recipes_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenges: {
        Row: {
          challenge_id: string | null
          completion_date: string | null
          end_date: string | null
          id: string
          is_completed: boolean | null
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          challenge_id?: string | null
          completion_date?: string | null
          end_date?: string | null
          id?: string
          is_completed?: boolean | null
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: string | null
          completion_date?: string | null
          end_date?: string | null
          id?: string
          is_completed?: boolean | null
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "eco_challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_impact: {
        Row: {
          challenges_completed: number | null
          co2_saved: number | null
          events_attended: number | null
          id: string
          items_recycled: number | null
          last_updated: string | null
          user_id: string | null
          water_saved: number | null
        }
        Insert: {
          challenges_completed?: number | null
          co2_saved?: number | null
          events_attended?: number | null
          id?: string
          items_recycled?: number | null
          last_updated?: string | null
          user_id?: string | null
          water_saved?: number | null
        }
        Update: {
          challenges_completed?: number | null
          co2_saved?: number | null
          events_attended?: number | null
          id?: string
          items_recycled?: number | null
          last_updated?: string | null
          user_id?: string | null
          water_saved?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_impact_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age_group: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          language: string | null
          location: string | null
          updated_at: string | null
        }
        Insert: {
          age_group?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          language?: string | null
          location?: string | null
          updated_at?: string | null
        }
        Update: {
          age_group?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          language?: string | null
          location?: string | null
          updated_at?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
