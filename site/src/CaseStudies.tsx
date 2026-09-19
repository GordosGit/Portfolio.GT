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

        <section className="section playbook-list">
          {caseStudies.map((cs, i) => (
            <motion.article
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: .1 }}
              variants={fadeUp} transition={{ delay: i * .06 }}
              className="playbook-entry" key={cs.slug} id={cs.slug}
            >
              <span className="eyebrow">{cs.type}</span>
              <h2>{cs.title}</h2>
              <div className="case-meta">
                <span><strong>ROLE</strong> {cs.role}</span>
                <span><strong>TOOLS</strong> {cs.tools}</span>
              </div>

              <h3 className="case-subhead">The problem</h3>
              {cs.problem.map((p, idx) => <p className="section-lede" key={idx}>{p}</p>)}

              <h3 className="case-subhead">The approach</h3>
              <p className="section-lede">{cs.approachIntro}</p>
              <div className="playbook-steps">
                {cs.approachSteps.map(step => (
                  <div className="playbook-step" key={step.label}>
                    <span className="playbook-step-label">{step.label}</span>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
              <p className="section-lede case-closing">{cs.approachClosing}</p>

              <h3 className="case-subhead">What the results show</h3>
              <p className="section-lede">{cs.results}</p>
              <ul className="case-examples">
                {cs.examples.map((ex, idx) => <li key={idx}>{ex}</li>)}
              </ul>

              <h3 className="case-subhead">Why this is the interesting part</h3>
              <p className="section-lede">{cs.whyInteresting}</p>

              <div className="playbook-when">
                <strong>NEXT STEPS</strong>
                <p>{cs.nextSteps}</p>
              </div>

              <a className="text-link playbook-link" href={cs.githubHref} target="_blank" rel="noreferrer">
                Read the full write-up on GitHub <ArrowUpRight size={14} />
              </a>
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

export default CaseStudies;
