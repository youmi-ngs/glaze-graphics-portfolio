import { useState } from 'react';
import ASCIIText from './ASCIIText.jsx';
import DecodeButton from './DecodeButton.jsx';
import Modal from './Modal.jsx';
import Footer from './Footer.jsx';
import { WORKS, placeholderClass } from './works.js';

// Featured works for the home teaser grid (up to 6). Falls back to the first
// works if none are flagged.
const TEASER = (() => {
  const flagged = WORKS.filter((w) => w.featured);
  return (flagged.length ? flagged : WORKS).slice(0, 6);
})();

// Down-chevron that scrolls to the next section. The Figma asset points up,
// so we flip it (scaleY(-1)) via .scroll-arrow in CSS.
function ScrollArrow({ to, label }) {
  return (
    <a className="scroll-arrow" href={to} aria-label={label ?? 'Scroll down'}>
      <img src="/images/arrow-down.svg" alt="" width="44" height="22" />
    </a>
  );
}

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ringHover, setRingHover] = useState(false);

  return (
    <>
      <main id="top">
        {/* 1 — Hero: ASCIIText "Hello, world!" over the galaxy */}
        <section className="screen hero">
          <ASCIIText
            text="Hello,&nbsp;world!"
            enableWaves
            asciiFontSize={10}
            planeBaseHeight={4.4}
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

        {/* 3 — Youmi's Works: full-bleed teaser tiles (static) + title + CTA */}
        <section id="work" className="screen work">
          <div className="work-grid" aria-hidden="true">
            {TEASER.map((w, i) => (
              <div
                className={`tile ${w.img ? '' : placeholderClass(i)}`}
                key={w.slug}
                style={w.img ? { backgroundImage: `url(${w.img})` } : undefined}
              />
            ))}
          </div>
          <div className="work-overlay">
            <div className="work-headline">
              <h2 className="screen-title">Youmi&rsquo;s&nbsp;Works</h2>
              <DecodeButton to="/works" label="See all works" />
            </div>
          </div>
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
          <Footer />
        </section>
      </main>

      {/* About modal — opened from the "Who is Youmi?" ring */}
      {aboutOpen && (
        <Modal onClose={() => setAboutOpen(false)} label="About Youmi">
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
        </Modal>
      )}
    </>
  );
}
