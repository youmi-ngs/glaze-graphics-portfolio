// Reads EXIF from the full-res originals in assets-src/works/photos/ and writes
// src/exif.json ({ "<filename>": { camera, lens, focal, fnumber, shutter, iso } }).
// Dependency-free JPEG/TIFF parser. Run after adding photos:
//   node scripts/extract-exif.mjs
// (assets-src/ is git-ignored, so the generated JSON is what gets committed.)
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'assets-src/works/photos';
const OUT = 'src/exif.json';

// Pretty camera names (EXIF Model → what people call it).
const CAMERA_NAMES = {
  'ILCE-7CM2': 'Sony α7C II',
  'ILCE-7C': 'Sony α7C',
  'ILCE-7M4': 'Sony α7 IV',
  'ILCE-7M3': 'Sony α7 III',
};

function parseExif(buf) {
  if (buf.readUInt16BE(0) !== 0xffd8) return null; // not a JPEG
  let off = 2;
  while (off + 4 < buf.length) {
    if (buf[off] !== 0xff) return null;
    const marker = buf[off + 1];
    const len = buf.readUInt16BE(off + 2);
    if (marker === 0xe1 && buf.toString('latin1', off + 4, off + 10) === 'Exif\0\0') {
      return parseTiff(buf.subarray(off + 10, off + 2 + len));
    }
    if (marker === 0xda) return null; // start of scan: no EXIF found
    off += 2 + len;
  }
  return null;
}

function parseTiff(t) {
  const le = t.toString('latin1', 0, 2) === 'II';
  const u16 = (o) => (le ? t.readUInt16LE(o) : t.readUInt16BE(o));
  const u32 = (o) => (le ? t.readUInt32LE(o) : t.readUInt32BE(o));
  const SIZES = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

  function readIfd(ifdOff) {
    const tags = {};
    const n = u16(ifdOff);
    for (let i = 0; i < n; i++) {
      const e = ifdOff + 2 + i * 12;
      const tag = u16(e), type = u16(e + 2), count = u32(e + 4);
      const size = (SIZES[type] || 1) * count;
      const vo = size > 4 ? u32(e + 8) : e + 8;
      if (vo + size > t.length) continue;
      let v;
      if (type === 2) v = t.toString('latin1', vo, vo + count).replace(/\0+$/, '').trim();
      else if (type === 3) v = u16(vo);
      else if (type === 4) v = u32(vo);
      else if (type === 5 || type === 10) {
        const num = u32(vo), den = u32(vo + 4);
        v = den ? num / den : null;
        v = { value: v, num, den };
      } else v = null;
      tags[tag] = v;
    }
    return tags;
  }

  const ifd0 = readIfd(u32(4));
  const exif = ifd0[0x8769] != null ? readIfd(ifd0[0x8769]) : {};
  return { ifd0, exif };
}

function fmtShutter(r) {
  if (!r || !r.value) return null;
  if (r.value >= 1) return `${+r.value.toFixed(1)}s`;
  return `1/${Math.round(1 / r.value)}s`;
}

// Lightroom sometimes writes "Canon RF-S…" or "A or B" guesses for adapted
// lenses: drop the brand prefix and keep the first guess.
function cleanLens(l) {
  if (!l) return null;
  return l.split(' or ')[0].replace(/^Canon\s+/, '').trim();
}

const out = {};
for (const f of readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f)).sort()) {
  const p = parseExif(readFileSync(join(SRC, f)));
  if (!p) continue;
  const { ifd0, exif } = p;
  const model = ifd0[0x0110];
  const make = ifd0[0x010f];
  const meta = {
    // Canon puts the brand in Model already ("Canon EOS R50"); others don't.
    camera: model
      ? CAMERA_NAMES[model] ||
        (make && !model.toLowerCase().startsWith(make.split(' ')[0].toLowerCase()) ? `${make} ${model}` : model)
      : null,
    lens: cleanLens(exif[0xa434]),
    focal: exif[0x920a]?.value ? `${Math.round(exif[0x920a].value)}mm` : null,
    fnumber: exif[0x829d]?.value ? `f/${+exif[0x829d].value.toFixed(1)}` : null,
    shutter: fmtShutter(exif[0x829a]),
    iso: exif[0x8827] ? `ISO ${exif[0x8827]}` : null,
  };
  for (const k of Object.keys(meta)) if (!meta[k]) delete meta[k];
  if (Object.keys(meta).length) out[f] = meta;
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`wrote ${Object.keys(out).length} entries to ${OUT}`);
