---
name: dogfood
description: Verify a UI change in a real browser before committing — build, serve, screenshot at desktop/laptop/mobile, and gate on horizontal overflow, console errors, and WCAG AA contrast. Use whenever you change src/main.tsx, src/styles.css, index.html, fonts, or any visual/markup surface of this portfolio, and before committing or opening a PR for such a change. Not for pure content/docs edits with no rendered surface.
version: 1.0.0
user-invocable: true
allowed-tools:
  - Bash(bun run build)
  - Bash(bun run preview*)
  - Bash(node scripts/shoot.mjs*)
  - Bash(node scripts/contrast.mjs*)
---

The verify-before-ship loop for this repo. A passing `tsc` build is necessary but **not** sufficient — a UI change is not done until it has been rendered in a browser and checked. Do not commit a visual change you have not seen rendered.

## Context first

Read `DESIGN.md` (the "AI OS" visual system — warm-gray canvas, glossy liquid-glass pills, wide Archivo-black display, JetBrains Mono labels, hot red-orange accent, OKLCH tokens) and `PRODUCT.md` (register, audience, LinkedIn-primary CTA) before changing anything visual. The CSS custom properties in `src/styles.css` `:root` implement DESIGN.md's tokens; reuse them, don't hardcode.

Key invariants from the audit that must stay true:
- **Contrast:** small text only on white pill surfaces; on the gray canvas use only large display type or dark labels. Text on the accent fill is **dark ink** (`--on-accent`), never white — the bright red-orange only reaches ~2.8:1 with white.
- **Focus:** every interactive control keeps a visible `:focus-visible` ring (3px ink, offset outside onto the light surround). Never an accent ring on an accent fill.
- **Motion:** transform/opacity only (no animating layout properties); every animation has a `prefers-reduced-motion: reduce` fallback.
- **Base path:** reference `public/` assets through `import.meta.env.BASE_URL`, never a leading-slash absolute path.

## The loop

1. **Build** — `bun run build`. Fix any `tsc`/Vite error before going further.
2. **Serve** — start the preview in the background: `bun run preview --port 4173` (serves at `http://localhost:4173/dcca-portfolio/`). Reuse it across iterations; the port is the same one the scripts default to.
3. **Screenshot** — `node scripts/shoot.mjs http://localhost:4173/dcca-portfolio/ <outDir> <tag>`. Shoots desktop (1440) / laptop (1120) / mobile (390), and **fails loudly on horizontal overflow or console/page errors**. `<outDir>` should be your scratchpad dir; bump `<tag>` each iteration (`r1`, `r2`, …).
4. **Look** — actually Read the PNGs. Check the reference direction is honored, headings don't break mid-word, nothing is clipped, spacing reads, the accent lands where intended.
5. **Contrast gate** — `node scripts/contrast.mjs http://localhost:4173/dcca-portfolio/`. Renders in Chromium, composites real colors (handles `oklch()`, alpha, gradients, pill/accent fills) and **exits 1 if any visible text is below AA**. This must pass.
6. **Focus** — for any new/changed interactive element, confirm its computed `outline` is a visible ring on its actual surround (see `scripts/shoot.mjs` for how to focus + clip an element).
7. **Iterate** — fix, rebuild, re-shoot, re-gate until steps 3–6 are clean. Only then commit.

`bun run shots` and `bun run contrast` are shortcuts for steps 3 and 5 (a preview server must already be running).

## Notes

- Chromium is pre-installed at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (the scripts point there); `playwright-core` is a dev dependency. No `playwright install`.
- Full-page mobile captures can be very tall — expect large PNGs; that's fine for local inspection.
- The live GitHub Pages site only deploys on push to `main`, so dogfooding against the local preview is the only pre-merge signal.
