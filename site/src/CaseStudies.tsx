import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { caseStudies } from "./caseStudiesData";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

function CaseStudies() {
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
          <div className="eyebrow">DEEPER DIVES</div>
          <h1>Case Studies.</h1>
          <p className="hero-text">
            Problem, approach, and results for the projects worth going deeper on — not every AI experiment, just the ones with a real story about how the process got better.
          </p>
        </section>

        <section className="section case-index-section">
          <div className="case-index-grid">
            {caseStudies.map((cs, i) => (
              <motion.a
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }}
                variants={fadeUp} transition={{ delay: i * .08 }}
                className="case-index-card" key={cs.slug}
                href={`case-study.html?slug=${cs.slug}`}
              >
                <span className="eyebrow">{cs.type}</span>
                <h3>{cs.title}</h3>
                <p className="case-index-hook">{cs.hook}</p>
                <div className="case-meta">
                  <span><strong>ROLE</strong> {cs.role}</span>
                </div>
                <span className="text-link case-index-cta">Read the case study <ArrowUpRight size={14} /></span>
              </motion.a>
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

export default CaseStudies;
