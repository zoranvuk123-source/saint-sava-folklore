import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { createAnonClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id');
  if (!userId) {
    return NextResponse.json({ error: 'user_id required' }, { status: 400 });
  }

  // Use anon client so RLS is enforced — public collections are visible
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      collection_items (
        *,
        artworks:artwork_id (*)
      )
    `)
    .eq('user_id', userId)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  // Require authentication
  const authResult = await getAuthUser(req);
  if (!authResult) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  // Enforce ownership — user can only create collections for themselves
  if (body.user_id !== authResult.user.id) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const { data, error } = await authResult.supabase
    .from('collections')
    .insert({
      user_id: authResult.user.id,
      name: body.name,
      space_type: body.space_type,
      room_description: body.room_description || null,
      ai_room_output: body.ai_room_output || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
