export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  problem: string;
  approach: string;
  output: string;
  skills: string[];
  href: string;
  caseStudyHref?: string;
  featured?: boolean;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Daily Job Search Agent",
    eyebrow: "AUTONOMOUS AGENT",
    description: "A scheduled AI workflow that searches across role categories, evaluates opportunities against a fixed rubric, deduplicates results, and only notifies when something genuinely new appears.",
    problem: "Continuous job searching creates repetitive work and noisy results.",
    approach: "Combine scheduled execution, structured evaluation, persistence, deduplication, and notification into one repeatable process.",
    output: "A curated daily summary rather than a pile of search results.",
    skills: ["Agents", "Automation", "Evaluation", "Persistence", "Process Design"],
    href: "https://github.com/GordosGit/Portfolio.GT/tree/main/agents/daily-job-search",
    featured: true,
    accent: "green"
  },
  {
    title: "The Problem Definerinator",
    eyebrow: "AI SKILL",
    description: "Clarifies a vague complaint, hunch, or \"something feels off\" into a problem that's specific, falsifiable, and restatable by someone who wasn't in the room — before any solutioning starts.",
    problem: "Most bad ideas aren't badly executed — they're solving a problem that was never actually pinned down.",
    approach: "A soft-handed conversation that keeps sharpening the problem and parks stray solution ideas instead of chasing them, until three done conditions are met.",
    output: "A structured problem-definition document, plus a parking lot of ideas ready to feed into the-idea-generatorinator.",
    skills: ["Problem Framing", "Requirements Elicitation", "Facilitation", "Structured Thinking"],
    href: "https://github.com/GordosGit/Portfolio.GT/tree/main/skills/the-problem-definerinator",
    featured: true,
    accent: "green"
  },
  {
    title: "The Idea Generatorinator",
    eyebrow: "AI SKILL",
    description: "Turns a one-line problem or idea into a lean concept brief through a short, guided discovery conversation.",
    problem: "A vague idea is rarely ready to scope, prioritize, or hand to a delivery team.",
    approach: "Encode a structured discovery sequence that asks the questions a good BA would ask before moving into solution mode.",
    output: "Problem, solution, audience, differentiation, and risks.",
    skills: ["Discovery", "Requirements", "Prompt Design", "Structured Thinking"],
    href: "https://github.com/GordosGit/Portfolio.GT/tree/main/skills/the-idea-generatorinator",
    caseStudyHref: "case-study.html?slug=idea-validation-sunday-dinner",
    featured: true,
    accent: "gold"
  },
  {
    title: "Job Fit Analyzerinator",
    eyebrow: "AI SKILL",
    description: "Compares a résumé against a job posting, identifies evidence and gaps, evaluates the match, and supports tailored application output.",
    problem: "Generic applications hide whether the candidate actually matches the requirements.",
    approach: "Treat the job description as a requirements set and the résumé as an evidence base.",
    output: "A structured fit analysis with gaps and application guidance.",
    skills: ["Gap Analysis", "Evidence Mapping", "Evaluation", "Career Workflow"],
    href: "https://github.com/GordosGit/Portfolio.GT/tree/main/skills/job-fit-analyzerinator",
    caseStudyHref: "case-study.html?slug=ai-assisted-job-application-pipeline",
    featured: true,
    accent: "green"
  },
  {
    title: "The Olympians",
    eyebrow: "AI SKILL",
    description: "A twelve-god pantheon of fixed-bias personas, run in whichever mode fits the decision — a fast six-god court, the full twelve-god pantheon for high-stakes calls, a private one-on-one reading from a single god, or a quick lookup to find the right one.",
    problem: "A single AI response tends to converge on one balanced-sounding answer, hiding the real tensions a stakeholder group would raise — and not every decision is big enough to justify a full court.",
    approach: "Each god argues from one fixed bias only. Four modes scale the process to the decision: a default court, a full pantheon, a single god's deep counsel, or a synopsis to help pick the right one — with a verdict that can be appealed and re-argued in the two full-court modes.",
    output: "A clear recommendation, the friction that mattered most, and the cheapest next step to test the biggest remaining uncertainty — or, in the single-god and lookup modes, focused counsel instead of a full verdict.",
    skills: ["Multi-Perspective Review", "Risk Analysis", "Decision Frameworks", "Facilitation"],
    href: "https://github.com/GordosGit/Portfolio.GT/tree/main/skills/the-olympians",
    caseStudyHref: "case-study.html?slug=pressure-testing-pocket-chef-with-olympus",
    featured: true,
    accent: "gold"
  }
];

export const experience = [
  {
    role: "Senior Product Owner / Business Systems Analyst",
    company: "Pythian",
    dates: "2024 — 2026",
    detail: "Product ownership, AI-assisted workflows, modernization, stakeholder alignment, and delivery."
  },
  {
    role: "Product Manager / Business Analyst / Implementation PM",
    company: "WrightPlan",
    dates: "2018 — 2024",
    detail: "Enterprise ERP product ownership, discovery, roadmap planning, integrations, implementation, and change management."
  },
  {
    role: "Business Analyst",
    company: "Nakisa",
    dates: "2015 — 2018",
    detail: "Finance-focused implementations spanning lease accounting and revenue recognition."
  },
  {
    role: "Implementation Consultant",
    company: "Coreworx",
    dates: "2013 — 2015",
    detail: "Large-scale capital-project implementations and documentation control."
  }
];