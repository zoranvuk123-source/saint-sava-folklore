export type UserType = 'designer' | 'influencer' | 'corporate';
export type Tier = 'free' | 'pro';
export type ShareNetwork = 'pinterest' | 'instagram' | 'twitter' | 'link';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          slug: string;
          name: string;
          company: string | null;
          user_type: UserType;
          tier: Tier;
          email: string;
          trade_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          company?: string | null;
          user_type: UserType;
          tier?: Tier;
          email: string;
          trade_approved?: boolean;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      artworks: {
        Row: {
          id: string;
          title: string;
          artist: string;
          year: string;
          image_url: string;
          description: string;
          historical_context: string;
          tags: string[];
          space_suitability: string[] | null;
          base_price_cad: number;
          prodigi_sku_base: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          artist: string;
          year: string;
          image_url: string;
          description: string;
          historical_context: string;
          tags: string[];
          space_suitability?: string[] | null;
          base_price_cad: number;
          prodigi_sku_base: string;
          active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['artworks']['Insert']>;
      };
      collections: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          space_type: string;
          room_description: string | null;
          ai_room_output: Record<string, unknown> | null;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          space_type: string;
          room_description?: string | null;
          ai_room_output?: Record<string, unknown> | null;
          is_public?: boolean;
        };
        Update: Partial<Database['public']['Tables']['collections']['Insert']>;
      };
      collection_items: {
        Row: {
          id: string;
          collection_id: string;
          artwork_id: string;
          print_size: string;
          paper_type: string;
          frame_style: string;
          mat_size: string;
          custom_frame_desc: string | null;
          custom_frame_spec: string | null;
          prodigi_sku: string | null;
          unit_price_cad: number | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          collection_id: string;
          artwork_id: string;
          print_size: string;
          paper_type: string;
          frame_style: string;
          mat_size: string;
          custom_frame_desc?: string | null;
          custom_frame_spec?: string | null;
          prodigi_sku?: string | null;
          unit_price_cad?: number | null;
          sort_order?: number;
        };
        Update: Partial<Database['public']['Tables']['collection_items']['Insert']>;
      };
      ai_sessions: {
        Row: {
          id: string;
          user_id: string | null;
          session_token: string;
          generation_count: number;
          generation_limit: number | null;
          created_at: string;
          last_used_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_token: string;
          generation_count?: number;
          generation_limit?: number | null;
        };
        Update: Partial<Database['public']['Tables']['ai_sessions']['Insert']>;
      };
      share_events: {
        Row: {
          id: string;
          user_id: string;
          artwork_id: string | null;
          collection_id: string | null;
          network: ShareNetwork;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          artwork_id?: string | null;
          collection_id?: string | null;
          network: ShareNetwork;
        };
        Update: Partial<Database['public']['Tables']['share_events']['Insert']>;
      };
    };
  };
}

export type User = Database['public']['Tables']['users']['Row'];
export type Artwork = Database['public']['Tables']['artworks']['Row'];
export type Collection = Database['public']['Tables']['collections']['Row'];
export type CollectionItem = Database['public']['Tables']['collection_items']['Row'];
export type AiSession = Database['public']['Tables']['ai_sessions']['Row'];
export type ShareEvent = Database['public']['Tables']['share_events']['Row'];
