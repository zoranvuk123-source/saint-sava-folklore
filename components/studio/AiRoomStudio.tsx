'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { User } from '@/lib/types/database';

interface AiResponse {
  scene: string;
  recommendations: Array<{ title: string; reason: string }>;
  placement_tip: string;
  mood: string;
}

interface Props {
  user: User;
  activeSpace: string;
  onRecommendation: (artworkTitle: string) => void;
}

export default function AiRoomStudio({ user, activeSpace, onRecommendation }: Props) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResponse | null>(null);
  const [error, setError] = useState('');
  const [limitReached, setLimitReached] = useState(false);

  async function handleGenerate() {
    if (!description.trim()) return;
    setLoading(true);
    setError('');

    try {
      const sessionToken =
        sessionStorage.getItem('ea4_session') || crypto.randomUUID();
      sessionStorage.setItem('ea4_session', sessionToken);

      const res = await fetch('/api/ai/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_description: description,
          space_type: activeSpace,
          session_token: sessionToken,
        }),
      });

      if (res.status === 402) {
        setLimitReached(true);
        return;
      }
      if (res.status === 429) {
        setError('Too many requests. Please wait a moment.');
        return;
      }
      if (!res.ok) throw new Error('AI generation failed');

      const data: AiResponse = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h2 className="font-heading text-2xl text-ink mb-1">AI Room Studio</h2>
      <p className="text-steel text-sm mb-5">
        Describe a space and get AI-curated art recommendations for{' '}
        <span className="text-blue font-medium">{activeSpace}</span>.
      </p>

      {limitReached ? (
        <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 text-center">
          <p className="font-heading text-lg text-ink mb-2">
            Free generations used up
          </p>
          <p className="text-steel text-sm mb-4">
            Upgrade to a Trade Account for unlimited AI curation, trade
            pricing, and analytics.
          </p>
          <Link
            href="/trade-signup"
            className="inline-flex items-center px-6 py-2.5 bg-gold text-ink font-medium rounded-lg hover:bg-gold/90 transition-colors"
          >
            Apply for Trade Account
          </Link>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the space… e.g. 'A 40-seat fine dining restaurant with exposed brick walls, warm ambient lighting, and a neutral palette of cream and charcoal.'"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-bg text-ink text-sm resize-none h-24 focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
              maxLength={1000}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="self-end px-6 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Curating…' : 'Curate Room'}
            </button>
          </div>

          {error && (
            <p className="text-crimson text-sm mt-3">{error}</p>
          )}

          {result && (
            <div className="mt-6 space-y-5 animate-fade-in">
              {/* Scene */}
              <div>
                <h3 className="font-heading text-lg text-ink mb-1">Scene</h3>
                <p className="text-steel text-sm">{result.scene}</p>
              </div>

              {/* Mood */}
              <div className="inline-block bg-ice text-blue text-sm px-3 py-1 rounded-full">
                Mood: {result.mood}
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-heading text-lg text-ink mb-3">
                  Recommended Artworks
                </h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec) => (
                    <button
                      key={rec.title}
                      onClick={() => onRecommendation(rec.title)}
                      className="w-full text-left p-3 rounded-lg border border-border hover:border-blue hover:bg-ice/30 transition-colors"
                    >
                      <span className="font-medium text-ink">{rec.title}</span>
                      <span className="block text-steel text-sm mt-0.5">
                        {rec.reason}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Placement Tip */}
              <div className="bg-bg rounded-lg p-4">
                <h4 className="font-medium text-ink text-sm mb-1">
                  Placement Tip
                </h4>
                <p className="text-steel text-sm">{result.placement_tip}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
