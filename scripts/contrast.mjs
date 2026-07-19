// Dogfooding harness: WCAG AA contrast audit of the running site.
// Renders in real Chromium, reads computed colors, composites alpha + color
// spaces (oklch, color(srgb), rgba) into true sRGB via a canvas, resolves each
// text node's EFFECTIVE background (pill gradients + accent/ink fills included),
// and reports any pair under the AA threshold (4.5 normal / 3.0 large text).
//
// Usage: node scripts/contrast.mjs [url]
// Exit code 1 if any real failure is found (usable as a CI gate).
import { chromium } from 'playwright-core';

const EXECUTABLE = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const url = process.argv[2] || 'http://localhost:4173/dcca-portfolio/';

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

const findings = await page.evaluate(() => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 2;
  const ctx = cv.getContext('2d');
  const over = (str, bd) => { ctx.clearRect(0, 0, 2, 2); ctx.fillStyle = `rgb(${bd[0]},${bd[1]},${bd[2]})`; ctx.fillRect(0, 0, 2, 2); ctx.fillStyle = str; ctx.fillRect(0, 0, 2, 2); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]]; };
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => { const hi = Math.max(L(a), L(b)) + 0.05, lo = Math.min(L(a), L(b)) + 0.05; return +(hi / lo).toFixed(2); };
  const cssv = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  // Representative fills the walker can't read from backgroundColor alone.
  const CANVAS = over('oklch(0.78 0.008 74)', [255, 255, 255]);
  const SURFACE = over(cssv('--surface') || '#fff', [255, 255, 255]);
  const ACCENT = over(cssv('--accent') || '#f03', [255, 255, 255]);
  const INK = over(cssv('--ink') || '#111', [255, 255, 255]);

  const effBg = (el) => {
    let n = el; const chain = [];
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n), c = cs.backgroundColor;
      if (n.classList.contains('tile--accent')) { chain.push(['s', ACCENT]); break; }
      if (n.classList.contains('methodMarks')) { chain.push(['s', INK]); break; }
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') chain.push(['c', c]);
      else if (n.classList.contains('pill') || cs.backgroundImage.includes('gradient')) { chain.push(['s', SURFACE]); break; }
      n = n.parentElement;
    }
    let base = CANVAS;
    for (let i = chain.length - 1; i >= 0; i--) { const [t, v] = chain[i]; base = t === 's' ? v : over(v, base); }
    return base;
  };

  const isLarge = (cs) => { const px = parseFloat(cs.fontSize); const bold = (parseInt(cs.fontWeight) || 400) >= 700; return px >= 24 || (bold && px >= 18.66); };
  const seen = new Set(), out = [];
  for (const el of document.querySelectorAll('body *')) {
    // only elements with a direct, visible text node
    const txt = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!txt) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) continue;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
    const bg = effBg(el);                      // start at self → filled buttons use their own fill
    const fg = over(cs.color, bg);
    const cr = ratio(fg, bg);
    const large = isLarge(cs);
    const min = large ? 3.0 : 4.5;
    const sig = `${cs.color}|${bg.join(',')}|${large}`;
    if (seen.has(sig)) continue; seen.add(sig);
    if (cr < min) out.push({ cr, min, large, sel: el.className?.toString().split(' ')[0] || el.tagName.toLowerCase(), sample: el.textContent.trim().slice(0, 32) });
  }
  return out.sort((a, b) => a.cr - b.cr);
});

if (!findings.length) {
  console.log('✓ contrast: all visible text meets WCAG AA');
  await browser.close();
} else {
  console.log(`✗ contrast: ${findings.length} pair(s) below AA:`);
  for (const f of findings) console.log(`  ${f.cr}  (need ${f.min}${f.large ? ', large' : ''})  .${f.sel}  “${f.sample}”`);
  await browser.close();
  process.exit(1);
}
