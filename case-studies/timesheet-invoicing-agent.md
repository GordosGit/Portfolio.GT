# A Timesheet and Invoicing Agent That Never Touches Money Unsupervised

**Role:** Independent Consultant / AI Solutions Engineer
**Tools:** Claude Code (CLI-driven, conversational build), Python, openpyxl, Discord webhooks, Windows Task Scheduler
**Type:** Personal Tool Build / Process Automation

## The problem

Contract time tracking is simple in principle and easy to let slide in practice: log hours by task as you go, total them correctly, turn the week into a clean invoice. The daily discipline is the part that actually fails — a day goes unlogged, Friday becomes a reconstruction exercise, and the invoice ends up less trustworthy than it should be for something a client is paying against. I wanted logging to be nearly frictionless (say it in chat, or punch it into a tiny window), the math to be provably correct, and a standing nudge that catches a missed day before it compounds into a missed week. The one rule that mattered more than any feature: nothing involving a client's money leaves my machine without me looking at it first.

## The approach

I worked from a written spec before any code existed, and the build order was deliberate, not incidental:

**1. Prove the boundary before writing the thing it protects.** Step one wasn't a feature — it was creating placeholder versions of the webhook config, the spreadsheet, and a generated invoice, then confirming `git status` genuinely ignored all three before a single line of real logic existed. A gitignore you haven't tested is a gitignore you're hoping works.

**2. Keep anything client-facing deterministic; keep the agent to orchestration only.** The core tool — spreadsheet writes, totals, the webhook call — is plain Python with no judgment calls baked in: same input, same output, every time. The agent's job is deciding *when* to call which function and interpreting what I ask for in conversation, not reasoning about the numbers themselves. That split was a decision made once, early, and never revisited.

**3. Build the boring, correct core first.** Entry logging, editing, deleting, daily and weekly totals — all tested against real numbers before anything scheduled or automated sat on top of it. An invoice draft is only as trustworthy as the totals underneath it.

**4. Add automation, then actually test it against the live system.** The Discord nudge and the Windows scheduled tasks were the last layer, and neither one was trusted until it had actually fired for real — not "the code looks right," but a live webhook post and a confirmed entry in Task Scheduler, both independently verified rather than assumed.

**5. Let the client-side draft invoice stay a draft, permanently, by construction.** The agent builds the invoice file and posts a summary to a private channel for review. Sending the real thing is a manual step I take myself, every time, with no code path that skips it.

The result isn't flashy — a spreadsheet, a CLI, a tiny window, a scheduled message — but every piece of it is something I'd be comfortable walking a client through line by line.

## What actually happened

Two real bugs showed up exactly where "looks right in testing" and "actually works" diverge, and both were worth keeping rather than quietly fixing and forgetting. The Discord webhook returned an opaque `403 Forbidden` on its first live test — not a bad URL, but Discord's edge silently rejecting Python's default user-agent string. And the Windows scheduled tasks failed to create at all on the first attempt, because `schtasks` mangles nested quoting once the install path contains a space, something no amount of code review catches without actually running the command. Both fixes were small (a header, a wrapper script) but neither would have surfaced without testing against the real system instead of trusting that "no errors" meant "working."

The more interesting failure was mine, briefly: resetting the local data folder to get a clean test run for the desktop punch-in screen also wiped a real logged entry that already existed. It was a small, easily-reversed mistake, caught immediately and fixed by re-adding the entry — but it's a good reminder that "clean slate for testing" and "real user data" need to be kept further apart than I'd initially drawn the line.

## Why this is the interesting part

It would be easy to describe this as "I asked an AI to build me a timesheet app" and leave it there. What's actually worth showing is the discipline underneath it: the parts of the system that touch a client's money are deliberately boring, deterministic, and auditable, while the agent is kept to the parts where flexibility genuinely helps — understanding a casual request, deciding when to ask a question instead of guessing, orchestrating several small, correct pieces into one coherent tool. That's the same judgment call that matters in client engagements generally: AI should make the repeatable parts faster, not make the parts that need a human sign-off feel automated when they aren't.

## Next steps

Per the original spec, the invoice layout itself was deliberately left as a plain placeholder until after the proof-of-concept stage — that decision is still open. Work is already underway on a related gap: the current draft is generated per week, with no record of which individual entries have actually been billed versus just logged, so an invoice-number column and the logic to handle partially-invoiced weeks are being added next. The desktop punch-in screen also doesn't yet reflect changes made outside it (chat or CLI) until you log something new in it — a small but real rough edge worth closing.
