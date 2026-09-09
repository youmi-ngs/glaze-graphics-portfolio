import { useRef, useEffect } from 'react';
import './GlitchText.css';

// Canvas glitch text (like React Bits Pro "Glitch Text"): the text sits clean
// white, but within `radius` px of the cursor it glitches — torn horizontal
// slices + magenta/cyan RGB split. Pointer is tracked on window (so it never
// blocks the slider/drag underneath). Font is jaf-mashine, drawn on canvas.
export default function GlitchText({
  text,
  base = "#ffffff",
  colors = ["#c003ff", "#0008ff"], // RGB-split channels (magenta / cyan)
  radius = 60,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, on: false };
    let sx = -9999,
      sy = -9999,
      tick = 0;
    let W = 0,
      H = 0,
      fs = 64,
      raf = 0,
      running = true;

    const fontStr = (px) => `${px}px "jaf-mashine", sans-serif`;

    let glyphs = [];
    function layout() {
      fs = Math.max(28, Math.min(92, window.innerWidth * 0.062));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = fontStr(fs);
      const chars = Array.from(text);
      // Tighten via native letterSpacing (a real px length → consistent across
      // browsers), and position each glyph from the cumulative PREFIX width so we
      // use the browser's own layout instead of summing per-char measures.
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${(-fs * 0.04).toFixed(2)}px`;
      const widths = chars.map((c) => ctx.measureText(c).width);
      const lefts = chars.map((_, i) => ctx.measureText(chars.slice(0, i).join('')).width);
      const total = ctx.measureText(text).width;
      const padX = fs * 0.4;
      const padY = fs * 0.5;
      W = Math.ceil(total + padX * 2);
      H = Math.ceil(fs + padY * 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'; // draw glyphs without it
      // per-character centre positions (glitch reacts per letter)
      glyphs = [];
      const startX = (W - total) / 2;
      chars.forEach((c, i) => {
        glyphs.push({ ch: c, cx: startX + lefts[i] + widths[i] / 2, ox: 0, oy: 0 });
      });
    }

    const drawGlyph = (ch, x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillText(ch, x, y);
    };

    // colour gradient along the shadow trail (colors[0] → colors[1])
    const hexToRgb = (h) => {
      const n = parseInt(h.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const c0 = hexToRgb(colors[0]);
    const c1 = hexToRgb(colors[1]);
    const mix = (t) =>
      `rgb(${Math.round(c0[0] + (c1[0] - c0[0]) * t)},${Math.round(
        c0[1] + (c1[1] - c0[1]) * t
      )},${Math.round(c0[2] + (c1[2] - c0[2]) * t)})`;

    function frame() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = fontStr(fs);

      tick++;
      // smooth-follow the cursor (glide, no jitter). The lag between the real
      // cursor and the eased position IS the "sticky" drag amount → settles on stop.
      if (pointer.on) {
        if (sx === -9999) {
          sx = pointer.x;
          sy = pointer.y;
        }
        sx += (pointer.x - sx) * 0.03;
        sy += (pointer.y - sy) * 0.03;
      }
      const rect = canvas.getBoundingClientRect();
      // reaction ZONE tracks the real cursor (no lag); sx/sy (eased) is used only
      // for the gooey drag amount below.
      const lx = pointer.x - rect.left;
      const ly = pointer.y - rect.top;
      const dragX = Math.max(-180, Math.min(180, pointer.x - sx));
      const dragY = Math.max(-220, Math.min(220, pointer.y - sy));
      const cy = H / 2;
      const influenceX = fs * 1.1; // horizontal reach ≈ 1.5 letters each side
      const maxAmp = fs * 1.0; // max vertical rise/fall

      // A smooth horizontal bell centred on the cursor: the letter under it plus
      // ~1.5 letters each side all shift toward the cursor's Y → a connected wave
      // that travels as you move sideways and rises/falls symmetrically.
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        const tX = Math.min(1, Math.abs(g.cx - lx) / influenceX);
        const wX = (Math.cos(tX * Math.PI) + 1) / 2; // 1 at cursor → 0 at edge
        const wY = Math.max(0, 1 - Math.abs(ly - cy) / (maxAmp * 2.2));
        const w = pointer.on ? wX * wY : 0;
        const amp = Math.max(-maxAmp, Math.min(maxAmp, ly - cy)); // follow cursor Y
        g.oy += (amp * w - g.oy) * 0.1; // memory-foam (低反発) easing
        // horizontal: only a light drift in the direction of fast cursor movement
        const gx = g.cx + dragX * w * 0.2;
        const gy = cy + g.oy + Math.sin(tick * 0.03 + i) * 3 * w;

        // magenta outline around letters that are moving — only while hovering
        if (pointer.on && w > 0.06) {
          ctx.lineJoin = 'round';
          ctx.lineWidth = Math.max(1, fs * 0.025);
          ctx.strokeStyle = '#ff00ff';
          ctx.strokeText(g.ch, gx, gy);
        }
        drawGlyph(g.ch, gx, gy, base);

        // RGB ghost stuck close to the letter (opposite sides so the two colours
        // never overlap into a white duplicate)
        if (w > 0.06 || Math.abs(g.oy) > 0.6) {
          const my = gy - cy;
          const dir = my >= 0 ? 1 : -1;
          const off = 4;
          const offBlue = 4 + Math.abs(my) * 0.4; // blue trails further the more it moves
          ctx.globalCompositeOperation = 'lighter';
          drawGlyph(g.ch, gx - 2, gy - dir * off, colors[0]);
          drawGlyph(g.ch, gx + 2, gy + dir * offBlue, colors[1]);
          ctx.globalCompositeOperation = 'source-over';
        }
      }

      if (running) raf = requestAnimationFrame(frame);
    }

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onResize = () => layout();

    const start = () => {
      layout();
      frame();
    };
    // Measure with the ACTUAL webfont — pass jaf-mashine WITHOUT a fallback list,
    // otherwise fonts.load resolves instantly against sans-serif and we measure
    // the wrong metrics (Chrome/Safari then disagree on spacing). Re-layout once
    // all fonts are fully ready as a safety net.
    if (document.fonts?.load) {
      document.fonts.load('64px "jaf-mashine"', text).then(start).catch(start);
      document.fonts.ready.then(() => layout());
    } else {
      start();
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [text, base, radius, colors]);

  return (
    <span
      className={`glitch-text ${className}`.trim()}
      role="img"
      aria-label={text}
    >
      <canvas ref={canvasRef} />
    </span>
  );
}
