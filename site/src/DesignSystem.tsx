import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import SiteChrome from "./components/SiteChrome";
import SiteHeader, { SITE_NAV_ITEMS } from "./components/SiteHeader";

const SWATCHES = [
  { name: "Void", varName: "--void", hex: "#08080a" },
  { name: "Void 2", varName: "--void-2", hex: "#0f0f13" },
  { name: "Bone", varName: "--bone", hex: "#e8e4dc" },
  { name: "Bone Dim", varName: "--bone-dim", hex: "#8a8781" },
  { name: "Amber", varName: "--amber", hex: "#ff8a1e" },
  { name: "Cyan", varName: "--cyan", hex: "#7fd4d4" },
  { name: "Neon Pink", varName: "--neon-pink", hex: "#ff3c8a" },
  { name: "Neon Gold", varName: "--neon-gold", hex: "#ffcb45" }
];

function DesignSystem() {
  return (
    <div className="site-shell">
      <SiteChrome />
      <SiteHeader navItems={SITE_NAV_ITEMS} />

      <main>
        <section className="section playbook-hero">
          <div className="eyebrow">BRAND INFRASTRUCTURE</div>
          <h1>The Design System.</h1>
          <p className="hero-text">
            "Off-World Cockpit" — the visual language behind this site, packaged so it can be reused anywhere: presentations, mockups, one-pagers. Directed by me and built in collaboration with AI, start to finish. Colors, type, and components below; the full portable stylesheet and a Claude skill that applies this automatically both live in the repo.
          </p>
        </section>

        <section className="section" id="color">
          <div className="sec-head">
            <span className="num">// 01</span>
            <h2>Color</h2>
          </div>
          <div className="swatches">
            {SWATCHES.map(s => (
              <div className="swatch" key={s.varName}>
                <div className="swatch-chip" style={{ background: s.hex }} />
                <div className="swatch-name">{s.name}</div>
                <div className="swatch-hex">{s.varName} · {s.hex}</div>
              </div>
            ))}
          </div>
          <p className="section-lede">
            Amber is the primary accent — CTAs, numbering, the "agent"/primary category. Cyan is secondary and neutral — the default category color, data readouts. Neon pink is reserved for identity only: the name lockup, and the "these things are linked" marker on paired work. Gold is a rare highlight, not a workhorse color. No deliverable should need a sixth accent.
          </p>
        </section>

        <section className="section" id="type">
          <div className="sec-head">
            <span className="num">// 02</span>
            <h2>Typography</h2>
          </div>
          <div className="type-sample">
            <span className="type-sample-label">Display / H1</span>
            <h1 style={{ margin: 0, maxWidth: "none" }}>Turning ambiguous problems.</h1>
          </div>
          <div className="type-sample">
            <span className="type-sample-label">H2</span>
            <h2 style={{ margin: 0 }}>Show, not tell.</h2>
          </div>
          <div className="type-sample">
            <span className="type-sample-label">Eyebrow</span>
            <div className="eyebrow">SECTION LABEL</div>
          </div>
          <div className="type-sample">
            <span className="type-sample-label">Body</span>
            <p className="section-lede" style={{ margin: 0 }}>Body copy runs in IBM Plex Mono at weight 300 — it reads as instrumentation, not prose. Keep paragraphs short.</p>
          </div>
          <p className="section-lede">
            Headings: Space Grotesk (300–700). Body, UI, and labels: IBM Plex Mono (300–600). Noto Sans JP is decorative-only, reserved for the kanji strip. Never a third typeface.
          </p>
        </section>

        <section className="section" id="components">
          <div className="sec-head">
            <span className="num">// 03</span>
            <h2>Components</h2>
          </div>

          <p className="section-lede" style={{ marginBottom: 20 }}>Buttons &amp; tags</p>
          <div className="hero-actions" style={{ marginTop: 0 }}>
            <a className="button primary" href="#components">Primary action</a>
            <a className="button ghost" href="#components">Secondary / ghost</a>
          </div>
          <div className="tags" style={{ marginTop: 16, marginBottom: 40 }}>
            <span className="tag">Default tag</span>
            <span className="tag amber">Amber tag</span>
          </div>

          <p className="section-lede" style={{ marginBottom: 20 }}>Cards</p>
          <div className="cards" style={{ marginBottom: 40 }}>
            <article className="card">
              <div className="type agent"><span className="led" />Category A</div>
              <h3>Card title</h3>
              <div className="field-row"><span className="k">Problem</span><span className="v">What this card is arguing or proving.</span></div>
              <div className="field-row"><span className="k">Approach</span><span className="v">How it gets there.</span></div>
              <a className="action" href="#components">Read more</a>
            </article>
            <article className="card">
              <div className="type"><span className="led" />Category B</div>
              <h3>Second card</h3>
              <div className="field-row"><span className="k">Problem</span><span className="v">Cyan is the default/neutral category color.</span></div>
              <div className="field-row"><span className="k">Approach</span><span className="v">Amber and pink are reserved for meaningful distinctions.</span></div>
              <a className="action" href="#components">Read more</a>
            </article>
          </div>

          <p className="section-lede" style={{ marginBottom: 20 }}>Panel</p>
          <div style={{ maxWidth: 360 }}>
            <aside className="operator">
              <div className="field name-row"><span className="k">Designation</span><span className="v">Gord Turner</span></div>
              <div className="field"><span className="k">Status</span><span className="v accent">Active</span></div>
              <div className="field"><span className="k">Signal</span><span className="v accent">Nominal</span></div>
            </aside>
          </div>
        </section>

        <section className="section" id="reuse">
          <div className="sec-head">
            <span className="num">// 04</span>
            <h2>Using this elsewhere</h2>
          </div>
          <p className="section-lede">
            The tokens and components above live as framework-free CSS in this repo's <code>design-system/</code> folder — <code>tokens.css</code> plus a living <code>style-guide.html</code> reference. Any new self-contained HTML file (a presentation, a mockup, a one-pager) can drop that stylesheet in and match this exactly, with no build step. A Claude skill also encodes these rules directly, so future decks and mockups for this brand apply the system automatically instead of re-deriving it each time.
          </p>
          <p className="section-lede" style={{ marginTop: 16 }}>
            Read the full story of how this got systemized — from a one-off visual mockup to a governed, reusable system — in the case study.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a className="text-link" href="https://github.com/GordosGit/Portfolio.GT/tree/main/design-system" target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={14} /></a>
            <a className="text-link" href="case-study.html?slug=systemizing-a-personal-brand">Read the case study <ArrowUpRight size={14} /></a>
          </div>
        </section>

        <section className="section" id="provenance">
          <div className="sec-head">
            <span className="num">// 05</span>
            <h2>Provenance</h2>
          </div>
          <div style={{ maxWidth: 360, marginBottom: 24 }}>
            <aside className="operator">
              <div className="field name-row"><span className="k">Directed by</span><span className="v">Gord Turner</span></div>
              <div className="field"><span className="k">Built with</span><span className="v accent">Claude (Anthropic)</span></div>
              <div className="field"><span className="k">Method</span><span className="v">Human direction, AI-assisted execution</span></div>
            </aside>
          </div>
          <p className="section-lede">
            This system was directed and product-owned by me — the palette, the mood, the rules for what each accent color is allowed to mean — and built in collaboration with Claude, working from a visual mockup I supplied. Every token, component, and page here went through the same loop I use on client work: I set direction and made the calls, AI did the drafting and iteration. Full story in the case study below.
          </p>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-card">
            <div className="eyebrow">// OPEN CHANNEL</div>
            <h2>Interested in what I can build with your team?</h2>
            <p>For product, business analysis, AI workflow, or applied AI opportunities, I'd be happy to talk.</p>
            <div className="contact-actions">
              <a className="button primary" href="mailto:gord.turner@gmail.com"><Mail size={15} /> Email me</a>
              <a className="button ghost" href="https://www.linkedin.com/in/gordturner/" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
              <a className="button ghost" href="https://github.com/GordosGit" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Gord Turner — Applied AI Portfolio</span>
        <span>NODE 07 · REV 3.1</span>
      </footer>
    </div>
  );
}

export default DesignSystem;
