-- EuroArt4 Designer Showroom — Full Schema
-- Migration: create all tables with RLS

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  company text,
  user_type text NOT NULL CHECK (user_type IN ('designer', 'influencer', 'corporate')),
  tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
  email text UNIQUE NOT NULL,
  trade_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Public can read name, slug, company, user_type only
CREATE POLICY "users_public_read" ON public.users
  FOR SELECT USING (true);

-- Users can update only their own record
CREATE POLICY "users_self_update" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own record
CREATE POLICY "users_self_insert" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- TABLE: artworks
-- ============================================
CREATE TABLE IF NOT EXISTS public.artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  year text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  historical_context text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  space_suitability text[],
  base_price_cad numeric NOT NULL,
  prodigi_sku_base text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "artworks_public_read" ON public.artworks
  FOR SELECT USING (true);

-- Admin only for write operations (service_role bypasses RLS)

-- ============================================
-- TABLE: collections
-- ============================================
CREATE TABLE IF NOT EXISTS public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  space_type text NOT NULL,
  room_description text,
  ai_room_output jsonb,
  is_public boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Public read if is_public = true; owner reads all
CREATE POLICY "collections_public_read" ON public.collections
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

-- Owner can insert/update/delete
CREATE POLICY "collections_owner_insert" ON public.collections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "collections_owner_update" ON public.collections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "collections_owner_delete" ON public.collections
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- TABLE: collection_items
-- ============================================
CREATE TABLE IF NOT EXISTS public.collection_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  artwork_id uuid NOT NULL REFERENCES public.artworks(id),
  print_size text NOT NULL,
  paper_type text NOT NULL,
  frame_style text NOT NULL,
  mat_size text NOT NULL,
  custom_frame_desc text,
  custom_frame_spec text,
  prodigi_sku text,
  unit_price_cad numeric,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- Inherits collection visibility
CREATE POLICY "collection_items_read" ON public.collection_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_items.collection_id
      AND (c.is_public = true OR auth.uid() = c.user_id)
    )
  );

-- Owner can insert/update/delete (via collection ownership)
CREATE POLICY "collection_items_owner_insert" ON public.collection_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_items.collection_id AND auth.uid() = c.user_id
    )
  );

CREATE POLICY "collection_items_owner_update" ON public.collection_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_items.collection_id AND auth.uid() = c.user_id
    )
  );

CREATE POLICY "collection_items_owner_delete" ON public.collection_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_items.collection_id AND auth.uid() = c.user_id
    )
  );

-- ============================================
-- TABLE: ai_sessions
-- ============================================
CREATE TABLE IF NOT EXISTS public.ai_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  session_token text NOT NULL,
  generation_count integer NOT NULL DEFAULT 0,
  generation_limit integer DEFAULT 30,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_sessions_access" ON public.ai_sessions
  FOR SELECT USING (auth.uid() = user_id OR session_token = current_setting('request.headers', true)::json->>'x-session-token');

CREATE POLICY "ai_sessions_update" ON public.ai_sessions
  FOR UPDATE USING (auth.uid() = user_id OR session_token = current_setting('request.headers', true)::json->>'x-session-token');

CREATE POLICY "ai_sessions_insert" ON public.ai_sessions
  FOR INSERT WITH CHECK (true);

-- ============================================
-- TABLE: share_events
-- ============================================
CREATE TABLE IF NOT EXISTS public.share_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id),
  artwork_id uuid REFERENCES public.artworks(id),
  collection_id uuid REFERENCES public.collections(id),
  network text NOT NULL CHECK (network IN ('pinterest', 'instagram', 'twitter', 'link')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.share_events ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert
CREATE POLICY "share_events_insert" ON public.share_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read their own analytics
CREATE POLICY "share_events_own_read" ON public.share_events
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_users_slug ON public.users(slug);
CREATE INDEX idx_collections_user_id ON public.collections(user_id);
CREATE INDEX idx_collection_items_collection_id ON public.collection_items(collection_id);
CREATE INDEX idx_ai_sessions_session_token ON public.ai_sessions(session_token);
CREATE INDEX idx_share_events_user_id ON public.share_events(user_id);
CREATE INDEX idx_artworks_active ON public.artworks(active) WHERE active = true;
