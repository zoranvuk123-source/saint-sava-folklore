import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-prodigi-signature');
    const webhookSecret = process.env.PRODIGI_WEBHOOK_SECRET;

    // Fail closed: reject if webhook secret is configured but signature is missing
    if (webhookSecret) {
      if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
      }

      const expectedSignature = createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      // Use timing-safe comparison to prevent timing attacks
      const sigBuffer = Buffer.from(signature, 'hex');
      const expectedBuffer = Buffer.from(expectedSignature, 'hex');
      if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    console.log('Prodigi webhook event:', event.type);

    switch (event.type) {
      case 'order.created':
      case 'order.shipped':
      case 'order.completed':
      case 'order.cancelled':
        break;
      default:
        console.log('Unhandled Prodigi event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Prodigi webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
