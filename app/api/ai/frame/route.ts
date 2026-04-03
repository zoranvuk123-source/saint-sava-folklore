import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getAuthUser } from '@/lib/auth';
import { sanitizeInput } from '@/lib/utils';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Require authentication
    const authResult = await getAuthUser(req);
    if (!authResult) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const frameDescription = sanitizeInput(body.frame_description || '', 500);
    const artworkTitle = sanitizeInput(body.artwork_title || '', 200);
    const spaceType = sanitizeInput(body.space_type || '', 100);

    if (!frameDescription || !artworkTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `You are a professional picture framer writing a specification for a client order.

Artwork: "${artworkTitle}"
Space type: ${spaceType}
Client description: "${frameDescription}"

Write a concise, professional framing specification (2-4 sentences) covering:
- Frame material and profile
- Finish and color
- Mat board recommendation
- Glazing type

Return only the specification text, no JSON or formatting.`,
        },
      ],
    });

    const textContent = message.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    return NextResponse.json({ specification: textContent.text });
  } catch (error) {
    console.error('AI frame spec error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
