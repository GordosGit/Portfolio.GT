---
name: job-fit-analyzerinator
description: "Compares Gord's resume against a job posting to assess fit, ATS pass probability, gaps, and drafts a tailored cover letter. Use this instead of the default resume-job-fit-analyzer skill for Gord's job search. Trigger on a job posting link or description, or phrases like 'am I a good fit for this role', 'what's my ATS score', 'write me a cover letter for this job'."
---

# Resume / Job Posting Fit Analyzerinator (Gord's version)

Compares a resume against a job posting and produces a fit assessment, a list of gaps/open questions, and an ATS pass probability with reasoning. What happens after that is gated by the ATS score (see Step 4) — a strong match moves straight to suggested edits and a cover letter, a borderline match goes through a gap-clarification and tailoring conversation before any cover letter is written, and a weak match stops without a cover letter at all.

## Step 1: Locate the resume

Look for the resume first among the project's files (check project knowledge / attached files). If nothing is found:
- Check the current conversation for an uploaded file.
- If still nothing, ask the user to attach or paste it — don't guess at their background or proceed without it.

Do not fabricate resume content. If a resume field is ambiguous (e.g. unclear years of experience, unlabeled skill), note it as a gap/question rather than assuming.

## Step 2: Get the job posting

If the user gave a URL, fetch it (web_fetch). If the page is behind a login wall or fails to load, ask the user to paste the job description text instead — don't proceed on a guess about what the role likely says.

Extract from the posting:
- Job title, seniority level, and team/department if listed
- Required qualifications (hard requirements — years of experience, degrees, certifications, specific tools/languages)
- Preferred/nice-to-have qualifications
- Core responsibilities
- Any repeated keywords or phrases (these are usually ATS-weighted — title variants, tool names, methodologies, certifications)
- Salary range, location/remote policy, and anything unusual (e.g. required work authorization, security clearance) — flag these even though they're not part of the fit score

## Step 3: Compare resume to posting

Build the comparison directly against the extracted requirements — don't summarize the resume in isolation. For each required and preferred qualification, mark it as: **Met**, **Partially met**, or **Gap**.

## Step 4: Produce the output

Always produce these two sections first, in order:

### 1. Fit Summary
2-4 sentences: overall read on how strong a match this is and whether applying is worth the time. Be honest — don't inflate a weak match to be encouraging. If it's a stretch, say so plainly and note what would make it a stronger case.

### 2. ATS Pass Probability
Give a percentage estimate (e.g. "~60%") plus 2-3 sentences of reasoning grounded in specifics: keyword overlap with the posting, title/seniority alignment, whether hard requirements are clearly met on the resume as written. Be explicit that this is an estimate based on keyword/requirement matching, not a guarantee — actual ATS systems vary by employer.

Rough calibration to reason from (don't show this scale to the user, just use it to calibrate):
- 80%+: nearly all required qualifications clearly present, strong keyword overlap, title/seniority match
- 60-79%: most required qualifications present but some gaps or weak keyword coverage
- 59% and below: multiple hard requirements missing or unclear, or a significant seniority/title mismatch

This percentage determines everything that follows. Branch immediately:

### Branch: 80% or higher — proceed directly
Continue in the same response to "Suggested Edits" and then "Cover Letter" below. No gate, no extra questions needed first (though genuine ambiguities can still be flagged as noted in Gaps — subject to the gap-blindness rule below when it comes to the cover letter itself).

### Branch: 60-79% — clarify gaps, tailor, then confirm before the cover letter
Do not write a cover letter yet. Instead:

1. **Summarize the gaps** — a short list (3-8 items, prioritized by how much they matter to this posting) combining real gaps (requirements the resume doesn't show evidence of) and ambiguities worth checking (e.g. "Your resume doesn't show cloud certifications — do you have one that's just not listed?").
2. **Go through the gaps one at a time.** Ask a clarifying question about a single gap item, wait for the user's answer, then move to the next. Don't dump every question in one message — this is a back-and-forth, not a form. The goal of this conversation is to actually try to close each gap: find out if the resume is just missing evidence that genuinely exists (add it), or if it's a real, unclosable gap (leave it).
3. Once the gaps are addressed, move to **Suggested Edits to Raise ATS Probability** (same content/spec as below), folding in anything learned from the clarifying questions. Never suggest adding a skill or claim the resume doesn't support — flag it as a gap instead.
4. **Ask the user directly** whether the tailoring is complete (e.g. "Does that cover it, or is there more you want to adjust?"). Only once they confirm it's complete, write the **Cover Letter** (per the spec below).

### Branch: 59% or lower — not worth pursuing
State plainly in the Fit Summary that this isn't a good fit worth the time and effort right now. Stop there — do not produce Suggested Edits or a Cover Letter, and don't try to talk the user into a weak application. The point of the low score is to save them the effort, not to find a way to force it through.

### Suggested Edits to Raise ATS Probability
(Reached only via the 80%+ branch directly, or the 60-79% branch after the gap conversation.)

Concrete, specific edits — not generic advice. For each suggestion, name the exact bullet/section to change and what to change it to (or the keyword to insert and where it naturally fits). Examples of the right level of specificity:
- "Your 'Skills' section lists 'data analysis' — the posting specifically says 'SQL' and 'Tableau' by name three times. Add both explicitly if you've used them."
- "Retitle your most recent role's bullet from 'Led team projects' to 'Led cross-functional projects' — the posting uses 'cross-functional' twice."

Never suggest adding a skill or claim the resume doesn't support — flag it as a gap instead, and let the user decide whether to address it honestly (e.g. by gaining the skill, reframing adjacent experience, or leaving it as-is).

### Cover Letter
(Reached only via the 80%+ branch, or the 60-79% branch once the user confirms tailoring is complete.)

**Gap-blindness rule (standing rule):** gaps get one real shot at being closed — through the clarifying conversation in the 60-79% branch, or through whatever ambiguities get flagged in the 80%+ branch. Whatever remains open, unresolved, or unclosable after that must never be mentioned, hinted at, acknowledged, or pre-emptively defended against in the cover letter itself — not even obliquely (e.g. no "while I haven't worked directly with X, I..."). The cover letter is built only on strengths and on gaps that were actually closed during the conversation. Do not do the employer's screening job for them by pointing out where the candidate falls short. If asked whether to address a remaining gap in the letter, default to leaving it out and say so plainly — that conversation belongs in the interview, not the cover letter.

Before writing, look for a file named **MyVoice.md** among the project's files/attachments.

- **If MyVoice.md is found and has content**, read it and write the letter in that voice: plain, human prose. No AI jargon, no corporate or generic phrasing ("I am excited to apply," "proven track record," "passionate about"), no bullet-heavy or over-formatted structure — just paragraphs, like something an actual person wrote in one sitting. Not wordy — trim anything that isn't doing work. Match MyVoice.md's vocabulary, sentence length, and tone rather than defaulting to a generic template.
- **If MyVoice.md is not found, or is empty**, fall back to: a short cover letter (3-4 short paragraphs, under ~300 words) in a warm, professional voice — not stiff or corporate, not gushing. Add a note to the user at the end (not in the letter itself) that this used a general default voice since no MyVoice.md content was found, and can be refined once one is added.

In both cases: ground the letter in 1-2 specific, true details from the resume that connect to the posting's actual priorities, rather than restating the resume. Avoid generic filler ("I am excited to apply for this position"), open with something specific to the role or company instead. Close with a simple, direct call to next steps.

## Formatting notes

- Use clear headers so the user can scan the response.
- Keep the whole response focused — this isn't a research report, it's a decision-support doc for one specific application.
- Respect the branch for the ATS score: don't produce Suggested Edits or a Cover Letter early, and don't skip the gap-clarification conversation in the 60-79% branch by rushing straight to a cover letter.
- Respect the gap-blindness rule for the cover letter in every branch: unresolved gaps get addressed by the candidate in the interview, never surfaced by Claude in the letter.