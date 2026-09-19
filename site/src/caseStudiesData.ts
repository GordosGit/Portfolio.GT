export type CaseStudy = {
  slug: string;
  type: string;
  title: string;
  role: string;
  tools: string;
  problem: string[];
  approachIntro: string;
  approachSteps: { label: string; text: string }[];
  approachClosing: string;
  results: string;
  examples: string[];
  whyInteresting: string;
  nextSteps: string;
  githubHref: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-assisted-job-application-pipeline",
    type: "Personal Workflow Automation",
    title: "Building a Repeatable Evaluation Pipeline for Job Applications",
    role: "Product Owner / Business Analyst",
    tools: "Claude, a custom fit-analysis skill, a persistent knowledge base of resume/voice/strengths documents",
    problem: [
      "Tailoring a resume and cover letter for every job posting is the right thing to do and the thing almost nobody actually does consistently, because it's tedious: reread the posting, compare it line by line against the resume, decide what's a real gap versus a resume-writing problem, adjust the resume honestly, then write a cover letter that doesn't sound like a template. Do that by hand for the fifth or sixth application in a week and the quality drops. I wanted the rigor of the first application applied to every application, without the fatigue.",
      "I also had a second problem that's specific to using an AI for this: left unconstrained, a model will happily write a warm, well-organized cover letter that quietly torpedoes you, for example by pre-emptively defending a resume gap the reader hadn't even noticed. I needed the process to actively protect against that, not just save time."
    ],
    approachIntro:
      "I built this as a skill (a reusable, versioned instruction set) rather than a one-off prompt, specifically so the process would run the same way every time instead of depending on how well I phrased the request that day. The skill does four things, in order:",
    approachSteps: [
      {
        label: "1. Score the fit before doing anything else.",
        text: "Every posting gets compared against the current resume line by line: required qualifications, preferred qualifications, and repeated keywords (the terms a posting uses two or three times are usually the ones an ATS is weighted on). That produces a percentage estimate and, more usefully, a specific list of what's met, partially met, or missing."
      },
      {
        label: "2. Let the score gate the work, not just describe it.",
        text: "This was the most important design decision. A strong match (roughly 80%+) goes straight to resume suggestions and a cover letter. A borderline match (60-79%) stops and walks through the gaps one at a time as an actual conversation, not a form, because the point is to find out whether a \"gap\" is a real absence of experience or just something missing from the resume's wording. A weak match (under 60%) stops entirely. No cover letter, no encouragement to apply anyway. The score exists to save effort, not to be argued past."
      },
      {
        label: "3. Never let the cover letter do the employer's screening for them.",
        text: "Once a gap conversation happens, whatever's still open afterward is permanently off-limits for the letter, no \"while I haven't worked directly with X\" hedging, no oblique acknowledgment. This rule came out of watching an early draft do exactly that, and it's now a standing rule the process enforces automatically rather than something I have to remember to check for."
      },
      {
        label: "4. Match voice, not just content.",
        text: "I keep a short reference doc describing how I actually write: plain openings, no corporate phrasing, no em dashes, short sentences. Every letter gets written against that profile instead of a generic \"warm and professional\" default. The profile itself has been revised twice, both times because a draft got flagged for slipping into a dramatic opening or AI-typical phrasing, and each fix got written back into the profile so it wouldn't recur."
      }
    ],
    approachClosing:
      "Every application, its fit score, and what was changed and why gets logged, which is what turned this from \"a good prompt\" into an auditable process I can point to.",
    results:
      "Across five applications tailored this way, fit scores ranged from the high 60s to mid 80s (percent), and the gating logic worked as designed: the strongest matches went straight through, the borderline ones triggered real back-and-forth about specific gaps (some closed because the resume was just missing evidence that existed; some stayed open and were left alone, honestly, rather than papered over), and every cover letter was built only from what survived that process.",
    examples: [
      "A posting wanted evidence of hands-on financial reconciliation work. The resume didn't say it explicitly, but a prior role had included exactly that, just described differently. The fix was rewording, not fabrication.",
      "A posting emphasized a specific delivery methodology the resume didn't mention. That experience genuinely existed from earlier in the career, and got added.",
      "A posting wanted a certification that didn't exist. That stayed flagged as an open gap and was never mentioned in the letter, per the standing rule."
    ],
    whyInteresting:
      "The output of any single run, one tailored resume, one cover letter, is table stakes for an AI tool. What I think is actually worth showing is that the process caught its own failure modes and got stricter over time without needing to be manually re-prompted each time: the gap-blindness rule and the voice profile both exist because something went wrong once, got noticed, and got permanently encoded into the process instead of just fixed in the moment. That's the difference between using AI as a one-off writing tool and using it as a system with a memory of its own mistakes.",
    nextSteps:
      "I'm considering extending the same gating logic to a lightweight interview-prep step, using the same gap analysis to flag which open questions are likely to come up in a screening call, so the prep is grounded in the same evidence as the application itself rather than generic interview advice.",
    githubHref: "https://github.com/GordosGit/Portfolio.GT/blob/main/case-studies/ai-assisted-job-application-pipeline.md"
  },
  {
    slug: "idea-validation-sunday-dinner",
    type: "Idea Validation / Concept Development",
    title: "Sunday Dinner: A Concept Brief That Didn't Survive Its Own Review",
    role: "Product Owner / Business Analyst",
    tools: "Claude, the Idea Generatorinator skill, a five-persona adversarial review process (\"the Council\")",
    problem: [
      "I had a vague, personal problem, not a scoped one: my family's Discord server keeps getting muted along with every other server my sons belong to, so family updates go unseen for stretches at a time. My first instinct was \"build an app for this\" — a dedicated, install-anywhere family app that would keep Discord's channel-and-history structure but strip away everything else competing for attention. That's exactly the kind of raw input the Idea Generatorinator is built to take: not a spec, just a felt problem and a hunch about the shape of the fix.",
      "The risk with an idea-generation tool that's actually good at its job is that it produces something structurally convincing on the first pass — a clean problem statement, a named audience, a differentiation argument, even a list of its own risks — and structural completeness is easy to mistake for validation. A brief that reads well is not the same as an idea that should get built. I needed a second, separate step whose entire job was to argue with the first one."
    ],
    approachIntro:
      "I ran the raw idea through the Idea Generatorinator's discovery interview, and it came back with a fully-formed concept brief for \"Sunday Dinner\" — a family-only PWA with tiered notification channels and a per-son \"Adventures of [Name]\" space — that, to its credit, already named its own open question: would two independent adult sons actually bother to install it and keep using it once the novelty wore off? Rather than treat a well-formed brief as a green light, I sent it to a second process I run specifically to stress-test ideas before committing real build time: five adversarial reviewer personas — a Contrarian, a First Principles Thinker, an Expansionist, an Outsider, and an Executor — who critique the concept independently, followed by a synthesis of where they agree and where they genuinely conflict.",
    approachSteps: [
      {
        label: "1. Let the generator do its job without editing it down.",
        text: "The brief that came out was honest about its own weak points before anyone challenged it: it named iOS push reliability, the permission-versus-engagement gap, solo-maintenance risk, and feature creep as real risks, and it framed the open question correctly — is the notification-priority wedge enough to overcome adoption risk. That's the discovery sequence working as intended."
      },
      {
        label: "2. Send the finished brief to adversarial review, not confirmation.",
        text: "Each persona was free to attack a different layer of the idea. The Contrarian went after the mechanism itself: a second app doesn't fix a notification-visibility problem, it adds another icon competing for the same attention that got the family server muted in the first place. The Outsider asked the cheaper, more embarrassing question: had \"just raise the family channel's priority inside Discord\" actually been ruled out before planning to build and maintain a whole new PWA indefinitely?"
      },
      {
        label: "3. Treat disagreement between reviewers as signal, not noise.",
        text: "The Contrarian and the First Principles Thinker landed on the same prediction — this ends up muted again — from two different causes. The Contrarian called it inevitable app fatigue that better engineering could still solve. The First Principles Thinker called it a possible sign that intermittent engagement from two young-adult sons is normal individuation, not a bug notifications can fix. That's a real fork: it determines whether the right move is \"build smarter\" or \"accept there may be nothing to fix.\""
      },
      {
        label: "4. Let the cheapest experiment settle the argument instead of a build.",
        text: "The Executor's proposal cut through both: recreate the tiered \"Adventures\" channels inside the existing Discord server this week, set them to elevated priority, and just watch engagement for two weeks — before writing a single line of new code. That answers the Outsider's workaround question and the Contrarian-versus-First-Principles-Thinker disagreement with one free, five-minute intervention instead of a solo build."
      }
    ],
    approachClosing:
      "The synthesis turned five independent critiques into one specific, gated recommendation, which is the same instinct I built into the job-application pipeline in a different form: don't spend the expensive effort until a cheap test says it's worth it.",
    results:
      "Sunday Dinner did not get built as a standalone app, and that's the correct outcome, not a failed one. The Idea Generatorinator had already surfaced the real open question in its own brief before any scrutiny started — it just isn't built to answer that kind of question, because generating a concept and stress-testing it are different jobs. What the Council added was catching that the brief's own build plan deferred the riskiest assumption until after a solo build was already sunk, and it replaced that plan with something that costs nothing to try.",
    examples: [
      "The Contrarian's read wasn't \"this is a bad idea,\" it was \"this solves visibility with a second thing to be invisible,\" which is a sharper and more falsifiable objection than generic skepticism.",
      "The disagreement between the Contrarian and the First Principles Thinker wasn't noise — it's exactly the distinction that determines whether \"build it better\" or \"there may be nothing to build\" is the right response.",
      "A follow-up note added after the session — that the boys already use the server, just sporadically — settled that disagreement in the Contrarian's favor: intermittent use looks like a visibility problem, not disengagement, which is the kind of fact that should surface before a build decision, not after one.",
      "The Expansionist's strongest point (a per-person archive/timeline has value independent of the notification problem) survived the review as a \"worth adding if the experiment validates the wedge\" note, not a reason to skip the test."
    ],
    whyInteresting:
      "It would be easy to only show the ideas that made it all the way to a build — that's the flattering version of \"I use AI for product work.\" The more honest and more useful version is this one: an idea that looked genuinely good enough to generate, run through a process built to disagree with it, and come out the other side with a specific, free, two-week experiment instead of a green light. That's the same gating discipline as the job-application pipeline, applied to a build decision instead of a cover letter: the tool's job isn't to make ideas feel finished, it's to make sure the expensive step only happens after the cheap one has actually been tried.",
    nextSteps:
      "The two-week Discord experiment the Council recommended hasn't been run yet — that's the actual next step for Sunday Dinner, not more concept work. If engagement moves once the existing server gets tiered notifications, the wedge is real and the standalone app becomes worth building, digest/archive features included. If it doesn't move even with zero friction and zero new app to install, that's real information worth listening to rather than a reason to build a fancier way to route around it.",
    githubHref: "https://github.com/GordosGit/Portfolio.GT/blob/main/case-studies/idea-validation-sunday-dinner.md"
  }
];
