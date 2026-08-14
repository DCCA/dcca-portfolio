import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './fonts.css';
import './styles.css';

const LINKEDIN = 'https://www.linkedin.com/in/daniel-c-campagnoni-andrade-1004b13b';
const GITHUB = 'https://github.com/DCCA';
const EMAIL = 'dcca.hermes@gmail.com';

type Tint = 'verm' | 'cobalt' | 'gold' | 'teal';

type Project = {
  id: string;
  title: string;
  type: string;
  status: string;
  body: string;
  proof: string;
  tint: Tint;
  href?: string;
  live?: boolean;
};

const projects: Project[] = [
  {
    id: '01',
    title: 'AI Signal Desk',
    type: 'Signal curation product',
    status: 'Live product',
    body: 'A live AI signal desk that turns launches, repos, tools, and concepts into practical calls: learn, try, watch, or ignore.',
    proof: 'Built on source receipts, editorial judgment, and a clear reason a busy operator should care.',
    tint: 'verm',
    href: 'https://aisignaldesk.ai/',
    live: true,
  },
  {
    id: '02',
    title: 'skval',
    type: 'Eval & quality gates',
    status: 'Public',
    body: 'A Python CLI for scoring Claude Code skills with deterministic checks, safety gates, fixtures, and ship / revise / reject scorecards.',
    proof: 'The point: make AI-assisted work testable before it becomes process folklore.',
    tint: 'cobalt',
    href: 'https://github.com/DCCA/skval',
  },
  {
    id: '03',
    title: 'vyno',
    type: 'Local-first automation',
    status: 'Public',
    body: 'A personal AI digest pipeline for Telegram and Obsidian with source curation, scoring, scheduling, and an operator console.',
    proof: 'Useful automation stays inspectable: sources, scores, delivery, archive, and human control in one loop.',
    tint: 'teal',
    href: 'https://github.com/DCCA/vyno',
  },
  {
    id: '04',
    title: 'shotback',
    type: 'Visual QA workflow',
    status: 'Public',
    body: 'A Chrome workflow for screenshot capture, annotation, and LLM-ready product feedback.',
    proof: 'Turns vague UI taste into evidence people can point at, review, and fix.',
    tint: 'gold',
    href: 'https://github.com/DCCA/shotback',
  },
];

const operatingMode: [string, string][] = [
  ['Source', 'Start with the real inputs: user language, market noise, screenshots, docs, constraints, and what the workflow already does.'],
  ['Judge', 'Make the useful cut. Name the decision, the tradeoff, and the evidence someone can challenge.'],
  ['System', 'Turn repeated judgment into a small product loop with ownership, checks, and a place for human approval.'],
  ['Verify', 'Ship with receipts: source trails, eval gates, visual proof, and a clear reason to trust the output.'],
];

const improvements: [string, string][] = [
  ['AI product loops', 'Move from impressive demos to workflows people can operate, review, and improve.'],
  ['Signal desks', 'Cut noisy research feeds into useful decisions with source evidence attached.'],
  ['Eval gates', 'Replace vibe checks with fixtures, scorecards, deterministic checks, and explicit approval boundaries.'],
  ['Product surfaces', 'Make pages and tools feel credible: sharper proof, fewer claims, better interaction evidence.'],
];

const capabilities = ['Signal curation', 'Eval gates', 'Human review loops', 'Local-first automation', 'Fintech product leadership'];

/* ---------- halftone screen (the signature motif) ----------
   A procedural "source field" sampled onto a staggered dot grid, each cell a
   filled circle with a per-dot radial sheen, on a near-black ground. Rendered
   live to <canvas>, device-pixel crisp, redrawn on resize only (never per frame),
   so it stays cheap and reduced-motion friendly. See DESIGN.md → "The halftone
   screen". Decorative: carries a short aria-label, never load-bearing meaning. */
type RGB = [number, number, number];
const PAL = {
  cream: [238, 225, 198] as RGB,
  verm: [230, 60, 23] as RGB,
  cobalt: [27, 41, 201] as RGB,
  teal: [111, 169, 151] as RGB,
  gold: [239, 176, 58] as RGB,
  ink: [22, 18, 30] as RGB,
};
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const sstep = (e0: number, e1: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

// Aspect-corrected radial distance so discs stay circular in PIXELS on a
// non-square frame (u,v are 0..1 fractions; ar = width/height).
const disc = (u: number, v: number, cx: number, cy: number, r: number, ar: number): number =>
  Math.hypot(u - cx, (v - cy) / ar) / r;

// Hero: an abstract "signal" poster — a bold vermillion disc with a cobalt
// misregistration crescent (riso offset), gold and teal ambient corners, and a
// cobalt base band. Non-figurative by design; geometry stays circular via `ar`.
function heroField(u: number, v: number, ar: number): RGB {
  let c: RGB = [PAL.cream[0], PAL.cream[1], PAL.cream[2]];
  c = mix(c, PAL.gold, (1 - sstep(0, 1, disc(u, v, 0.9, 0.12, 0.62, ar))) * 0.55);
  c = mix(c, PAL.teal, (1 - sstep(0, 1, disc(u, v, 0.04, 0.96, 0.52, ar))) * 0.5);
  const rc = disc(u, v, 0.52, 0.44, 0.4, ar);
  c = mix(c, PAL.verm, sstep(1.04, 0.92, rc));
  const bc = disc(u, v, 0.4, 0.6, 0.34, ar);
  c = mix(c, PAL.cobalt, sstep(1.0, 0.88, bc) * sstep(0.9, 1.06, rc) * 0.92);
  c = mix(c, PAL.cobalt, sstep(0.88, 1.04, v) * 0.85);
  return c;
}

// Contact: a bolder, simpler close in the same palette — cobalt ground, a
// vermillion diagonal sweep, a gold spark and teal pool, cream glow top-left.
function contactField(u: number, v: number, ar: number): RGB {
  let c: RGB = [PAL.cobalt[0], PAL.cobalt[1], PAL.cobalt[2]];
  c = mix(c, PAL.cream, (1 - sstep(0, 1, disc(u, v, 0.1, 0.04, 0.5, ar))) * 0.92);
  const d = u * 0.72 + v * 0.72;
  const band = sstep(0.5, 0.6, d) * sstep(1.26, 1.14, d);
  c = mix(c, PAL.verm, band * 0.94);
  c = mix(c, PAL.gold, (1 - sstep(0, 1, disc(u, v, 0.9, 0.87, 0.28, ar))) * 0.78);
  c = mix(c, PAL.teal, (1 - sstep(0, 1, disc(u, v, 0.05, 0.92, 0.34, ar))) * 0.55);
  c = mix(c, PAL.ink, sstep(0.92, 1.04, v) * 0.32);
  return c;
}

function HalftoneField({ variant, className, label }: { variant: 'hero' | 'contact'; className?: string; label: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const field = variant === 'contact' ? contactField : heroField;
    let raf = 0;
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = cv.getBoundingClientRect();
      const W = Math.max(1, Math.round(rect.width));
      const H = Math.max(1, Math.round(rect.height));
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgb(22,18,30)';
      ctx.fillRect(0, 0, W, H);
      const cell = Math.max(13, Math.min(26, Math.round(W / 24)));
      const step = cell;
      const rad = cell * 0.62;
      for (let row = 0, y = step * 0.5; y < H + step; y += step * 0.9, row++) {
        const off = row % 2 ? step * 0.5 : 0;
        for (let x = step * 0.5 + off; x < W + step; x += step) {
          const col = field(x / W, y / H, W / H);
          const cr = Math.max(0, Math.min(255, Math.round(col[0])));
          const cgc = Math.max(0, Math.min(255, Math.round(col[1])));
          const cb = Math.max(0, Math.min(255, Math.round(col[2])));
          const g = ctx.createRadialGradient(x - rad * 0.3, y - rad * 0.32, rad * 0.1, x, y, rad);
          g.addColorStop(0, `rgb(${Math.min(255, cr + 42)},${Math.min(255, cgc + 42)},${Math.min(255, cb + 42)})`);
          g.addColorStop(1, `rgb(${cr},${cgc},${cb})`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant]);
  return <canvas ref={ref} className={className} role="img" aria-label={label} />;
}

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;

function App() {
  return (
    <>
      <a className="skipLink" href="#work">Skip to work</a>

      <header className="topbar">
        <div className="topbarInner">
        <div className="bar pill">
          <a className="brand" href="#top" aria-label="Daniel Andrade — home">DA</a>
          <nav className="links" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#method">Method</a>
            <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="barStatus" href="#contact">Open to AI product roles</a>
        </div>
        </div>
      </header>

      <div className="page">
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="heroMain pill reveal">
            <div className="heroKicker">
              <span>Daniel Andrade</span>
              <span>Senior fintech product leader</span>
              <span>São Paulo</span>
            </div>
            <h1 id="hero-title">AI systems <span className="fade">with</span> product judgment</h1>
            <p className="heroLead">
              I build AI-native product systems for signal curation, evals, and human-in-the-loop workflows. Fintech operator background, hands-on builder practice.
            </p>
            <dl className="heroProof">
              <div className="proofCard">
                <dt>Current lens</dt>
                <dd>Group Product Manager / Sr. Manager at Neon</dd>
              </div>
              <div className="proofCard">
                <dt>Past rooms</dt>
                <dd>Mercado Libre · Leve · PagBank · ConectCar</dd>
              </div>
            </dl>
            <div className="heroCtas">
              <a className="cta cta--primary" href={LINKEDIN} target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow /></a>
              <a className="cta cta--ghost" href="#work">View the systems <Arrow /></a>
            </div>
          </div>

          <div className="heroAside reveal">
            <div className="heroScreen">
              <HalftoneField variant="hero" className="halftoneCanvas" label="A halftone dot-screen rendering: cream edges, a red-orange arched field, a dark arched figure, cobalt at the base." />
              <span className="screenTag">Specimen — signal field</span>
            </div>
          </div>
        </section>

        <div className="capRow pill reveal" aria-label="Capabilities">
          <span className="capLead">Practice</span>
          {capabilities.map((c) => (
            <span className="cap" key={c}>{c}</span>
          ))}
        </div>

        <section id="work" className="work" aria-labelledby="work-title" tabIndex={-1}>
          <div className="sectionHead">
            <h2 id="work-title">Small enough to inspect. Real enough to validate.</h2>
            <p>Four shipped systems · one live, three on GitHub</p>
          </div>
          <div className="tiles">
            {projects.map((p) => (
              <article className={`tile pill reveal${p.live ? ' tile--live' : ''}`} data-tint={p.tint} key={p.id}>
                <span className="tileChip" aria-hidden="true" />
                <div className="tileTop">
                  <span className="tileNum">/{p.id}</span>
                  <span className="tileStatus">{p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="tileType">{p.type}</p>
                <p className="tileBody">{p.body}</p>
                <p className="tileProof">{p.proof}</p>
                {p.href ? (
                  <a className="tileOpen" href={p.href} target="_blank" rel="noreferrer" aria-label={p.live ? `Visit the ${p.title} site` : `Open the ${p.title} repository`}>{p.live ? 'Visit site' : 'Open repository'} <Arrow /></a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="method" className="method pill reveal" aria-labelledby="method-title">
          <div className="methodMarks" aria-hidden="true">
            <span>Source</span>
            <span>Judge</span>
            <span>System</span>
            <span>Verify</span>
          </div>
          <div className="methodBody">
            <span className="kicker">Method</span>
            <h2 id="method-title">Trusted operation beats impressive output.</h2>
            <dl className="modeList">
              {operatingMode.map(([term, desc]) => (
                <div className="modeItem" key={term}>
                  <dt>{term}</dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="help pill reveal" aria-labelledby="help-title">
          <div className="helpHead">
            <h2 id="help-title">Bring the workflow that needs judgment.</h2>
            <p>Where I can help</p>
          </div>
          <dl className="helpList">
            {improvements.map(([term, desc], i) => (
              <div className="helpRow" key={term}>
                <span className="helpNum">/{String(i + 1).padStart(2, '0')}</span>
                <dt>{term}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className="contact pill reveal" aria-labelledby="contact-title">
          <div className="contactScreen">
            <HalftoneField variant="contact" className="halftoneCanvas" label="A halftone dot-screen field in cobalt and vermillion." />
            <span className="screenTag">Signal · open</span>
          </div>
          <div className="contactBody">
            <span className="kicker">Available for sharp AI product conversations</span>
            <h2 id="contact-title">Let's talk systems.</h2>
            <p>Senior AI product roles and serious advisory work. If a workflow needs product judgment, start here.</p>
            <div className="contactLinks">
              <a className="contactLink contactLink--primary" href={LINKEDIN} target="_blank" rel="noreferrer">
                <span className="lk">LinkedIn</span>
                <span className="val">Connect <Arrow /></span>
              </a>
              <a className="contactLink" href={`mailto:${EMAIL}`}>
                <span className="lk">Email</span>
                <span className="val">{EMAIL} <Arrow /></span>
              </a>
              <a className="contactLink" href={GITHUB} target="_blank" rel="noreferrer">
                <span className="lk">GitHub</span>
                <span className="val">github.com/DCCA <Arrow /></span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Daniel Andrade</span>
        <span>AI-native product systems · {new Date().getFullYear()}</span>
      </footer>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
