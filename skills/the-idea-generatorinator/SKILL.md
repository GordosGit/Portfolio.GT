---
name: the-idea-generatorinator
description: Develops a one-line idea into a lean concept brief (problem, solution, audience, differentiation, risks) via a short interview. Use when the user wants to flesh out or brainstorm a rough idea.
---

# The IdeaGeneratorinator

Turns a problem — with or without a solution in mind yet — into a tight, ~1-page concept brief through a short interview, then saves it as a markdown file. The brief is sized to be handed straight to a validation pass afterward (for example, a "council this" style skill) — so it should read like a real internal memo, not a padded pitch deck.

## Why the interview matters

A one-liner hides a hundred unstated assumptions. The point of the interview isn't paperwork — it's forcing the handful of decisions that actually determine whether the idea is any good: who it's really for, what it's competing with, and what could kill it. Skip straight to writing and you'll just be inventing plausible-sounding details instead of surfacing what the user actually thinks. Ask instead.

The interview starts from the problem, not the solution. People usually show up with a felt problem and a half-formed fix — sometimes not even that. Asking "what's the idea?" first skips the more important question of whether the idea is actually the right answer to the problem, and leaves no room for someone who has the itch but not yet the fix.

## The flow

### 1. Get the problem
If the user hasn't stated one yet, ask for it: what's the problem or pain point, in a sentence or two? If they instead open with a solution one-liner ("an app that..."), that's fine — work backward with them to name the problem it's solving before moving on, so it's explicit rather than assumed.

### 2. Ask for their solution — and handle "I don't know"
Once the problem is clear, ask directly: what's your thinking on how to solve it? Two branches from here:

- **They have something** — even a rough one-liner. Take it as the working concept and move to step 3.
- **They don't know yet** — "not sure," "that's what I'm hoping to figure out," or similar. This is where real brainstorming happens, not a dead end. Generate 3-4 genuinely different solution directions for the problem (different mechanisms or angles, not variations on one idea — e.g. a habit-tracking angle vs. a social-accountability angle vs. an automation angle), each in a sentence with a one-line rationale. Ask which one resonates, or whether they want to combine elements. Their answer becomes the working concept for the rest of the interview.

### 3. Check what's already known
Scan the problem, the working concept, and anything else the user has said in the conversation. Don't ask about things they've already told you.

### 4. Interview
Cover these remaining pillars, asking only about what's still unclear. Ask a few sharp questions at a time (2-4), not a giant questionnaire dump — this should feel like a conversation, not an intake form. If an interactive multiple-choice input tool is available, use it for questions with a natural short list of answers; use plain conversational questions for anything that needs the user's own words.

- **Solution detail** — What does using it actually look like, concretely?
- **Audience** — Who's the primary user or customer? How would they find or adopt this?
- **Differentiation** — What already exists in this space? Why this angle — what's the wedge?
- **Risks** — What could kill this? (market risk, execution risk, technical risk, trust/adoption risk)

If answering a risk question requires checking something you're not confident about (current state of a technology, a platform limitation, feasibility of an approach), look it up rather than guessing — this is exactly the kind of thing worth getting right. If what you find reveals a fork in approach (e.g. two viable ways to build it, with different trade-offs), don't write the risk into the brief as an open uncertainty — confirm with the user which side of that fork actually matches their intent first. Otherwise the brief ends up hedging on something the user had already decided.

Adapt to the conversation — if the audience is already obvious from how the problem was described, spend your questions on differentiation and risk instead.

### 5. Know when to stop
You don't need complete information — you need enough to write one honest paragraph per pillar without inventing specifics. Stop when you have that, or immediately whenever the user says something like "enough" or "just write it." When you do have to fill a gap yourself, mark it clearly as `[Assumption: ...]` in the brief rather than stating it as fact.

### 6. Write the brief
Use this exact structure:

```markdown
# [Concept name]

**One-liner:** [the working concept in one sentence — whether the user brought it or it emerged from step 2's brainstorm]

## Problem
[1 short paragraph]

## Solution
[1 short paragraph — what it is and how it works at a basic level]

## Target audience
[1 short paragraph — who, and why they'd adopt it]

## Differentiation
[1 short paragraph — what exists already, and the actual wedge]

## Key risks
[3-5 bullets, the real ones, not hedges]

## Open question for validation
[One crisp sentence naming the single biggest uncertainty or either/or bet this concept rests on — the thing most worth stress-testing next]
```

Keep the whole thing to roughly 400-600 words. This is a lean brief, not a dossier — resist the urge to pad sections out or hedge everything. Write like a sharp product person's internal memo: direct, specific, willing to commit to a position.

The **Open question for validation** line matters most — it's what turns this from a summary into something worth running through a multi-perspective pressure-test afterward. Make it a real fork in the road (e.g., "Is the wedge the price or the workflow integration?"), not a vague "will this work?"

When the user corrects or adds a fact after the brief is written, don't just patch the section they pointed at — a single fact (an age, a budget, a timeline) often changes the framing in a risk bullet or the validation question too, since those are usually built on top of the section being corrected. Skim the rest of the brief for anything that now reads inconsistently with the new fact before calling the edit done.

### 7. Deliver
Save the brief as a markdown file and let the user know it's ready to hand to a validation step (e.g., they can say "council this" on it) whenever they're ready — don't run that step yourself unless asked.

## Examples

**When the user has a solution already:**
Problem: "Adult children lose track of how long it's been since they last called their aging parents." Ask what they're thinking for a fix. If they say "some kind of app that reminds them based on how long it's been since the last call," treat that as the working concept and move to step 3 — questions from there: does it read call logs or is it manual entry? What happens if no one checks in — does it escalate, and to whom? What stops this from just being a recurring calendar reminder?

**When the user doesn't know yet:**
Problem: "Small nonprofits waste hours every month manually reconciling donations across Stripe, PayPal, and checks." Ask what they're thinking for a fix, and they say "honestly, no idea, that's why I'm here." Offer 3-4 real directions — e.g. (1) an automated reconciliation tool that ingests all three sources and flags mismatches, (2) a lightweight bookkeeper-matching service, (3) a template/training product that teaches nonprofits a cleaner process, (4) a Zapier-style integration that prevents the mismatch at the point of donation. Ask which direction resonates before continuing the interview on that concept.
