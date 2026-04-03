import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createAnonClient } from '@/lib/supabase/server';
import ShowroomPublicView from '@/components/showroom/ShowroomPublicView';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createAnonClient();
  const { data: user } = await supabase
    .from('users')
    .select('id, name, user_type, slug, company')
    .eq('slug', params.slug)
    .single();

  if (!user) return { title: 'Showroom Not Found' };

  const typeLabel =
    user.user_type === 'designer'
      ? 'Interior Designer'
      : user.user_type === 'influencer'
        ? 'Influencer'
        : 'Corporate Buyer';

  // Count public collection items for this user
  const { data: collections } = await supabase
    .from('collections')
    .select('id')
    .eq('user_id', user.id)
    .eq('is_public', true);

  const collectionIds = (collections || []).map((c: { id: string }) => c.id);
  let totalPieces = 0;
  let firstImageUrl: string | null = null;

  if (collectionIds.length > 0) {
    const { count } = await supabase
      .from('collection_items')
      .select('*', { count: 'exact', head: true })
      .in('collection_id', collectionIds);
    totalPieces = count || 0;

    // Get first artwork image for OG
    const { data: firstItem } = await supabase
      .from('collection_items')
      .select('artworks:artwork_id (image_url)')
      .in('collection_id', collectionIds)
      .limit(1)
      .single();
    if (firstItem?.artworks) {
      const artworks = firstItem.artworks as unknown as { image_url: string };
      firstImageUrl = artworks.image_url;
    }
  }

  const description = `${typeLabel} curating European fine art${user.company ? ` at ${user.company}` : ''}. ${totalPieces} works in collection.`;

  return {
    title: `${user.name}'s Designer Showroom · EuroArt4.me`,
    description,
    openGraph: {
      title: `${user.name}'s Designer Showroom · EuroArt4.me`,
      description,
      url: `https://euroart4.me/showroom/${user.slug}`,
      siteName: 'EuroArt4.me',
      type: 'profile',
      ...(firstImageUrl && {
        images: [{ url: firstImageUrl, width: 1200, height: 630, alt: `${user.name}'s curated collection` }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.name}'s Designer Showroom · EuroArt4.me`,
      description,
      ...(firstImageUrl && { images: [firstImageUrl] }),
    },
  };
}

export default async function ShowroomPage({ params }: Props) {
  const supabase = createAnonClient();

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!user) notFound();

  const { data: collections } = await supabase
    .from('collections')
    .select(`
      *,
      collection_items (
        *,
        artworks:artwork_id (*)
      )
    `)
    .eq('user_id', user.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  return (
    <ShowroomPublicView
      user={user}
      collections={collections || []}
    />
  );
}
