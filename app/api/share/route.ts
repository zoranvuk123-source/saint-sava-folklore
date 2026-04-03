import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { network, artwork_id, collection_id } = body;

    if (!network) {
      return NextResponse.json({ error: 'network required' }, { status: 400 });
    }

    const validNetworks = ['pinterest', 'instagram', 'twitter', 'link'];
    if (!validNetworks.includes(network)) {
      return NextResponse.json({ error: 'invalid network' }, { status: 400 });
    }

    // Derive user_id from auth token — never trust client-supplied user_id
    const authResult = await getAuthUser(req);
    if (authResult) {
      await authResult.supabase.from('share_events').insert({
        user_id: authResult.user.id,
        artwork_id: artwork_id || null,
        collection_id: collection_id || null,
        network,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Non-critical
  }
}
