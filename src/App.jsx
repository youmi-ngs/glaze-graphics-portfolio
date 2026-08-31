import { useRef, useEffect, useState } from 'react';
import Galaxy from './Galaxy.jsx';
import ASCIIText from './ASCIIText.jsx';

// Placeholder work tiles — full-bleed grid (3×2). Swap the gradients for real
// images in public/images/ later. `g1`..`g6` are cosmic placeholders in styles.css.
const WORKS = [
  { title: 'Brand Identity', cat: 'Design', g: 'g1' },
  { title: 'City at Dusk', cat: 'Photography', g: 'g2' },
  { title: 'Poster Series', cat: 'Design', g: 'g3' },
  { title: 'Portraits', cat: 'Photography', g: 'g4' },
  { title: 'Editorial Layout', cat: 'Design', g: 'g5' },
  { title: 'Still Life', cat: 'Photography', g: 'g6' },
];

// Down-chevron that scrolls to the next section. The Figma asset points up,
// so we flip it (scaleY(-1)) via .scroll-arrow in CSS.
function ScrollArrow({ to, label }) {
  return (
    <a className="scroll-arrow" href={to} aria-label={label ?? 'Scroll down'}>
      <img src="/images/arrow-down.svg" alt="" width="44" height="22" />
    </a>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ringHover, setRingHover] = useState(false);

  // Modal: close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!aboutOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setAboutOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [aboutOpen]);

  // Publish the nav's measured height as --nav-h so sections can offset their
  // scroll target (anchor jumps land below the sticky bar).
  const navRef = useRef(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const setVar = () =>
      document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Animated starfield background (React Bits <Galaxy />) */}
      <div id="galaxy-bg" aria-hidden="true">
        <Galaxy
          hueShift={200}
          saturation={0.65}
          density={1}
          glowIntensity={0.45}
          twinkleIntensity={0.6}
          starSpeed={0.35}
          speed={0.8}
          rotationSpeed={0.04}
          mouseInteraction
          mouseRepulsion
          repulsionStrength={0.1}
          transparent
        />
      </div>

      <header className="nav" ref={navRef}>
        <a className="brand" href="#top">
          Glaze&nbsp;Graphics
        </a>
        <nav>
          <a href="#work">Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        {/* 1 — Hero: ASCIIText "Hello, world!" over the galaxy */}
        <section className="screen hero">
          <ASCIIText
            text="Hello,&nbsp;world!"
            enableWaves
            asciiFontSize={10}
            planeBaseHeight={5.5}
          />
          <ScrollArrow to="#about" label="Scroll to About" />
        </section>

        {/* 2 — Who is Youmi?: circular text ring around a portrait.
            Hover swaps the ring copy; click opens the About modal. */}
        <section id="about" className="screen about">
          <button
            type="button"
            className={`ring-wrap${ringHover ? " is-hover" : ""}`}
            onMouseEnter={() => setRingHover(true)}
            onMouseLeave={() => setRingHover(false)}
            onFocus={() => setRingHover(true)}
            onBlur={() => setRingHover(false)}
            onClick={() => setAboutOpen(true)}
            aria-haspopup="dialog"
            aria-label="Learn more about Youmi"
          >
            <svg className="ring" viewBox="0 0 500 500" aria-hidden="true">
              <defs>
                <path
                  id="ringPath"
                  d="M250,250 m-165,0 a165,165 0 1,1 330,0 a165,165 0 1,1 -330,0"
                />
              </defs>
              <text className="ring-text">
                {/* Natural spacing (no textLength) so both the default and hover
                    copy share the exact same letter spacing. letter-spacing in
                    CSS nudges them to fill the loop. */}
                <textPath href="#ringPath" startOffset="0">
                  {ringHover ? "Click to know me!" : "Who is this? I'm Youmi!"}
                </textPath>
              </text>
            </svg>
            <div className="ring-portrait">
              <img src="/images/youmi.jpg" alt="Youmi Nagase" />
            </div>
          </button>
          <ScrollArrow to="#work" label="Scroll to Works" />
        </section>

        {/* 3 — Youmi's Works: full-bleed tile grid + big title */}
        <section id="work" className="screen work">
          <div className="work-grid" aria-hidden="true">
            {WORKS.map((w) => (
              <div className={`tile ${w.g}`} key={w.title} />
            ))}
          </div>
          <h2 className="screen-title">Youmi&rsquo;s&nbsp;Works</h2>
          <ScrollArrow to="#contact" label="Scroll to Contact" />
        </section>

        {/* 4 — Contact + footer */}
        <section id="contact" className="screen contact">
          <div className="contact-inner">
            <h2 className="screen-title contact-title">
              DO&nbsp;YOU CONTACT&nbsp;YOUMI?
            </h2>
            <a className="mail" href="mailto:youmi@glaze-graphics.space">
              youmi@glaze-graphics.space
            </a>
          </div>
          <footer>
            <div className="footer-inner">
              <span className="footer-copy">
                <a className="footer-brand" href="#top">Glaze&nbsp;Graphics</a>
                <span> © {year} Youmi Nagase</span>
              </span>

              <div className="footer-social">
                <a href="https://github.com/youmi-ngs" target="_blank" rel="noopener noreferrer">GitHub</a>
                {/* TODO: real handles — placeholders for now */}
                <a href="https://instagram.com/glaze.graphics" target="_blank" rel="noopener noreferrer" aria-label="Instagram (TBD)">
                  Instagram
                </a>
                <a href="https://twitter.com/glaze_graphics" target="_blank" rel="noopener noreferrer" aria-label="Twitter (TBD)">
                  Twitter
                </a>
              </div>
            </div>
          </footer>
        </section>
      </main>

      {/* About modal — opened from the "Who is Youmi?" ring */}
      {aboutOpen && (
        <div className="modal-backdrop" onClick={() => setAboutOpen(false)}>
          <div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="About Youmi"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setAboutOpen(false)}
              aria-label="Close"
            >
              <img src="/images/close.svg" alt="" width="28" height="28" />
            </button>
            <div className="modal-body">
              <h2>Who is Youmi?</h2>
              <p>
                Youmi Nagase — a graphic designer and photographer. From
                editorial layouts and brand visuals to chasing light with a
                camera, I love making things across media.
              </p>
              <p className="muted">
                — Placeholder bio. This will be rewritten later.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
