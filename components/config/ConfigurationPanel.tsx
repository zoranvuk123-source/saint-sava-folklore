'use client';

import { useState } from 'react';
import type { Artwork, Collection } from '@/lib/types/database';
import { supabase } from '@/lib/supabase/client';

const PRINT_SIZES = ['8×10"', '11×14"', '16×20"', '18×24"', '24×36"', 'Custom'];
const PAPER_TYPES = ['Matte Art', 'Enhanced Matte', 'Giclée Canvas', 'Metallic'];
const FRAME_STYLES = ['Unframed', 'Black Float', 'Natural Oak', 'Antique Gold', 'Custom'];
const MAT_SIZES = ['No Mat', '1" White', '2" White', '2" Cream', '3" Linen'];

interface Props {
  artwork: Artwork;
  userId: string;
  collections: Collection[];
  activeSpace: string;
  onCollectionUpdated: () => void;
}

export default function ConfigurationPanel({
  artwork,
  userId,
  collections,
  activeSpace,
  onCollectionUpdated,
}: Props) {
  const [config, setConfig] = useState({
    print_size: '18×24"',
    paper_type: 'Matte Art',
    frame_style: 'Unframed',
    mat_size: 'No Mat',
    custom_frame_desc: '',
  });
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [customFrameSpec, setCustomFrameSpec] = useState('');
  const [loadingFrame, setLoadingFrame] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function generateFrameSpec() {
    if (!config.custom_frame_desc.trim()) return;
    setLoadingFrame(true);
    try {
      const res = await fetch('/api/ai/frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          frame_description: config.custom_frame_desc,
          artwork_title: artwork.title,
          space_type: activeSpace,
        }),
      });
      if (!res.ok) throw new Error('Failed to generate spec');
      const data = await res.json();
      setCustomFrameSpec(data.specification);
    } catch {
      setCustomFrameSpec('Could not generate specification. Try again.');
    } finally {
      setLoadingFrame(false);
    }
  }

  async function addToCollection() {
    setSaving(true);
    setSaved(false);

    try {
      let collectionId = selectedCollection;

      // Create new collection if needed
      if (!collectionId && newCollectionName.trim()) {
        const { data: newCol, error } = await supabase
          .from('collections')
          .insert({
            user_id: userId,
            name: newCollectionName.trim(),
            space_type: activeSpace,
          })
          .select()
          .single();
        if (error) throw error;
        collectionId = newCol.id;
      }

      if (!collectionId) return;

      // Get current item count for sort_order
      const { count } = await supabase
        .from('collection_items')
        .select('*', { count: 'exact', head: true })
        .eq('collection_id', collectionId);

      const { error } = await supabase.from('collection_items').insert({
        collection_id: collectionId,
        artwork_id: artwork.id,
        print_size: config.print_size,
        paper_type: config.paper_type,
        frame_style: config.frame_style,
        mat_size: config.mat_size,
        custom_frame_desc: config.custom_frame_desc || null,
        custom_frame_spec: customFrameSpec || null,
        sort_order: (count || 0) + 1,
      });

      if (error) throw error;
      setSaved(true);
      onCollectionUpdated();
      setNewCollectionName('');
    } catch (err) {
      console.error('Failed to add to collection', err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h2 className="font-heading text-2xl text-ink mb-1">
        Configure Print
      </h2>
      <p className="text-steel text-sm mb-5">
        Configuring: <span className="text-ink font-medium">{artwork.title}</span> by {artwork.artist}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Print Size */}
        <div>
          <label className="block text-xs font-medium text-steel mb-1.5 uppercase tracking-wide">
            Print Size
          </label>
          {PRINT_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setConfig({ ...config, print_size: size })}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded mb-1 transition-colors ${
                config.print_size === size
                  ? 'bg-blue text-white'
                  : 'bg-bg text-ink hover:bg-ice'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Paper Type */}
        <div>
          <label className="block text-xs font-medium text-steel mb-1.5 uppercase tracking-wide">
            Paper
          </label>
          {PAPER_TYPES.map((paper) => (
            <button
              key={paper}
              onClick={() => setConfig({ ...config, paper_type: paper })}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded mb-1 transition-colors ${
                config.paper_type === paper
                  ? 'bg-blue text-white'
                  : 'bg-bg text-ink hover:bg-ice'
              }`}
            >
              {paper}
            </button>
          ))}
        </div>

        {/* Frame Style */}
        <div>
          <label className="block text-xs font-medium text-steel mb-1.5 uppercase tracking-wide">
            Frame
          </label>
          {FRAME_STYLES.map((frame) => (
            <button
              key={frame}
              onClick={() => setConfig({ ...config, frame_style: frame })}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded mb-1 transition-colors ${
                config.frame_style === frame
                  ? 'bg-blue text-white'
                  : 'bg-bg text-ink hover:bg-ice'
              }`}
            >
              {frame}
            </button>
          ))}
        </div>

        {/* Mat Size */}
        <div>
          <label className="block text-xs font-medium text-steel mb-1.5 uppercase tracking-wide">
            Mat
          </label>
          {MAT_SIZES.map((mat) => (
            <button
              key={mat}
              onClick={() => setConfig({ ...config, mat_size: mat })}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded mb-1 transition-colors ${
                config.mat_size === mat
                  ? 'bg-blue text-white'
                  : 'bg-bg text-ink hover:bg-ice'
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Frame Description */}
      {config.frame_style === 'Custom' && (
        <div className="mb-6">
          <label className="block text-xs font-medium text-steel mb-1.5 uppercase tracking-wide">
            Custom Frame Description
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={config.custom_frame_desc}
              onChange={(e) =>
                setConfig({ ...config, custom_frame_desc: e.target.value })
              }
              placeholder="e.g. 'Wide burnished gold leaf with a subtle bead inner edge'"
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-bg text-sm text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
              maxLength={500}
            />
            <button
              onClick={generateFrameSpec}
              disabled={loadingFrame || !config.custom_frame_desc.trim()}
              className="px-4 py-2 bg-gold text-ink text-sm font-medium rounded-lg hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {loadingFrame ? 'Generating…' : 'AI Frame Spec'}
            </button>
          </div>
          {customFrameSpec && (
            <div className="mt-3 p-3 bg-bg rounded-lg text-sm text-steel">
              <strong className="text-ink">Frame Specification:</strong>{' '}
              {customFrameSpec}
            </div>
          )}
        </div>
      )}

      {/* Add to Collection */}
      <div className="border-t border-border pt-5">
        <h3 className="font-heading text-lg text-ink mb-3">
          Add to Collection
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {collections.length > 0 ? (
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-bg text-sm text-ink"
            >
              <option value="">New collection…</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} ({col.space_type})
                </option>
              ))}
            </select>
          ) : null}

          {(!selectedCollection || collections.length === 0) && (
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name, e.g. 'Hotel Aurora Project'"
              className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-bg text-sm text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
            />
          )}

          <button
            onClick={addToCollection}
            disabled={saving || (!selectedCollection && !newCollectionName.trim())}
            className="px-6 py-2.5 bg-blue text-white font-medium text-sm rounded-lg hover:bg-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {saving ? 'Adding…' : saved ? 'Added ✓' : 'Add to Collection'}
          </button>
        </div>
      </div>
    </div>
  );
}
