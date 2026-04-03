-- Atomic increment function for AI session generation count
CREATE OR REPLACE FUNCTION public.increment_generation_count(session_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.ai_sessions
  SET generation_count = generation_count + 1,
      last_used_at = now()
  WHERE id = session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix users_public_read RLS policy: only expose safe columns
-- Drop the overly permissive policy and create a restricted one
DROP POLICY IF EXISTS "users_public_read" ON public.users;

-- Use a security definer view approach — but for simplicity,
-- restrict the public read to non-sensitive columns via a separate policy
-- Supabase RLS cannot restrict columns, so we use a view instead.
CREATE OR REPLACE VIEW public.users_public AS
  SELECT id, slug, name, company, user_type, tier
  FROM public.users;

-- Re-create the users SELECT policy restricted to authenticated or service role
-- Public reads should go through the view; direct table reads require auth
CREATE POLICY "users_authenticated_read" ON public.users
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    OR current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

-- Fix ai_sessions INSERT: require a non-empty session token
DROP POLICY IF EXISTS "ai_sessions_insert" ON public.ai_sessions;
CREATE POLICY "ai_sessions_insert" ON public.ai_sessions
  FOR INSERT WITH CHECK (
    session_token IS NOT NULL AND length(session_token) >= 10
  );

-- Add space_type CHECK constraint for collections
ALTER TABLE public.collections
  ADD CONSTRAINT collections_space_type_check
  CHECK (space_type IN (
    'Hotel Room', 'Hotel Lobby', 'Hotel Dining',
    'Hallway/Corridor', 'Office', 'Restaurant', 'Residential'
  ));

-- Table for trade applications (persist to database, not just email)
CREATE TABLE IF NOT EXISTS public.trade_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  user_type text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.trade_applications ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write trade applications
-- (admin panel uses service_role key)
