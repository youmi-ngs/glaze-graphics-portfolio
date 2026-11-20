import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ASCIIText from './ASCIIText.jsx';
import DecodeButton from './DecodeButton.jsx';
import Modal from './Modal.jsx';
import Footer from './Footer.jsx';
import SocialIcons from './SocialIcons.jsx';
import MorphSlider from './MorphSlider.jsx';
import GlitchText from './GlitchText.jsx';
import { WORKS } from './works.js';
import { SOCIALS } from './social.js';

const INSTAGRAM = SOCIALS.find((s) => s.name === 'Instagram');

// Featured works for the home teaser (up to 6). `featured` is a 1-based rank
// that sets the order; falls back to the first works if none flagged.
const TEASER = (() => {
  const flagged = WORKS.filter((w) => w.featured).sort((a, b) => a.featured - b.featured);
  return (flagged.length ? flagged : WORKS).slice(0, 6);
})();

// Featured images fed to the morphing teaser slider (skip entries with no image).
const TEASER_ITEMS = TEASER.filter((w) => w.img).map((w) => ({
  image: w.img,
  caption: w.title || undefined,
}));

// Section ids in deck order (index = panel). Used to map nav hashes → panel.
const SECTION_IDS = ['top', 'about', 'work', 'contact'];

// Responsive hero params by viewport WIDTH (never height): phones (≤640) wrap
// to two lines; tablets incl. iPad Pro portrait (≤1024) get a big single line;
// wider desktops use a smaller fraction so the line isn't overwhelming.
const heroCfgFor = (w) => {
  if (w <= 640) return { text: 'Hello,\nworld!', asciiFontSize: 6, planeWidthFrac: 0.78 };
  if (w <= 1024) return { text: 'Hello, world!', asciiFontSize: 8, planeWidthFrac: 0.9 };
  return { text: 'Hello, world!', asciiFontSize: 10, planeWidthFrac: 0.72 };
};

// Down-chevron that advances to the next panel.
function ScrollArrow({ onClick, label }) {
  return (
    <button type="button" className="scroll-arrow" onClick={onClick} aria-label={label ?? 'Scroll down'}>
      <img src="/images/arrow-down.svg" alt="" width="44" height="22" />
    </button>
  );
}

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ringHover, setRingHover] = useState(false);

  const [heroCfg, setHeroCfg] = useState(() =>
    heroCfgFor(typeof window !== 'undefined' ? window.innerWidth : 1440)
  );
  useEffect(() => {
    const apply = () => {
      const next = heroCfgFor(window.innerWidth);
      // only update when the breakpoint bucket changes (avoids re-initialising
      // the WebGL hero on every resize tick)
      setHeroCfg((prev) =>
        prev.text === next.text && prev.asciiFontSize === next.asciiFontSize ? prev : next
      );
    };
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  // ── Full-page "kamishibai" deck: sections are stacked and the deck is
  // translated by one viewport per step, so the page never rests mid-section.
  const [section, setSection] = useState(0);
  const idxRef = useRef(0);
  const lockedRef = useRef(false);
  const { hash, key } = useLocation();

  const goTo = useCallback((n) => {
    const t = Math.max(0, Math.min(SECTION_IDS.length - 1, n));
    if (t === idxRef.current || lockedRef.current) return;
    idxRef.current = t;
    lockedRef.current = true;
    setSection(t);
    window.setTimeout(() => { lockedRef.current = false; }, 650);
  }, []);

  // nav hashes (About / Contact / brand) and cross-route landings → jump to
  // panel. `key` changes on every navigation, so clicking the same nav link
  // again (hash unchanged, but the deck was wheeled elsewhere) still jumps.
  useEffect(() => {
    const i = SECTION_IDS.indexOf((hash || '#top').slice(1));
    if (i >= 0) { idxRef.current = i; setSection(i); }
  }, [hash, key]);

  // one wheel / key / swipe gesture = exactly one panel (momentum ignored)
  useEffect(() => {
    let lastWheel = 0;
    const modalOpen = () => !!document.querySelector('.modal-backdrop');
    const onWheel = (e) => {
      if (modalOpen()) return;
      e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      const gap = e.timeStamp - lastWheel; // only the START of a gesture counts
      lastWheel = e.timeStamp;
      if (gap > 120 && !lockedRef.current) goTo(idxRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    const onKey = (e) => {
      if (modalOpen()) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); goTo(idxRef.current + 1); }
      else if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goTo(idxRef.current - 1); }
    };
    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (modalOpen()) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) goTo(idxRef.current + (dy > 0 ? 1 : -1));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [goTo]);

  return (
    <>
      {/* overflow:hidden still scrolls programmatically (focus, anchors) —
          pin it at 0 so only the deck transform decides what's on screen */}
      <main id="top" className="deck-viewport" onScroll={(e) => { e.currentTarget.scrollTop = 0; }}>
        <div className="deck" style={{ transform: `translateY(${-section * 100}svh)` }}>
          {/* 1 — Hero: ASCIIText "Hello, world!" over the galaxy */}
          <section className="screen hero">
            <ASCIIText
              text={heroCfg.text}
              enableWaves
              asciiFontSize={heroCfg.asciiFontSize}
              planeWidthFrac={heroCfg.planeWidthFrac}
            />
            <ScrollArrow onClick={() => goTo(idxRef.current + 1)} label="Go to About" />
          </section>

          {/* 2 — Who is Youmi?: circular text ring around a portrait. */}
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
                  <textPath href="#ringPath" startOffset="0">
                    {ringHover ? "Click to know me!" : "Who is this? I'm Youmi!"}
                  </textPath>
                </text>
              </svg>
              <div className="ring-portrait">
                <img src="/images/youmi.jpg" alt="Youmi Nagase" />
              </div>
            </button>
            <ScrollArrow onClick={() => goTo(idxRef.current + 1)} label="Go to Works" />
          </section>

          {/* 3 — Youmi's Works: full-bleed morph slider + title + CTA */}
          <section id="work" className="screen work">
            <div className="work-slider">
              <MorphSlider
                className="work-morph"
                items={TEASER_ITEMS}
                autoplay
                autoplayDelay={5}
                transition="melt"
                radius={0}
                overlayColor="#8f9cf0"
                drift={0}
                blur={0.03}
                glow={0.2}
                showCaptions={false}
              />
            </div>
            <div className="work-overlay">
              <div className="work-headline">
                <h2 className="screen-title"><GlitchText text={"Youmi’s Works"} /></h2>
                <DecodeButton to="/works" label="See all works" />
              </div>
            </div>
            <ScrollArrow onClick={() => goTo(idxRef.current + 1)} label="Go to Contact" />
          </section>

          {/* 4 — Contact + footer */}
          <section id="contact" className="screen contact">
            <div className="contact-inner">
              <h2 className="screen-title contact-title">
                <GlitchText text={"Youmi’s Contact"} />
              </h2>
              <p className="contact-sub">Want to get in touch?</p>
              <a className="mail" href={INSTAGRAM.href} target="_blank" rel="noopener noreferrer">
                @{INSTAGRAM.href.replace(/\/+$/, '').split('/').pop()}
              </a>
            </div>
            <Footer />
          </section>
        </div>
      </main>

      {/* About modal — opened from the "Who is Youmi?" ring */}
      {aboutOpen && (
        <Modal onClose={() => setAboutOpen(false)} label="About Youmi" className="about-modal">
          <div className="modal-body">
            <h2>Who is Youmi?</h2>

            <p>
              Hi, I&rsquo;m Youmi &mdash; a first-year university student based
              in Tokyo.
            </p>

            <p>
              I don&rsquo;t have a career yet, but I&rsquo;m working on it. My
              goal is to become a designer, working across graphics and the web.
            </p>

            <p>
              Photography is just for fun.
            </p>

            <p className="modal-wink">
              This is only chapter one. Yoo-hoo! 👋
            </p>

            <SocialIcons className="modal-social" />
          </div>
        </Modal>
      )}
    </>
  );
}
