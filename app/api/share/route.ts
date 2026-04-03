import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { network, artwork_id, collection_id, user_id } = body;

    if (!network) {
      return NextResponse.json({ error: 'network required' }, { status: 400 });
    }

    const validNetworks = ['pinterest', 'instagram', 'twitter', 'link'];
    if (!validNetworks.includes(network)) {
      return NextResponse.json({ error: 'invalid network' }, { status: 400 });
    }

    // Share events are best-effort; don't block on auth failures
    if (user_id) {
      const supabase = createServerClient();
      await supabase.from('share_events').insert({
        user_id,
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
