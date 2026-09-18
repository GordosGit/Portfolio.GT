# Portfolio.GT

**Applied AI work by Gord Turner — Senior Product Owner / Senior Business Analyst**

🔗 **[Live portfolio site](https://gordosgit.github.io/Portfolio.GT/)** — the React front end for this repo lives in [`site/`](./site/).

This repo is a working portfolio of AI skills, agents, and tools I've built to support product and business analysis work — requirements discovery, stakeholder decision-making, structured evaluation, and process automation. It's meant to show, not tell: rather than a slide claiming "AI-savvy," these are functioning tools that reflect how I actually approach ambiguous problems.

## Why this exists

Senior PO/BA work is fundamentally about structuring ambiguity: turning a vague ask into a clear problem statement, surfacing the tradeoffs a decision-maker needs to see, and building repeatable processes instead of one-off fixes. The tools in this repo are that same discipline applied to AI agent design — each one encodes a specific analytical or facilitation process so it runs consistently instead of depending on getting lucky with a one-off prompt.

## What's inside

### Skills

Reusable, structured processes that guide an AI assistant through a specific workflow — the same way a good BA template guides a team through a specific exercise.

| Skill | What it does | PO/BA skill it reflects |
|---|---|---|
| [`the-ideageneratorinator`](./skills/the-ideageneratorinator/) | Turns a one-line problem or idea into a lean concept brief (problem, solution, audience, differentiation, risks) through a short guided interview. | Requirements elicitation and discovery — asking the right sequence of questions to turn a vague ask into something a team can actually scope. |
| [`job-fit-analyzer`](./skills/job-fit-analyzer/) | Compares a resume against a job posting, scores fit and ATS pass probability, identifies gaps, and drafts a tailored cover letter — gated by how strong the match actually is. | Gap analysis and evidence-based evaluation against a defined set of requirements, rather than a generic pass/fail. |

Additional skills and experiments live in the companion repo, [GordosGit/tools](https://github.com/GordosGit/tools).

### Agents

Autonomous, scheduled workflows that run without me triggering them — the agent equivalent of a well-designed recurring process rather than a one-off script.

| Agent | What it does | PO/BA skill it reflects |
|---|---|---|
| [`daily-job-search`](./agents/daily-job-search/) | Runs every morning: searches job boards across three role categories, scores each posting against my resume with a fixed rubric, dedupes against a persistent tracker, and emails a summary only when there's something genuinely new. | Process design and continuous improvement — the write-up includes a real example of spotting a coverage gap in the results, shipping a fix the same day, and validating it with before/after numbers rather than assuming it worked. |

Full write-up (architecture diagram, design tradeoffs, sample output, the actual scheduled prompt) is in the [agent's README](./agents/daily-job-search/).

### Projects

*(Coming soon — larger builds that apply these tools to real product/analysis problems.)*

## Repo structure

```
PortfolioGT/
├── skills/
│   ├── the-ideageneratorinator/
│   └── job-fit-analyzer/
├── agents/
│   └── daily-job-search/
├── projects/         # planned
└── README.md
```

## About me

I'm a Senior Product Owner / Senior Business Analyst who builds AI tools as a way of formalizing the analytical processes I already use — structured discovery, multi-perspective evaluation, and gap analysis — so they're repeatable, auditable, and easy to hand off to a team.

**Contact:** gord.turner@gmail.com

---

*This is a living repo — expect it to grow as new skills and agents are built.*
