# Pocket Chef: When the Pressure-Test Itself Needs Pressure-Testing

**Role:** Product Owner / Business Analyst
**Tools:** Claude, the-idea-generatorinator skill, Olympus (a self-designed six-persona review skill), web research
**Type:** Idea validation / process design

## The problem

My wife and I are serial recipe-video collectors — YouTube, Facebook Shorts, Instagram, all dropped into a shared family Discord channel that we almost never go back to. I ran that problem through the-idea-generatorinator, and it came back with "Pocket Chef": an app that would pull in videos from all three platforms, extract the full recipe via audio transcription and on-screen text, catalog it, and let us ask for suggestions in plain language. Before building anything, I wanted it pressure-tested — but I'd already decided not to publish an existing review tool I use (a five-persona adversarial critique process) as if it were my own. That's what led to building Olympus first: my own version of the same pattern — multiple biased personas, a synthesis, an appeal mechanism — designed from scratch rather than repackaged.

## The approach

**1. Research before committing to a technical bet.** Before the concept brief was even finished, I checked what recipe-import apps already exist — Mela, Pestle, Samsung Food — and found that nearly all of them only parse a video's written caption, not its actual audio or on-screen content. That informed the brief's boldest choice: build genuine full-video extraction, accepting that Instagram and Facebook have no official API for it and that real extraction would mean third-party scraping tools and real Terms of Service exposure.

**2. Run the full concept through Olympus before writing a line of code.** All six gods argued the brief independently — Athena flagged that the riskiest technical path was being chosen before anyone tested whether it was necessary; Hephaestus pointed out the real fragile point wasn't the extraction engineering, it was depending on platforms that offer no official access at all; Aphrodite insisted the conversational "what should we cook" layer, not the catalog, was where any actual desirability lived. Zeus's Edict: don't build the full pipeline yet — validate the suggestion experience on a small, hand-entered catalog first.

**3. Use the Appeal mechanism as a real argument, not a rubber stamp.** I pushed back twice. First, that the two-person audience was explicitly an MVP validation gate on the way to a real product, not the permanent scope — Apollo conceded his "pick one identity" framing had been wrong, while Athena held her ground on a sharper point: founders are the worst judges of their own product's appeal, so "it works for us" still isn't market proof. Second, that a beta phase with actual strangers was already the plan, specifically to stress the UX once the mechanics were confirmed — Athena conceded fully here, since that was exactly the missing rigor she'd been asking for. Some objections resolved. Others didn't, and the record says which is which.

**4. Notice when the process itself has a blind spot.** After two rounds of appeal, the debate had only ever argued about *sequencing* — build order, staging, validation gates — never about whether the underlying scope was right-sized to begin with. Every god had accepted the brief's full ambition (multi-platform, full audio/OCR extraction, a subscription product) as fixed and only fought over when to build which piece. Six independent, genuinely biased perspectives, and none of them were positioned to ask "should this be this big at all" — because nobody had asked them to.

**5. Rescope from the original problem statement, not from the inflated solution.** Going back to the actual pain point — can't find saved videos again — a manual-tagging fix was considered and rejected on the strength of a lesson from a different project: manual processes degrade the moment the novelty wears off, so the tagging has to be automatic or it won't hold up past the first few uses. The rescoped PoC narrowed to one platform (YouTube), swapped the audio/OCR pipeline for transcript-based extraction (a much smaller technical lift, since YouTube videos usually narrate what caption-only competitors miss), and pushed Instagram/Facebook, the full "pocket chef" companion, and the subscription model out to explicit, named future phases instead of either scope-creeping them back in or losing track of them.

**6. Re-run the narrower version through the same review before treating it as settled.** The second Olympus pass caught a smaller-scale repeat of the exact same pattern: bundling a "lightweight" suggestion feature into the PoC was, in miniature, the same scope-widening instinct that triggered the rescoping in the first place. The Edict drew a precise line — keep the suggestion layer only in its barest form, just enough to make the catalog testable in daily use, not as a feature investment of its own — and added a concrete, nearly-free next step: manually run ten real videos through transcript extraction and check the results by hand before building any app shell at all.

## What actually came out of it

A rescoped, technically honest PoC concept, with the bigger vision still alive on the roadmap rather than either abandoned or smuggled back in early. More usefully, a record of exactly which objections a counter-argument actually resolved (Apollo's identity framing, Athena's beta-phase concern) versus which stayed open on their own merits (Athena's founder-bias warning, Hephaestus's platform-fragility-at-scale flag) — because an appeal process that concedes every time it's pushed back on isn't actually testing anything.

## Why this is the interesting part

Building a tool that argues back is the easy version of this story. The harder and more useful part is what happened after two full rounds of debate and appeal: a structured, six-perspective, deliberately adversarial process still faithfully argued inside the frame it was handed, because nothing in its design asks whether the frame itself is the problem. Catching that took a different kind of scrutiny than the process itself provides — stepping outside the debate to ask if the debate was even about the right question. That's a rarer and harder skill than running a good pressure test: noticing when a good pressure test still isn't enough.

## Next steps

Run the ten-video manual transcript test Olympus's second Edict recommended before building anything else. Olympus itself has been updated to name this blind spot directly, so a future run at least surfaces the question rather than silently inheriting whatever scope it's handed.
