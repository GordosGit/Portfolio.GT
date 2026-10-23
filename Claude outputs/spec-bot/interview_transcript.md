# Spec Bot: Interview Transcript

Example conversation, Friday 2026-10-23, 08:55 to 09:05.
Requester: Gord Turner
Result: `spec_overdue_invoice_dashboard.docx`

---

**Gord** invoked the skill: `/spec-bot I need a report that shows all overdue invoices`

**Spec Bot:** Hi Gord, happy to help with that. I'll ask you a few quick questions, then put together a clear write-up for the development team so they have what they need to get started.

Right now, when you need to know which invoices are overdue, how do you get that information, step by step?

**Gord:** I manually run a report against SAP

**Spec Bot:** Got it, thanks. So you run the report in SAP yourself each time.

How often do you need to do that, and what do you do with the results once you have them?

**Gord:** weekly

**Spec Bot:** Weekly, got it. And once you've run it, what happens with the results? Does anyone else use them, or is it just for you?

**Gord:** we have a few people in AR that does this. Each of us do it manually and on demand. It would be nice if we all just went to a dashboard and can see things realtime. Also if someone has picked up an account to call, we dont want to call them twice.

**Spec Bot:** Good idea on the dashboard, I've noted it. Before we get to that, I want to be sure I understand the problem properly.

You mentioned not wanting to call the same customer twice. How often does that happen today, and what is the fallout when it does?

**Gord:** it doesnt happen today because only one person primarily does this. but that is slow and arduous.

**Spec Bot:** That helps. So double-calling isn't a problem today. It's something you'd want to prevent if more of the team worked from the list.

What makes it slow and arduous? Roughly how long does it take the person who does it each week, and which part takes the longest?

**Gord:** it has happened. but not commonly

**Spec Bot:** Thanks for correcting me. So it has happened, just not often. I'll note that.

Back to the slow part: roughly how long does the weekly report take, and what's the most tedious step in getting it done?

**Gord:** the report is not slow. The process of recovery is. One AR rep calling everyone. If AR rep 2 sees that AR rep 1 is working on it, they dont get involved because of the repeat call process. That is why it take so long (days ) to deal with

**Spec Bot:** Okay, let me play that back, because I think the real problem is different from where we started.

The weekly overdue report itself is fine. The slow part is working through the overdue accounts. Several of you are in AR, but one rep ends up calling everyone, because the others stay out of it when they see someone has already started. They're avoiding repeat calls to the same customer. The result is that dealing with the overdue accounts takes days.

Did I get that right?

**Gord:** yes. This is why a common dashboard, live and refreshing with real data means more people can get involved and ultimately faster collections

**Spec Bot:** Thanks, that's clear, and the dashboard idea is noted.

If this worked well, what would you notice? For example, how quickly would you want overdue accounts to be dealt with, compared with the days it takes now?

**Gord:** money in the bank!

**Spec Bot:** Love it. To give the development team something concrete to build toward, how would you measure that? For example, fewer days to collect, a smaller overdue total, or something else?

**Gord:** few days. less invoices in overdue status

**Spec Bot:** Got it: fewer days to collect and fewer invoices sitting in overdue status.

Now, who would use it? Roughly how many people are in AR, and would anyone else look at it, like a manager?

**Gord:** 3 and a manager. Plus C-suite

**Spec Bot:** So that's three AR reps, a manager, and the C-suite.

Let's start with the reps. What would they need to see on it, and do on it, to pick up an account and start calling?

**Gord:** Total dollars, number of invoices, colour to represent state, a list of the invoices to click on individually denoting assignment

**Spec Bot:** That's helpful: total dollars, number of invoices, a colour for each invoice's state, and a clickable list showing who has each one.

What states would you want the colours to show? And how does an invoice get assigned, for example does a rep claim it by clicking on it?

**Gord:** use your best judgement

**Spec Bot:** Happy to. Here's what I'd suggest:

- **Unassigned:** nobody has picked it up yet.
- **In progress:** a rep has claimed it and is working it, and their name shows on the invoice.
- **Promised to pay:** the customer has committed to a payment date.
- **Resolved:** paid, and it drops off the list.

A rep claims an invoice by clicking it. Once claimed, it shows the rep's name so the others can see to leave it alone.

Does that fit how you work, or would you change anything?

**Gord:** all good.

**Spec Bot:** Great. Now the manager and the C-suite. What would they want to see that's different from the reps? For example, totals, trends over time, or how each rep is doing?

**Gord:** just review

**Spec Bot:** Understood: they just view the same dashboard, no changes.

One rule I need to pin down: when does an invoice count as overdue? The day after its due date, or after some grace period?

**Gord:** that will be denoted in the data from SAP.

**Spec Bot:** Good, so SAP decides what's overdue and the dashboard follows it.

How current does the information need to be? Does it have to update live as things change in SAP, or would refreshing every hour or so be fine?

**Gord:** daily refresh

**Spec Bot:** Daily refresh from SAP, noted.

One thing to check: when a rep claims an invoice, should the others see it straight away? Or would a daily update be fine for that as well?

**Gord:** yes

**Spec Bot:** Straight away, got it. Let me play back the approach to check I have it right.

The potential approach is a shared dashboard for the AR team, built on the overdue invoices from SAP, which refresh once a day. It shows the total dollars and the number of invoices, and a colour for each invoice's state: unassigned, in progress, promised to pay, or resolved. A rep claims an invoice by clicking it, and their name shows immediately for everyone, so nobody calls the same customer twice. The three AR reps work from it, and the manager and C-suite can view it.

The goal is fewer days to collect and fewer invoices sitting in overdue status. Is anything missing or wrong?

**Gord:** got it

**Spec Bot:** Great, I think we have enough for the development team to work from. Here is your write-up.

*[Spec delivered as `spec_overdue_invoice_dashboard.docx`]*

**Spec Bot:** Your write-up is ready as `spec_overdue_invoice_dashboard.docx`, stamped with your name and today's date and time. The development team will review it and follow up if they need anything else.

I listed six open questions at the end, for example whether one rep should own all the calls to a customer who has several overdue invoices.
