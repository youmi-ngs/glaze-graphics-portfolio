import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Glyphs the label scrambles through before it "locks in" — echoes the Hero
// ASCII. Monospace keeps every frame the same width, so nothing shifts.
const GLYPHS = '01<>/\\[]{}*#@%&=+·';
const FRAMES = 16;
const FRAME_MS = 34;

// A link that decodes its label on hover/focus. `label` is plain text so we can
// scramble it character by character. Pass `to` for an internal route
// (client-side <Link>) or `href` for a plain/external link.
export default function DecodeButton({ to, href, label, className = '' }) {
  const spanRef = useRef(null);
  const timerRef = useRef(null);

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const start = () => {
    if (reduce || !spanRef.current) return;
    clearInterval(timerRef.current);
    const el = spanRef.current;
    let frame = 0;
    timerRef.current = setInterval(() => {
      frame += 1;
      let out = '';
      for (let i = 0; i < label.length; i++) {
        if (label[i] === ' ') { out += ' '; continue; }
        // letters resolve left-to-right as the frames advance
        const revealAt = (i / label.length) * FRAMES * 0.7 + 3;
        out += frame >= revealAt
          ? label[i]
          : GLYPHS[(Math.floor(frame * 1.7) + i) % GLYPHS.length];
      }
      el.textContent = out;
      if (frame >= FRAMES) { clearInterval(timerRef.current); el.textContent = label; }
    }, FRAME_MS);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    if (spanRef.current) spanRef.current.textContent = label;
  };

  const handlers = {
    onPointerEnter: start,
    onPointerLeave: stop,
    onFocus: start,
    onBlur: stop,
  };
  const inner = (
    <>
      <span className="btn-works__label" ref={spanRef}>{label}</span>
      <span className="btn-works__arrow" aria-hidden="true">→</span>
    </>
  );
  const cls = `btn-works ${className}`.trim();

  return to ? (
    <Link className={cls} to={to} {...handlers}>{inner}</Link>
  ) : (
    <a className={cls} href={href} {...handlers}>{inner}</a>
  );
}
