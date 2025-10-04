// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      professionals: {
        Row: {
          id: string;
          slug: string;
          full_name: string;
          headline: string | null;
          bio: string | null;
          category: string;
          is_partner: boolean;
          photo_url: string | null;
          city: string;
          starting_price: number | null;
          rating_avg: number | null;
          rating_count: number | null;
          services: any[] | null;
          available_online: boolean;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          full_name: string;
          headline?: string | null;
          bio?: string | null;
          category: string;
          is_partner?: boolean;
          photo_url?: string | null;
          city: string;
          starting_price?: number | null;
          rating_avg?: number | null;
          rating_count?: number | null;
          services?: any[] | null;
          available_online?: boolean;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          full_name?: string;
          headline?: string | null;
          bio?: string | null;
          category?: string;
          is_partner?: boolean;
          photo_url?: string | null;
          city?: string;
          starting_price?: number | null;
          rating_avg?: number | null;
          rating_count?: number | null;
          services?: any[] | null;
          available_online?: boolean;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      portal_users: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          has_pp_app: boolean;
          pp_subscription_status: string;
          is_portal_user: boolean;
          is_verified: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          has_pp_app?: boolean;
          pp_subscription_status?: string;
          is_portal_user?: boolean;
          is_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          has_pp_app?: boolean;
          pp_subscription_status?: string;
          is_portal_user?: boolean;
          is_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      portal_favorites: {
        Row: {
          id: string;
          user_id: string;
          professional_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          professional_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          professional_id?: string;
          created_at?: string;
        };
      };
      portal_bookings: {
        Row: {
          id: string;
          user_id: string;
          professional_id: string;
          booking_date: string;
          booking_time: string;
          service_name: string;
          service_price: number;
          duration_minutes: number;
          notes: string | null;
          status: string;
          booking_source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          professional_id: string;
          booking_date: string;
          booking_time: string;
          service_name: string;
          service_price: number;
          duration_minutes: number;
          notes?: string | null;
          status: string;
          booking_source: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          professional_id?: string;
          booking_date?: string;
          booking_time?: string;
          service_name?: string;
          service_price?: number;
          duration_minutes?: number;
          notes?: string | null;
          status?: string;
          booking_source?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      portal_reviews: {
        Row: {
          id: string;
          user_id: string;
          professional_id: string;
          booking_id: string | null;
          rating: number;
          content: string;
          review_source: string;
          is_verified: boolean;
          helpful_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          professional_id: string;
          booking_id?: string | null;
          rating: number;
          content: string;
          review_source: string;
          is_verified?: boolean;
          helpful_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          professional_id?: string;
          booking_id?: string | null;
          rating?: number;
          content?: string;
          review_source?: string;
          is_verified?: boolean;
          helpful_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      portal_notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link_url: string | null;
          is_read: boolean;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link_url?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          link_url?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
