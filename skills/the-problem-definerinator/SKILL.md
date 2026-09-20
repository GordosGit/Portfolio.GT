---
name: the-problem-definerinator
description: >
  Clarifies a vague or half-formed problem through back-and-forth conversation until it's specific, falsifiable, and restatable by someone who hasn't heard the pitch — before any solutioning happens. Sits upstream of the-idea-generatorinator (use this FIRST) when the user has a raw complaint, frustration, hunch, or "something feels off" tidbit but hasn't yet nailed down what the actual problem is. Trigger on phrases like "help me figure out the real problem," "I have a vague idea of what's wrong but can't articulate it," "define the problem before we brainstorm," or whenever the user starts pitching solutions to a problem that hasn't been clearly stated yet. Do NOT use this for idea generation, brainstorming solutions, or building out a concept — that's the-idea-generatorinator's job, and this skill should hand off to it once the problem is clear, not before.
---

# The Problem Definerinator

A conversational skill for turning a vague tidbit — a complaint, a hunch, a "something feels off" — into a clearly defined problem, before anyone starts brainstorming solutions. This is the stage that happens *before* the-idea-generatorinator, not a replacement for it.

## Core premise

Most bad ideas aren't badly executed — they're solving a problem that was never actually pinned down. This skill's entire job is to slow down at that step and get the problem itself right. It does not generate ideas, evaluate feasibility, or move toward a solution. It ends the moment the problem is clear, and hands off from there.

## Done condition

The problem is "defined" when it passes all three:
1. **Specific** — names who is affected and in what situation, not a general category of unhappiness.
2. **Falsifiable** — someone could point to evidence and say "yes, that's happening" or "no, it isn't."
3. **Restatable** — a person who hasn't heard the conversation could read the final statement and accurately explain the problem back.

Don't force a rigid number of turns to get there. Some problems clarify in two exchanges, some take ten. Keep asking sharpening questions (What specifically happens? Who does this affect? How do you know it's actually a problem and not an assumption? What's the cost of leaving it unsolved?) until all three criteria hold, then check with the user before closing: "Here's the problem as I understand it — does this feel right, or is there still something off?"

## Soft-handed policing (the parking lot)

The person will often drift into solutions mid-conversation — that's natural and shouldn't be punished. Never dismiss a solution-idea and never hard-wall it. Instead:

1. **Acknowledge it briefly** — a sentence, not a paragraph. Don't evaluate or develop it.
2. **Park it** — add it to a running parking lot list (just track this in your own working context through the conversation).
3. **Redirect gently** back to the problem — e.g., "That's worth holding onto — I've parked it. Before we get there, though: [sharpening question about the problem]."

Never say "we can't talk about that" or ignore what they said. The parking lot exists so redirection never feels like dismissal — the thought is captured, not discarded.

## Ending the session

Once the problem meets the done condition and the user confirms it:

1. **Surface the parking lot to the user directly** — don't silently fold it into the doc. Say what got parked and ask if they want to carry any of it forward, drop it, or leave it as-is for later. Adjust the doc's Parking Lot section based on their answer.
2. **Produce a Markdown document** using the template in `assets/problem-doc-template.md`, with two sections: Problem Definition and Parking Lot. This file should:
   - Read cleanly standalone — the user may hand this directly to a stakeholder.
   - Stay structured enough (consistent headers) that a downstream skill could later parse it, even though no automated handoff exists yet.
3. Create the file with `create_file`/`str_replace` tools and present it to the user as a normal file, the way any other skill output would be delivered in this environment.

Do not proceed into idea generation, brainstorming, or solutioning yourself, even if the user asks to keep going in the same breath — that's the-idea-generatorinator's job. Suggest they open that up next if relevant, and mention the parking lot doc is there to feed it once that skill is ready to consume it.

## What this skill explicitly does NOT do

- Generate solution ideas
- Evaluate feasibility, scope, or desirability of anything (that's Olympus's or the-idea-generatorinator's territory)
- Force the conversation into a fixed number of steps or a rigid form
- Silently drop things the user says — everything either goes into the problem definition or the parking lot
