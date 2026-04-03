'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import type { Artwork } from '@/lib/types/database';

export default function CatalogPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [spaceFilter, setSpaceFilter] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('artworks')
        .select('*')
        .eq('active', true)
        .order('title');
      setArtworks(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const allTags = Array.from(new Set(artworks.flatMap((a) => a.tags))).sort();
  const allSpaces = Array.from(
    new Set(artworks.flatMap((a) => a.space_suitability || []))
  ).sort();

  const filtered = artworks.filter((a) => {
    if (styleFilter && !a.tags.includes(styleFilter)) return false;
    if (spaceFilter && a.space_suitability && !a.space_suitability.includes(spaceFilter)) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-bg">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-gold font-heading text-lg">
            EuroArt4.me
          </Link>
          <Link
            href="/setup"
            className="text-sm text-blue hover:underline"
          >
            Create Showroom
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-heading text-4xl text-ink mb-2">Artwork Catalog</h1>
        <p className="text-steel mb-8">
          European fine art masters — available as museum-quality prints.
        </p>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <select
            value={styleFilter || ''}
            onChange={(e) => setStyleFilter(e.target.value || null)}
            className="text-sm px-3 py-2 rounded-lg border border-border bg-white text-ink"
          >
            <option value="">All Styles</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <select
            value={spaceFilter || ''}
            onChange={(e) => setSpaceFilter(e.target.value || null)}
            className="text-sm px-3 py-2 rounded-lg border border-border bg-white text-ink"
          >
            <option value="">All Spaces</option>
            {allSpaces.map((space) => (
              <option key={space} value={space}>{space}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-steel">Loading catalog…</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((artwork) => (
                <button
                  key={artwork.id}
                  onClick={() =>
                    setSelectedArtwork(
                      selectedArtwork?.id === artwork.id ? null : artwork
                    )
                  }
                  className={`text-left rounded-xl overflow-hidden border transition-all ${
                    selectedArtwork?.id === artwork.id
                      ? 'border-blue ring-2 ring-blue/20'
                      : 'border-border hover:shadow-md'
                  }`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="font-heading text-sm text-ink truncate">
                      {artwork.title}
                    </h3>
                    <p className="text-steel text-xs">
                      {artwork.artist}, {artwork.year}
                    </p>
                    <p className="text-blue text-xs font-medium mt-1">
                      From ${artwork.base_price_cad}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            {selectedArtwork && (
              <div className="mt-8 bg-white rounded-xl border border-border p-6 animate-fade-in">
                <div className="flex gap-6 flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={selectedArtwork.image_url}
                      alt={selectedArtwork.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3 space-y-3">
                    <h2 className="font-heading text-3xl text-ink">
                      {selectedArtwork.title}
                    </h2>
                    <p className="text-steel text-lg">
                      {selectedArtwork.artist}, {selectedArtwork.year}
                    </p>
                    <p className="text-ink">{selectedArtwork.description}</p>
                    <p className="text-steel text-sm">
                      {selectedArtwork.historical_context}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {selectedArtwork.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-ice text-blue px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-blue font-heading text-xl pt-2">
                      From ${selectedArtwork.base_price_cad} CAD
                    </p>
                    <Link
                      href="/setup"
                      className="inline-flex items-center px-6 py-2.5 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 transition-colors text-sm mt-2"
                    >
                      Create Showroom to Order
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
