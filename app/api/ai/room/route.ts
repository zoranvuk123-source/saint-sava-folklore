import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createServerClient } from '@/lib/supabase/server';
import { getAuthUserWithProfile } from '@/lib/auth';
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

    // Authenticate user (optional — free tier uses session tokens)
    const authResult = await getAuthUserWithProfile(req);
    const userTier = authResult?.profile?.tier || 'free';
    const userId = authResult?.user?.id || null;

    const supabase = createServerClient();

    // Check / create AI session — tie to user if authenticated
    let { data: session } = await supabase
      .from('ai_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single();

    if (!session) {
      const { data: newSession, error } = await supabase
        .from('ai_sessions')
        .insert({
          session_token: sessionToken,
          user_id: userId,
          generation_count: 0,
          generation_limit: userTier === 'pro' ? null : 30,
        })
        .select()
        .single();
      if (error) {
        return NextResponse.json({ error: 'Session creation failed' }, { status: 500 });
      }
      session = newSession;
    }

    // Enforce rate limit: check tier + generation count
    // Pro users (generation_limit = null) are unlimited
    if (userTier === 'free' && session.generation_limit !== null) {
      if (session.generation_count >= session.generation_limit) {
        return NextResponse.json({ error: 'generation_limit_reached' }, { status: 402 });
      }
    }

    // Fetch available artworks for context
    const { data: artworks } = await supabase
      .from('artworks')
      .select('title, artist, year, tags, space_suitability, description')
      .eq('active', true);

    const artworkList = (artworks || [])
      .map((a: { title: string; artist: string; year: string; tags: string[] }) =>
        `- "${a.title}" by ${a.artist} (${a.year}) — Tags: ${(a.tags || []).join(', ')}`)
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

    // Atomic increment of generation count via raw SQL to prevent race conditions
    await supabase.rpc('increment_generation_count', { session_id: session.id });

    const textContent = message.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    // Safe JSON parse with fallback
    let parsed;
    try {
      const text = textContent.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('AI room curation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
