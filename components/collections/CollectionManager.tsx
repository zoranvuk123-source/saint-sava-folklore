'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Collection } from '@/lib/types/database';

interface CollectionItemWithArtwork {
  id: string;
  collection_id: string;
  print_size: string;
  paper_type: string;
  frame_style: string;
  mat_size: string;
  sort_order: number;
  artworks: {
    id: string;
    title: string;
    artist: string;
    year: string;
    image_url: string;
  } | null;
}

interface Props {
  collections: Collection[];
  userId: string;
}

export default function CollectionManager({ collections, userId }: Props) {
  const [items, setItems] = useState<Record<string, CollectionItemWithArtwork[]>>({});
  const [loading, setLoading] = useState(false);

  // Stabilize dependency to avoid re-fetching on every render
  const collectionIds = useMemo(
    () => collections.map((c) => c.id).sort().join(','),
    [collections]
  );

  useEffect(() => {
    async function loadItems() {
      const ids = collectionIds.split(',').filter(Boolean);
      if (ids.length === 0) {
        setItems({});
        return;
      }

      setLoading(true);
      const { data } = await supabase
        .from('collection_items')
        .select(`
          id, collection_id, print_size, paper_type, frame_style, mat_size, sort_order,
          artworks:artwork_id (id, title, artist, year, image_url)
        `)
        .in('collection_id', ids)
        .order('sort_order');

      if (data) {
        const grouped: Record<string, CollectionItemWithArtwork[]> = {};
        for (const item of data as unknown as CollectionItemWithArtwork[]) {
          const cid = item.collection_id;
          if (!grouped[cid]) grouped[cid] = [];
          grouped[cid].push(item);
        }
        setItems(grouped);
      }
      setLoading(false);
    }

    loadItems();
  }, [collectionIds]);

  async function removeItem(itemId: string) {
    await supabase.from('collection_items').delete().eq('id', itemId);
    setItems((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[key] = next[key].filter((i) => i.id !== itemId);
      }
      return next;
    });
  }

  if (collections.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border p-10 text-center">
        <h2 className="font-heading text-xl text-ink mb-2">No Collections Yet</h2>
        <p className="text-steel text-sm">
          Select an artwork from the catalog and configure it to create your first collection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="font-heading text-2xl text-ink">Your Collections</h2>
      {loading && <p className="text-steel text-sm">Loading collection items…</p>}
      {collections.map((col) => (
        <div key={col.id} className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h3 className="font-heading text-lg text-ink">{col.name}</h3>
              <p className="text-steel text-sm">{col.space_type}</p>
            </div>
            <span className="text-xs text-steel">
              {(items[col.id] || []).length} pieces
            </span>
          </div>

          {col.room_description && (
            <p className="text-steel text-sm mb-4 italic">
              &ldquo;{col.room_description}&rdquo;
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(items[col.id] || []).map((item) => {
              if (!item.artworks) return null;
              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-border overflow-hidden group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                    <img
                      src={item.artworks.image_url}
                      alt={item.artworks.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full text-crimson text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs font-medium text-ink truncate">
                      {item.artworks.title}
                    </p>
                    <p className="text-xs text-steel">
                      {item.print_size} · {item.frame_style}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
