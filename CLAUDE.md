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

The entire site is one file: `src/main.tsx`. It renders a single `App` component into `#root` (`index.html`). Page content lives in plain module-level arrays at the top of the file (`projects`, `operatingMode`, `improvements`) that the JSX maps over — **edit content by editing those arrays**, not by hand-writing markup. All styling is one hand-authored stylesheet, `src/styles.css` (native CSS, no framework, class names match the JSX `className`s).

There is no router, no state management, and no data fetching — everything is static and compile-time.

## Deployment & base path

- Deploys automatically to GitHub Pages via `.github/workflows/pages.yml` on **push to `main`** (builds with Bun, uploads `dist/`). `dist/` is gitignored and never committed.
- The site is served from a subpath, so `vite.config.ts` sets `base: '/dcca-portfolio/'`. Any reference to a file in `public/` must go through `import.meta.env.BASE_URL` (see `assetPath` in `main.tsx`) — a leading-slash absolute path will 404 in production.
