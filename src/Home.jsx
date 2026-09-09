import { useState } from 'react';
import ASCIIText from './ASCIIText.jsx';
import DecodeButton from './DecodeButton.jsx';
import Modal from './Modal.jsx';
import Footer from './Footer.jsx';
import SocialIcons from './SocialIcons.jsx';
import MorphSlider from './MorphSlider.jsx';
import GlitchText from './GlitchText.jsx';
import { WORKS } from './works.js';

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
          <ScrollArrow to="#contact" label="Scroll to Contact" />
        </section>

        {/* 4 — Contact + footer */}
        <section id="contact" className="screen contact">
          <div className="contact-inner">
            <h2 className="screen-title contact-title">
              <GlitchText text={"Youmi’s Contact"} />
            </h2>
            <p className="contact-sub">Want to get in touch?</p>
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
              Hi, I&rsquo;m Youmi &mdash; a first-year university student based
              in Tokyo.
            </p>

            <p>
              I don&rsquo;t have a career yet, but I&rsquo;m working on it. My
              goal is to become a designer, working across graphics and the web.<br />
              Right now, I mentor teens in web design and direction at Life is
              Tech!
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
