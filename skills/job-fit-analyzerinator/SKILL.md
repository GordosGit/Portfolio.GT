---
name: "job-fit-analyzerinator"
description: "Compares a job posting against both of Gord's current resumes (Business Analyst and Product Owner), picks the stronger persona, assesses fit, ATS pass probability and gaps, then builds a cover letter brief in his voice. Use instead of other job-fit skills for Gord's job search."
---

# Resume / Job Posting Fit Analyzerinator (Gord's version)

Gord applies under two professional personas, each with its own current base resume. This skill scores a job posting against both, picks the stronger persona, and then produces a fit assessment, a list of gaps/open questions, and an ATS pass probability with reasoning for that persona. What happens after that is gated by the ATS score (see Step 4). A strong match moves straight to suggested edits and a cover letter brief. A borderline match goes through a gap-clarification and tailoring conversation first. A weak match stops without a cover letter at all.

## The two current resumes

| Persona | Current base resume | Skills section leads with |
|---|---|---|
| **Business Analyst (BA)** | `Resume - Business Analyst.docx` | Business Analysis & Design |
| **Product Owner (PO)** | `Resume - Product Owner.docx` | Product & Delivery |

- These two files are the **current** resumes. Always start from them, never from an older company-tailored copy (e.g. "Resume of Gord Turner - Business Analyst - Equitable"), unless Gord explicitly asks.
- The base files are masters. Tailoring for a specific posting goes into a new copy named `Resume of Gord Turner - [Persona] - [Company].docx`, never into the base file, unless Gord says the change should become part of the base.
- Both resumes use the full header address (street, city and postal code). Keep it.
- "Fintech" in the PO summary refers to the lease accounting (IFRS 16) and revenue recognition apps Gord built at Nakisa. It is a supported claim; don't flag it.

## Step 1: Locate the resumes

Look for both current resumes among the project's files (check project knowledge / attached files). If one or both are missing:
- Check the current conversation for uploaded files.
- If only one is found, say which persona is missing and continue with the one you have (skip the persona comparison).
- If neither is found, ask the user to attach them. Don't guess at his background or proceed without a resume.

If Gord names a persona up front (e.g. "run this as PO", "BA only"), load just that resume and skip the persona comparison in Step 3.

Do not fabricate resume content. If a resume field is ambiguous (e.g. unclear years of experience, unlabeled skill), note it as a gap/question rather than assuming.

**Drift check:** the two resumes share the same job history. If the same role has conflicting facts between them (dates, titles, numbers, client names, scope), flag it briefly at the top so Gord can fix the base files. Differences in emphasis or wording are fine and expected.

Also check `claude/JobMatches.md` and `claude/Applications Sent Log.md` for the posting. If it was already scored, mention the earlier score (and persona, if recorded). If it was already applied to, say so before doing anything else.

## Step 2: Get the job posting

If the user gave a URL, fetch it (web_fetch). If the page is behind a login wall or fails to load, ask the user to paste the job description text instead. Don't proceed on a guess about what the role likely says.

Extract from the posting:
- Job title, seniority level, and team/department if listed
- Required qualifications (hard requirements: years of experience, degrees, certifications, specific tools/languages)
- Preferred/nice-to-have qualifications
- Core responsibilities
- Any repeated keywords or phrases (these are usually ATS-weighted: title variants, tool names, methodologies, certifications)
- The company's stated mission, values, or culture pages (e.g. a named values statement). Gord's letters open by reacting to these, so capture them.
- Salary range, location/remote policy, and anything unusual (e.g. required work authorization, security clearance, AI use in recruitment). Flag these even though they're not part of the fit score.

## Step 3: Pick the persona, then compare

### 3a. Persona comparison (skip if Gord named a persona or only one resume is available)

Do a quick pass of the posting against both resumes and show a compact table before anything else:

| | BA | PO |
|---|---|---|
| ATS estimate | ~% | ~% |
| Title/seniority match | Strong / Partial / Weak | Strong / Partial / Weak |
| Top 2 gaps | ... | ... |

Then choose the **lead persona**:
- The higher ATS estimate wins. Say which one and why in one sentence.
- If the two estimates are within ~5 points (common with hybrid "Product Owner / Business Analyst" postings), ask Gord which persona to lead with and wait for his answer before continuing.
- If both are 59% or lower, go straight to the not-worth-pursuing branch in Step 4 and stop.

Everything after this point uses only the lead persona's resume. Don't run two full analyses.

### 3b. Detailed comparison

Build the comparison directly against the extracted requirements, using the lead persona's resume. Don't summarize the resume in isolation. For each required and preferred qualification, mark it as: **Met**, **Partially met**, or **Gap**.

## Step 4: Produce the output

Always produce these two sections first, in order, and name the lead persona in the Fit Summary.

### 1. Fit Summary
2-4 sentences: overall read on how strong a match this is and whether applying is worth the time. Be honest. Don't inflate a weak match to be encouraging. If it's a stretch, say so plainly and note what would make it a stronger case.

### 2. ATS Pass Probability
Give a percentage estimate (e.g. "~60%") plus 2-3 sentences of reasoning grounded in specifics: keyword overlap with the posting, title/seniority alignment, whether hard requirements are clearly met on the resume as written. Be explicit that this is an estimate based on keyword/requirement matching, not a guarantee. Actual ATS systems vary by employer.

Rough calibration to reason from (don't show this scale to the user, just use it to calibrate):
- 80%+: nearly all required qualifications clearly present, strong keyword overlap, title/seniority match
- 60-79%: most required qualifications present but some gaps or weak keyword coverage
- 59% and below: multiple hard requirements missing or unclear, or a significant seniority/title mismatch

This percentage determines everything that follows. Branch immediately:

### Branch: 80% or higher, proceed directly
Continue in the same response to "Suggested Edits" and then the "Cover Letter Brief" below. No gate, no extra questions needed first (though genuine ambiguities can still be flagged, subject to the gap-blindness rule).

### Branch: 60-79%, clarify gaps, tailor, then confirm before the cover letter
Do not start the cover letter yet. Instead:

1. **Summarize the gaps.** A short list (3-8 items, prioritized by how much they matter to this posting) combining real gaps (requirements the resume doesn't show evidence of) and ambiguities worth checking. If the other persona's resume already covers a gap (e.g. the PO resume has launch/GTM bullets the BA resume lacks), say so and suggest borrowing that bullet rather than asking from scratch.
2. **Go through the gaps one at a time.** Ask a clarifying question about a single gap item, wait for the answer, then move to the next. This is a back-and-forth, not a form. When Gord confirms something, draft the resume bullet from only what he actually confirmed. Don't add named partners, numbers, or scope he didn't state; ask instead.
3. Once the gaps are addressed, move to **Suggested Edits to Raise ATS Probability**, folding in anything learned. Never suggest adding a skill or claim the resume doesn't support. Flag it as a gap instead.
4. **Ask directly** whether the tailoring is complete. Only once he confirms, move to the **Cover Letter Brief**.

### Branch: 59% or lower, not worth pursuing
State plainly in the Fit Summary that this isn't a good fit worth the time and effort right now. If both personas were scored, note that neither clears the bar. Stop there. Do not produce Suggested Edits or a Cover Letter, and don't try to talk the user into a weak application.

### Suggested Edits to Raise ATS Probability
(Reached only via the 80%+ branch directly, or the 60-79% branch after the gap conversation.)

Concrete, specific edits, not generic advice. For each suggestion, name the exact bullet/section to change and what to change it to (or the keyword to insert and where it naturally fits). Edits go into the tailored copy for this posting, not the base resume.

Never suggest adding a skill or claim the resume doesn't support. Flag it as a gap instead. Bullets that already exist on the other persona's resume are supported and can be borrowed.

Resume standards (learned on the Employment Hero application and the base resume cleanup):
- **Keep it to 2 pages.** New bullets usually push it over, so pair every addition with a merge or cut of an overlapping bullet, and point out the duplication. The PO resume is already close to the limit.
- **Keep the persona's skills order.** BA leads with Business Analysis & Design; PO leads with Product & Delivery.
- **Plain verbs, no AI drama.** Avoid "Accomplished," "track record," "proven ability," "strategized," "leveraging," "intricate," and colon setups.
- **Gord's own words stay.** "Orchestrated" and "Cultivated" are his words, not AI filler. Don't flag or replace them.
- **The summary is Gord's.** Suggest options, but don't strip his phrasing wholesale. Keep the warmth and his own lines (e.g. "Pride myself on bridging technical teams and business stakeholders," his AI-leader line). If he wants a bold claim, back it with a true fact rather than toning it down.
- Keep the summary age-neutral (no year counts).

When editing a .docx, edit in place, keep his formatting, render to confirm the page count, and deliver the file.

### Cover Letter Brief (Gord writes the letter)
(Reached only via the 80%+ branch, or the 60-79% branch once the user confirms tailoring is complete.)

Before anything else, read **MyVoice.md** from the project. It holds his standing rules, a description of his real voice, the AI patterns to avoid, and his own Employment Hero letter as the reference example.

**Persona emphasis.** Match the proof points to the lead persona:
- **BA:** requirements and discovery, process mapping, UAT and business readiness, finance systems (IFRS 16, rev rec, GL/AP/AR), mentoring BAs, consensus without formal authority.
- **PO:** product vision and roadmap, prioritization, sprint delivery with engineering squads, launches and adoption, post-launch measurement, client-facing ownership (the $1M WrightPlan book).
The company hook and his voice rules are the same for both.

**Default process.** Claude's full drafts score high on AI detectors (69-100% on the Employment Hero letter, even when made "casual"), and rewording by Claude doesn't fix that. So:

1. **Give Gord a brief, not a letter.** List 3-4 points the letter should hit, each as a short plain note of *what* to say, not polished sentences:
   - The company hook: the mission, values, or culture item from the posting or site that he'd react to (use its exact name, and flag it if the name is unconfirmed).
   - 1-2 resume proof points matched to the posting's top priorities and the lead persona, including anything closed during the gap conversation.
   - Any company-specific link (domain overlap, a product they sell).
   - The format reminder: letterhead, To/Date/Subject, "Dear [Company] Hiring Team," "Best Regards," as in the example.
2. **Gord writes the letter.**
3. **Review only.** When he pastes it back, check grammar, typos, facts against the resume, clarity, and anything a hiring manager could misread. Keep his words, rhythm, and quirks ("quite intriguing," "wonderful to hear," "a little hand-holding"). Suggest the lightest fix possible, reusing his words. Never replace his sentences with Claude's. Label items as "must fix" versus "your call." Flag any year counts (e.g. "20 years") since he keeps things age-neutral.

**If he explicitly asks Claude for a full draft**, write it modeled on the MyVoice.md example (reaction-to-company opening, bridge sentences tying each story back to the company, warm slightly formal words, longer loosely built sentences, mission-focused close). Avoid the patterns MyVoice.md lists, and tell him to rework a few sentences in his own words before sending. If he reports an AI-detector score, don't keep rewording. Return to the brief-and-review process.

**If MyVoice.md is missing or empty**, fall back to a short (3-4 paragraph, under ~300 words), warm, professional draft, and note that it used a default voice.

**Gap-blindness rule (standing rule):** gaps get one real shot at being closed, through the clarifying conversation in the 60-79% branch or through ambiguities flagged in the 80%+ branch. Whatever remains open must never be mentioned, hinted at, acknowledged, or pre-emptively defended against in the letter, not even obliquely (no "while I haven't worked directly with X..."). This applies both to the brief and to reviewing Gord's letter: if his draft raises a remaining gap, point it out and suggest removing it.

## Step 5: Log the application

When scoring, record the result in `claude/JobMatches.md` with both persona scores (or the one scored) and the lead persona.

When Gord says he's submitted, add a row to `claude/Applications Sent Log.md` (read it, append, write the full file back). Include date, title, company, location, req #, URL, status, and notes: **persona used**, the ATS score before and after tailoring (and the other persona's score if compared), salary, flags, gaps closed and how, the tailored resume file used, and who wrote the cover letter. If the session produced a lesson about his voice, offer to add it to MyVoice.md. If a tailoring change looks worth keeping for future applications, offer to fold it into the base resume for that persona.

## Formatting notes

- Use clear headers so the user can scan the response.
- Keep the whole response focused. This is a decision-support doc for one specific application, not a research report.
- Keep the persona comparison to the compact table plus one sentence.
- Respect the branch for the ATS score: don't produce Suggested Edits or a Cover Letter Brief early, and don't skip the gap-clarification conversation in the 60-79% branch.
- Respect the gap-blindness rule in every branch.
- No em dashes in anything Gord will send.