## Goal

Eliminate the large empty space under landscape video cards on `/gallery` (Nastupi tab) caused by tall portrait videos in the same row. Use a masonry layout so each card flows under the shortest column.

## Approach

Use CSS multi-column layout (Tailwind `columns-*` + `break-inside-avoid`). This is the lightest-weight masonry approach — no extra dependencies, works with the existing markup, and naturally packs items of varying heights with no vertical gaps.

Note: CSS columns flow top-to-bottom, then left-to-right (so reading order goes down column 1, then down column 2, etc.) rather than left-to-right row-by-row. This is the standard tradeoff for masonry without JS. The newest videos still appear first (top of column 1).

## Changes

**File:** `src/pages/Gallery.tsx` — videos grid block (~lines 1221–1250 inside the `Nastupi` TabsContent)

Replace the current `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` wrapper with a column-based container:

- Wrapper: `columns-1 md:columns-2 lg:columns-3 gap-6`
- Each card: add `mb-6 break-inside-avoid inline-block w-full` so cards stay intact across column breaks and stack tightly
- Keep the existing card styling, hover effects, YouTube iframe (with `aspect-video`), and `<video>` element unchanged
- Add `block` to the `<video>` element to remove the inline-baseline gap

The Foto (photos) tab is left untouched since photos are uniform thumbnails and don't have this whitespace issue.

## Result

- Portrait videos (e.g. July 2025) sit alongside landscape videos with no empty filler space below
- Cards pack tightly into 1 / 2 / 3 columns responsively (mobile / tablet / desktop)
- No new dependencies, no JS layout logic
