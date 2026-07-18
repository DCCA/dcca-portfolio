import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  {
    id: '01',
    title: 'AI Signal Desk',
    type: 'Signal curation product',
    status: 'Live product',
    body: 'A live AI signal desk that turns launches, repos, tools, and concepts into practical calls: learn, try, watch, or ignore.',
    proof: 'Built around source receipts, editorial judgment, and a clear reason a busy operator should care.',
  },
  {
    id: '02',
    title: 'skval',
    type: 'Eval and quality gates',
    status: 'Public',
    body: 'A Python CLI for scoring Claude Code skills with deterministic checks, safety gates, fixtures, and ship, revise, reject scorecards.',
    proof: 'The point is to make AI assisted work testable before it becomes process folklore.',
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
    body: 'A Chrome workflow for screenshot capture, annotation, and LLM ready product feedback.',
    proof: 'Turns vague UI taste into evidence people can point at, review, and fix.',
    href: 'https://github.com/DCCA/shotback',
  },
];

const operatingMode = [
  ['Source', 'Start with the real inputs: user language, market noise, screenshots, docs, constraints, and what the workflow already does.'],
  ['Judge', 'Make the useful cut. Name the decision, the tradeoff, and the evidence someone can challenge.'],
  ['System', 'Turn repeated judgment into a small product loop with ownership, checks, and a place for human approval.'],
  ['Verify', 'Ship with receipts: source trails, eval gates, visual proof, and a clear reason to trust the output.'],
];

const improvements = [
  ['AI product loops', 'Move from impressive demos to workflows people can operate, review, and improve.'],
  ['Signal desks', 'Cut noisy research feeds into useful decisions with source evidence attached.'],
  ['Eval gates', 'Replace vibe checks with fixtures, scorecards, deterministic checks, and explicit approval boundaries.'],
  ['Product surfaces', 'Make pages and tools feel credible: sharper proof, fewer claims, better interaction evidence.'],
];

const assetPath = `${import.meta.env.BASE_URL}assets/portfolio-systems-workspace.png`;

function App() {
  return (
    <main id="top" className="siteShell">
      <a className="skipLink" href="#work">Skip to work</a>

      <header className="masthead" aria-label="Site header">
        <a className="monogram" href="#top" aria-label="Daniel Andrade home">DA</a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#method">Method</a>
          <a href="https://github.com/DCCA" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="indexCode" aria-hidden="true">DCCA / AI PRODUCT</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="heroLabel">
          <span>Daniel Andrade</span>
          <span>Senior fintech product leader</span>
          <span>São Paulo</span>
        </div>

        <div className="heroType">
          <h1 id="hero-title">AI systems with product judgment</h1>
          <p>
            I build AI-native product systems for signal curation, evals, and human-in-the-loop workflows. Fintech operator background. Hands-on builder practice.
          </p>
          <dl className="profileProof" aria-label="Profile proof">
            <div>
              <dt>Current lens</dt>
              <dd>Group Product Manager / Sr. Manager at Neon</dd>
            </div>
            <div>
              <dt>Past rooms</dt>
              <dd>Mercado Libre, Leve, PagSeguro PagBank, ConectCar</dd>
            </div>
          </dl>
        </div>

        <figure className="specimen">
          <img
            src={assetPath}
            alt="Dark product systems workspace with laptop dashboards, evaluation maps, notebooks, and annotated product artifacts"
          />
          <figcaption>
            <span>Specimen A</span>
            <span>Systems workbench</span>
          </figcaption>
        </figure>

        <div className="heroActions" aria-label="Primary actions">
          <a className="primaryLink" href="#work">View systems</a>
          <a className="secondaryLink" href="mailto:dcca.hermes@gmail.com">Email Daniel</a>
        </div>
      </section>

      <section className="capabilityStrip" aria-label="Capabilities">
        <span>Signal curation</span>
        <span>Eval gates</span>
        <span>Human review loops</span>
        <span>Local-first automation</span>
        <span>Fintech product leadership</span>
      </section>

      <section id="work" className="work" aria-labelledby="work-title">
        <div className="sectionHead">
          <span>Selected systems</span>
          <h2 id="work-title">Small enough to inspect. Real enough to validate.</h2>
        </div>

        <div className="workLedger">
          {projects.map((project) => (
            <article className="workRow" key={project.id}>
              <div className="workNumber">{project.id}</div>
              <div className="workTitleBlock">
                <h3>{project.title}</h3>
                <p>{project.type}</p>
              </div>
              <p className="workBody">{project.body}</p>
              <p className="workProof">{project.proof}</p>
              <div className="workStatus">
                <span>{project.status}</span>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">Open</a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="method" className="method" aria-labelledby="method-title">
        <div className="methodType" aria-hidden="true">
          <span>Source</span>
          <span>Judge</span>
          <span>Verify</span>
        </div>
        <div className="methodContent">
          <div className="sectionHead compactHead">
            <span>Method</span>
            <h2 id="method-title">Trusted operation beats impressive output.</h2>
          </div>
          <dl className="modeList">
            {operatingMode.map(([term, description]) => (
              <div className="modeItem" key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="improvements" aria-labelledby="improvements-title">
        <h2 id="improvements-title">Where I can help.</h2>
        <dl className="improvementList">
          {improvements.map(([term, description]) => (
            <div className="improvementItem" key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <span>Available for sharp AI product conversations</span>
        <h2 id="contact-title">Bring the workflow that needs judgment.</h2>
        <div className="contactLinks">
          <a href="mailto:dcca.hermes@gmail.com">dcca.hermes@gmail.com</a>
          <a href="https://github.com/DCCA" target="_blank" rel="noreferrer">github.com/DCCA</a>
          <a href="https://www.linkedin.com/in/daniel-c-campagnoni-andrade-1004b13b" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>

      <footer className="footer">
        <span>Daniel Andrade</span>
        <span>AI-native product systems</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
