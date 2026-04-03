'use client';

import { useState } from 'react';

interface Props {
  showroomUrl: string;
  curatorName: string;
  curatorType: string;
  artworkTitle: string;
  artworkArtist?: string;
  artworkYear?: string;
  artworkImage?: string;
  artworkDescription?: string;
  onClose: () => void;
}

export default function ShareModal({
  showroomUrl,
  curatorName,
  curatorType,
  artworkTitle,
  artworkArtist,
  artworkYear,
  artworkImage,
  artworkDescription,
  onClose,
}: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `${artworkTitle}${artworkArtist ? ` by ${artworkArtist}` : ''} — curated by ${curatorName} on EuroArt4.me`;
  const encodedUrl = encodeURIComponent(showroomUrl);
  const encodedText = encodeURIComponent(shareText);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(showroomUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement('textarea');
      textarea.value = showroomUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    logShare('link');
  }

  function handlePinterest() {
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}${artworkImage ? `&media=${encodeURIComponent(artworkImage)}` : ''}`;
    window.open(pinUrl, '_blank', 'width=750,height=550');
    logShare('pinterest');
  }

  function handleTwitter() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    window.open(tweetUrl, '_blank', 'width=550,height=420');
    logShare('twitter');
  }

  async function handleInstagram() {
    const caption = `${shareText}\n\n${showroomUrl}`;
    try {
      await navigator.clipboard.writeText(caption);
    } catch {
      // Silent fallback
    }
    alert(
      'Caption and link copied to clipboard. Open Instagram and paste into your post caption.'
    );
    logShare('instagram');
  }

  async function logShare(network: string) {
    try {
      await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ network }),
      });
    } catch {
      // Non-critical
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in">
        {/* Share Card Preview — matches spec: image, title, artist, year, description, curator, logo, URL */}
        <div className="bg-ink p-6">
          {artworkImage && (
            <img
              src={artworkImage}
              alt={artworkTitle}
              className="w-full aspect-[4/3] object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="font-heading text-xl text-white">{artworkTitle}</h3>
          {(artworkArtist || artworkYear) && (
            <p className="text-ice text-sm mt-1">
              {artworkArtist}{artworkArtist && artworkYear ? ', ' : ''}{artworkYear}
            </p>
          )}
          {artworkDescription && (
            <p className="text-steel text-sm mt-2 line-clamp-2">
              {artworkDescription}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-ice text-sm">{curatorName}</p>
              <p className="text-steel text-xs">{curatorType}</p>
            </div>
            <p className="text-gold font-heading text-sm">EuroArt4.me</p>
          </div>
          <p className="text-steel/60 text-xs mt-3 truncate">{showroomUrl}</p>
        </div>

        {/* Share Buttons */}
        <div className="p-6 space-y-3">
          <h4 className="font-heading text-lg text-ink mb-4">Share</h4>

          <button
            onClick={handlePinterest}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-bg transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-[#E60023] flex items-center justify-center text-white text-xs font-bold">
              P
            </span>
            <span className="text-ink font-medium text-sm">
              Pin to Pinterest
            </span>
          </button>

          <button
            onClick={handleTwitter}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-bg transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-white text-xs font-bold">
              X
            </span>
            <span className="text-ink font-medium text-sm">Post on X</span>
          </button>

          <button
            onClick={handleInstagram}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-bg transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              IG
            </span>
            <span className="text-ink font-medium text-sm">
              Copy for Instagram
            </span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-bg transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-blue flex items-center justify-center text-white text-xs font-bold">
              🔗
            </span>
            <span className="text-ink font-medium text-sm">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-steel text-sm hover:text-ink transition-colors mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
