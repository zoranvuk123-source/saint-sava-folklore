import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-prodigi-signature');
    const webhookSecret = process.env.PRODIGI_WEBHOOK_SECRET;

    // Validate HMAC signature
    if (webhookSecret && signature) {
      const expectedSignature = createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    console.log('Prodigi webhook event:', event.type, event);

    // Handle different event types
    switch (event.type) {
      case 'order.created':
      case 'order.shipped':
      case 'order.completed':
      case 'order.cancelled':
        // Log event — expand as needed
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
