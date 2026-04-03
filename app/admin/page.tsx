'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import type { User, Artwork } from '@/lib/types/database';

type Tab = 'artworks' | 'users' | 'analytics';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [shareStats, setShareStats] = useState<{ network: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Artwork form
  const [editArtwork, setEditArtwork] = useState<Partial<Artwork> | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      // For V1, admin check is simplified — in production use service_role or custom claims
      setIsAdmin(true);
      await loadData();
      setLoading(false);
    }
    checkAdmin();
  }, []);

  async function loadData() {
    const [usersRes, artworksRes] = await Promise.all([
      supabase.from('users').select('*').order('created_at', { ascending: false }),
      supabase.from('artworks').select('*').order('title'),
    ]);
    setUsers(usersRes.data || []);
    setArtworks(artworksRes.data || []);

    // Share analytics
    const { data: shares } = await supabase
      .from('share_events')
      .select('network');
    if (shares) {
      const counts: Record<string, number> = {};
      shares.forEach((s: { network: string }) => {
        counts[s.network] = (counts[s.network] || 0) + 1;
      });
      setShareStats(
        Object.entries(counts).map(([network, count]) => ({ network, count }))
      );
    }
  }

  async function toggleTrade(user: User) {
    const newTier = user.tier === 'pro' ? 'free' : 'pro';
    await supabase
      .from('users')
      .update({ tier: newTier, trade_approved: newTier === 'pro' })
      .eq('id', user.id);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, tier: newTier as 'free' | 'pro', trade_approved: newTier === 'pro' }
          : u
      )
    );
  }

  async function toggleArtworkActive(artwork: Artwork) {
    await supabase
      .from('artworks')
      .update({ active: !artwork.active })
      .eq('id', artwork.id);
    setArtworks((prev) =>
      prev.map((a) => (a.id === artwork.id ? { ...a, active: !a.active } : a))
    );
  }

  async function saveArtwork() {
    if (!editArtwork) return;
    if (editArtwork.id) {
      await supabase
        .from('artworks')
        .update(editArtwork)
        .eq('id', editArtwork.id);
    } else {
      await supabase.from('artworks').insert(editArtwork as Artwork);
    }
    setEditArtwork(null);
    await loadData();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-steel">Loading admin panel…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-ink mb-4">Admin Access Required</h1>
          <p className="text-steel mb-6">Please log in with an admin account.</p>
          <Link href="/" className="text-blue hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-gold font-heading text-lg">
            EuroArt4.me <span className="text-steel text-sm font-body">Admin</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['users', 'artworks', 'analytics'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                tab === t ? 'bg-blue text-white' : 'bg-white text-steel border border-border hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === 'users' && (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-bg">
                <tr>
                  <th className="text-left px-4 py-3 text-steel font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-steel font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-steel font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-steel font-medium">Tier</th>
                  <th className="text-left px-4 py-3 text-steel font-medium">Showroom</th>
                  <th className="text-right px-4 py-3 text-steel font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-ink font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-steel">{user.email}</td>
                    <td className="px-4 py-3 text-steel capitalize">{user.user_type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          user.tier === 'pro'
                            ? 'bg-gold/20 text-gold'
                            : 'bg-bg text-steel'
                        }`}
                      >
                        {user.tier.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/showroom/${user.slug}`}
                        className="text-blue text-xs hover:underline"
                      >
                        /{user.slug}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleTrade(user)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                          user.tier === 'pro'
                            ? 'bg-crimson/10 text-crimson hover:bg-crimson/20'
                            : 'bg-gold/10 text-gold hover:bg-gold/20'
                        }`}
                      >
                        {user.tier === 'pro' ? 'Revoke Pro' : 'Approve Pro'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center py-10 text-steel">No users yet.</p>
            )}
          </div>
        )}

        {/* Artworks Tab */}
        {tab === 'artworks' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading text-xl text-ink">
                {artworks.length} Artworks
              </h2>
              <button
                onClick={() =>
                  setEditArtwork({
                    title: '',
                    artist: '',
                    year: '',
                    image_url: '',
                    description: '',
                    historical_context: '',
                    tags: [],
                    base_price_cad: 49.99,
                    prodigi_sku_base: 'GLOBAL-FAP',
                    active: true,
                  })
                }
                className="px-4 py-2 bg-blue text-white text-sm rounded-lg hover:bg-blue/90 transition-colors"
              >
                Add Artwork
              </button>
            </div>

            {/* Artwork Edit Modal */}
            {editArtwork && (
              <div className="bg-white rounded-xl border border-border p-6 mb-6 space-y-4">
                <h3 className="font-heading text-lg text-ink">
                  {editArtwork.id ? 'Edit Artwork' : 'New Artwork'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Title"
                    value={editArtwork.title || ''}
                    onChange={(e) => setEditArtwork({ ...editArtwork, title: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-border bg-bg text-sm"
                  />
                  <input
                    placeholder="Artist"
                    value={editArtwork.artist || ''}
                    onChange={(e) => setEditArtwork({ ...editArtwork, artist: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-border bg-bg text-sm"
                  />
                  <input
                    placeholder="Year"
                    value={editArtwork.year || ''}
                    onChange={(e) => setEditArtwork({ ...editArtwork, year: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-border bg-bg text-sm"
                  />
                  <input
                    placeholder="Image URL"
                    value={editArtwork.image_url || ''}
                    onChange={(e) => setEditArtwork({ ...editArtwork, image_url: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-border bg-bg text-sm"
                  />
                  <input
                    placeholder="Base Price (CAD)"
                    type="number"
                    value={editArtwork.base_price_cad || ''}
                    onChange={(e) => setEditArtwork({ ...editArtwork, base_price_cad: parseFloat(e.target.value) })}
                    className="px-3 py-2 rounded-lg border border-border bg-bg text-sm"
                  />
                  <input
                    placeholder="Prodigi SKU Base"
                    value={editArtwork.prodigi_sku_base || ''}
                    onChange={(e) => setEditArtwork({ ...editArtwork, prodigi_sku_base: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-border bg-bg text-sm"
                  />
                </div>
                <textarea
                  placeholder="Description (2-3 sentences)"
                  value={editArtwork.description || ''}
                  onChange={(e) => setEditArtwork({ ...editArtwork, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm h-20 resize-none"
                />
                <textarea
                  placeholder="Historical context"
                  value={editArtwork.historical_context || ''}
                  onChange={(e) => setEditArtwork({ ...editArtwork, historical_context: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm h-20 resize-none"
                />
                <input
                  placeholder="Tags (comma-separated)"
                  value={(editArtwork.tags || []).join(', ')}
                  onChange={(e) =>
                    setEditArtwork({
                      ...editArtwork,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveArtwork}
                    className="px-4 py-2 bg-blue text-white text-sm rounded-lg hover:bg-blue/90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditArtwork(null)}
                    className="px-4 py-2 bg-bg text-steel text-sm rounded-lg hover:bg-border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-bg">
                  <tr>
                    <th className="text-left px-4 py-3 text-steel font-medium">Title</th>
                    <th className="text-left px-4 py-3 text-steel font-medium">Artist</th>
                    <th className="text-left px-4 py-3 text-steel font-medium">Year</th>
                    <th className="text-left px-4 py-3 text-steel font-medium">Price</th>
                    <th className="text-left px-4 py-3 text-steel font-medium">Status</th>
                    <th className="text-right px-4 py-3 text-steel font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {artworks.map((artwork) => (
                    <tr key={artwork.id}>
                      <td className="px-4 py-3 text-ink font-medium">{artwork.title}</td>
                      <td className="px-4 py-3 text-steel">{artwork.artist}</td>
                      <td className="px-4 py-3 text-steel">{artwork.year}</td>
                      <td className="px-4 py-3 text-steel">${artwork.base_price_cad}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            artwork.active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-bg text-steel'
                          }`}
                        >
                          {artwork.active ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => setEditArtwork(artwork)}
                          className="text-xs text-blue hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleArtworkActive(artwork)}
                          className="text-xs text-steel hover:underline"
                        >
                          {artwork.active ? 'Hide' : 'Show'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {tab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-border p-6">
                <p className="text-steel text-sm">Total Users</p>
                <p className="font-heading text-3xl text-ink">{users.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <p className="text-steel text-sm">Pro Users</p>
                <p className="font-heading text-3xl text-gold">
                  {users.filter((u) => u.tier === 'pro').length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <p className="text-steel text-sm">Active Artworks</p>
                <p className="font-heading text-3xl text-blue">
                  {artworks.filter((a) => a.active).length}
                </p>
              </div>
            </div>

            {/* Share Events */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-heading text-lg text-ink mb-4">Share Events</h3>
              {shareStats.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {shareStats.map((s) => (
                    <div key={s.network} className="text-center p-4 bg-bg rounded-lg">
                      <p className="text-steel text-sm capitalize">{s.network}</p>
                      <p className="font-heading text-2xl text-ink">{s.count}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-steel text-sm">No share events recorded yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
