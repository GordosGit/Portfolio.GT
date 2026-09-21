import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, CheckCircle2, Github, Linkedin, Mail } from "lucide-react";
import { experience, projects } from "./data";
import SiteChrome from "./components/SiteChrome";
import NeonReflection from "./components/NeonReflection";
import SiteHeader, { SITE_NAV_ITEMS } from "./components/SiteHeader";
import VoightKampff from "./components/VoightKampff";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

function App() {
  return (
    <div className="site-shell">
      <NeonReflection />
      <SiteChrome />
      <SiteHeader navItems={SITE_NAV_ITEMS} />

      <main id="top">
        <section className="hero" id="hero">
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="eyebrow">
              APPLIED AI · PRODUCT SYSTEMS
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="name-lockup">
              <span className="n">Gord Turner</span>
              <span className="r">Senior Product Owner · Business Analyst</span>
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp}>
              Turning ambiguous problems into <span>structured AI workflows</span>.
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-text">
              I build practical AI tools that formalize the analytical work behind good product decisions — turning monsters into teddy bears, one framework at a time.
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-actions">
              <a className="button primary" href="#work">Explore the work <ArrowDown size={15} /></a>
              <a className="button ghost" href="https://github.com/GordosGit/Portfolio.GT" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
              <a className="button ghost" href="https://www.linkedin.com/in/gordturner/" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
            </motion.div>
            <div className="tags">
              <span className="tag">PRODUCT ANALYSIS</span>
              <span className="tag amber">AI AUTOMATION</span>
              <span className="tag">WORKFLOW DESIGN</span>
            </div>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-mantra">
              My operating philosophy: I turn monsters into teddy bears — breaking intimidating problems into pieces a team can actually get their arms&nbsp;around.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
            <VoightKampff />
          </motion.div>
        </section>

        <section className="section manifesto" id="approach">
          <div className="section-heading">
            <div className="sec-head">
              <span className="num">// 01</span>
              <h2>Turning monsters into teddy bears.</h2>
            </div>
            <p className="section-lede">Every intimidating problem — a blank slate, a stalled migration, a vague ask — gets the same treatment: isolate what's actually being asked, strip out the noise, and break it into pieces a team can act on with confidence. Here's how that plays out in practice:</p>
          </div>
          <div className="manifesto-grid">
            {[
              ["01", "Discover", "Start with ambiguity. Ask the questions that expose the real problem before jumping to a solution."],
              ["02", "Structure", "Turn judgment and analysis into repeatable frameworks, evidence, criteria, and outputs."],
              ["03", "Evaluate", "Make AI output useful by checking it against requirements instead of treating generation as the finish line."],
              ["04", "Automate", "Package proven workflows into agents and tools that can run consistently without reinventing the process."]
            ].map(([num, title, text]) => (
              <motion.article whileHover={{ y: -4 }} key={num} className="principle">
                <span className="principle-number">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>

          <div className="framework-block">
            <div className="eyebrow">UNDER PRESSURE</div>
            <h3>The 1-3-1 decision framework.</h3>
            <p className="section-lede">How I navigate roadblocks and escalations without stalling the room.</p>
            <div className="framework-grid">
              <div className="framework-step">
                <span className="framework-num">1</span>
                <h4>Problem</h4>
                <p>Define the root issue clearly so every stakeholder shares the exact same context.</p>
              </div>
              <div className="framework-step">
                <span className="framework-num">3</span>
                <h4>Options</h4>
                <p>Present three real paths forward — scope tweaks, architectural pivots, alternative workflows — to respect everyone's time and show proactive ownership.</p>
              </div>
              <div className="framework-step">
                <span className="framework-num">1</span>
                <h4>Recommendation</h4>
                <p>Recommend the one path forward, with the reasoning that got you there.</p>
              </div>
            </div>
            <a className="text-link playbook-link" href="playbook.html">More frameworks like this in my Playbook <ArrowUpRight size={14} /></a>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading split-heading">
            <div>
              <div className="sec-head">
                <span className="num">// 02</span>
                <h2>Show, not tell.</h2>
                <span className="meta">{projects.length} records · verified</span>
              </div>
            </div>
          </div>
          <p className="section-lede" style={{ marginBottom: 8 }}>
            Working AI skills and agents from my portfolio repo — built around real product and business analysis patterns.{" "}
            <a className="inline-link" href="case-studies.html">Want the deeper story on one? Read the case studies <ArrowUpRight size={13} /></a>
          </p>

          <div className="cards">
            {projects.map((project, index) => {
              const typeClass = project.chain ? "chain" : project.kind === "Autonomous Agent" ? "agent" : "";
              return (
                <motion.article
                  initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }}
                  variants={fadeUp} transition={{ delay: index * .06 }}
                  className={`card ${project.spanFull ? "span-full" : ""}`}
                  key={project.title}
                >
                  <div className={`type ${typeClass}`}><span className="led" />{project.kind}</div>
                  <h3>{project.title}</h3>
                  <div className="field-row"><span className="k">Problem</span><span className="v">{project.problem}</span></div>
                  <div className="field-row"><span className="k">Approach</span><span className="v">{project.approach}</span></div>
                  <div className="field-row"><span className="k">Output</span><span className="v">{project.output}</span></div>
                  <div className="tags">{project.skills.map(skill => <span key={skill} className="tag">{skill}</span>)}</div>
                  <div className="action-row">
                    <a className="action" href={project.href} target="_blank" rel="noreferrer">View on GitHub</a>
                    {project.caseStudyHref && (
                      <a className="action" href={project.caseStudyHref}>Read case study</a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="section architecture">
          <div className="architecture-panel">
            <div className="sec-head">
              <span className="num">// 03</span>
              <h2>From vague ask to actionable output.</h2>
            </div>
            <div className="flow">
              {["Ambiguous problem", "Guided discovery", "Structured analysis", "AI-assisted workflow", "Evaluation", "Actionable output"].map((step, i) => (
                <div className="flow-step" key={step}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  {i < 5 && <ArrowDown className="flow-arrow" size={17} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-grid">
          <div>
            <div className="sec-head">
              <span className="num">// 04</span>
              <h2>Product thinking, business analysis, and applied AI.</h2>
            </div>
          </div>
          <div className="about-copy">
            <p>I've spent my career bridging business needs and technical delivery — shaping product direction, eliciting requirements, mapping workflows, managing trade-offs, and helping teams turn ambiguity into something buildable.</p>
            <p>My AI work is an extension of that practice. Rather than treating AI as a separate skill, I use it to encode repeatable analytical processes into tools, skills, and agents.</p>
            <div className="capability-list">
              {["Product vision & roadmaps", "Requirements & discovery", "Gap & root-cause analysis", "AI-assisted development", "Prompt & spec-driven design", "Agents & workflow automation"].map(x =>
                <span key={x}><CheckCircle2 size={14} /> {x}</span>
              )}
            </div>
          </div>
        </section>

        <section className="section strengths-section" id="strengths">
          <div className="section-heading">
            <div className="sec-head">
              <span className="num">// 05</span>
              <h2>Natural strengths, applied.</h2>
              <span className="meta">Top 5 · CliftonStrengths</span>
            </div>
            <p className="section-lede">My CliftonStrengths Top 5 — not learned skills, but the patterns I default to under pressure. Here's each one showing up in real work.</p>
          </div>
          <div className="strengths-grid">
            {[
              ["01", "Strategic", "Spots the patterns and alternate paths through a problem before anyone else does — the engine behind the 1-3-1 framework above.", "Recognized migration-blocking apps as a systemic pattern, not one-off issues, and proposed a dedicated modernization stream — turning stalled deals into closed revenue."],
              ["02", "Ideation", "Connects ideas that don't obviously belong together — the source of the \"monsters into teddy bears\" habit.", "Combined spec-driven design with multi-model AI orchestration into one workflow, giving a lean team the delivery velocity of a full engineering org."],
              ["03", "Intellection", "Needs to understand the real \"why\" before committing to a \"what\" — thorough by default, not by mandate.", "Spent weeks mapping DBA alert-fatigue patterns before redesigning a monitoring platform — resistant power users adopted it because it solved their actual problem."],
              ["04", "Significance", "Drawn to work with real, visible stakes — the reason compliance systems and migration blockers are where I do my best work.", "Owned zero-incident revenue-recognition rollouts for BorgWarner and TomTom, where a mistake meant compliance violations for billion-dollar companies."],
              ["05", "Individualization", "Treats every stakeholder as a distinct person with their own vocabulary and motivations, not a role to be managed.", "Ran the same ERP rollout as four different conversations — ROI framing for executives, functional specs for developers, workflow demos in the language of crane operators."]
            ].map(([num, title, blurb, proof]) => (
              <motion.article
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }}
                variants={fadeUp} whileHover={{ y: -4 }}
                className="strength-card" key={num}
              >
                <span className="principle-number">{num}</span>
                <h3>{title}</h3>
                <p>{blurb}</p>
                <div className="strength-proof"><strong>IN PRACTICE</strong><p>{proof}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="section-heading">
            <div className="sec-head">
              <span className="num">// 06</span>
              <h2>A career built around making complexity understandable.</h2>
              <span className="meta">{experience.length} roles</span>
            </div>
          </div>
          <div className="timeline">
            {experience.map((item, i) => (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * .08 }} className="timeline-item" key={item.company}>
                <div className="timeline-marker"><BriefcaseBusiness size={14} /></div>
                <div className="timeline-content">
                  <span className="dates">{item.dates}</span>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
        <span>NODE 07 · REV 3.0</span>
      </footer>
    </div>
  );
}

export default App;
