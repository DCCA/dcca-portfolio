# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page personal portfolio for Daniel Andrade (AI-native product systems). React + TypeScript + Vite, built and served as static files, deployed to GitHub Pages.

## Commands

Package manager is **Bun** (see `bun.lock`; CI installs with `--frozen-lockfile`).

```bash
bun install          # install dependencies
bun run dev          # Vite dev server (binds 0.0.0.0)
bun run build        # tsc -b type-check, then vite build -> dist/
bun run preview      # serve the production build locally
```

There is no test suite, linter, or formatter configured. `bun run build` is the verification gate — it type-checks the whole `src` tree via `tsc -b` before bundling, so a build failure is the signal that something is wrong.

## Architecture

The entire site is one file: `src/main.tsx`. It renders a single `App` component into `#root` (`index.html`). Page content lives in plain module-level arrays at the top of the file (`projects`, `operatingMode`, `improvements`, `capabilities`) that the JSX maps over — **edit content by editing those arrays**, not by hand-writing markup. All styling is one hand-authored stylesheet, `src/styles.css` (native CSS, no framework, class names match the JSX `className`s). `src/fonts.css` imports the self-hosted variable fonts (Archivo + JetBrains Mono via `@fontsource-variable/*`, bundled by Vite — no font CDN).

There is no router, no state management, and no data fetching — everything is static and compile-time.

### Design system (source of truth)

The visual and product direction is captured in two root docs, both authored via the `impeccable` design skill (`.claude/skills/impeccable/`): **`DESIGN.md`** (the "AI OS" visual language — warm-gray canvas, glossy liquid-glass pills, wide Archivo-black display, hot red-orange accent, OKLCH tokens) and **`PRODUCT.md`** (register, audience, positioning, CTA priority — LinkedIn is the primary CTA). Read both before any redesign work; the CSS custom properties in `styles.css:root` implement DESIGN.md's tokens.

Contrast discipline: small text sits only on white pill surfaces; on the gray canvas use only large display type or dark labels. Text on the accent fill is **dark ink**, not white (the bright red-orange only reaches ~2.8:1 with white).

### Dogfooding

`scripts/shoot.mjs` drives the pre-installed Chromium via `playwright-core` (a dev dep) to screenshot the running preview at desktop/laptop/mobile and flag horizontal overflow + console errors: `bun run build && bun run preview` then `node scripts/shoot.mjs <url> <outDir> <tag>`. Use it (plus an in-browser canvas contrast check) to verify visual changes, not just the type-check.

## Deployment & base path

- Deploys automatically to GitHub Pages via `.github/workflows/pages.yml` on **push to `main`** (builds with Bun, uploads `dist/`). `dist/` is gitignored and never committed.
- The site is served from a subpath, so `vite.config.ts` sets `base: '/dcca-portfolio/'`. Any reference to a file in `public/` must go through `import.meta.env.BASE_URL` (see `assetPath` in `main.tsx`) — a leading-slash absolute path will 404 in production.
