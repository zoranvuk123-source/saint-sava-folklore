# EuroArt4.me Designer Showroom — Lovable Cowork Prompts
# Repository: euroart4-me
# Branch: claude/setup-euroart-platform-GkYbD
# Feed these prompts to Lovable in order (1 through 6)

============================================================
PROMPT 1 OF 6 — PROJECT SETUP & DESIGN SYSTEM
============================================================

Convert this project from Vite+React to Next.js 14 App Router with TypeScript and Tailwind CSS.

Remove all existing Vite files (vite.config.ts, src/ directory, index.html). Set up the Next.js 14 App Router structure under an `app/` directory.

**Design System — apply globally:**
- Color palette (Tailwind custom colors):
  - ink: #22263F (primary text, dark backgrounds)
  - blue: #3D7BFF (primary action, links)
  - crimson: #E53D52 (destructive/error)
  - steel: #8E96A3 (secondary text)
  - ice: #D1E3FF (light accent backgrounds)
  - gold: #C9A84C (brand accent, EuroArt4 logo color)
  - bg: #F5F7F9 (page background)
- Fonts: Playfair Display (headings), DM Sans (body) — load from Google Fonts via `<link>` in layout.tsx `<head>`
- Tailwind font families: `font-heading` for Playfair Display, `font-body` for DM Sans
- CSS variables for Shadcn compatibility (--background, --foreground, --primary, --border, etc.)

**package.json dependencies:**
- next ^14, react ^18, react-dom ^18
- @supabase/supabase-js ^2.78
- @anthropic-ai/sdk ^0.82
- resend ^6.10
- clsx, tailwind-merge, tailwindcss-animate, zod, lucide-react
- Dev: tailwindcss ^3.4, postcss, autoprefixer, typescript, @types/react, @types/node

**Layout (app/layout.tsx):**
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EuroArt4.me — Designer Showroom',
  description: 'Curate and share European fine art collections. AI-powered room curation for interior designers, influencers, and corporate buyers.',
  metadataBase: new URL('https://euroart4.me'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-bg text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Globals CSS** — set CSS variables for the design system, apply `font-heading` to all h1-h6, `font-body` to body.

**next.config.js** — allow remote images from `*.supabase.co` and `upload.wikimedia.org`.

**Utility functions (lib/utils.ts):**
- `cn()` — clsx + tailwind-merge
- `generateSlug(name)` — lowercase, replace non-alphanumeric with hyphens, 3-50 chars. Fallback to `showroom-{timestamp}` for non-Latin names.
- `sanitizeInput(input, maxLength)` — strip HTML tags, trim, limit length
- `isValidSlug(slug)` — regex `^[a-z0-9-]{3,50}$`


============================================================
PROMPT 2 OF 6 — SUPABASE SCHEMA & SEED DATA
============================================================

Set up the Supabase database. Run these SQL migrations against the Supabase project (URL: https://bkiytiavdoikqyrjdazw.supabase.co).

**Migration 1 — Create all tables with RLS:**

Create these tables with RLS enabled on ALL of them:

1. `users` — id (uuid PK), slug (text UNIQUE NOT NULL), name (text NOT NULL), company (text nullable), user_type (text NOT NULL, CHECK: designer|influencer|corporate), tier (text DEFAULT 'free', CHECK: free|pro), email (text UNIQUE NOT NULL), trade_approved (boolean DEFAULT false), created_at (timestamptz DEFAULT now()), updated_at (timestamptz DEFAULT now()). Add trigger to auto-update `updated_at`.

2. `artworks` — id (uuid PK), title, artist, year (text, e.g. "c.1665"), image_url, description, historical_context (all text NOT NULL), tags (text[] NOT NULL DEFAULT '{}'), space_suitability (text[]), base_price_cad (numeric NOT NULL), prodigi_sku_base (text NOT NULL), active (boolean DEFAULT true), created_at.

3. `collections` — id (uuid PK), user_id (FK→users ON DELETE CASCADE), name, space_type (text NOT NULL, CHECK: Hotel Room|Hotel Lobby|Hotel Dining|Hallway/Corridor|Office|Restaurant|Residential), room_description (text nullable), ai_room_output (jsonb nullable), is_public (boolean DEFAULT true), created_at.

4. `collection_items` — id (uuid PK), collection_id (FK→collections ON DELETE CASCADE), artwork_id (FK→artworks), print_size, paper_type, frame_style, mat_size (all text NOT NULL), custom_frame_desc, custom_frame_spec (text nullable), prodigi_sku, unit_price_cad (nullable), sort_order (integer DEFAULT 0), created_at.

5. `ai_sessions` — id (uuid PK), user_id (FK→users nullable), session_token (text NOT NULL), generation_count (integer DEFAULT 0), generation_limit (integer DEFAULT 30), created_at, last_used_at.

6. `share_events` — id (uuid PK), user_id (FK→users NOT NULL), artwork_id (FK→artworks nullable), collection_id (FK→collections nullable), network (text NOT NULL, CHECK: pinterest|instagram|twitter|link), created_at.

7. `trade_applications` — id (uuid PK), name, company, email, user_type (all text NOT NULL), message (text nullable), status (text DEFAULT 'pending', CHECK: pending|approved|rejected), created_at.

**RLS Policies:**
- users: Authenticated users can SELECT all; users can UPDATE/INSERT only their own (auth.uid() = id). Create a `users_public` VIEW exposing only id, slug, name, company, user_type, tier.
- artworks: Public SELECT (no auth required). Write operations admin-only via service_role.
- collections: SELECT if is_public=true OR auth.uid()=user_id. INSERT/UPDATE/DELETE only if auth.uid()=user_id.
- collection_items: SELECT inherits from collection visibility (join check). INSERT/UPDATE/DELETE via collection ownership (join check on auth.uid()=collection.user_id).
- ai_sessions: SELECT/UPDATE if auth.uid()=user_id or matching session_token header. INSERT requires session_token length >= 10.
- share_events: INSERT if auth.uid()=user_id. SELECT only own (auth.uid()=user_id).

**Atomic increment function:**
```sql
CREATE OR REPLACE FUNCTION public.increment_generation_count(session_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.ai_sessions SET generation_count = generation_count + 1, last_used_at = now() WHERE id = session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Indexes:** slug on users, user_id on collections, collection_id on collection_items, session_token on ai_sessions, user_id on share_events, active on artworks WHERE active=true.

**Migration 2 — Seed 12 artworks:**
Seed these public-domain European masters with FULL metadata (title, artist, year, image_url from Wikimedia Commons, 2-3 sentence description, historical context paragraph, tags array, space_suitability array, base_price_cad, prodigi_sku_base = 'GLOBAL-FAP'):

1. Girl with a Pearl Earring — Vermeer, c.1665
2. Starry Night — Van Gogh, 1889
3. The Great Wave off Kanagawa — Hokusai, c.1831
4. The Birth of Venus — Botticelli, c.1485
5. Water Lilies — Monet, 1906
6. The Kiss — Klimt, 1907-1908
7. Wanderer above the Sea of Fog — Friedrich, c.1818
8. A Sunday on La Grande Jatte — Seurat, 1884-1886
9. The Persistence of Memory — Dalí, 1931
10. Impression, Sunrise — Monet, 1872
11. Nighthawks — Hopper, 1942
12. The Arnolfini Portrait — Van Eyck, 1434

Each artwork must have description (visual qualities), historical_context (provenance, museum, significance), tags (e.g. ["Serene", "Blue", "Impressionist"]), and space_suitability (e.g. ["Hotel Room", "Residential", "Office"]).


============================================================
PROMPT 3 OF 6 — SUPABASE CLIENT, TYPES & AUTH
============================================================

Create the Supabase integration and authentication layer.

**lib/supabase/client.ts** — Browser client using NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

**lib/supabase/server.ts** — Two functions:
- `createServerClient()` — Uses SUPABASE_SERVICE_ROLE_KEY (throws in production if missing, falls back to anon in dev). For admin operations.
- `createAnonClient()` — Uses anon key. For public reads where RLS should apply.

**lib/auth.ts** — Auth helper for API routes:
- `getAuthUser(req)` — Extracts Bearer JWT from Authorization header, calls `supabase.auth.getUser()` (server-verified, not spoofable). Returns `{ user, supabase }` or null.
- `getAuthUserWithProfile(req)` — Same + fetches the user's profile from the `users` table. Returns `{ user, profile, supabase }` or null.

**lib/types/database.ts** — TypeScript types for all tables: User, Artwork, Collection, CollectionItem, AiSession, ShareEvent. Include Row, Insert, and Update variants.

**Environment variables (.env):**
```
NEXT_PUBLIC_SUPABASE_URL=https://bkiytiavdoikqyrjdazw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<the anon key>
# Server-side only — set in Vercel:
# SUPABASE_SERVICE_ROLE_KEY=
# ANTHROPIC_API_KEY=
# PRODIGI_API_KEY=
# RESEND_API_KEY=
```


============================================================
PROMPT 4 OF 6 — PAGES (Landing, Setup, Catalog, Trade Signup, Showroom)
============================================================

Create all user-facing pages. Every page uses the EuroArt4 design system (ink, blue, crimson, steel, ice, gold, bg colors; Playfair Display headings; DM Sans body).

**1. Landing Page (app/page.tsx)** — Static.
- Hero section: Full-height dark (bg-ink) with "EuroArt4.me" in gold, "Designer Showroom" as large heading, description text in steel, two CTAs: "Create Your Showroom" (blue button → /setup) and "Browse Catalog" (outline button → /catalog).
- Value Props section: 3-column grid on bg-bg. "Curate Collections", "Share Everywhere", "Earn Commission" with icon circles (bg-ice, text-blue) and descriptions.
- CTA section: Dark bg-ink with "Ready to Open Your Showroom?", "Get Started — Free" (gold button → /setup), "Apply for Trade Account" (gold outline → /trade-signup).
- Footer: bg-bg, EuroArt4.me logo in gold, copyright.

**2. Setup Page (app/setup/page.tsx)** — Client component.
- Form: name*, company, user type (select: designer|influencer|corporate), email*, password*
- On submit: Supabase auth.signUp → create users record with generated slug (collision-checked) → redirect to /showroom/[slug]/edit
- "Apply for Trade Account" link at bottom
- Error display for auth/DB failures

**3. Catalog Page (app/catalog/page.tsx)** — Client component.
- Fetches all active artworks from Supabase
- Filters: style tag dropdown, space suitability dropdown
- Grid of artwork cards (3:4 aspect ratio images, title, artist, year, price)
- Click → artwork detail panel slides open below with full description, historical context, tags, space suitability badges
- "Create Showroom to Order" CTA linking to /setup

**4. Trade Signup Page (app/trade-signup/page.tsx)** — Client component.
- Form: name*, company*, email*, account type*, message
- Benefits list in blue/ice box: unlimited AI, 20% trade discount, PDF export, analytics, client inquiry form, custom slug
- On submit: POST /api/trade-signup → success confirmation page
- "Back to Home" link after submission

**5. Showroom Public Page (app/showroom/[slug]/page.tsx)** — Server-rendered (SSR).
- `generateMetadata()`: Fetch user by slug, generate OG meta: title "[Name]'s Designer Showroom · EuroArt4.me", description with user type and piece count, og:image from first collection artwork, twitter:card summary_large_image
- Render `ShowroomPublicView` component with user data and public collections (with nested collection_items and artworks)

**6. Showroom Edit Page (app/showroom/[slug]/edit/page.tsx)** — Client component, auth-gated.
- Check auth via supabase.auth.getSession(), verify user owns the slug
- Space type tabs: All Spaces, Hotel Room, Hotel Lobby, Hotel Dining, Hallway/Corridor, Office, Restaurant, Residential
- Sections: AI Room Studio, Artwork Catalog, Configuration Panel (when artwork selected), Collections Manager
- Header with "View Public Page" link and user name/tier badge


============================================================
PROMPT 5 OF 6 — COMPONENTS
============================================================

Create 6 feature components. All use the EuroArt4 design system.

**1. ShowroomPublicView (components/showroom/ShowroomPublicView.tsx):**
- Header: bg-ink, "EuroArt4.me" in gold, user name (large heading), company, user type + piece count
- Collections rendered as sections with name, space type, piece count
- Each collection item: artwork image (4:3), title, artist+year, print config specs, expandable description/context/tags, custom frame spec if present
- "Share Collection" and per-item "Share" buttons open ShareModal
- Footer with "Create your own showroom" link

**2. AiRoomStudio (components/studio/AiRoomStudio.tsx):**
- Textarea for room description (max 1000 chars) + "Curate Room" button
- Posts to /api/ai/room with session_token (stored in sessionStorage)
- Displays result: scene description, mood badge (bg-ice text-blue), recommended artworks as clickable buttons, placement tip
- On 402: show gold upsell box with "Apply for Trade Account" link to /trade-signup
- On 429: show rate limit message

**3. ArtworkCatalog (components/catalog/ArtworkCatalog.tsx):**
- Style tag filter dropdown
- Grid of artwork cards (click to select/deselect)
- Selected artwork shows blue ring
- Detail panel below with full-size image, title, artist, year, description, historical context, tags (ice/blue pill badges), space suitability badges

**4. ConfigurationPanel (components/config/ConfigurationPanel.tsx):**
- 4-column toggle grid: Print Size (8x10", 11x14", 16x20", 18x24", 24x36", Custom), Paper (Matte Art, Enhanced Matte, Giclée Canvas, Metallic), Frame (Unframed, Black Float, Natural Oak, Antique Gold, Custom), Mat (No Mat, 1" White, 2" White, 2" Cream, 3" Linen)
- When Frame=Custom: text input + "AI Frame Spec" button (posts to /api/ai/frame)
- "Add to Collection" section: select existing collection or create new one (name input), save to Supabase collection_items

**5. CollectionManager (components/collections/CollectionManager.tsx):**
- Fetches collection items grouped by collection_id (single query with collection_id in select)
- Renders per-collection cards with name, space type, piece count
- Grid of item thumbnails with remove button (hover-visible)
- Stabilized useEffect dependency on collection IDs (not object reference)

**6. ShareModal (components/share/ShareModal.tsx):**
- Branded card preview (bg-ink): artwork image, title, artist+year, description (2-line clamp), curator name + type, "EuroArt4.me" in gold (#C9A84C), showroom URL
- Share buttons: Pinterest (pin creator with image+URL), X/Twitter (tweet composer), Instagram (copy caption+URL to clipboard with alert), Copy Link
- Clipboard API with fallback for non-secure contexts


============================================================
PROMPT 6 OF 6 — API ROUTES & ADMIN
============================================================

Create 7 API routes and the admin page. ALL API routes that modify data must validate JWT auth.

**1. POST /api/ai/room (app/api/ai/room/route.ts):**
- Optional auth (free users use session tokens, Pro users use JWT)
- Create/fetch ai_session record by session_token
- Rate limit: if `userTier === 'free'` AND `generation_count >= generation_limit` → 402
- Fetch all active artworks for context
- Call Claude API (claude-sonnet-4-20250514, max 1024 tokens) with curator prompt — return JSON: { scene, recommendations[{title,reason}], placement_tip, mood }
- Atomic increment via `supabase.rpc('increment_generation_count', { session_id })`
- Strip markdown fences before JSON.parse, catch parse errors

**2. POST /api/ai/frame (app/api/ai/frame/route.ts):**
- REQUIRE auth (getAuthUser)
- Call Claude API with framing specification prompt
- Return { specification: string }

**3. GET/POST /api/collections (app/api/collections/route.ts):**
- GET: Use anon client (RLS enforced), filter is_public=true
- POST: REQUIRE auth, enforce ownership (body.user_id must match auth user id)

**4. POST /api/share (app/api/share/route.ts):**
- Derive user_id from auth token (NEVER trust client-supplied user_id)
- Validate network is one of: pinterest, instagram, twitter, link
- Best-effort insert to share_events

**5. POST /api/trade-signup (app/api/trade-signup/route.ts):**
- Validate required fields + email format regex
- Persist to `trade_applications` table via server client
- Send admin notification email via Resend (HTML-escape all user input)
- From: noreply@euroart4.me, To: admin@euroart4.me

**6. POST /api/prodigi/order (app/api/prodigi/order/route.ts):**
- REQUIRE auth
- Fetch collection items, call Prodigi API v4.0/Orders
- Check prodigiResponse.ok — propagate error status if not

**7. POST /api/prodigi/webhook (app/api/prodigi/webhook/route.ts):**
- Fail closed: if PRODIGI_WEBHOOK_SECRET is set, REQUIRE x-prodigi-signature header
- Use timing-safe HMAC comparison (crypto.timingSafeEqual)
- Log events by type

**8. Admin Page (app/admin/page.tsx):**
- Auth: use `supabase.auth.getUser()` (server-verified), check email against ADMIN_EMAILS allowlist (`['admin@euroart4.me']`)
- Three tabs: Users, Artworks, Analytics
- Users tab: table with name, email, type, tier badge, showroom link, Approve/Revoke Pro button (with error handling)
- Artworks tab: table with title, artist, year, price, active status, Edit/Hide buttons. "Add Artwork" button opens inline form.
- Analytics tab: stat cards (total users, pro users, active artworks), share events by network

============================================================
