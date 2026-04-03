import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createServerClient } from '@/lib/supabase/server';
import { sanitizeInput } from '@/lib/utils';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const roomDescription = sanitizeInput(body.room_description || '', 1000);
    const spaceType = sanitizeInput(body.space_type || '', 100);
    const sessionToken = body.session_token;

    if (!roomDescription || !spaceType || !sessionToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Check / create AI session
    let { data: session } = await supabase
      .from('ai_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single();

    if (!session) {
      const { data: newSession, error } = await supabase
        .from('ai_sessions')
        .insert({ session_token: sessionToken, generation_count: 0, generation_limit: 30 })
        .select()
        .single();
      if (error) {
        return NextResponse.json({ error: 'Session creation failed' }, { status: 500 });
      }
      session = newSession;
    }

    // Enforce rate limit for free tier
    if (
      session.generation_limit !== null &&
      session.generation_count >= session.generation_limit
    ) {
      return NextResponse.json({ error: 'generation_limit_reached' }, { status: 402 });
    }

    // Fetch available artworks for context
    const { data: artworks } = await supabase
      .from('artworks')
      .select('title, artist, year, tags, space_suitability, description')
      .eq('active', true);

    const artworkList = (artworks || [])
      .map((a) => `- "${a.title}" by ${a.artist} (${a.year}) — Tags: ${a.tags.join(', ')}`)
      .join('\n');

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an expert interior art curator for EuroArt4.me. A client has described a ${spaceType} space:

"${roomDescription}"

Available artworks in our catalog:
${artworkList}

Respond with a JSON object (no markdown, just raw JSON) with this exact structure:
{
  "scene": "A 2-3 sentence vivid description of the space as you envision it with art installed",
  "recommendations": [
    {"title": "Exact artwork title from catalog", "reason": "Why this work suits this space"},
    {"title": "Another artwork title", "reason": "Why this work suits this space"},
    {"title": "Third artwork title", "reason": "Why this work suits this space"}
  ],
  "placement_tip": "One professional placement tip for this specific space",
  "mood": "One or two word mood descriptor"
}

Only recommend artworks from the catalog list above. Use exact titles.`,
        },
      ],
    });

    // Increment generation count
    await supabase
      .from('ai_sessions')
      .update({
        generation_count: session.generation_count + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', session.id);

    const textContent = message.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    const parsed = JSON.parse(textContent.text);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('AI room curation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
