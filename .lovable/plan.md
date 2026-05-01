## Add Sub-Galleries (Event Folders) inside Year Galleries

### What changes

Year galleries can contain named **sub-galleries** (events). Sub-galleries appear at the very top of the photo grid as tiles the same size as a normal thumbnail. Clicking one opens that sub-gallery using the exact same grid + lightbox layout (with a "Back" control to return to the year).

We'll start by creating one sub-gallery in **2026**:
- **Name:** Spring Folklorama - April 25, 2026
- **Contents:** the first two images currently in the 2026 gallery (`2026_1.jpg`, `2026_2.jpg`)

Those two images will be **moved** into the sub-gallery (so they no longer show as loose thumbnails in the 2026 year view — they'll only appear inside the sub-gallery, behind its cover tile). The remaining 2026 photos stay where they are.

### How it looks

```
2026 year view:
┌────────┬────────┬────────┐
│ [SUB]  │  pic3  │  pic4  │   <- sub-gallery tile uses pic1 as cover,
│ Spring │        │        │      with a dark overlay + folder icon +
│ Folkl. │        │        │      title "Spring Folklorama -
└────────┴────────┴────────┘      April 25, 2026"

Click sub-gallery -> shows just pic1, pic2 in the same grid,
                     with a "← Back to 2026" button above the grid.
                     Lightbox arrows scrub only within the sub-gallery.
```

### Behavior details

- Sub-gallery tiles render first, before regular photos, in the year grid.
- Tile is the same square aspect as photo thumbnails, uses the first image as a cover, with a semi-transparent overlay and the sub-gallery title.
- Inside a sub-gallery: same 2/3/4-column grid, same click-to-open lightbox, same arrow-key navigation (loops within the sub-gallery only).
- A "← Back to 2026" link above the grid returns to the year view.
- Switching the year filter (or to "All") exits the sub-gallery view.
- "All" view: photos inside sub-galleries are still included so nothing disappears from the global feed; sub-gallery tiles do not appear in "All".

### Technical details

File edited: `src/pages/Gallery.tsx`

1. Extend the data shape so each year can optionally have a `subGalleries` array:
   ```ts
   subGalleries?: { id: string; title: string; photos: { src; alt }[] }[]
   ```
   Add `subGalleries: [{ id: "spring-folklorama-2026", title: "Spring Folklorama - April 25, 2026", photos: [2026_1, 2026_2] }]` to the 2026 entry, and remove those two from 2026's top-level `photos` list.

2. Add state `const [activeSubGallery, setActiveSubGallery] = useState<string | null>(null)`.

3. Update `getFilteredPhotos()`:
   - If `activeSubGallery` set → return that sub-gallery's photos.
   - Else if a specific year selected → return that year's top-level photos (sub-gallery photos hidden behind tile).
   - Else "all" → flatten top-level + all sub-gallery photos across years.

4. In the photo grid, when a year is selected and no sub-gallery is active, render `subGalleries` tiles first, then `filteredPhotos`. Sub-gallery tile = same square `<div>` markup as a thumbnail with a dark gradient overlay + folder icon (lucide `FolderOpen`) + centered title.

5. When `activeSubGallery` is active, render a small "← Back to {year}" button above the grid that clears `activeSubGallery`.

6. Reset `activeSubGallery` to `null` whenever `selectedYear` changes (via `useEffect`).

7. Lightbox already keys off `filteredPhotos` so it automatically scopes to the sub-gallery while one is open — no extra changes needed.

Files added/moved: none. The two image files stay where they are on disk (`/public/gallery/2026/2026_1.jpg`, `2026_2.jpg`); only the data references change.

No DB or backend changes.
