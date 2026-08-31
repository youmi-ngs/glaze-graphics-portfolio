import { useState, useRef, useEffect } from 'react';
import Galaxy from './Galaxy.jsx';
import ASCIIText from './ASCIIText.jsx';

const WORKS = [
  { title: 'Brand Identity', cat: 'design', a: 1.3, g: 'g1' },
  { title: 'City at Dusk', cat: 'photo', a: 0.8, g: 'g2' },
  { title: 'Poster Series', cat: 'design', a: 1, g: 'g3' },
  { title: 'Portraits', cat: 'photo', a: 1.3, g: 'g4' },
  { title: 'Editorial Layout', cat: 'design', a: 0.8, g: 'g5' },
  { title: 'Still Life', cat: 'photo', a: 1, g: 'g6' },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'design', label: 'Design' },
  { key: 'photo', label: 'Photography' },
];

export default function App() {
  const [filter, setFilter] = useState('all');
  const year = new Date().getFullYear();

  // Keep the hero exactly one screen tall *including* the nav bar:
  // publish the nav's measured height as --nav-h so CSS can do 100vh - nav.
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
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <ASCIIText
            text="Hello, world!"
            enableWaves
            asciiFontSize={10}
            planeBaseHeight={5.5}
          />
        </section>

        {/* About */}
        <section id="about" className="about">
          <h2>About</h2>
          <p>
            長瀨&nbsp;釉美（Youmi&nbsp;Nagase）。グラフィックデザインと写真を軸に活動しています。
            紙面のレイアウトからブランドのビジュアル、光を追いかけるスナップまで、
            媒体を横断してつくることが好きです。
          </p>
          <p className="muted">
            — ここは自己紹介の仮テキスト。あとで自由に書き換えられます。
          </p>
        </section>

        {/* Work */}
        <section id="work" className="work">
          <div className="section-head">
            <h2>Selected Work</h2>
            <div className="filters" role="tablist">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`filter${filter === f.key ? " is-active" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {WORKS.filter((w) => filter === "all" || w.cat === filter).map(
              (w) => (
                <figure className="card" key={w.title} style={{ "--a": w.a }}>
                  <div className={`thumb ${w.g}`}></div>
                  <figcaption>
                    <span>{w.title}</span>
                    <em>{w.cat === "design" ? "Design" : "Photography"}</em>
                  </figcaption>
                </figure>
              ),
            )}
          </div>
          <p className="hint">
            ↑ ここは仮の作品。<code>public/images/</code>{" "}
            に画像を入れて差し替えます。
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="contact">
          <h2>Contact</h2>
          <p>お仕事のご相談・お問い合わせはこちらへ。</p>
          <a className="mail" href="mailto:youmi@glaze-graphics.space">
            youmi@glaze-graphics.space
          </a>
        </section>
      </main>

      <footer>
        <span>© {year} Glaze Graphics</span>
        <span>Youmi Nagase</span>
      </footer>
    </>
  );
}
