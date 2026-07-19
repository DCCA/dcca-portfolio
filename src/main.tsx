import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './fonts.css';
import './styles.css';

const LINKEDIN = 'https://www.linkedin.com/in/daniel-c-campagnoni-andrade-1004b13b';
const GITHUB = 'https://github.com/DCCA';
const EMAIL = 'dcca.hermes@gmail.com';

type Project = {
  id: string;
  title: string;
  type: string;
  status: string;
  body: string;
  proof: string;
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
    live: true,
  },
  {
    id: '02',
    title: 'skval',
    type: 'Eval & quality gates',
    status: 'Public',
    body: 'A Python CLI for scoring Claude Code skills with deterministic checks, safety gates, fixtures, and ship / revise / reject scorecards.',
    proof: 'The point: make AI-assisted work testable before it becomes process folklore.',
    href: 'https://github.com/DCCA/skval',
  },
  {
    id: '03',
    title: 'vyno',
    type: 'Local-first automation',
    status: 'Public',
    body: 'A personal AI digest pipeline for Telegram and Obsidian with source curation, scoring, scheduling, and an operator console.',
    proof: 'Useful automation stays inspectable: sources, scores, delivery, archive, and human control in one loop.',
    href: 'https://github.com/DCCA/vyno',
  },
  {
    id: '04',
    title: 'shotback',
    type: 'Visual QA workflow',
    status: 'Public',
    body: 'A Chrome workflow for screenshot capture, annotation, and LLM-ready product feedback.',
    proof: 'Turns vague UI taste into evidence people can point at, review, and fix.',
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

function Dial({ label = '01', size = 108 }: { label?: string; size?: number }) {
  const c = size / 2;
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={c + Math.cos(a) * (c - 4)}
        y1={c + Math.sin(a) * (c - 4)}
        x2={c + Math.cos(a) * (c - 11)}
        y2={c + Math.sin(a) * (c - 11)}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
    );
  });
  return (
    <svg className="dial" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={c} cy={c} r={c - 3} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx={c} cy={c} r={c - 22} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1={c} y1="3" x2={c} y2={size - 3} stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <line x1="3" y1={c} x2={size - 3} y2={c} stroke="currentColor" strokeWidth="1" opacity="0.18" />
      {ticks}
      <text x={c} y={c + 4} textAnchor="middle" fontFamily="'JetBrains Mono Variable', monospace" fontSize="13" fontWeight="600" fill="currentColor">
        {label}
      </text>
    </svg>
  );
}

// Decorative instrument-panel "specimen": a schematic of the signal → decision
// loop. Light (keeps the Method panel as the page's only dark moment) and custom
// (not stock imagery). aria-hidden internals; the figure carries the label.
function SpecimenPanel() {
  const bars = [40, 66, 30, 88, 52, 72, 44, 60];
  return (
    <figure className="specimen pill reveal" aria-label="Schematic of the signal-to-decision loop: dials, a ship/revise/reject scorecard, signal bars, and a source trail.">
      <div className="specScreen" aria-hidden="true">
        <div className="specHead">
          <span>Signal Desk</span>
          <span>OS · 2.0</span>
        </div>
        <div className="specRow">
          <Dial label="01" size={96} />
          <dl className="specScore">
            <div className="scoreRow scoreRow--ship"><dt>Ship</dt><dd>12</dd></div>
            <div className="scoreRow"><dt>Revise</dt><dd>03</dd></div>
            <div className="scoreRow"><dt>Reject</dt><dd>07</dd></div>
          </dl>
        </div>
        <svg className="specBars" viewBox="0 0 172 56" preserveAspectRatio="none" aria-hidden="true">
          {bars.map((h, i) => (
            <rect key={i} x={i * 21 + 3} y={56 - h * 0.5} width="13" height={h * 0.5} rx="2"
              fill="currentColor" opacity={i === 3 ? 0.7 : 0.3} />
          ))}
        </svg>
        <div className="specTrail">
          <span>src · github <b>ok</b></span>
          <span>eval · 12 / 14 gates</span>
          <span>review · human <b>ok</b></span>
        </div>
      </div>
      <figcaption className="specimenTag">Specimen A — Operating panel</figcaption>
    </figure>
  );
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

          <div className="heroAside">
            <SpecimenPanel />
            <dl className="dialCard pill reveal">
              <Dial label="04" />
              <div className="dialCopy">
                <dt>Operating loop</dt>
                <dd>Source · Judge · System · Verify — four moves, every build.</dd>
              </div>
            </dl>
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
            <p>Four shipped systems · source on GitHub</p>
          </div>
          <div className="tiles">
            {projects.map((p) => (
              <article className={`tile pill reveal${p.live ? ' tile--live' : ''}`} key={p.id}>
                <div className="tileTop">
                  <span className="tileNum">/{p.id}</span>
                  <span className="tileStatus">{p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="tileType">{p.type}</p>
                <p className="tileBody">{p.body}</p>
                <p className="tileProof">{p.proof}</p>
                {p.href ? (
                  <a className="tileOpen" href={p.href} target="_blank" rel="noreferrer">Open repository <Arrow /></a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="method" className="method pill reveal" aria-labelledby="method-title">
          <div className="methodMarks" aria-hidden="true">
            <Dial label="00" size={132} />
            <span>Source</span>
            <span>Judge</span>
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
          <div className="contactLead">
            <span className="kicker">Available for sharp AI product conversations</span>
            <h2 id="contact-title">Let's talk systems.</h2>
            <p>Senior AI product roles and serious advisory work. If a workflow needs product judgment, start here.</p>
            <Dial label="05" size={92} />
          </div>
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
