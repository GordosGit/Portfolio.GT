export type CaseStudy = {
  slug: string;
  type: string;
  title: string;
  hook: string;
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
    hook: "A gated, self-correcting pipeline that stops a weak match from getting a cover letter written for it — and gets stricter every time it catches its own mistake.",
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
    hook: "A concept brief that read as fully-formed on the first pass — until an adversarial review found the real risk was untested, not that the idea itself was bad.",
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
  },
  {
    slug: "pressure-testing-pocket-chef-with-olympus",
    type: "Idea Validation / Process Design",
    title: "Pocket Chef: When the Pressure-Test Itself Needs Pressure-Testing",
    hook: "Built my own six-persona review skill, ran a new idea through it twice — and caught the review itself faithfully arguing inside an inflated frame the whole time.",
    role: "Product Owner / Business Analyst",
    tools: "Claude, the-idea-generatorinator skill, Olympus (a self-designed six-persona review skill, since renamed and expanded into The Olympians), web research",
    problem: [
      "My wife and I are serial recipe-video collectors — YouTube, Facebook Shorts, Instagram, all dropped into a shared family Discord channel that we almost never go back to. I ran that problem through the-idea-generatorinator, and it came back with \"Pocket Chef\": an app that would pull in videos from all three platforms, extract the full recipe via audio transcription and on-screen text, catalog it, and let us ask for suggestions in plain language.",
      "Before building anything, I wanted it pressure-tested — but I'd already decided not to publish an existing review tool I use (a five-persona adversarial critique process) as if it were my own. That's what led to building Olympus first: my own version of the same pattern — multiple biased personas, a synthesis, an appeal mechanism — designed from scratch rather than repackaged."
    ],
    approachIntro:
      "The idea went through research, a full Olympus debate, two rounds of appeal, and — most usefully — a moment of catching the review process's own blind spot before treating any of its verdicts as final.",
    approachSteps: [
      {
        label: "1. Research before committing to a technical bet.",
        text: "Before the concept brief was finished, I checked what recipe-import apps already exist — Mela, Pestle, Samsung Food — and found that nearly all of them only parse a video's written caption, not its actual audio or on-screen content. That informed the brief's boldest choice: build genuine full-video extraction, accepting that Instagram and Facebook offer no official API for it and that real extraction would mean third-party scraping tools and real Terms of Service exposure."
      },
      {
        label: "2. Run the full concept through Olympus before writing a line of code.",
        text: "All six gods argued the brief independently — Athena flagged that the riskiest technical path was being chosen before anyone tested whether it was necessary; Hephaestus pointed out the real fragile point wasn't the extraction engineering, it was depending on platforms with no official access at all; Aphrodite insisted the conversational \"what should we cook\" layer, not the catalog, was where any actual desirability lived. Zeus's Edict: don't build the full pipeline yet — validate the suggestion experience on a small, hand-entered catalog first."
      },
      {
        label: "3. Use the Appeal mechanism as a real argument, not a rubber stamp.",
        text: "I pushed back twice. First, that the two-person audience was explicitly an MVP validation gate on the way to a real product, not the permanent scope — Apollo conceded his \"pick one identity\" framing had been wrong, while Athena held her ground on a sharper point: founders are the worst judges of their own product's appeal, so \"it works for us\" still isn't market proof. Second, that a beta phase with actual strangers was already the plan, specifically to stress the UX once the mechanics were confirmed — Athena conceded fully here, since that was exactly the missing rigor she'd been asking for."
      },
      {
        label: "4. Notice when the process itself has a blind spot.",
        text: "After two rounds of appeal, the debate had only ever argued about sequencing — build order, staging, validation gates — never about whether the underlying scope was right-sized to begin with. Every god had accepted the brief's full ambition as fixed and only fought over when to build which piece. Six independent, genuinely biased perspectives, and none of them were positioned to ask \"should this be this big at all,\" because nobody had asked them to."
      },
      {
        label: "5. Rescope from the original problem statement, not from the inflated solution.",
        text: "Going back to the actual pain point — can't find saved videos again — a manual-tagging fix was considered and rejected on the strength of a lesson from a different project: manual processes degrade the moment the novelty wears off, so the tagging has to be automatic or it won't hold up past the first few uses. The rescoped PoC narrowed to one platform (YouTube), swapped the audio/OCR pipeline for transcript-based extraction, and pushed Instagram/Facebook, the full \"pocket chef\" companion, and the subscription model out to explicit, named future phases instead of scope-creeping them back in or losing track of them."
      },
      {
        label: "6. Re-run the narrower version through the same review before treating it as settled.",
        text: "The second Olympus pass caught a smaller-scale repeat of the exact same pattern: bundling a \"lightweight\" suggestion feature into the PoC was, in miniature, the same scope-widening instinct that triggered the rescoping in the first place. The Edict drew a precise line — keep the suggestion layer in its barest form only — and added a concrete, nearly-free next step: manually run ten real videos through transcript extraction and check the results by hand before building any app shell at all."
      }
    ],
    approachClosing:
      "A rescoped, technically honest PoC concept came out of this, with the bigger vision still alive on the roadmap rather than either abandoned or smuggled back in early.",
    results:
      "More usefully than the rescoped concept itself: a record of exactly which objections a counter-argument actually resolved (Apollo's identity framing, Athena's beta-phase concern) versus which stayed open on their own merits (Athena's founder-bias warning, Hephaestus's platform-fragility-at-scale flag) — because an appeal process that concedes every time it's pushed back on isn't actually testing anything.",
    examples: [
      "Research into existing recipe-import apps found they mostly parse captions, not video content — this shaped both the original \"full extraction\" bet and, later, the transcript-based pivot that replaced it.",
      "Athena conceded the staged-validation appeal once given a real answer, but held her ground on \"founders misjudging their own product\" — a distinction the process preserved rather than flattening into blanket agreement or disagreement.",
      "The single most valuable moment in the whole exercise was the observation that \"all that was debated was essentially the MVP\" — that the review had stayed inside the frame of the original brief the whole time — and it came from stepping back, not from any one god's critique.",
      "The rescope removed the two most legally and technically fragile pieces (Instagram/Facebook scraping, the audio/OCR pipeline) while keeping what made the idea distinctive, arrived at by rereading the original problem statement rather than by patching the existing plan."
    ],
    whyInteresting:
      "Building a tool that argues back is the easy version of this story. The harder and more useful part is what happened after two full rounds of debate and appeal: a structured, six-perspective, deliberately adversarial process still faithfully argued inside the frame it was handed, because nothing in its design asks whether the frame itself is the problem. Catching that took a different kind of scrutiny than the process itself provides — stepping outside the debate to ask if the debate was even about the right question. That's a rarer and harder skill than running a good pressure test: noticing when a good pressure test still isn't enough.",
    nextSteps:
      "Run the ten-video manual transcript test Olympus's second Edict recommended before building anything else. Olympus itself has been updated to name this blind spot directly, so a future run at least surfaces the question rather than silently inheriting whatever scope it's handed. Since this write-up, the skill itself outgrew its original six-seat scope: it's been renamed The Olympians and now runs in four modes — the original six-god default court, a full twelve-god pantheon for higher-stakes calls, a private one-on-one \"temple\" reading from a single named god, and a quick roster lookup for picking the right one — with six new gods (Hera, Poseidon, Demeter, Ares, Artemis, Dionysus) added to the pantheon.",
    githubHref: "https://github.com/GordosGit/Portfolio.GT/blob/main/case-studies/pressure-testing-pocket-chef-with-olympus.md"
  }
];
