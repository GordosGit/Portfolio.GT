import { motion } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react";
import { playbook } from "./playbookData";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

function Playbook() {
  return (
    <div className="site-shell">
      <header className="nav">
        <a className="brand" href="index.html" aria-label="Gord Turner home">
          <span className="brand-mark">G</span>
          <span>GORD TURNER</span>
        </a>
        <nav className="nav-links">
          <a href="index.html"><ArrowLeft size={14} style={{ verticalAlign: "-2px", marginRight: "6px" }} />Back to portfolio</a>
        </nav>
      </header>

      <main>
        <section className="section playbook-hero">
          <div className="eyebrow">FIELD NOTES</div>
          <h1>The Playbook.</h1>
          <p className="hero-text">
            Frameworks and operating habits I actually reach for — in product, business analysis, and AI work. This is a living page: it grows as I pick up new ones.
          </p>
        </section>

        <section className="section playbook-list">
          {playbook.map((entry, i) => (
            <motion.article
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: .1 }}
              variants={fadeUp} transition={{ delay: i * .06 }}
              className="playbook-entry" key={entry.slug} id={entry.slug}
            >
              <span className="eyebrow">{entry.category}</span>
              <h2>{entry.title}</h2>
              <p className="section-lede">{entry.summary}</p>
              <div className="playbook-when">
                <strong>WHEN I REACH FOR IT</strong>
                <p>{entry.whenToUseIt}</p>
              </div>
              <div className="playbook-steps">
                {entry.steps.map(step => (
                  <div className="playbook-step" key={step.label}>
                    <span className="playbook-step-label">{step.label}</span>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="section contact" id="contact">
          <div className="contact-card">
            <div className="eyebrow">LET'S TALK</div>
            <h2>Interested in what I can build with your team?</h2>
            <p>For product, business analysis, AI workflow, or applied AI opportunities, I’d be happy to talk.</p>
            <div className="contact-actions">
              <a className="button primary" href="mailto:gord.turner@gmail.com"><Mail size={17} /> Email me</a>
              <a className="button ghost" href="https://www.linkedin.com/in/gordturner/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
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

export default Playbook;
