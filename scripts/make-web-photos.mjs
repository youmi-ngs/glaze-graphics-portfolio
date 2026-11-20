// Builds the web copies of every photo from the full-res originals in
// assets-src/works/photos/ (macOS `sips`, no npm deps):
//   public/images/works/photos/<name>        long edge 1600px — gallery cards
//   public/images/works/photos/large/<name>  long edge 2560px — detail modal
// Only photos listed in src/works.js are processed. Existing files are left
// alone unless you pass --force.
//   node scripts/make-web-photos.mjs [--force]
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { WORKS } from '../src/works.js';

const SRC = 'assets-src/works/photos';
const OUT = 'public/images/works/photos';
const SIZES = [
  { dir: OUT, edge: 1600 },
  { dir: join(OUT, 'large'), edge: 2560 },
];
const force = process.argv.includes('--force');

const longEdge = (file) => {
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' });
  const [w, h] = [...out.matchAll(/pixel(?:Width|Height): (\d+)/g)].map((m) => +m[1]);
  return Math.max(w, h);
};

for (const s of SIZES) mkdirSync(s.dir, { recursive: true });
let made = 0;
const used = new Set(WORKS.filter((w) => w.category === 'photography' && w.img).map((w) => w.img.split('/').pop()));
for (const f of readdirSync(SRC).filter((f) => used.has(f)).sort()) {
  const src = join(SRC, f);
  const edge = longEdge(src);
  for (const s of SIZES) {
    const dst = join(s.dir, f);
    if (existsSync(dst) && !force) continue;
    // never upscale: a smaller original is just re-encoded at its own size
    const args = edge > s.edge ? ['-Z', String(s.edge)] : [];
    execFileSync('sips', [...args, '-s', 'formatOptions', '85', src, '--out', dst], { stdio: 'ignore' });
    made++;
    console.log(`${dst}  (${Math.min(edge, s.edge)}px)`);
  }
}
console.log(`done — ${made} file(s) written`);
