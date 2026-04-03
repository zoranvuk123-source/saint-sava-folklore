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
    .select('name, user_type, slug, company')
    .eq('slug', params.slug)
    .single();

  if (!user) return { title: 'Showroom Not Found' };

  const typeLabel =
    user.user_type === 'designer'
      ? 'Interior Designer'
      : user.user_type === 'influencer'
        ? 'Influencer'
        : 'Corporate Buyer';

  const { count } = await supabase
    .from('collections')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.slug) // We'll look up by user later
    .eq('is_public', true);

  return {
    title: `${user.name}'s Designer Showroom · EuroArt4.me`,
    description: `${typeLabel} curating European fine art. ${count || 0} works in collection.`,
    openGraph: {
      title: `${user.name}'s Designer Showroom · EuroArt4.me`,
      description: `${typeLabel} curating European fine art${user.company ? ` at ${user.company}` : ''}. Browse their curated collection.`,
      url: `https://euroart4.me/showroom/${user.slug}`,
      siteName: 'EuroArt4.me',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.name}'s Designer Showroom · EuroArt4.me`,
      description: `${typeLabel} curating European fine art.`,
    },
  };
}

export default async function ShowroomPage({ params }: Props) {
  const supabase = createAnonClient();

  // Fetch user
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!user) notFound();

  // Fetch public collections with items and artworks
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
