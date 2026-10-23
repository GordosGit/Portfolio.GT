# A Requirements Interview That Knows When It's Done

**Role:** Product Owner / Business Analyst
**Tools:** Claude, a custom requirements-interview skill, Word (.docx) output, a Microsoft Teams bot design (concept only)
**Type:** Requirements Elicitation / Process Design

## The problem

People who aren't technical know exactly what is wrong in their day. They rarely know how to say it in a way a developer can build from. The request arrives as one sentence, and the developer spends the next few meetings pulling out the same details: who is affected, how often, what the output looks like, what counts as done. It is frustrating for the person asking too, because nothing tells them when they have said enough.

The idea came out of a conversation about helping the staff of a company that is new to AI bring requests to its developer. I wanted a front door for that: a conversation a busy person can have in a chat window, ending in a standard spec that a developer, or an AI coding assistant, can start from.

The design question that mattered most was who decides when the interview is over. If the user decides, you get thin specs and follow-up conversations, which is the problem I was trying to remove. So the bot decides.

## The approach

I built it as a skill so the interview runs the same way every time. It works in phases and follows five rules:

**1. Define the problem before anything else.** I borrowed this from my problem-definer skill. The problem has to be specific, falsifiable, and restatable by someone who wasn't there. Until it passes all three, there is no talk of solutions.

**2. Park solution ideas instead of dismissing them.** People drift into solutions, and that is fine. The bot acknowledges the idea in one sentence, notes it, and steers back to the problem. Parked ideas end up in the spec under "Requested features," so nothing the person said is lost.

**3. Play back what it understands, at checkpoints, not after every reply.** Twice: once when the problem is defined, and once when the approach is clear. That is what a good analyst does, and it is the point where a wrong assumption is cheapest to fix.

**4. Decide for itself when it has enough.** The skill spells out what "enough" means: the problem is confirmed, it can write at least two user stories with acceptance criteria, inputs, outputs and users are known at a high level, and no open question would send the developer back to the same person. Anything that is only nice to have goes under Open Questions instead of stretching the chat.

**5. Produce the same spec every time.** Ten sections in a fixed order, with the requester's name and the date stamped automatically: problem statement, goals, users, user stories, acceptance criteria, inputs and outputs, rules and constraints, timing and priority, requested features, open questions. Where nothing was discussed, it says "Not discussed" and never invents content.

I also made two scoping decisions for the first version. The output is a downloadable Word document. Ticket creation and saving to a shared document library are written up as a later phase, because they depend on tools I don't know yet. Scope checks and cost limits are a third phase, for the same reason.

The skill works today in a normal Claude chat. The Teams bot is a design. I wrote a short backend sketch (a Teams message comes in, the skill is loaded as the instructions, Claude replies, a Word file comes out), but I have not built it or run it.

## What it produced

I tested it by acting as the requester on a one-line request: "I need a report that shows all overdue invoices." About ten minutes and roughly eighteen exchanges later, it gave me a three-page spec with five user stories, five acceptance criteria, and six open questions.

One interview shows how the skill behaves, not how reliable it is. I treat it as a first data point.

A few things from that run, generalized:

- **The playback changed what was being built.** I opened with a report request. By the first playback, the problem had moved. The report was fine. The slow part was working through the overdue accounts, because the team held back from picking them up to avoid calling the same customer twice. The deliverable became a shared dashboard where someone claims an item, not a better report.
- **It was wrong once and recovered.** It assumed a risk I had mentioned wasn't a problem today. I corrected it, and it took the correction and moved on, without defending the earlier read.
- **It asked before filling in blanks.** When I told it to use its best judgement on the states an item could be in, it proposed four and asked me to confirm them. It did not write them into the spec on its own.
- **It put what it couldn't know in the right place.** Questions like whether one person should own all the calls to a customer with several overdue items went under Open Questions, not into the requirements.

## Why this is the interesting part

A chatbot that asks questions is easy to build. What I think is worth showing is the set of decisions that make an interview trustworthy for someone who isn't technical. The bot owns the "are we done" call, so the person never has to guess. It reflects its understanding back in plain words, so errors get caught while they are cheap. It parks ideas without dismissing them. It refuses to invent anything it wasn't told. And the output format is fixed, so the next reader, human or AI, never has to hunt for anything.

It is the same problem-framing discipline as my other work, applied to a live conversation instead of a document.

## Next steps

The first thing I want to test is the handoff itself. I haven't yet given a finished spec to an AI coding assistant to see what it builds. Whatever it has to guess is a gap in the template, and I'd feed that back into the skill. After that:

- Run more interviews on different kinds of requests, especially with people who give short answers.
- Build the Teams bot from the backend sketch.
- Add ticket creation once the team's tracking tool is known.
- Add scope checks and usage limits before anyone outside a pilot group uses it.
