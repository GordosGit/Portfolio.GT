import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { caseStudies } from "./caseStudiesData";
import SiteChrome from "./components/SiteChrome";
import SiteHeader, { SITE_NAV_ITEMS } from "./components/SiteHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

function CaseStudies() {
  return (
    <div className="site-shell">
      <SiteChrome />
      <SiteHeader navItems={SITE_NAV_ITEMS} />

      <main>
        <section className="section playbook-hero">
          <a className="back-link" href="index.html"><ArrowLeft size={13} /> Back to portfolio</a>
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
                <div className="type"><span className="led" />{cs.type}</div>
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

export default CaseStudies;
