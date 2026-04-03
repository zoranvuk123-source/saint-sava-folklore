import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Validates the JWT from the Authorization header and returns the authenticated user.
 * Returns null if auth fails.
 */
export async function getAuthUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  return { user, supabase };
}

/**
 * Validates the JWT and fetches the full user profile from the users table.
 * Returns null if auth fails or user profile not found.
 */
export async function getAuthUserWithProfile(req: NextRequest) {
  const result = await getAuthUser(req);
  if (!result) return null;

  const { data: profile } = await result.supabase
    .from('users')
    .select('*')
    .eq('id', result.user.id)
    .single();

  if (!profile) return null;

  return { user: result.user, profile, supabase: result.supabase };
}
