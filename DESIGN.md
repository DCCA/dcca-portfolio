# Design

Visual system for the Daniel Andrade portfolio. Codename: **Halftone**. A print-tactile dot-screen identity — the work rendered as a field of overlapping glossy color beads on a warm cream ground, with one loud vermillion signal and cobalt / gold / teal as sharp secondary voices. Risograph energy, disciplined palette. Distinctive and committed; the opposite of generic AI-default cream minimalism.

This is the **Signature** dial (of Accent / Signature / Drench): the halftone is loud where it earns it — the hero screen, the contact close, section transitions, project chips — while every surface that carries running text stays clean and legible. Bold impression, credible read.

## Theme

Light, warm **cream** canvas (`#EEE1C6`, never pure white, never gray). Content lives on a slightly lighter **paper** surface; the cream is the printed ground the beads sit on. One dark panel (near-black ink) provides a single high-contrast moment in the Method section. No dark-mode variant — this is a committed brand surface, single theme by design.

## Color

A print palette pulled straight from the reference. Hex tokens (a screen-print palette is defined by its inks, not a lightness ramp); alpha via `rgb(from var(--token) r g b / a)` — no hardcoded channel literals.

- `--canvas` `#EEE1C6` — warm cream ground (the printed paper).
- `--canvas-deep` `#E5D3B0` — deeper cream for the gradient floor.
- `--surface` `#F6EEDC` — lighter paper for content cards/pills.
- `--surface-hi` `#FBF6E9` — near-white paper top highlight for the soft gloss.
- `--ink` `#16121E` — warm near-black. Display type, body text, the void in the screen.
- `--ink-soft` `#4A4356` — secondary text on cream/paper (≥7:1 on cream; verified).
- `--muted` `#5F5769` — muted labels/meta on **paper only** (≥4.5:1 on `--surface`; fails on cream — never used there).
- `--accent` (**vermillion**) `#E63C17` — the single loud color. Carries the brand.
- `--accent-deep` `#A82A0E` — deep vermillion for small accent text on cream/paper (≥4.5:1). The bright vermillion fails as small text on cream (~3.2:1).
- `--on-accent` `#0B0910` — near-black text on vermillion fills. **Dark**, not light: bright vermillion only reaches ~2.8:1 with white; near-black clears AA (~4.6:1), matching the reference's dark-on-red read. Accent fills stay solid.
- `--cobalt` `#1B29C9` — secondary signal. Deep enough to also carry small text on cream (~7:1) or take cream text as a fill.
- `--gold` `#EFB03A` — secondary signal. Light — as a fill it takes **ink** text, never used as small text on cream.
- `--teal` `#6FA997` — secondary signal. Used as bead/fill color, not as small text.
- `--hairline` `rgb(from var(--ink) r g b / 0.14)` — thin dividers and card insets.

**Contrast discipline (WCAG 2.2 AA):** small text only on paper/cream where it clears AA. On the cream ground, small text is `--ink` / `--ink-soft` / `--accent-deep` / `--cobalt` only — `--muted`, bright `--accent`, `--gold`, and `--teal` never carry small text there. Large display type may use bright `--accent`. Text is **never** set over the live halftone (the dot field is decorative and its pixels are unpredictable) — captions over the screen sit on a solid dark chip.

## The halftone screen (signature motif)

The identity is a **procedural dot-screen**. A `field(u,v,ar)` function defines a "source image" over the unit square; that field is sampled onto a **staggered dot grid** and each cell painted as a filled circle with a per-dot radial sheen (a lighter top-left highlight into the sampled color), on a near-black ground. Rendered live to `<canvas>`, device-pixel-crisp, redrawn on resize only (never animated per-frame). Geometry is **abstract and non-figurative** — bold color forms, never a recognizable figure. Discs are aspect-corrected via `ar` (width/height) so they stay circular in pixels on any frame.

- **Hero** — a bold vermillion **disc** ("signal") with a cobalt misregistration crescent (riso offset), gold and teal ambient corners, and a cobalt base band. A striking, unmistakably abstract first impression, framed in a rounded near-black card in the hero's right column.
- **Contact** — a "drenched" close: a second halftone field (cobalt/vermillion) fills a side panel next to the CTAs, so the page ends as boldly as it opens. The CTAs themselves stay on clean paper.
- **Project chips** — each work tile carries a small CSS dot-screen chip tinted in the project's signal color (vermillion for the live product, cobalt / gold / teal for the repos). Cheap, not a canvas per tile.
- **Texture** — a very faint dot pattern on the cream ground and inside the dark Method panel ties the surfaces to the screen without noise.

Cell size scales with the canvas width (≈ W/24, clamped 13–26px). Honors `prefers-reduced-motion` (no entrance fade; the field is static regardless).

## Typography

- **Display** — `Archivo Variable` (self-hosted, fontsource). Heavy grotesque: width axis wide (`font-stretch: 118–125%`) at weight 850–900, letter-spacing −0.03 to −0.045em, uppercase for the poster headlines. The dots are the personality, so the type stays structural — a single heavy grotesque, not a novelty face. `text-wrap: balance` on h1–h3.
- **Body / UI** — `Archivo Variable` normal width, weight 440–500, line-height 1.5, body measure ≤ 65ch.
- **Labels / meta** — `JetBrains Mono Variable` (self-hosted), weight 500, 11–12px, `letter-spacing: 0.06–0.12em`, uppercase. Carries kickers, section numbers, and dot-grid captions.

Pairing is contrast-axis (grotesque sans + mono). Modular scale via `clamp()`; display scaled down hard on mobile so headings never overflow.

## Surfaces & gloss

Matte-print cards, not liquid glass: `background: linear-gradient(180deg, var(--surface-hi), var(--surface))`, a hairline ink inset (`inset 0 0 0 1px`), and a soft low drop shadow for a slight lift off the cream. The near-black **halftone frames** and the **Method** panel are the dark counterweight. Radius is generous — full capsules use `border-radius: 999px`; panels use `clamp(20px, 2.4vw, 34px)`. Hover lifts (`translateY(-3px)`, deeper shadow); active presses back. All motion behind `prefers-reduced-motion`.

## Accent discipline

Vermillion is one loud color — keep it scarce even in a bold system. The **LinkedIn CTAs** (hero + contact) are the loudest vermillion fills on the page — the primary conversion owns the loudest moment, not a project card. The live project is a **paper tile with a vermillion chip + ring** (accent detail, not a full flood). A single vermillion word (`JUDGE`) in the dark Method panel is the one other loud moment. Cobalt, gold, and teal appear only as secondary bead/chip signals, never competing with vermillion for the primary read.

## Motion

Purposeful, tactile, minimal. Staggered fade-up entrance (transform + opacity only, ease-out-expo). Card hover/press. The halftone field is static (drawn once, redrawn on resize). No bounce, no per-frame animation, no scroll-jacking. Every animation has a reduced-motion fallback (crossfade/instant).

## Focus & accessibility

Context-aware `:focus-visible`: a 3px ink ring offset outside the control so it always lands on a light surface. Never accent-on-accent. Full keyboard nav, semantic landmarks (`header` outside `main`), skip link, honored `prefers-reduced-motion`. Halftone canvases are decorative — either `aria-hidden` or given a short descriptive `aria-label`, never load-bearing for meaning. Target WCAG 2.2 AA.
