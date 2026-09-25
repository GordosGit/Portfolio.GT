# Building a Repeatable Evaluation Pipeline for Job Applications

**Role:** Product Owner / Business Analyst
**Tools:** Claude, a custom fit-analysis skill, two persona-specific base resumes (Business Analyst and Product Owner), a persistent knowledge base of voice/strengths documents
**Type:** Personal workflow automation

## The problem

Tailoring a resume and cover letter for every job posting is the right thing to do and the thing almost nobody actually does consistently, because it's tedious: reread the posting, compare it line by line against the resume, decide what's a real gap versus a resume-writing problem, adjust the resume honestly, then write a cover letter that doesn't sound like a template. Do that by hand for the fifth or sixth application in a week and the quality drops. I wanted the rigor of the first application applied to every application, without the fatigue.

I also had a second problem that's specific to using an AI for this: left unconstrained, a model will happily write a warm, well-organized cover letter that quietly torpedoes you, for example by pre-emptively defending a resume gap the reader hadn't even noticed. I needed the process to actively protect against that, not just save time.

## The approach

I built this as a skill (a reusable, versioned instruction set) rather than a one-off prompt, specifically so the process would run the same way every time instead of depending on how well I phrased the request that day. The skill does five things, in order:

**1. Score the fit before doing anything else.** Every posting gets compared against the current resume for each persona, line by line: required qualifications, preferred qualifications, and repeated keywords (the terms a posting uses two or three times are usually the ones an ATS is weighted on). That produces a percentage estimate and, more usefully, a specific list of what's met, partially met, or missing.

**2. Decide which version of me is applying.** I apply under two personas, Business Analyst and Product Owner, and each has its own current base resume. The same posting can score very differently against each one, mostly on title match and keywords, so the skill scores every posting against both, shows the two side by side, and carries on with the stronger one. If they land within about five points of each other, which happens a lot with hybrid "Product Owner / Business Analyst" roles, it asks me instead of guessing. Tailoring goes into a company-specific copy so the two base resumes stay clean, and a bullet that already exists on the other persona's resume can be borrowed instead of written from scratch.

**3. Let the score gate the work, not just describe it.** This was the most important design decision. A strong match (roughly 80%+) goes straight to resume suggestions and a cover letter. A borderline match (60-79%) stops and walks through the gaps one at a time as an actual conversation, not a form, because the point is to find out whether a "gap" is a real absence of experience or just something missing from the resume's wording. A weak match (under 60%) stops entirely. No cover letter, no encouragement to apply anyway. The score exists to save effort, not to be argued past.

**4. Never let the cover letter do the employer's screening for them.** Once a gap conversation happens, whatever's still open afterward is permanently off-limits for the letter, no "while I haven't worked directly with X" hedging, no oblique acknowledgment. This rule came out of watching an early draft do exactly that, and it's now a standing rule the process enforces automatically rather than something I have to remember to check for.

**5. Match voice, not just content.** I keep a short reference doc describing how I actually write: plain openings, no corporate phrasing, no em dashes, short sentences. Every letter is held to that profile instead of a generic "warm and professional" default. The profile itself has been revised twice, both times because a draft got flagged for slipping into a dramatic opening or AI-typical phrasing, and each fix got written back into the profile so it wouldn't recur. The bigger change came later: full drafts written by AI kept scoring high on AI detectors no matter how they were reworded, so now the skill hands me a short brief (the company hook, the proof points that fit the persona, the format) and I write the letter myself. Its job shifts to review: typos, facts against the resume, and anything a hiring manager could misread, while keeping my words.

Every application, its fit score, the persona it went out under, and what was changed and why gets logged, which is what turned this from "a good prompt" into an auditable process I can point to.

## What the log actually shows

Across five applications tailored this way, fit scores ranged from the high 60s to mid 80s (percent), and the gating logic worked as designed: the strongest matches went straight through, the borderline ones triggered real back-and-forth about specific gaps (some closed because the resume was just missing evidence that existed; some stayed open and were left alone, honestly, rather than papered over), and every cover letter was built only from what survived that process.

A few examples of what "closing a gap" looked like in practice, generalized:

- A posting wanted evidence of hands-on financial reconciliation work. The resume didn't say it explicitly, but a prior role had included exactly that, just described differently. The fix was rewording, not fabrication.
- A posting emphasized a specific delivery methodology the resume didn't mention. That experience genuinely existed from earlier in the career, and got added.
- A posting wanted a certification that didn't exist. That stayed flagged as an open gap and was never mentioned in the letter, per the standing rule.

## Why this is the interesting part

The output of any single run, one tailored resume, one cover letter, is table stakes for an AI tool. What I think is actually worth showing is that the process caught its own failure modes and got stricter over time without needing to be manually re-prompted each time: the gap-blindness rule and the voice profile both exist because something went wrong once, got noticed, and got permanently encoded into the process instead of just fixed in the moment. That's the difference between using AI as a one-off writing tool and using it as a system with a memory of its own mistakes.

## Next steps

I'm considering extending the same gating logic to a lightweight interview-prep step, using the same gap analysis to flag which open questions are likely to come up in a screening call, so the prep is grounded in the same evidence as the application itself rather than generic interview advice. Now that every application records which persona it went out under, I also want to see which one actually gets callbacks, and whether that should change how I split the search.
