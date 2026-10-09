# Claude To-Do: From Idea to Pivot

**Role:** Product Owner / Business Analyst
**Tools:** Claude (chat, voice, scheduled tasks, hosted pages, docs), the-idea-generatorinator skill, The Olympians review skill, Todoist
**Type:** Idea validation / decision process

The moment that decided this project came from my phone. The assistant I was talking to by voice said it could not write to the list I had just built, and called that gap exactly the kind of go/no-go evidence the test log was meant to capture. That one admission turned a half-finished build into a case study about deciding well.

## The problem

I already do most of my work inside Claude, and I wanted my task list to live there too: a lightweight to-do app I could use on desktop and on my phone, without paying for another subscription.

The trigger was small. I asked Claude to add three job applications to Todoist, and it worked, which made me ask why I couldn't have the same thing without the extra service. My requirements were: set reminders for the whole list, ask "what do I need to do today?", prioritize items and set due dates, work on both desktop and mobile, and be usable from Claude Cowork or Code. The phone mattered most. The goal was to add a task by voice, at the drop of a hat, wherever I was.

## The approach

I worked from the problem to the decision in five steps, and each step left a document I could point to. Times are Toronto time on 2026-10-09.

**1. Frame the problem before the solution (10:47 to 10:51).** I stated the want and the requirements first, starting from the frustration rather than from an app.

**2. Turn it into a concept brief (10:51 to 10:53).** A short interview settled four choices: a Claude-hosted page with a built-in database, scheduled-task reminders, chat plus a visual list, and a tool for one person. The output was a one-page brief with problem, solution, audience, differentiation, risks and one open question.

**3. Challenge it before building (10:53).** I ran the brief through a six-perspective review covering executive judgment, risk, buildability, speed, quality and desirability. The ruling was to proceed with changes and to test before committing. The review set guardrails: no recurring tasks, subtasks or labels in version one, chat as the main interface, a page for viewing and ticking off only, and an export button so the data could never be trapped. It also flagged two assumptions as the real risks: that scheduled runs would work unattended, and that chat on a phone could edit the list. It left one question unargued, which was whether to build at all or simply put Claude on top of Todoist. I recorded that as the open question the test would answer.

**4. Write the decision record and go/no-go criteria (10:57).** Before any building, I wrote four criteria: the morning digest arrives without stopping to ask for approval; tasks can be added and completed from the phone as smoothly as from desktop; adding a task by chat takes one sentence; and the list is trusted, with no day where it feels out of date.

**5. Start the same morning (11:00).** I began the build instead of waiting for a start date.

## What actually came out of it

In the first hour I built a published page with a shared database showing tasks grouped as overdue, today, upcoming and no date; four real tasks (three job applications due today with Anvil as top priority, plus a task to collect portfolio samples); an export button that gained a Markdown option when I asked for it partway through; and a scheduled morning digest at 7:52 that runs without approval prompts.

| Criterion | Result | Evidence |
|---|---|---|
| 1. Digest runs unattended, no approval prompts | Passed | Push notifications from the 11:56 and 11:58 test runs reached my phone, and the email test at 11:59 arrived too. I had first judged the push a failure and added email as a second channel, so the digest now goes out both ways. |
| 2. Phone editing as smooth as desktop | **Failed in voice chat** | A voice chat on my phone could write to Todoist but had no tool to write to the custom list, and could not open the page by its ID. My request to add a task ended up in Todoist. I did not test text chat on the phone, or ticking tasks on the page itself. |
| 3. Adding a task by chat is one sentence | Passed on desktop | Three new tasks, a due date and a priority change were each applied from a single message. |
| 4. The list is trusted | Not assessed | The test ended on Day 1, before a full day of use. |

**A false alarm on the way.** After test runs at 11:56 and 11:58 I judged the digest's push notification a failure and added email as a second channel, which worked at 11:59. Later I found the push notifications had reached my phone after all, so I restored push to the scope and kept email as a backup. The lesson is to confirm a failure before designing around it: the goal, a reliable morning summary, never changed, and the digest now has two delivery channels.

**Workarounds considered.** Every fix for the phone gap added a second system, and that decided the outcome.

| Workaround | What it would solve | Cost | Outcome |
|---|---|---|---|
| Add a typed "add task" box to the page | Phone capture by typing | Breaks the view-and-tick guardrail, and is not voice | Not built |
| Use chat on desktop, phone for viewing only | Keeps the custom list as designed | Gives up "works on both" and voice capture | Not chosen |
| Capture by voice into Todoist, then sync into the custom list each morning | Voice capture from the phone | Two systems plus a sync job to maintain | Rejected as too complicated |
| Reach the build session from the phone to add tasks there | Writes to the list directly | Not possible, since voice chat and the build environment are separate | Ruled out |
| Make Todoist the backbone | Voice capture works today | Gives up owning the data | Chosen |

**The pivot (11:25).** I dropped the custom build and made Todoist the backbone for every task, keeping the reminders and morning digest but pointing them at Todoist data. What carried over: Claude as the interface, due dates and priorities, the scheduled 7:52 digest (now delivered by push notification and email, reading overdue, due-today and high-priority items from Todoist), and the decision record as the evidence trail. What I gave up: the custom page, its database and its export button, and with them the original wedge of owning the data store.

**What stays unresolved.** I am staying on the free Todoist plan for now, so the original goal of avoiding a subscription holds today. Whether the free plan keeps up with daily use is untested, and I will revisit it if it does not.

## Why this is the interesting part

The app is not the point. A vague want became a scoped, falsifiable experiment with written criteria, and the first failure against those criteria led to a decision the same morning, in about 35 minutes. Because the experiment was one page, one table and one scheduled task, abandoning it cost almost nothing, and the parts that mattered (Claude as the interface, due dates, priorities and the digest) carried over.

I also log decisions and evidence as I go, so the story could be written the same morning it happened. The pivot answered the open question the review left behind: the value turned out to be in the Claude layer that can read the list, remind me and act on it, wherever I am, and not in storing the list myself.

What I would do differently:

- **Test the riskiest assumption first.** The review named phone editing as a key risk, but I built first and tested after. Publishing a blank page and trying it from my phone would have taken minutes.
- **Put the biggest fork into the review.** The review debated how to build, not whether to build. Owning the storage versus layering Claude over Todoist was left as an open question, and it turned out to be the real decision.
- **Treat the first constraint as data.** I stopped fighting the phone limitation as soon as it appeared and asked what the evidence said about the plan.

## Next steps

Test text chat on the phone, which this experiment did not cover, and watch whether the free Todoist plan holds up under daily use. Run the 7:52 digest for a week to see whether the Todoist-based version earns the trust the fourth criterion asks for.
