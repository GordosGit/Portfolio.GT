export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  problem: string;
  approach: string;
  output: string;
  skills: string[];
  href: string;
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
    title: "The IdeaGeneratorinator",
    eyebrow: "AI SKILL",
    description: "Turns a one-line problem or idea into a lean concept brief through a short, guided discovery conversation.",
    problem: "A vague idea is rarely ready to scope, prioritize, or hand to a delivery team.",
    approach: "Encode a structured discovery sequence that asks the questions a good BA would ask before moving into solution mode.",
    output: "Problem, solution, audience, differentiation, and risks.",
    skills: ["Discovery", "Requirements", "Prompt Design", "Structured Thinking"],
    href: "https://github.com/GordosGit/Portfolio.GT/tree/main/skills/the-ideageneratorinator",
    featured: true,
    accent: "gold"
  },
  {
    title: "Job Fit Analyzer",
    eyebrow: "AI SKILL",
    description: "Compares a résumé against a job posting, identifies evidence and gaps, evaluates the match, and supports tailored application output.",
    problem: "Generic applications hide whether the candidate actually matches the requirements.",
    approach: "Treat the job description as a requirements set and the résumé as an evidence base.",
    output: "A structured fit analysis with gaps and application guidance.",
    skills: ["Gap Analysis", "Evidence Mapping", "Evaluation", "Career Workflow"],
    href: "https://github.com/GordosGit/Portfolio.GT/tree/main/skills/job-fit-analyzer",
    featured: true,
    accent: "green"
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