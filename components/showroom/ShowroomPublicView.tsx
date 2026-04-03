'use client';

import Link from 'next/link';
import type { User } from '@/lib/types/database';
import ShareModal from '@/components/share/ShareModal';
import { useState } from 'react';

interface CollectionWithItems {
  id: string;
  name: string;
  space_type: string;
  room_description: string | null;
  ai_room_output: Record<string, unknown> | null;
  is_public: boolean;
  created_at: string;
  collection_items: Array<{
    id: string;
    print_size: string;
    paper_type: string;
    frame_style: string;
    mat_size: string;
    custom_frame_spec: string | null;
    sort_order: number;
    artworks: {
      id: string;
      title: string;
      artist: string;
      year: string;
      image_url: string;
      description: string;
      historical_context: string;
      tags: string[];
    } | null;
  }>;
}

interface Props {
  user: User;
  collections: CollectionWithItems[];
}

const typeLabels: Record<string, string> = {
  designer: 'Interior Designer',
  influencer: 'Influencer',
  corporate: 'Corporate Buyer',
};

export default function ShowroomPublicView({ user, collections }: Props) {
  const [shareItem, setShareItem] = useState<{
    artworkId?: string;
    collectionId?: string;
    title: string;
    artist?: string;
    year?: string;
    image?: string;
    description?: string;
  } | null>(null);
  const [expandedArtwork, setExpandedArtwork] = useState<string | null>(null);

  const totalPieces = collections.reduce(
    (sum, c) => sum + c.collection_items.length,
    0
  );

  return (
    <main className="min-h-screen bg-bg">
      {/* Showroom Header */}
      <header className="bg-ink text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold font-heading text-sm tracking-widest uppercase mb-3">
            EuroArt4.me
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            {user.name}
          </h1>
          {user.company && (
            <p className="text-ice text-lg mb-2">{user.company}</p>
          )}
          <p className="text-steel">
            {typeLabels[user.user_type] || user.user_type} · {totalPieces}{' '}
            {totalPieces === 1 ? 'work' : 'works'} in collection
          </p>
        </div>
      </header>

      {/* Collections */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {collections.length === 0 ? (
          <p className="text-center text-steel py-20">
            This showroom is being curated. Check back soon.
          </p>
        ) : (
          collections.map((collection) => (
            <section key={collection.id} className="mb-14">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <h2 className="font-heading text-2xl text-ink">
                    {collection.name}
                  </h2>
                  <p className="text-steel text-sm mt-1">
                    {collection.space_type} ·{' '}
                    {collection.collection_items.length} pieces
                  </p>
                </div>
                <button
                  onClick={() =>
                    setShareItem({
                      collectionId: collection.id,
                      title: collection.name,
                    })
                  }
                  className="text-blue text-sm hover:underline"
                >
                  Share Collection
                </button>
              </div>

              {collection.room_description && (
                <p className="text-steel text-sm mb-6 italic">
                  &ldquo;{collection.room_description}&rdquo;
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.collection_items
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((item) => {
                    if (!item.artworks) return null;
                    const art = item.artworks;
                    const isExpanded = expandedArtwork === item.id;

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                          <img
                            src={art.image_url}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-heading text-lg text-ink leading-tight">
                            {art.title}
                          </h3>
                          <p className="text-steel text-sm">
                            {art.artist}, {art.year}
                          </p>
                          <p className="text-steel text-xs mt-2">
                            {item.print_size} · {item.paper_type} ·{' '}
                            {item.frame_style}
                            {item.mat_size !== 'No Mat' && ` · ${item.mat_size}`}
                          </p>

                          {/* Expandable description */}
                          <button
                            onClick={() =>
                              setExpandedArtwork(isExpanded ? null : item.id)
                            }
                            className="text-blue text-xs mt-3 hover:underline"
                          >
                            {isExpanded ? 'Less' : 'More about this work'}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 space-y-2 text-sm text-steel animate-fade-in">
                              <p>{art.description}</p>
                              <p className="text-xs">{art.historical_context}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {art.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs bg-ice text-blue px-2 py-0.5 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              {item.custom_frame_spec && (
                                <div className="mt-2 p-2 bg-bg rounded text-xs">
                                  <strong>Framing Spec:</strong>{' '}
                                  {item.custom_frame_spec}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Share button */}
                          <button
                            onClick={() =>
                              setShareItem({
                                artworkId: art.id,
                                collectionId: collection.id,
                                title: art.title,
                                artist: art.artist,
                                year: art.year,
                                image: art.image_url,
                                description: art.description,
                              })
                            }
                            className="mt-3 text-xs text-blue hover:underline"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="py-10 px-6 bg-ink text-center">
        <p className="text-gold font-heading text-lg mb-2">EuroArt4.me</p>
        <p className="text-steel text-sm">
          Curated by {user.name} ·{' '}
          <Link href="/" className="text-ice hover:underline">
            Create your own showroom
          </Link>
        </p>
      </footer>

      {/* Share Modal */}
      {shareItem && (
        <ShareModal
          showroomUrl={`https://euroart4.me/showroom/${user.slug}`}
          curatorName={user.name}
          curatorType={typeLabels[user.user_type] || user.user_type}
          artworkTitle={shareItem.title}
          artworkArtist={shareItem.artist}
          artworkYear={shareItem.year}
          artworkImage={shareItem.image}
          artworkDescription={shareItem.description}
          onClose={() => setShareItem(null)}
        />
      )}
    </main>
  );
}
