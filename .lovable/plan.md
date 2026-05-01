## Add 2026 Gallery Year

### What changes

1. **Add "2026" to the year filter** on the Foto Galerija (`/gallery`) page so it appears as a clickable button alongside 2025, 2024, etc. (as the first/leftmost year, since it's the newest).

2. **Add a `"2026"` entry to `galleryData`** in `src/pages/Gallery.tsx` containing 10 images. The same 2026 button will work for the Videos tab too (no videos for 2026 yet — it will show the existing "No videos from 2026" empty state).

3. **Save the 10 photos to `/public/gallery/2026/`** using the existing naming convention (`2026-MM-DD_N.jpg`), consistent with how every other year is stored. This matches the project rule of keeping all gallery media as local assets in `/public/`, never external URLs.

### What I need from you

Please **upload the 10 photos** in your next message (drag-and-drop or use the + button in chat). For each one, if you can tell me the **month/date** it was taken, I'll name them accordingly (e.g. `2026-01-15_1.jpg`). If you don't know exact dates, I'll number them sequentially (`2026_1.jpg` through `2026_10.jpg`).

### Technical details

- File edited: `src/pages/Gallery.tsx`
  - Update `years` array: prepend `"2026"` so it renders first.
  - Add `"2026": [ ...10 entries ]` to the `galleryData` object.
- Files added: 10 image files under `public/gallery/2026/`.
- No DB or backend changes — purely static assets + one component edit.
- Existing `onError` handler already hides any image that fails to load, so there's no risk of broken tiles if a filename is off.

Once you upload the images, I'll switch to build mode and wire it all up in one pass.