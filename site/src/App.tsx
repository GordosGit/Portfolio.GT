import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BrainCircuit, BriefcaseBusiness, CheckCircle2, ExternalLink, Github, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { experience, projects } from "./data";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Gord Turner home">
          <span className="brand-mark">G</span>
          <span>GORD TURNER</span>
        </a>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="eyebrow">
              <span className="pulse-dot" /> APPLIED AI PORTFOLIO
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp}>
              Turning ambiguous problems into <span>structured AI workflows.</span>
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-text">
              I’m Gord Turner — a Senior Product Owner and Business Analyst building practical AI tools that formalize the analytical work behind good product decisions.
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-actions">
              <a className="button primary" href="#work">Explore the work <ArrowDown size={17} /></a>
              <a className="button ghost" href="https://github.com/GordosGit/Portfolio.GT" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
            </motion.div>
            <div className="credibility">
              <span>PRODUCT</span><i /> <span>ANALYSIS</span><i /> <span>AI</span><i /> <span>AUTOMATION</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="hero-orbit">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit-core"><BrainCircuit size={48} strokeWidth={1.25} /></div>
            <span className="orbit-label label-one">DISCOVER</span>
            <span className="orbit-label label-two">STRUCTURE</span>
            <span className="orbit-label label-three">AUTOMATE</span>
          </motion.div>
        </section>

        <section className="section manifesto" id="approach">
          <div className="section-heading">
            <div className="eyebrow">THE THROUGH-LINE</div>
            <h2>AI that reflects how I think.</h2>
          </div>
          <div className="manifesto-grid">
            {[
              ["01", "Discover", "Start with ambiguity. Ask the questions that expose the real problem before jumping to a solution."],
              ["02", "Structure", "Turn judgment and analysis into repeatable frameworks, evidence, criteria, and outputs."],
              ["03", "Evaluate", "Make AI output useful by checking it against requirements instead of treating generation as the finish line."],
              ["04", "Automate", "Package proven workflows into agents and tools that can run consistently without reinventing the process."]
            ].map(([num, title, text]) => (
              <motion.article whileHover={{ y: -5 }} key={num} className="principle">
                <span className="principle-number">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow">SELECTED WORK</div>
              <h2>Show, not tell.</h2>
            </div>
            <p>Working AI skills and agents from my portfolio repo — built around real product and business analysis patterns.</p>
          </div>

          <div className="projects">
            {projects.map((project, index) => (
              <motion.article
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }}
                variants={fadeUp} transition={{ delay: index * .08 }}
                className={`project-card ${project.featured ? "featured" : ""}`}
                key={project.title}
              >
                <div className={`project-icon ${project.accent}`}><BrainCircuit size={24} /></div>
                <div className="project-topline">
                  <span className="eyebrow">{project.eyebrow}</span>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}><ArrowUpRight size={20} /></a>
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-details">
                  <div><strong>PROBLEM</strong><p>{project.problem}</p></div>
                  <div><strong>APPROACH</strong><p>{project.approach}</p></div>
                  <div><strong>OUTPUT</strong><p>{project.output}</p></div>
                </div>
                <div className="tags">{project.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
                <a className="text-link" href={project.href} target="_blank" rel="noreferrer">View on GitHub <ExternalLink size={14} /></a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section architecture">
          <div className="architecture-panel">
            <div className="section-heading">
              <div className="eyebrow">MY AI DESIGN PATTERN</div>
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
            <div className="eyebrow">THE BACKGROUND</div>
            <h2>Product thinking, business analysis, and applied AI.</h2>
          </div>
          <div className="about-copy">
            <p>I’ve spent my career bridging business needs and technical delivery — shaping product direction, eliciting requirements, mapping workflows, managing trade-offs, and helping teams turn ambiguity into something buildable.</p>
            <p>My AI work is an extension of that practice. Rather than treating AI as a separate skill, I use it to encode repeatable analytical processes into tools, skills, and agents.</p>
            <div className="capability-list">
              {["Product vision & roadmaps", "Requirements & discovery", "Gap & root-cause analysis", "AI-assisted development", "Prompt & spec-driven design", "Agents & workflow automation"].map(x =>
                <span key={x}><CheckCircle2 size={15} /> {x}</span>
              )}
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="section-heading">
            <div className="eyebrow">EXPERIENCE</div>
            <h2>A career built around making complexity understandable.</h2>
          </div>
          <div className="timeline">
            {experience.map((item, i) => (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * .08 }} className="timeline-item" key={item.company}>
                <div className="timeline-marker"><BriefcaseBusiness size={15} /></div>
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
            <div className="eyebrow">LET'S TALK</div>
            <h2>Interested in what I can build with your team?</h2>
            <p>For product, business analysis, AI workflow, or applied AI opportunities, I’d be happy to talk.</p>
            <div className="contact-actions">
              <a className="button primary" href="mailto:gord.turner@gmail.com"><Mail size={17} /> Email me</a>
              <a className="button ghost" href="https://github.com/GordosGit" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Gord Turner</span>
        <span>Applied AI · Product · Analysis</span>
      </footer>
    </div>
  );
}

export default App;