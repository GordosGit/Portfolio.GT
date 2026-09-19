# Sunday Dinner: A Concept Brief That Didn't Survive Its Own Review

**Role:** Product Owner / Business Analyst
**Tools:** Claude, the Idea Generatorinator skill, a five-persona adversarial review process ("the Council")
**Type:** Idea validation / concept development

## The problem

I had a vague, personal problem, not a scoped one: my family's Discord server keeps getting muted along with every other server my sons belong to, so family updates go unseen for stretches at a time. My first instinct was "build an app for this" — a dedicated, install-anywhere family app that would keep Discord's channel-and-history structure but strip away everything else competing for attention. That's exactly the kind of raw input the Idea Generatorinator is built to take: not a spec, just a felt problem and a hunch about the shape of the fix.

The risk with an idea-generation tool that's actually good at its job is that it produces something structurally convincing on the first pass — a clean problem statement, a named audience, a differentiation argument, even a list of its own risks — and structural completeness is easy to mistake for validation. A brief that reads well is not the same as an idea that should get built. I needed a second, separate step whose entire job was to argue with the first one.

## The approach

I ran the raw idea through the Idea Generatorinator's discovery interview, and it came back with a fully-formed concept brief for "Sunday Dinner" — a family-only PWA with tiered notification channels and a per-son "Adventures of [Name]" space — that, to its credit, already named its own open question: would two independent adult sons actually bother to install it and keep using it once the novelty wore off? Rather than treat a well-formed brief as a green light, I sent it to a second process I run specifically to stress-test ideas before committing real build time: five adversarial reviewer personas — a Contrarian, a First Principles Thinker, an Expansionist, an Outsider, and an Executor — who critique the concept independently, followed by a synthesis of where they agree and where they genuinely conflict.

**1. Let the generator do its job without editing it down.** The brief that came out was honest about its own weak points before anyone challenged it: it named iOS push reliability, the permission-versus-engagement gap, solo-maintenance risk, and feature creep as real risks, and it framed the open question correctly — is the notification-priority wedge enough to overcome adoption risk. That's the discovery sequence working as intended.

**2. Send the finished brief to adversarial review, not confirmation.** Each persona was free to attack a different layer of the idea. The Contrarian went after the mechanism itself: a second app doesn't fix a notification-visibility problem, it adds another icon competing for the same attention that got the family server muted in the first place. The Outsider asked the cheaper, more embarrassing question: had "just raise the family channel's priority inside Discord" actually been ruled out before planning to build and maintain a whole new PWA indefinitely?

**3. Treat disagreement between reviewers as signal, not noise.** The Contrarian and the First Principles Thinker landed on the same prediction — this ends up muted again — from two different causes. The Contrarian called it inevitable app fatigue that better engineering could still solve. The First Principles Thinker called it a possible sign that intermittent engagement from two young-adult sons is normal individuation, not a bug notifications can fix. That's a real fork: it determines whether the right move is "build smarter" or "accept there may be nothing to fix."

**4. Let the cheapest experiment settle the argument instead of a build.** The Executor's proposal cut through both: recreate the tiered "Adventures" channels inside the existing Discord server this week, set them to elevated priority, and just watch engagement for two weeks — before writing a single line of new code. That answers the Outsider's workaround question and the Contrarian-versus-First-Principles-Thinker disagreement with one free, five-minute intervention instead of a solo build.

The synthesis turned five independent critiques into one specific, gated recommendation, which is the same instinct I built into the job-application pipeline in a different form: don't spend the expensive effort until a cheap test says it's worth it.

## What the review actually found

Sunday Dinner did not get built as a standalone app, and that's the correct outcome, not a failed one. The Idea Generatorinator had already surfaced the real open question in its own brief before any scrutiny started — it just isn't built to answer that kind of question, because generating a concept and stress-testing it are different jobs. What the Council added was catching that the brief's own build plan deferred the riskiest assumption until after a solo build was already sunk, and it replaced that plan with something that costs nothing to try.

A few specifics from the review worth calling out:

- The Contrarian's read wasn't "this is a bad idea," it was "this solves visibility with a second thing to be invisible," which is a sharper and more falsifiable objection than generic skepticism.
- The disagreement between the Contrarian and the First Principles Thinker wasn't noise — it's exactly the distinction that determines whether "build it better" or "there may be nothing to build" is the right response.
- A follow-up note added after the session — that the boys already use the server, just sporadically — settled that disagreement in the Contrarian's favor: intermittent use looks like a visibility problem, not disengagement, which is the kind of fact that should surface before a build decision, not after one.
- The Expansionist's strongest point (a per-person archive/timeline has value independent of the notification problem) survived the review as a "worth adding if the experiment validates the wedge" note, not a reason to skip the test.

## Why this is the interesting part

It would be easy to only show the ideas that made it all the way to a build — that's the flattering version of "I use AI for product work." The more honest and more useful version is this one: an idea that looked genuinely good enough to generate, run through a process built to disagree with it, and come out the other side with a specific, free, two-week experiment instead of a green light. That's the same gating discipline as the job-application pipeline, applied to a build decision instead of a cover letter: the tool's job isn't to make ideas feel finished, it's to make sure the expensive step only happens after the cheap one has actually been tried.

## Next steps

The two-week Discord experiment the Council recommended hasn't been run yet — that's the actual next step for Sunday Dinner, not more concept work. If engagement moves once the existing server gets tiered notifications, the wedge is real and the standalone app becomes worth building, digest/archive features included. If it doesn't move even with zero friction and zero new app to install, that's real information worth listening to rather than a reason to build a fancier way to route around it.
