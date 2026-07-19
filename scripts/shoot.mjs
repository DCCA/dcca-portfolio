// Dogfooding harness: screenshot the running site at multiple viewports.
// Usage: node scripts/shoot.mjs <url> <outDir> [tag]
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const EXECUTABLE = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const url = process.argv[2] || 'http://localhost:4173/dcca-portfolio/';
const outDir = process.argv[3] || '/tmp/claude-0/-home-user-dcca-portfolio/d663ba44-2484-5688-803a-e18248e6b797/scratchpad/shots';
const tag = process.argv[4] || 'v';
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1120, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const problems = [];
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`[${vp.name}] console: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`[${vp.name}] pageerror: ${e.message}`));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200); // let entrance motion settle
  // horizontal overflow check
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    return { scrollW: de.scrollWidth, clientW: de.clientWidth, over: de.scrollWidth - de.clientWidth };
  });
  if (overflow.over > 1) problems.push(`[${vp.name}] HORIZONTAL OVERFLOW: scrollW ${overflow.scrollW} > clientW ${overflow.clientW} (+${overflow.over}px)`);
  const file = `${outDir}/${tag}-${vp.name}.png`;
  await page.screenshot({ path: file, fullPage: true });
  // Mid-scroll viewport frame: fullPage captures never show the sticky header
  // composited over scrolled content, so grab a real scrolled viewport too.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'; // bypass CSS smooth-scroll so the frame is deterministic
    window.scrollTo(0, Math.round(document.documentElement.scrollHeight * 0.28));
  });
  await page.waitForTimeout(250);
  const scrollFile = `${outDir}/${tag}-${vp.name}-scroll.png`;
  await page.screenshot({ path: scrollFile });
  console.log(`shot ${vp.name} ${vp.width}px -> ${file} (+scroll)${overflow.over > 1 ? '  ⚠ OVERFLOW' : ''}`);
  await ctx.close();
}
await browser.close();
if (problems.length) { console.log('\n=== PROBLEMS ===\n' + problems.join('\n')); process.exit(1); }
console.log('\nno console errors / no horizontal overflow');
