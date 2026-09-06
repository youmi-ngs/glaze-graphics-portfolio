// ── Works data ────────────────────────────────────────────────────────────
// Single source of truth for the home teaser tiles and the /works gallery.
// Hand-maintained — edit freely. Photography entries are derived from the
// "YYYYMMDD_title" filenames in public/images/works/photos/; empty title = the
// card shows the image only. `ar` = thumbnail aspect ratio (h/w) for the masonry.

export const CATEGORIES = [
  { key: 'photography', label: 'Photography' },
  { key: 'design', label: 'Design' },
  { key: 'others', label: 'Others' },
];

export const WORKS = [
  // ── design ────────────────────────────────────────────────────────────────
  { slug: "logo", title: "Logo", category: "design", year: 2026, img: "/images/works/design/logo-color.jpg", images: ["/images/works/design/logo-color.jpg", "/images/works/design/logo-mono.jpg"], ar: 1, description: "" },
  { slug: "golden-record", title: "Golden Record", category: "design", year: 2026, img: "/images/works/design/A26DC132_postcard-front.png", images: ["/images/works/design/A26DC132_postcard-front.png"], ar: 1.455, description: "", featured: 1 },
  { slug: "astronaut", title: "Astronaut", category: "design", year: 2026, img: "/images/works/design/a26dc132_mask.jpg", images: ["/images/works/design/a26dc132_mask.jpg"], ar: 1.333, description: "" },
  { slug: "kamon-hanabishi", title: "Kamon", category: "design", year: 2026, img: "/images/works/design/kamon-01_white.png", images: ["/images/works/design/kamon-01_white.png", "/images/works/design/kamon-01_black.png"], ar: 1, description: "" },
  { slug: "kamon-kakuji", title: "Kamon", category: "design", year: 2026, img: "/images/works/design/kamon-02_white.png", images: ["/images/works/design/kamon-02_white.png", "/images/works/design/kamon-02_black.png"], ar: 1, description: "", featured: 6 },
  { slug: "space-scene", title: "Space Scene", category: "design", year: 2026, img: "/images/works/design/hero.jpg", images: ["/images/works/design/hero.jpg"], ar: 0.625, description: "" },

  // ── others (sites & apps) ─────────────────────────────────────────────────
  { slug: "sector-y", title: "Sector Y", category: "others", year: null, img: null, ar: 1.25, description: "My personal site — a hand-built gallery of photos, trips, and little sparkles.", link: "https://youmi.ngs.computer" },

  // ── photography ───────────────────────────────────────────────────────────
  { slug: "20260826-cat-2", title: "Cat", category: "photography", year: 2026, img: "/images/works/photos/20260826_cat-2.jpg", ar: 1.501, description: "" },
  { slug: "20260826-cat", title: "Cat", category: "photography", year: 2026, img: "/images/works/photos/20260826_cat.jpg", ar: 1.501, description: "" },
  { slug: "20260826-nil", title: "", category: "photography", year: 2026, img: "/images/works/photos/20260826_nil.jpg", ar: 1.501, description: "" },
  { slug: "20260819-hi-mochi", title: "Hi, Mochi!", category: "photography", year: 2026, img: "/images/works/photos/20260819_Hi-Mochi.jpg", ar: 1.469, description: "" },
  { slug: "20260819-almost-there", title: "Almost There", category: "photography", year: 2026, img: "/images/works/photos/20260819_almost-there.jpg", ar: 0.666, description: "" },
  { slug: "20260819-solar-system", title: "Solar System", category: "photography", year: 2026, img: "/images/works/photos/20260819_solar-system.jpg", ar: 1.501, description: "", featured: 2 },
  { slug: "20260728-fireworks", title: "Fireworks", category: "photography", year: 2026, img: "/images/works/photos/20260728_fireworks.jpg", ar: 1.501, description: "" },
  { slug: "20260705-nil", title: "", category: "photography", year: 2026, img: "/images/works/photos/20260705_nil.jpg", ar: 1.501, description: "" },
  { slug: "202607-nil-2", title: "", category: "photography", year: 2026, img: "/images/works/photos/202607_nil-2.jpg", ar: 1.501, description: "", featured: 3 },
  { slug: "202607-nil", title: "", category: "photography", year: 2026, img: "/images/works/photos/202607_nil.jpg", ar: 1.501, description: "" },
  { slug: "202607-tokyo-station", title: "Tokyo Station", category: "photography", year: 2026, img: "/images/works/photos/202607_tokyo-station.jpg", ar: 1.501, description: "" },
  { slug: "202605-suzume", title: "Suzume", category: "photography", year: 2026, img: "/images/works/photos/202605_suzume.jpg", ar: 1.501, description: "" },
  { slug: "20260411-a-sad-look", title: "A Sad Look", category: "photography", year: 2026, img: "/images/works/photos/20260411_a-sad-look.jpg", ar: 1.501, description: "" },
  { slug: "20260411-big-bird", title: "Big Bird", category: "photography", year: 2026, img: "/images/works/photos/20260411_big-bird.jpg", ar: 1.501, description: "" },
  { slug: "20260411-love-is-love", title: "Love Is Love", category: "photography", year: 2026, img: "/images/works/photos/20260411_love-is-love.jpg", ar: 1.5, description: "" },
  { slug: "20260305-tomorrowland", title: "Tomorrowland", category: "photography", year: 2026, img: "/images/works/photos/20260305_tomorrowland.JPG", ar: 1.501, description: "" },
  { slug: "20260216-ashimoto-no-hito", title: "Ashimoto No Hito", category: "photography", year: 2026, img: "/images/works/photos/20260216_ashimoto-no-hito.JPG", ar: 1.501, description: "" },
  { slug: "20260216-kyoto-shi", title: "Kyoto Shi", category: "photography", year: 2026, img: "/images/works/photos/20260216_kyoto-shi.JPG", ar: 1.501, description: "" },
  { slug: "20260216-ropeshopinoike", title: "Rope Shop In Oike", category: "photography", year: 2026, img: "/images/works/photos/20260216_ropeShopInOike.JPG", ar: 1.501, description: "", featured: 4 },
  { slug: "2026-opposite-world", title: "Opposite World", category: "photography", year: 2026, img: "/images/works/photos/2026_opposite-world.jpg", ar: 1.501, description: "" },
  { slug: "20251224-merry-christmas", title: "Merry Christmas", category: "photography", year: 2025, img: "/images/works/photos/20251224_merry-christmas.jpg", ar: 1.501, description: "" },
  { slug: "20251120-space-mt", title: "Space Mt", category: "photography", year: 2025, img: "/images/works/photos/20251120_space-mt.JPG", ar: 1.501, description: "" },
  { slug: "20251120-xmas-tree", title: "Xmas Tree", category: "photography", year: 2025, img: "/images/works/photos/20251120_xmas-tree.JPG", ar: 1.501, description: "" },
  { slug: "20250810-tokyo-tower", title: "Tokyo Tower", category: "photography", year: 2025, img: "/images/works/photos/20250810_tokyo-tower.jpg", ar: 1.501, description: "", featured: 5 },
  { slug: "20250721-sky", title: "Sky", category: "photography", year: 2025, img: "/images/works/photos/20250721_sky.jpg", ar: 1.501, description: "" },
  { slug: "202507-naked-space-mountain", title: "Naked Space Mountain", category: "photography", year: 2025, img: "/images/works/photos/202507_naked-space-mountain.jpg", ar: 1.501, description: "" },
  { slug: "202507-nil-2", title: "", category: "photography", year: 2025, img: "/images/works/photos/202507_nil-2.jpg", ar: 1.501, description: "" },
  { slug: "202507-nil", title: "", category: "photography", year: 2025, img: "/images/works/photos/202507_nil.jpg", ar: 0.666, description: "" },
  { slug: "20250517-yasaka-2", title: "Yasaka", category: "photography", year: 2025, img: "/images/works/photos/20250517_yasaka-2.JPG", ar: 1.501, description: "" },
  { slug: "20250517-yasaka", title: "Yasaka", category: "photography", year: 2025, img: "/images/works/photos/20250517_yasaka.JPG", ar: 1.501, description: "" },
  { slug: "20250506-failure", title: "Failure", category: "photography", year: 2025, img: "/images/works/photos/20250506_failure.jpg", ar: 0.666, description: "" },
  { slug: "20250505-hello-moon", title: "Hello Moon", category: "photography", year: 2025, img: "/images/works/photos/20250505_Hello-moon.jpg", ar: 1.501, description: "" },
  { slug: "20250407-sakura", title: "Sakura", category: "photography", year: 2025, img: "/images/works/photos/20250407_sakura.jpg", ar: 1.501, description: "" },
  { slug: "20250331-sakura", title: "Sakura", category: "photography", year: 2025, img: "/images/works/photos/20250331_sakura.JPG", ar: 1.501, description: "" },
  { slug: "20250318-sakura-with-you", title: "Sakura With You", category: "photography", year: 2025, img: "/images/works/photos/20250318_sakura-with-you.jpg", ar: 0.75, description: "" },
  { slug: "20250214-yummy", title: "Yummy", category: "photography", year: 2025, img: "/images/works/photos/20250214_yummy.jpg", ar: 1.501, description: "" },
  { slug: "20250203-frozen", title: "Frozen", category: "photography", year: 2025, img: "/images/works/photos/20250203_frozen.jpg", ar: 1.501, description: "" },
  { slug: "20250203-minnietrail", title: "Minnie Trail", category: "photography", year: 2025, img: "/images/works/photos/20250203_minnieTrail.jpg", ar: 1.501, description: "" },
  { slug: "20250203-pocahontas", title: "Pocahontas", category: "photography", year: 2025, img: "/images/works/photos/20250203_pocahontas.jpg", ar: 1.501, description: "" },
  { slug: "20250203-rapunzel", title: "Rapunzel", category: "photography", year: 2025, img: "/images/works/photos/20250203_rapunzel.jpg", ar: 1.501, description: "" },
  { slug: "20250122-street", title: "Street", category: "photography", year: 2025, img: "/images/works/photos/20250122_street.JPG", ar: 0.666, description: "" },
  { slug: "20250114-ticket", title: "Ticket", category: "photography", year: 2025, img: "/images/works/photos/20250114_ticket.JPG", ar: 1.501, description: "" },
  { slug: "20241221-telecomcenter", title: "Telecom Center", category: "photography", year: 2024, img: "/images/works/photos/20241221_telecomcenter.JPG", ar: 0.666, description: "" },
  { slug: "20240627-applepark", title: "Apple Park", category: "photography", year: 2024, img: "/images/works/photos/20240627_applePark.JPG", ar: 1.501, description: "" },
  { slug: "20240626-goldengatebridge", title: "Golden Gate Bridge", category: "photography", year: 2024, img: "/images/works/photos/20240626_goldenGateBridge.JPG", ar: 1.501, description: "" },
  { slug: "20240607-spacemountain", title: "Space Mountain", category: "photography", year: 2024, img: "/images/works/photos/20240607_spacemountain.JPG", ar: 1.502, description: "" },
  { slug: "20240607-startours", title: "Star Tours", category: "photography", year: 2024, img: "/images/works/photos/20240607_startours.JPG", ar: 1.501, description: "" },
  { slug: "20240320-tiki", title: "Tiki", category: "photography", year: 2024, img: "/images/works/photos/20240320_tiki.jpg", ar: 1.501, description: "" },
  { slug: "20240213-hiro", title: "Hiro", category: "photography", year: 2024, img: "/images/works/photos/20240213_hiro.jpg", ar: 0.666, description: "" },
  { slug: "202402-balloons", title: "Balloons", category: "photography", year: 2024, img: "/images/works/photos/202402_balloons.jpg", ar: 1.501, description: "" },
  { slug: "20240101-small-bird", title: "Small Bird", category: "photography", year: 2024, img: "/images/works/photos/20240101_small-bird.jpg", ar: 1.501, description: "" },
  { slug: "20230805-jellyfish", title: "Jellyfish", category: "photography", year: 2023, img: "/images/works/photos/20230805_jellyfish.JPG", ar: 0.666, description: "" },
  { slug: "20230805-kyotoaquarium", title: "Kyoto Aquarium", category: "photography", year: 2023, img: "/images/works/photos/20230805_kyotoaquarium.JPG", ar: 0.666, description: "" },
  { slug: "20230805-penguin", title: "Penguin", category: "photography", year: 2023, img: "/images/works/photos/20230805_penguin.jpg", ar: 1.501, description: "" },
  { slug: "20230805-ray", title: "Ray", category: "photography", year: 2023, img: "/images/works/photos/20230805_ray.jpg", ar: 0.666, description: "" },
  { slug: "20230624-hydrangea", title: "Hydrangea", category: "photography", year: 2023, img: "/images/works/photos/20230624_hydrangea.JPG", ar: 0.666, description: "" },
];

// Cosmic gradient placeholder class for a work with no image yet.
export function placeholderClass(index) {
  return `g${(index % 6) + 1}`;
}

// Label for a category key.
export function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}
