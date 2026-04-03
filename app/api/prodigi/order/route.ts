import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { collection_item_ids, shipping_address } = body;

    if (!collection_item_ids?.length || !shipping_address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Fetch collection items with artwork data
    const { data: items, error } = await supabase
      .from('collection_items')
      .select('*, artworks:artwork_id (*)')
      .in('id', collection_item_ids);

    if (error || !items?.length) {
      return NextResponse.json({ error: 'Items not found' }, { status: 404 });
    }

    // Build Prodigi order (placeholder — real integration requires Prodigi API key)
    const prodigiApiKey = process.env.PRODIGI_API_KEY;
    if (!prodigiApiKey) {
      return NextResponse.json({
        error: 'Prodigi integration not configured',
        items: items.map((i) => ({
          id: i.id,
          sku: i.prodigi_sku,
          price: i.unit_price_cad,
        })),
      }, { status: 503 });
    }

    // Call Prodigi API
    const prodigiResponse = await fetch('https://api.prodigi.com/v4.0/Orders', {
      method: 'POST',
      headers: {
        'X-API-Key': prodigiApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchantReference: `ea4-${Date.now()}`,
        shippingMethod: 'Standard',
        recipient: {
          name: shipping_address.name,
          address: {
            line1: shipping_address.line1,
            line2: shipping_address.line2 || '',
            postalOrZipCode: shipping_address.postal_code,
            countryCode: shipping_address.country_code,
            townOrCity: shipping_address.city,
            stateOrCounty: shipping_address.state || '',
          },
        },
        items: items.map((item) => ({
          merchantReference: item.id,
          sku: item.prodigi_sku || (item as unknown as { artworks: { prodigi_sku_base: string } }).artworks?.prodigi_sku_base,
          copies: 1,
          sizing: 'fillPrintArea',
          assets: [
            {
              printArea: 'default',
              url: (item as unknown as { artworks: { image_url: string } }).artworks?.image_url,
            },
          ],
        })),
      }),
    });

    const prodigiData = await prodigiResponse.json();
    return NextResponse.json(prodigiData);
  } catch (error) {
    console.error('Prodigi order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
