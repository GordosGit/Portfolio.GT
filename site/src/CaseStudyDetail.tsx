import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { caseStudies } from "./caseStudiesData";
import SiteChrome from "./components/SiteChrome";
import SiteHeader, { SITE_NAV_ITEMS } from "./components/SiteHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

function CaseStudyDetail() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const cs = caseStudies.find(c => c.slug === slug);

  return (
    <div className="site-shell">
      <SiteChrome />
      <SiteHeader navItems={SITE_NAV_ITEMS} />

      <main>
        {!cs ? (
          <section className="section playbook-hero">
            <a className="back-link" href="case-studies.html"><ArrowLeft size={13} /> Back to case studies</a>
            <div className="eyebrow">CASE STUDY</div>
            <h1>Not found.</h1>
            <p className="hero-text">
              That case study doesn't exist (or the link is out of date). <a className="inline-link" href="case-studies.html">Back to all case studies <ArrowUpRight size={13} /></a>
            </p>
          </section>
        ) : (
          <section className="section playbook-list">
            <a className="back-link" href="case-studies.html"><ArrowLeft size={13} /> Back to case studies</a>
            <motion.article initial="hidden" animate="visible" variants={fadeUp} className="playbook-entry" key={cs.slug}>
              <div className="type"><span className="led" />{cs.type}</div>
              <h2>{cs.title}</h2>
              <div className="case-meta">
                <span><strong>ROLE</strong> {cs.role}</span>
                <span><strong>TOOLS</strong> {cs.tools}</span>
              </div>

              <h3 className="case-subhead">The problem</h3>
              {cs.problem.map((p, idx) => <p className="section-lede" key={idx}>{p}</p>)}

              <h3 className="case-subhead">The approach</h3>
              <p className="section-lede">{cs.approachIntro}</p>
              <div className={`playbook-steps${cs.approachSteps.length === 6 ? " steps-3x2" : ""}`}>
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
          </section>
        )}

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

export default CaseStudyDetail;
