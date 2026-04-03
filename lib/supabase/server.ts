import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client with the service role key (bypasses RLS).
 * Use only for server-side admin operations (trade signup persistence, etc).
 * Falls back to anon key in development if service role key is not set.
 */
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey && process.env.NODE_ENV === 'production') {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required in production');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Creates a Supabase client with the anon key (RLS enforced).
 * Use for public reads and operations where RLS should apply.
 */
export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
