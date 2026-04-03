'use client';

import { useState } from 'react';
import type { Artwork } from '@/lib/types/database';

interface Props {
  artworks: Artwork[];
  selectedArtwork: Artwork | null;
  onSelectArtwork: (artwork: Artwork | null) => void;
  spaceFilter: string | null;
}

export default function ArtworkCatalog({
  artworks,
  selectedArtwork,
  onSelectArtwork,
  spaceFilter,
}: Props) {
  const [styleFilter, setStyleFilter] = useState<string | null>(null);

  // Collect all unique tags
  const allTags = Array.from(
    new Set(artworks.flatMap((a) => a.tags))
  ).sort();

  // Filter artworks
  const filtered = artworks.filter((a) => {
    if (spaceFilter && a.space_suitability && !a.space_suitability.includes(spaceFilter)) {
      return false;
    }
    if (styleFilter && !a.tags.includes(styleFilter)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-2xl text-ink">Artwork Catalog</h2>
        <div className="flex gap-2">
          <select
            value={styleFilter || ''}
            onChange={(e) => setStyleFilter(e.target.value || null)}
            className="text-sm px-3 py-1.5 rounded-lg border border-border bg-white text-ink"
          >
            <option value="">All styles</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((artwork) => (
          <button
            key={artwork.id}
            onClick={() =>
              onSelectArtwork(
                selectedArtwork?.id === artwork.id ? null : artwork
              )
            }
            className={`text-left rounded-xl overflow-hidden border transition-all ${
              selectedArtwork?.id === artwork.id
                ? 'border-blue ring-2 ring-blue/20 shadow-md'
                : 'border-border hover:shadow-md'
            }`}
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-muted">
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 bg-white">
              <h3 className="font-heading text-sm text-ink leading-tight truncate">
                {artwork.title}
              </h3>
              <p className="text-steel text-xs mt-0.5">
                {artwork.artist}, {artwork.year}
              </p>
              <p className="text-blue text-xs font-medium mt-1">
                From ${artwork.base_price_cad}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Artwork Detail Panel */}
      {selectedArtwork && (
        <div className="mt-6 bg-white rounded-xl border border-border p-6 animate-fade-in">
          <div className="flex gap-6 flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src={selectedArtwork.image_url}
                alt={selectedArtwork.title}
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-2/3 space-y-3">
              <h3 className="font-heading text-2xl text-ink">
                {selectedArtwork.title}
              </h3>
              <p className="text-steel">
                {selectedArtwork.artist}, {selectedArtwork.year}
              </p>
              <p className="text-ink text-sm">{selectedArtwork.description}</p>
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
              {selectedArtwork.space_suitability && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedArtwork.space_suitability.map((space) => (
                    <span
                      key={space}
                      className="text-xs bg-bg text-steel px-2.5 py-1 rounded-full"
                    >
                      {space}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
