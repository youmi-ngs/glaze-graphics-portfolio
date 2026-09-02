# Works images

Drop work thumbnails here, then point each entry in `src/works.js` at its file.

Example:

```js
{
  slug: 'city-at-dusk',
  title: 'City at Dusk',
  category: 'photography',   // photography | design | others
  year: 2024,
  img: '/images/works/city-at-dusk.jpg',   // ← this file, in this folder
  description: '…',
}
```

- Path is web-absolute from `public/`: a file `public/images/works/foo.jpg`
  is referenced as `/images/works/foo.jpg`.
- Any work with `img: null` shows a cosmic gradient placeholder until you add
  its image.
- Recommended: ~1600px on the long edge for web (keep your originals elsewhere).
- Cards are cropped to a 4:5 frame (`object-fit: cover`), so the subject should
  sit near the centre.
