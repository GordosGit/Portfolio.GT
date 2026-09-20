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
| [`the-problem-definerinator`](./skills/the-problem-definerinator/) | Turns a vague complaint, hunch, or "something feels off" into a problem that's specific, falsifiable, and restatable by someone who wasn't in the room — before any solutioning starts. Hands off a structured problem doc (plus a parking lot of stray solution ideas) to `the-idea-generatorinator`. | Problem framing before requirements — refusing to let solutioning start until the actual problem is pinned down, not assumed. |
| [`the-idea-generatorinator`](./skills/the-idea-generatorinator/) | Turns a one-line problem or idea into a lean concept brief (problem, solution, audience, differentiation, risks) through a short guided interview. | Requirements elicitation and discovery — asking the right sequence of questions to turn a vague ask into something a team can actually scope. |
| [`job-fit-analyzerinator`](./skills/job-fit-analyzerinator/) | Compares a resume against a job posting, scores fit and ATS pass probability, identifies gaps, and drafts a tailored cover letter — gated by how strong the match actually is. | Gap analysis and evidence-based evaluation against a defined set of requirements, rather than a generic pass/fail. |
| [`olympus`](./skills/olympus/) | Runs an idea or decision through six biased personas (Zeus, Athena, Hephaestus, Hermes, Apollo, Aphrodite), surfaces genuine disagreement between them, and delivers a verdict that can be appealed and re-argued. | Multi-perspective risk analysis and structured decision facilitation — pressure-testing a plan from conflicting stakeholder angles before committing resources to it. |

Three of these chain into a pipeline: `the-problem-definerinator` gets the actual problem right, `the-idea-generatorinator` turns it into a concept brief, and `olympus` pressure-tests that brief before anything gets built. Each one stays useful on its own, too.

Additional skills and experiments live in the companion repo, [GordosGit/tools](https://github.com/GordosGit/tools).

### Agents

Autonomous, scheduled workflows that run without me triggering them — the agent equivalent of a well-designed recurring process rather than a one-off script.

| Agent | What it does | PO/BA skill it reflects |
|---|---|---|
| [`daily-job-search`](./agents/daily-job-search/) | Runs every morning: searches job boards across three role categories, scores each posting against my resume with a fixed rubric, dedupes against a persistent tracker, and emails a summary only when there's something genuinely new. | Process design and continuous improvement — the write-up includes a real example of spotting a coverage gap in the results, shipping a fix the same day, and validating it with before/after numbers rather than assuming it worked. |

Full write-up (architecture diagram, design tradeoffs, sample output, the actual scheduled prompt) is in the [agent's README](./agents/daily-job-search/).

### Case Studies

Deeper write-ups on select projects — problem, approach, results, and what I'd do differently next. These go beyond "here's a tool" to show the judgment behind it: what failed first, what got permanently fixed because of it, and what the evidence actually showed.

| Case Study | What it covers |
|---|---|
| [`ai-assisted-job-application-pipeline`](./case-studies/ai-assisted-job-application-pipeline.md) | Building a repeatable, self-correcting evaluation pipeline for tailoring resumes and cover letters — using the `job-fit-analyzerinator` skill as the engine, with a gating rule so a weak match never gets a cover letter written for it. |
| [`idea-validation-sunday-dinner`](./case-studies/idea-validation-sunday-dinner.md) | Running a concept brief from `the-idea-generatorinator` through a five-persona adversarial review process before committing to a build — and how the review caught that the real risk was untested, not that the idea was bad. |
| [`pressure-testing-pocket-chef-with-olympus`](./case-studies/pressure-testing-pocket-chef-with-olympus.md) | Building `olympus`, running a new concept through it across two rounds of appeal, then catching that the review itself had stayed inside the idea's inflated frame the whole time — and rescoping from the original problem, not the inflated solution. |

### Projects

*(Coming soon — larger builds that apply these tools to real product/analysis problems.)*

## Repo structure

```
PortfolioGT/
├── skills/
│   ├── the-problem-definerinator/
│   ├── the-idea-generatorinator/
│   ├── job-fit-analyzerinator/
│   └── olympus/
├── agents/
│   └── daily-job-search/
├── case-studies/
│   ├── ai-assisted-job-application-pipeline.md
│   ├── idea-validation-sunday-dinner.md
│   └── pressure-testing-pocket-chef-with-olympus.md
├── projects/         # planned
└── README.md
```

## About me

I'm a Senior Product Owner / Senior Business Analyst who builds AI tools as a way of formalizing the analytical processes I already use — structured discovery, multi-perspective evaluation, and gap analysis — so they're repeatable, auditable, and easy to hand off to a team.

**Contact:** gord.turner@gmail.com

---

*This is a living repo — expect it to grow as new skills and agents are built.*
