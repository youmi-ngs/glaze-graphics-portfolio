# glaze-graphics-site

Vite + React portfolio site, deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## Work images: originals vs. web copies

- `assets-src/works/{photos,design}/` — **full-resolution originals**. Git-ignored, never deployed. Keep every original here.
- `public/images/works/{photos,design}/` — **web copies** served by the site and committed to git.
- Never put a full-res export straight into `public/`. Photos get two web copies, both made from the original:
  - `public/images/works/photos/X.jpg` — **1600px** long edge, for gallery cards
  - `public/images/works/photos/large/X.jpg` — **2560px** long edge, for the detail modal (it fills the viewport
    height, which needs >1600px on Retina; the modal shows the 1600px copy first and swaps in the large one)
  Make them with `node scripts/make-web-photos.mjs` (macOS `sips`, JPEG quality setting 85, never upscales; only
  photos listed in `src/works.js`; skips existing files unless `--force`).
- Design images: single web copy, 1600px long edge (`sips -Z 1600`).
- The original and its web copies share the same filename.

## Modals

All modals use `src/Modal.jsx` and the shared rules at the top of the modal section in `src/styles.css`:
`--modal-gap` (viewport → panel), `--mpad` (panel → content), `--mw`/`--mh` (max panel size), square corners,
and the same ✕ (dark disc, top-left). Scrolling content gets the `modal-scroll` class (thin, always-visible
scrollbar). Change these shared values rather than overriding them per modal.

## Adding photos to the gallery

1. Filename: `YYYYMMDD_title-in-kebab.jpg` (shooting date; `nil` as title = no caption).
   Shooting date: Lightroom exports carry two EXIF dates — the earlier one is the capture date, the later one is the export date.
2. Put the original in `assets-src/works/photos/`.
3. Add an entry to `src/works.js` (photography section, newest first):
   `slug` = filename with `_` → `-` (no extension), `ar` = height / width of the image (3 decimals).
   The gallery sorts by creation date, newest first (`dateKey` / `WORKS_BY_DATE` in `works.js`). Photos take the
   date from the slug; design/others entries need a `date: "YYYYMM"` field. Same-date works keep their order in
   `works.js`, so list the later one first.
4. Run `node scripts/make-web-photos.mjs` to make both web copies.
5. Run `node scripts/extract-exif.mjs` to regenerate `src/exif.json` (camera, lens, focal length, f-number,
   shutter speed, ISO shown in the detail modal). It reads the originals in `assets-src/`, so commit the JSON.
