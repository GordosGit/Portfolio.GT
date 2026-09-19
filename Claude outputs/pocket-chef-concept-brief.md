# Pocket Chef (PoC scope)

**One-liner:** Click to save a YouTube recipe video, and AI reads its transcript to automatically catalog the ingredients and steps — no manual tagging, no other platforms yet. Instagram/Facebook import and the conversational "pocket chef" companion are real parts of the vision, deliberately pushed to later phases so this PoC can prove the one thing that actually matters first: can AI do the cataloging work well enough that "quick click, done" is real?

## Problem

You and your wife are constantly finding recipe videos worth trying — on YouTube, Facebook Shorts, Instagram — and saving them to a shared family Discord channel. The saving habit works fine; the retrieval doesn't. There's no structure, no search, no way to ask "what have we saved that's like X," so the channel has become a write-only archive. A manual-tagging fix was considered and rejected: the whole point is a quick click with nothing else to remember, and any process that depends on both of you staying disciplined about tagging will degrade the same way any manual habit does once the novelty wears off.

## Solution

The PoC narrows to one source — YouTube — and one job: prove that AI can catalog a recipe well enough, automatically, that neither of you has to do any manual work beyond saving the link. When a video gets saved, the app pulls its transcript (what's actually said in the video, not just whatever the creator wrote in the description) along with its title and metadata, and an AI parses that transcript into structured ingredients, steps, and searchable attributes like cuisine and protein. The original video stays attached for reference. Once the catalog exists, a lightweight conversational layer sits on top of it — "I feel like asian beef tonight" returns a few fitting matches from what's actually been saved — since that's cheap to build once the catalog is real and it's the part that makes this feel different from a spreadsheet.

Explicitly out of scope for this PoC, on purpose: Instagram and Facebook import (the platforms with no official video/transcript access and real Terms of Service exposure), any audio-transcription or on-screen-text pipeline (unnecessary for now — YouTube captions cover the same need without that engineering lift), and the interactive, voice-driven "pocket chef" cooking companion. Those all stay part of the longer-term vision; none of them are what this build is trying to prove.

## Target audience

Just the two of you, for this PoC. The scope stays intentionally small — one platform, one household — so the only thing being tested is whether AI-driven cataloging actually works well enough to trust, before any question about wider audiences, other platforms, or a paid product gets asked.

## Differentiation

Existing recipe-import apps (Mela, Pestle, Samsung Food, Crouton, Plan to Eat) mostly parse the caption or description text a creator wrote — not the substance of what's actually said or shown in the video. Many cooking videos narrate ingredients and technique in far more detail than they write in a caption, so pulling from the transcript directly, rather than the written blurb, is a meaningfully more complete source than what the incumbents use — even scoped to just YouTube. That's the wedge this PoC is actually testing.

The bigger differentiation — a conversational kitchen assistant instead of a searchable database, and eventually a free/paid split where the assistant layer is the thing worth paying for — is still real and still worth building toward. It's just not what this phase is trying to prove, and folding it into the PoC now would repeat the exact scope creep that made the idea worth rescoping in the first place.

## Key risks

- **Transcript access risk (narrowed, not eliminated).** YouTube's official Captions API requires the channel owner's consent to pull a transcript, so in practice this relies on the same widely-used, unofficial method most transcript tools use. That's meaningfully lower risk than the Instagram/Facebook scraping the original scope depended on, but it's not a fully sanctioned, no-strings API either.
- **Transcript completeness risk (new).** Not every recipe video is fully narrated — some lean on on-screen text, music, or quick cuts with little spoken detail. Transcript-only extraction will sometimes come back thin or incomplete, especially on heavily-edited short-form content. That's a known gap for this phase, not something to solve now.
- **Scope-discipline risk, in both directions.** The deferred pieces (other platforms, the companion, monetization) are real ambitions worth protecting on the roadmap — losing track of them entirely would be a loss. But the opposite failure is just as live: quietly pulling one of them back into "the PoC" before the core catalog-and-suggest loop is actually proven, which is the same drift that triggered this rescoping in the first place.
- **Minor catalog hygiene.** With two people saving videos independently, occasional duplicate saves or off-topic entries are likely. Low-stakes compared to the risks above, but worth a simple duplicate check rather than ignoring it.

## Open question for validation

Can transcript-only extraction from YouTube videos alone produce a catalog accurate and complete enough, across what you actually save, to make "quick click, AI catalogs it, done" true in practice — or will thin transcripts force enough manual cleanup that it undercuts the premise the whole rescoping rests on?
