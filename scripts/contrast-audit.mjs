import fs from 'node:fs';
import path from 'node:path';

// Minimal OKLCH -> sRGB conversion + WCAG contrast.
// References: Björn Ottosson OKLab/OKLCH.

function clamp01(x) {
  return Math.min(1, Math.max(0, x));
}

function srgbCompand(u) {
  // linear -> sRGB
  return u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055;
}

function srgbUncompand(u) {
  // sRGB -> linear
  return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
}

function oklabToLinearSRGB({ L, a, b }) {
  // OKLab -> LMS'
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  // cube
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  // LMS -> linear sRGB
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return { r, g, b: bl };
}

function oklchToLinearSRGB({ L, C, h }) {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  return oklabToLinearSRGB({ L, a, b });
}

function linearToSrgb({ r, g, b }) {
  return {
    r: clamp01(srgbCompand(r)),
    g: clamp01(srgbCompand(g)),
    b: clamp01(srgbCompand(b)),
  };
}

function parseOklch(str) {
  // oklch(L C h / a)
  // L can be 0..1, or percent (not used in this repo)
  const m = str
    .trim()
    .match(/^oklch\(\s*([0-9.]+%?)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+%?))?\s*\)$/i);
  if (!m) return null;
  let L = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  const C = parseFloat(m[2]);
  const h = parseFloat(m[3]);
  let alpha = 1;
  if (m[4]) alpha = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  return { L, C, h, alpha };
}

function srgbToRelativeLuminance({ r, g, b }) {
  // inputs are sRGB 0..1
  const R = srgbUncompand(r);
  const G = srgbUncompand(g);
  const B = srgbUncompand(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(fg, bg) {
  const L1 = srgbToRelativeLuminance(fg);
  const L2 = srgbToRelativeLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function compositeOver({ top, bottom, alpha }) {
  // top/bottom are sRGB 0..1 (already companded); alpha 0..1.
  return {
    r: top.r * alpha + bottom.r * (1 - alpha),
    g: top.g * alpha + bottom.g * (1 - alpha),
    b: top.b * alpha + bottom.b * (1 - alpha),
  };
}

function toSrgb(colorStr, fallbackBgSrgb = null) {
  const o = parseOklch(colorStr);
  if (!o) throw new Error(`Unsupported color: ${colorStr}`);
  const srgb = linearToSrgb(oklchToLinearSRGB(o));
  if (o.alpha < 1) {
    if (!fallbackBgSrgb) throw new Error(`Alpha color needs background: ${colorStr}`);
    return compositeOver({ top: srgb, bottom: fallbackBgSrgb, alpha: o.alpha });
  }
  return srgb;
}

function parseTokens(cssText) {
  // returns { light: {token: valueStr}, dark: {...} }
  const light = {};
  const dark = {};

  // crude block extraction
  const rootBlock = cssText.match(/:root\s*\{([\s\S]*?)\}\s*\n\s*\.dark\s*\{/);
  const darkBlock = cssText.match(/\.dark\s*\{([\s\S]*?)\}\s*\n\s*@media/s);
  if (!rootBlock || !darkBlock) throw new Error('Could not find :root and .dark blocks');

  for (const line of rootBlock[1].split(/\n/)) {
    const m = line.match(/\s*--([a-z0-9-]+)\s*:\s*([^;]+);/i);
    if (m) light[m[1]] = m[2].trim();
  }
  for (const line of darkBlock[1].split(/\n/)) {
    const m = line.match(/\s*--([a-z0-9-]+)\s*:\s*([^;]+);/i);
    if (m) dark[m[1]] = m[2].trim();
  }

  return { light, dark };
}

const TOKENS_PATH = path.resolve('src/styles/tokens.css');
const css = fs.readFileSync(TOKENS_PATH, 'utf8');
const { light, dark } = parseTokens(css);

const pairsText = [
  ['foreground', 'background'],
  ['card-foreground', 'card'],
  ['popover-foreground', 'popover'],
  ['primary-foreground', 'primary'],
  ['secondary-foreground', 'secondary'],
  ['muted-foreground', 'muted'],
  ['accent-foreground', 'accent'],
  ['brand-foreground', 'brand'],
  ['surface-foreground', 'surface'],
];

const pairsUi = [
  // borders / inputs typically are non-text UI boundaries
  ['border', 'background'],
  ['input', 'background'],
  ['ring', 'background'],
  // plus common surfaces
  ['border', 'card'],
  ['ring', 'card'],
  ['border', 'surface'],
  ['ring', 'surface'],
];

function audit(modeName, tokens) {
  const rows = [];
  for (const [fgName, bgName] of [...pairsText, ...pairsUi]) {
    const fgStr = tokens[fgName];
    const bgStr = tokens[bgName];
    if (!fgStr || !bgStr) continue;

    const bgSrgb = toSrgb(bgStr);
    const fgSrgb = toSrgb(fgStr, bgSrgb); // handles alpha in fg

    const ratio = contrastRatio(fgSrgb, bgSrgb);
    const kind = pairsText.some((p) => p[0] === fgName && p[1] === bgName)
      ? 'text'
      : 'ui';

    rows.push({ mode: modeName, pair: `${fgName} on ${bgName}`, kind, ratio });
  }

  return rows;
}

const rows = [...audit('light', light), ...audit('dark', { ...light, ...dark })];

function fmt(r) {
  return `${r.mode.padEnd(5)} | ${r.kind.padEnd(4)} | ${r.pair.padEnd(28)} | ${r.ratio.toFixed(2)}:1`;
}

// thresholds
const FAIL_TEXT = 4.5;
const FAIL_UI = 3.0;

const failures = rows.filter((r) => (r.kind === 'text' ? r.ratio < FAIL_TEXT : r.ratio < FAIL_UI));

console.log('Contrast audit (WCAG 2.x):');
console.log(' - text threshold: 4.5:1 (normal)');
console.log(' - ui threshold:   3.0:1 (non-text UI boundaries / focus indicator)');
console.log('');
console.log(rows.map(fmt).join('\n'));
console.log('');

if (failures.length) {
  console.log('FAILURES:');
  console.log(failures.map(fmt).join('\n'));
  process.exitCode = 1;
} else {
  console.log('No failures detected for audited token pairs.');
}
