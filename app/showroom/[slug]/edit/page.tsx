'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { User, Collection, Artwork } from '@/lib/types/database';
import AiRoomStudio from '@/components/studio/AiRoomStudio';
import ArtworkCatalog from '@/components/catalog/ArtworkCatalog';
import CollectionManager from '@/components/collections/CollectionManager';
import ConfigurationPanel from '@/components/config/ConfigurationPanel';
import Link from 'next/link';

const SPACE_TYPES = [
  'All Spaces',
  'Hotel Room',
  'Hotel Lobby',
  'Hotel Dining',
  'Hallway/Corridor',
  'Office',
  'Restaurant',
  'Residential',
];

export default function ShowroomEditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [user, setUser] = useState<User | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeSpace, setActiveSpace] = useState('All Spaces');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/setup');
        return;
      }

      // Fetch user
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!userData || userData.id !== session.user.id) {
        router.push('/');
        return;
      }

      setUser(userData);

      // Fetch collections and artworks in parallel
      const [collectionsRes, artworksRes] = await Promise.all([
        supabase
          .from('collections')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('artworks')
          .select('*')
          .eq('active', true)
          .order('title'),
      ]);

      setCollections(collectionsRes.data || []);
      setArtworks(artworksRes.data || []);
      setLoading(false);
    }

    load();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-pulse text-steel">Loading your showroom…</div>
      </div>
    );
  }

  if (!user) return null;

  const filteredCollections =
    activeSpace === 'All Spaces'
      ? collections
      : collections.filter((c) => c.space_type === activeSpace);

  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-gold font-heading text-lg">
            EuroArt4.me
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/showroom/${slug}`}
              className="text-sm text-blue hover:underline"
            >
              View Public Page
            </Link>
            <span className="text-sm text-steel">
              {user.name}
              {user.tier === 'pro' && (
                <span className="ml-2 text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-medium">
                  PRO
                </span>
              )}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Space Type Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {SPACE_TYPES.map((space) => (
            <button
              key={space}
              onClick={() => setActiveSpace(space)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSpace === space
                  ? 'bg-blue text-white'
                  : 'bg-white text-steel hover:text-ink border border-border'
              }`}
            >
              {space}
            </button>
          ))}
        </div>

        {/* AI Room Studio */}
        <section className="mb-10">
          <AiRoomStudio
            user={user}
            activeSpace={activeSpace === 'All Spaces' ? 'Hotel Room' : activeSpace}
            onRecommendation={(artworkTitle) => {
              const found = artworks.find((a) => a.title === artworkTitle);
              if (found) setSelectedArtwork(found);
            }}
          />
        </section>

        {/* Artwork Catalog */}
        <section className="mb-10">
          <ArtworkCatalog
            artworks={artworks}
            selectedArtwork={selectedArtwork}
            onSelectArtwork={setSelectedArtwork}
            spaceFilter={activeSpace === 'All Spaces' ? null : activeSpace}
          />
        </section>

        {/* Configuration Panel (when artwork selected) */}
        {selectedArtwork && user && (
          <section className="mb-10">
            <ConfigurationPanel
              artwork={selectedArtwork}
              userId={user.id}
              collections={collections}
              activeSpace={activeSpace === 'All Spaces' ? 'Hotel Room' : activeSpace}
              onCollectionUpdated={async () => {
                const { data } = await supabase
                  .from('collections')
                  .select('*')
                  .eq('user_id', user.id)
                  .order('created_at', { ascending: false });
                setCollections(data || []);
              }}
            />
          </section>
        )}

        {/* Collections */}
        <section>
          <CollectionManager
            collections={filteredCollections}
            userId={user.id}
          />
        </section>
      </div>
    </main>
  );
}
