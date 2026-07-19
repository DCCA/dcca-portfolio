# Design

Visual system for the Daniel Andrade portfolio. Codename: **AI OS**. A tactile, operating-system-poster aesthetic — heavy Swiss grotesque set in glossy white "liquid-glass" pills, floating on a warm-gray canvas, with thin schematic diagrams and a single hot red-orange accent. Distinctive and committed; the opposite of AI-default cream minimalism.

## Theme

Light, warm-gray canvas (never pure white, never cream). Content lives on near-white glossy surfaces; the gray is the room the objects sit in. One dark panel (near-black) provides a single high-contrast moment in the Method section. No dark-mode variant — this is a committed brand surface, single theme by design.

## Color

OKLCH throughout. Alpha via `rgb(from var(--token) r g b / a)` — no hardcoded channel literals.

- `--canvas` `oklch(0.808 0.008 74)` — warm mid-gray page background (the "room").
- `--canvas-deep` `oklch(0.732 0.009 74)` — deeper gray for gradient floors and pressed states.
- `--surface` `oklch(0.986 0.002 90)` — near-white glossy pill/panel.
- `--surface-hi` `oklch(1 0 0)` — pure-white top highlight for the gloss gradient.
- `--ink` `oklch(0.18 0.006 60)` — near-black display type and primary text.
- `--ink-soft` `oklch(0.34 0.006 60)` — secondary text on white.
- `--muted` `oklch(0.46 0.006 60)` — muted labels/meta on white (≥4.6:1 on `--surface`; verified).
- `--accent` `oklch(0.628 0.229 30)` — hot red-orange. The single loud color.
- `--accent-deep` `oklch(0.49 0.19 30)` — accent text on white where small (≥4.5:1).
- `--on-accent` `oklch(0.2 0.04 40)` — text on accent fills. **Dark**, not light: the bright accent only reaches ~2.8:1 with white, so ink-on-accent (~4.65:1) is the accessible choice, matching the reference's dark-text-on-red card. Accent fills must stay solid (a fade toward `--accent-deep` drops this below AA).
- `--hairline` `rgb(from var(--ink) r g b / 0.16)` — thin schematic strokes and dividers.

**Contrast discipline (WCAG 2.2 AA):** small text only on white surfaces. On the gray canvas, only large display type (`--ink`, ≥8:1) and dark labels are allowed — `--muted` and `--accent` never carry small text on gray (they fail there). Accent as a small-text color uses `--accent-deep` on white only; large accent type may use `--accent`.

## Typography

- **Display** — `Archivo Variable` (self-hosted, fontsource). Poster type uses the width axis wide (`font-stretch: 118–125%`) at weight 850–900, letter-spacing −0.02 to −0.035em (floor −0.04em). Set in the pills. `text-wrap: balance` on h1–h3.
- **Body / UI** — `Archivo Variable` normal width, weight 400–500, line-height 1.5, body measure ≤ 70ch.
- **Labels / meta** — `JetBrains Mono Variable` (self-hosted), weight 500, 11–12px, `letter-spacing: 0.06em`, uppercase. Carries the "01" schematic markers, section kickers, and technical captions.

Pairing is contrast-axis (grotesque sans + mono), not two similar sans. Modular scale via `clamp()`, display max ≤ 6.5rem region on desktop, scaled down hard on mobile so headings never overflow.

## Surfaces & gloss

Liquid-glass pill recipe: `background: linear-gradient(180deg, var(--surface-hi), var(--surface))`; a top inset highlight (`inset 0 1px 0 rgb(from white ...)`) plus a soft drop shadow (`0 22px 45px -24px` ink, `0 2px 6px` ink) for lift. Radius is large — full capsules use `border-radius: 999px`; panels use `clamp(22px, 2.6vw, 40px)` (squircle feel). Hover lifts (`translateY(-3px)`, deeper shadow); active presses back. All motion behind `prefers-reduced-motion`.

## Motifs

Thin-stroke SVG **schematic dials** — concentric circles with radial tick divisions and a mono `01` marker — recurring as decorative technical texture (always `aria-hidden`): the hero operating-loop card, a faint one in the Method panel, and one in the contact panel. They echo the reference's instrument-panel feel without carrying meaning.

The hero's right column is a **schematic "operating panel"** (`SpecimenPanel`) — a light instrument screen with a dial, a ship/revise/reject scorecard (the `SHIP` row is the one accent fill), signal bars, and a source trail. It is custom, not stock imagery, and deliberately **light** so the Method section stays the page's single dark moment.

## Accent discipline

The accent is one loud color; keep it scarce. The **LinkedIn CTAs** (hero + contact) are the loudest red on the page — the primary conversion, not a project card, should own attention. The live project is a **featured white tile** with accent *detail* (a red ring, a filled `Live product` chip, an accent number), never a full red flood. A single accent word (`JUDGE`) in the dark Method panel is the one other loud moment.

## Motion

Purposeful, tactile, minimal. Staggered fade-up entrance (transform + opacity only, ease-out-expo). Pill hover/press. No bounce, no per-section scroll reveals gated on visibility. Every animation has a reduced-motion fallback (crossfade/instant).

## Focus & accessibility

Context-aware `:focus-visible`: a 3px ring that contrasts with whatever surface the control sits on — ink ring on white/accent, white ring on ink. Never accent-on-accent. Full keyboard nav, semantic landmarks (`header` outside `main`), skip link, honored `prefers-reduced-motion`. Target WCAG 2.2 AA.
