// ── Works data ────────────────────────────────────────────────────────────
// Single source of truth for the home teaser tiles and the /works gallery.
//
// Photography entries are auto-generated from public/images/works/photos/ —
// titles/years derived from filenames, so rename freely. Empty title = the
// card shows the image only (no caption text).
//
// To add/replace: drop the file in public/images/works/<folder>/ and point
// `img` at it (web-absolute path, e.g. "/images/works/photos/foo.jpg").
// `featured: true` surfaces a work in the home teaser grid.

export const CATEGORIES = [
  { key: 'photography', label: 'Photography' },
  { key: 'design', label: 'Design' },
  { key: 'others', label: 'Others' },
];

export const WORKS = [
  // ── design ────────────────────────────────────────────────────────────────
  { slug: "logo", title: "Logo", category: "design", year: 2024, img: "/images/works/design/logo-color.jpg", images: ["/images/works/design/logo-color.jpg", "/images/works/design/logo-mono.jpg"], ar: 1, description: "", featured: true },
  { slug: "golden-record", title: "Golden Record", category: "design", year: 2024, img: "/images/works/design/A26DC132_postcard-front.png", images: ["/images/works/design/A26DC132_postcard-front.png"], ar: 1.455, description: "", featured: true },
  { slug: "astronaut", title: "Astronaut", category: "design", year: 2024, img: "/images/works/design/a26dc132_mask.jpg", images: ["/images/works/design/a26dc132_mask.jpg"], ar: 1.333, description: "" },
  { slug: "kamon-hanabishi", title: "Kamon · Hanabishi", category: "design", year: 2024, img: "/images/works/design/kamon-01_white.png", images: ["/images/works/design/kamon-01_white.png", "/images/works/design/kamon-01_black.png"], ar: 1, description: "" },
  { slug: "kamon-kakuji", title: "Kamon · Kakuji “Se”", category: "design", year: 2024, img: "/images/works/design/kamon-02_white.png", images: ["/images/works/design/kamon-02_white.png", "/images/works/design/kamon-02_black.png"], ar: 1, description: "" },
  { slug: "space-scene", title: "Space Scene", category: "design", year: 2024, img: "/images/works/design/hero.jpg", images: ["/images/works/design/hero.jpg"], ar: 0.625, description: "" },

  // ── others (sites & apps) — add entries with a `link` ─────────────────────
  { slug: "sector-y", title: "Sector Y", category: "others", year: null, img: null, ar: 1.25, description: "My personal site — a hand-built gallery of photos, trips, and little sparkles.", link: "https://youmi.ngs.computer" },

  // ── photography (auto-generated) ──────────────────────────────────────────
  { slug: "20250517-1", title: "May 2025", category: "photography", year: 2025, img: "/images/works/photos/20250517-1.JPG", ar: 1.501 },
  { slug: "20250517-2", title: "May 2025", category: "photography", year: 2025, img: "/images/works/photos/20250517-2.JPG", ar: 1.501 },
  { slug: "20250721", title: "Jul 2025", category: "photography", year: 2025, img: "/images/works/photos/20250721.jpg", ar: 1.501 },
  { slug: "20250810", title: "Aug 2025", category: "photography", year: 2025, img: "/images/works/photos/20250810.jpg", ar: 1.501 },
  { slug: "img-1461", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_1461.jpg", ar: 1.501 },
  { slug: "img-2971", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_2971.jpg", ar: 1.501 },
  { slug: "img-3000", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_3000.jpg", ar: 1.5 },
  { slug: "img-3024", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_3024.jpg", ar: 1.501 },
  { slug: "img-3178", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_3178.jpg", ar: 1.501 },
  { slug: "img-3249", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_3249.jpg", ar: 1.501 },
  { slug: "img-4456", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_4456.jpg", ar: 1.501 },
  { slug: "img-4488", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_4488.jpg", ar: 1.501 },
  { slug: "img-4514", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_4514.jpg", ar: 1.501 },
  { slug: "img-4551", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_4551.jpg", ar: 1.501 },
  { slug: "img-6892", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_6892.jpg", ar: 1.501 },
  { slug: "img-7187", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_7187.jpg", ar: 1.469 },
  { slug: "img-7319", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_7319.jpg", ar: 1.501 },
  { slug: "img-7356", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_7356.jpg", ar: 0.666 },
  { slug: "img-7574", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_7574.jpg", ar: 1.501 },
  { slug: "img-7610", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_7610.jpg", ar: 1.501 },
  { slug: "img-7649", title: "", category: "photography", year: null, img: "/images/works/photos/IMG_7649.jpg", ar: 1.501 },
  { slug: "applepark20240627", title: "Apple Park", category: "photography", year: 2024, img: "/images/works/photos/applePark20240627.JPG", ar: 1.501 },
  { slug: "ashimoto-no-hito", title: "Ashimoto no Hito", category: "photography", year: null, img: "/images/works/photos/ashimoto-no-hito.JPG", ar: 1.501 },
  { slug: "bird20240101", title: "Bird", category: "photography", year: 2024, img: "/images/works/photos/bird20240101.jpg", ar: 1.501 },
  { slug: "frozen20250203", title: "Frozen", category: "photography", year: 2025, img: "/images/works/photos/frozen20250203.jpg", ar: 1.501 },
  { slug: "goldengatebridge20240626", title: "Golden Gate Bridge", category: "photography", year: 2024, img: "/images/works/photos/goldenGateBridge20240626.JPG", ar: 1.501, featured: true },
  { slug: "hiro20240213", title: "Hiro", category: "photography", year: 2024, img: "/images/works/photos/hiro20240213.jpg", ar: 0.666 },
  { slug: "hydrangea20230624", title: "Hydrangea", category: "photography", year: 2023, img: "/images/works/photos/hydrangea20230624.JPG", ar: 0.666 },
  { slug: "jellyfish20230805", title: "Jellyfish", category: "photography", year: 2023, img: "/images/works/photos/jellyfish20230805.JPG", ar: 0.666, featured: true },
  { slug: "kyoto-shi", title: "Kyoto", category: "photography", year: null, img: "/images/works/photos/kyoto-shi.JPG", ar: 1.501 },
  { slug: "kyotoaquarium20230805", title: "Kyoto Aquarium", category: "photography", year: 2023, img: "/images/works/photos/kyotoaquarium20230805.JPG", ar: 0.666 },
  { slug: "minnietrail20250203", title: "Minnie Trail", category: "photography", year: 2025, img: "/images/works/photos/minnieTrail20250203.jpg", ar: 1.501 },
  { slug: "moon20250505", title: "Moon", category: "photography", year: 2025, img: "/images/works/photos/moon20250505.jpg", ar: 1.501, featured: true },
  { slug: "penguin20230805", title: "Penguin", category: "photography", year: 2023, img: "/images/works/photos/penguin20230805.jpg", ar: 1.501 },
  { slug: "penguins20260411", title: "Penguins", category: "photography", year: 2026, img: "/images/works/photos/penguins20260411.jpg", ar: 1.5 },
  { slug: "photo1", title: "", category: "photography", year: null, img: "/images/works/photos/photo1.jpg", ar: 0.666 },
  { slug: "photo10", title: "", category: "photography", year: null, img: "/images/works/photos/photo10.jpg", ar: 1.501 },
  { slug: "photo11", title: "", category: "photography", year: null, img: "/images/works/photos/photo11.jpg", ar: 0.666 },
  { slug: "photo2", title: "", category: "photography", year: null, img: "/images/works/photos/photo2.jpg", ar: 1.501 },
  { slug: "photo3", title: "", category: "photography", year: null, img: "/images/works/photos/photo3.jpg", ar: 1.501 },
  { slug: "photo4", title: "", category: "photography", year: null, img: "/images/works/photos/photo4.jpg", ar: 1.501 },
  { slug: "photo5", title: "", category: "photography", year: null, img: "/images/works/photos/photo5.jpg", ar: 0.75 },
  { slug: "photo6", title: "", category: "photography", year: null, img: "/images/works/photos/photo6.jpg", ar: 1.501 },
  { slug: "photo7", title: "", category: "photography", year: null, img: "/images/works/photos/photo7.jpg", ar: 1.501 },
  { slug: "photo8", title: "", category: "photography", year: null, img: "/images/works/photos/photo8.jpg", ar: 0.666 },
  { slug: "photo9", title: "", category: "photography", year: null, img: "/images/works/photos/photo9.jpg", ar: 1.501 },
  { slug: "pocahontas20250203", title: "Pocahontas", category: "photography", year: 2025, img: "/images/works/photos/pocahontas20250203.jpg", ar: 1.501 },
  { slug: "rapunzel20250203", title: "Rapunzel", category: "photography", year: 2025, img: "/images/works/photos/rapunzel20250203.jpg", ar: 1.501 },
  { slug: "ropeshopinoike", title: "Rope Shop In Oike", category: "photography", year: null, img: "/images/works/photos/ropeShopInOike.JPG", ar: 1.501 },
  { slug: "sakura20250331", title: "Sakura", category: "photography", year: 2025, img: "/images/works/photos/sakura20250331.JPG", ar: 1.501, featured: true },
  { slug: "space-mt20251120", title: "Space Mountain", category: "photography", year: 2025, img: "/images/works/photos/space-mt20251120.JPG", ar: 1.501 },
  { slug: "spacemountain20240607", title: "Space Mountain", category: "photography", year: 2024, img: "/images/works/photos/spacemountain20240607.JPG", ar: 1.502 },
  { slug: "startours20240607", title: "Star Tours", category: "photography", year: 2024, img: "/images/works/photos/startours20240607.JPG", ar: 1.501 },
  { slug: "street20250122", title: "Street", category: "photography", year: 2025, img: "/images/works/photos/street20250122.JPG", ar: 0.666 },
  { slug: "telecomcenter20241221", title: "Telecom Center", category: "photography", year: 2024, img: "/images/works/photos/telecomcenter20241221.JPG", ar: 0.666 },
  { slug: "ticket20250114", title: "Ticket", category: "photography", year: 2025, img: "/images/works/photos/ticket20250114.JPG", ar: 1.501 },
  { slug: "tiki20240320", title: "Tiki", category: "photography", year: 2024, img: "/images/works/photos/tiki20240320.jpg", ar: 1.501 },
  { slug: "tomorrowland20260305", title: "Tomorrowland", category: "photography", year: 2026, img: "/images/works/photos/tomorrowland20260305.JPG", ar: 1.501 },
  { slug: "xmax-tree20251120", title: "Xmas Tree", category: "photography", year: 2025, img: "/images/works/photos/xmax-tree20251120.JPG", ar: 1.501 },
];

// Cosmic gradient placeholder class for a work with no image yet.
export function placeholderClass(index) {
  return `g${(index % 6) + 1}`;
}

// Label for a category key.
export function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}
