import { useState, useMemo, useRef, useEffect } from 'react';
import Modal from './Modal.jsx';
import Footer from './Footer.jsx';
import { WORKS, WORKS_BY_DATE, CATEGORIES, placeholderClass, categoryLabel } from './works.js';
import EXIF from './exif.json';

// A single work card — masonry item, image shown at its natural aspect (no
// crop). Opens the detail modal on click.
function WorkCard({ work, index, onOpen }) {
  return (
    <button
      type="button"
      className={`work-card${work.title ? ' has-title' : ''}`}
      onClick={() => onOpen(work)}
      aria-label={`${work.title || 'Untitled'} — ${categoryLabel(work.category)}`}
    >
      {work.img ? (
        <img className="work-card__img" src={work.img} alt={work.title || ''} loading="lazy" />
      ) : (
        <span className={`work-card__img work-card__ph ${work.logo ? 'has-logo' : placeholderClass(index)}`}>
          {work.logo && <img src={work.logo} alt="" loading="lazy" />}
        </span>
      )}
      {work.category === 'others' && (
        <span className="work-card__badge" aria-hidden="true">↗</span>
      )}
      <span className="work-card__cap">
        {work.title && <span className="work-card__title">{work.title}</span>}
        <span className="work-card__cat">{categoryLabel(work.category)}</span>
      </span>
    </button>
  );
}

// Shooting data for a photo, keyed by filename (generated from the originals by
// scripts/extract-exif.mjs). Gear first, then exposure — the usual order.
function photoMeta(work) {
  if (work.category !== 'photography' || !work.img) return null;
  const m = EXIF[work.img.split('/').pop()];
  if (!m) return null;
  const gear = [m.camera, m.lens].filter(Boolean);
  const exposure = [m.focal, m.fnumber, m.shutter, m.iso].filter(Boolean);
  return gear.length || exposure.length ? { gear, exposure } : null;
}

// Modal contents — the image fills the view; title, text and shooting data sit
// below it (scroll to reveal). A thumbnail strip appears when a work has
// several variants (e.g. logo colour versions, kamon black/white).
function WorkDetail({ work }) {
  const imgs = work.images?.length ? work.images : [work.img].filter(Boolean);
  const [idx, setIdx] = useState(0);
  const meta = photoMeta(work);

  // Photos: show the 1600px copy at once (already cached from the gallery),
  // then swap in the 2560px one from photos/large/ when it has loaded — the
  // modal shows the photo at full viewport height, more than 1600px on Retina.
  const [hiRes, setHiRes] = useState(null);
  useEffect(() => {
    if (work.category !== 'photography' || !work.img) return;
    const src = work.img.replace('/photos/', '/photos/large/');
    const pre = new Image();
    pre.onload = () => setHiRes(src);
    pre.src = src; // a missing large copy just keeps the 1600px one
    return () => { pre.onload = null; };
  }, [work]);
  const shown = idx === 0 && hiRes ? hiRes : imgs[idx];

  return (
    <div className="work-modal__inner modal-scroll">
      <div className="work-modal__media">
        <div className="work-modal__stage">
          {imgs[idx] ? (
            <img src={shown} alt={work.title || ''} />
          ) : (
            <span className={`work-modal__ph ${work.logo ? 'has-logo' : placeholderClass(WORKS.indexOf(work))}`}>
              {work.logo && <img src={work.logo} alt="" />}
            </span>
          )}
        </div>
        {imgs.length > 1 && (
          <div className="work-modal__thumbs" role="tablist" aria-label="Variants">
            {imgs.map((src, i) => (
              <button
                key={src}
                role="tab"
                aria-selected={i === idx}
                className={`work-thumb${i === idx ? ' is-active' : ''}`}
                onClick={() => setIdx(i)}
              >
                <img src={src} alt={`${work.title || 'Variant'} ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="work-modal__text">
        <p className="work-modal__cat">
          {categoryLabel(work.category)}{work.year ? ` · ${work.year}` : ''}
        </p>
        <h2>{work.title || 'Untitled'}</h2>
        {work.description && <p className="work-modal__desc">{work.description}</p>}
        {meta && (
          <dl className="work-modal__exif" aria-label="Shooting data">
            {meta.gear.length > 0 && (
              <div><dt>Gear</dt><dd>{meta.gear.join(' · ')}</dd></div>
            )}
            {meta.exposure.length > 0 && (
              <div><dt>Exposure</dt><dd>{meta.exposure.map((v) => <span key={v}>{v}</span>)}</dd></div>
            )}
          </dl>
        )}
        {work.link && (
          <a
            className="work-modal__link"
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit&nbsp;live <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

// Responsive column count for the masonry, measured from the grid's own width.
function useColumnCount(ref, minColWidth = 260, gap = 16) {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () =>
      setCols(Math.max(2, Math.floor((el.clientWidth + gap) / (minColWidth + gap))));
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, minColWidth, gap]);
  return cols;
}

export default function WorksPage() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null); // the work shown in the modal
  const gridRef = useRef(null);
  const colCount = useColumnCount(gridRef);

  const filtered = useMemo(
    () => (filter === 'all' ? WORKS_BY_DATE : WORKS_BY_DATE.filter((w) => w.category === filter)),
    [filter]
  );

  // While the detail modal is open, ←/→ browse to the previous/next work in the
  // current filter (wraps around). Escape is handled by <Modal> itself.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const i = filtered.findIndex((w) => w.slug === active.slug);
      if (i === -1) return;
      const n = filtered.length;
      const j = e.key === 'ArrowRight' ? (i + 1) % n : (i - 1 + n) % n;
      setActive(filtered[j]);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, filtered]);

  // Greedy masonry: drop each card into the currently shortest column (using its
  // aspect ratio ≈ rendered height), so columns finish at nearly equal heights —
  // tops aligned, no big empty gap at the bottom.
  const columns = useMemo(() => {
    const cols = Array.from({ length: colCount }, () => []);
    const heights = new Array(colCount).fill(0);
    filtered.forEach((w, i) => {
      let c = 0;
      for (let k = 1; k < colCount; k++) if (heights[k] < heights[c]) c = k;
      cols[c].push({ w, i });
      heights[c] += (w.ar || 1.25) + 0.12; // +gap so tall images aren't over-favoured
    });
    return cols;
  }, [filtered, colCount]);

  const counts = useMemo(() => {
    const c = { all: WORKS.length };
    CATEGORIES.forEach((cat) => {
      c[cat.key] = WORKS.filter((w) => w.category === cat.key).length;
    });
    return c;
  }, []);

  return (
    <>
      <div className="works-layout">
      <main className="works-page">
        <header className="works-head">
          <h1 className="works-title">Works</h1>

          <div className="works-filter" role="tablist" aria-label="Filter works">
            <button
              role="tab"
              aria-selected={filter === 'all'}
              className={`filter-pill${filter === 'all' ? ' is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All <span className="filter-count">{counts.all}</span>
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={filter === cat.key}
                className={`filter-pill${filter === cat.key ? ' is-active' : ''}`}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label} <span className="filter-count">{counts[cat.key]}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Masonry: items round-robin into N columns, so every column starts at
            the top (top row aligned) while heights stay staggered. */}
        <section className="works-grid" ref={gridRef}>
          {columns.map((col, c) => (
            <div className="works-col" key={c}>
              {col.map(({ w, i }) => (
                <WorkCard key={w.slug} work={w} index={i} onOpen={setActive} />
              ))}
            </div>
          ))}
        </section>
      </main>
      <Footer />
      </div>

      {active && (
        <Modal onClose={() => setActive(null)} label={active.title || 'Work'} className="work-modal">
          <WorkDetail key={active.slug} work={active} />
        </Modal>
      )}
    </>
  );
}
