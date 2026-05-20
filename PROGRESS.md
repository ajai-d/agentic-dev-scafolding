# PROGRESS — Course Journal

> A running log of everything we've done, in order. Read top-to-bottom to retrace our steps.
> Updated at the end of every lesson or milestone.

---

## 2026-05-19

### ✅ Course kickoff
- Agreed on the learning charter: ground-zero → autonomous multi-agent coding.
- Confirmed teaching style: simple language, 8th-grader friendly, hands-on every lesson.
- **Artifact:** `00-course.md` (originally `00-learning-charter.md`, merged with curriculum in v1.0)

### ✅ Lesson 0 — What is Agentic SDLC, really?
- Built the mental model.
- Learned 5 core words: **Agent, Spec, Context, Tool, Loop**.
- Learned 3 autonomy levels: **Interactive → Autopilot → Fleet**.
- Internalized the golden rule: *Humans set intent. Agents execute. Humans govern outcomes.*
- **Artifact:** `01-lesson-0-what-is-agentic-sdlc.md`

### ✅ "Try It Yourself" — first spec draft
- Learner drafted Intent / Execution / Governance for a real task.
- Teacher gave feedback on leaks (how-in-what, learning-as-execution, vague pass bar).
- Learner rewrote and improved significantly.

### ✅ Running use case locked in
- Chose **"Top 5 Stocks" MCP demo** as the example for the entire course.
- Stack chosen: **Python (MCP server) + TypeScript (client + minimal SPA)**.
- Data source: Yahoo Finance (free, no key) for Step 2.
- **Artifact:** `02-running-use-case.md`

### ✅ Agent memory hygiene introduced
- Discussed why externalizing context matters in Agentic Dev.
- Set up the three memory files: `PROGRESS.md`, `DECISIONS.md`, `NEXT.md`.

### 🔄 Working model corrected: "Tell Me What To Tell You"
- Teacher initially executed Lesson 1 setup unilaterally — learner course-corrected.
- New rule: **learner directs via prompts, agent executes, lesson `.md` is the prompt playbook.**
- Wiped earlier unilateral work (local `.git`, extra files, GitHub repo) for a true clean slate.

### ✅ Lesson 1 — Concept #1 (Git Repository)
- Learner sent the Concept #1 prompt.
- Agent verified remote was deleted, then ran `git init` + `main` branch on the clean folder.
- Result: fresh repo, branch `main`, 0 commits.
- Concept documented in `03-lesson-1-setup-repo.md` (with the prompt that produced it).

### ✅ Lesson 1 — Concept #2 (`.gitignore`)
- Learner sent the Concept #2 prompt (Python + Node + editors + OS + secrets + agent scratch).
- Agent drafted the file (114 lines, 4,214 bytes), shown for review before commit.
- Learner approved.
- Committed as `53e9beb chore: add .gitignore (...)`.
- Concept documented in `03-lesson-1-setup-repo.md`.

### ✅ Lesson 1 — Concept #3 (`.gitattributes`)
- Learner sent the Concept #3 prompt (LF default, Windows-script CRLF exception, binaries marked).
- Agent drafted the file (39 lines, 2,282 bytes), shown for review.
- Learner approved.
- Committed as `03292d0 chore: add .gitattributes (line endings, binary types)`.
- Renormalize was run — no second commit needed (only `.gitignore` was tracked and it was already LF-clean). Reported honestly.

### ✅ Lesson 1 — Concept #4 (`LICENSE`)
- Confirmed MIT (per D-007).
- Learner sent the Concept #4 prompt.
- Agent created `LICENSE` (21 lines, 1,093 bytes), shown for review with SPDX = `MIT`.
- Learner approved.
- Committed as `chore: add MIT LICENSE`.

### ✅ Lesson 1 — Concept #5 (`README.md`)
- Learner sent the Concept #5 prompt (8 explicit sections).
- Agent created `README.md` (54 lines, 2,611 bytes), shown for review.
- Learner approved.
- Committed as `docs: add README.md`.

### ✅ Course doc consolidated; curriculum locked at v1.2
- v1.0: Researched 2025–2026 best practices; merged charter + curriculum; added 6 lessons from initial audit (D-008–D-013).
- v1.1: Added Tools & Skills coverage — 0.5, 1.6, 4.2 (renamed), 6.5 (D-014).
- v1.2: Incorporated GH-300 reference guide — added 0.4, 5.8; enriched 0.2, 0.3, 5.1, 5.5, 8.1 (D-015).
- Curriculum at v1.2 had ~38 lessons across 8 phases.

### ✅ Switched to Fast Track curriculum (v2.0)
- Learner found v1.2 overwhelming.
- Created **Fast Track v2.0** at `00-course.md`: 6 phases, 10 lessons, ~6–8 hours (D-016).
- Filed v1.2 as `90-reference-comprehensive-curriculum.md` for future deep dives.
- Fast Track is now the active learning path.

### ✅ Replaced prompt anatomy with 6-element agentic framing (D-017)
- Learner challenged the "goal + constraints + verification" framing and the 4S Framework.
- Honest review: both were partial truths; 4S is dated for agentic work.
- Adopted a **6-element anatomy**: Goal · Context · Specification · Sources · Guardrails · Verification.
- 4S and comment-driven development kept as labeled side notes (apply to inline completions only).

### ✅ Promoted Path-specific instructions, Prompt files, Skill packaging into Fast Track (D-018)
- Learner asked to pull these from the reference into the active curriculum.
- Path-specific instructions → folded into 1.2 (Agent Contract) as a third instruction layer.
- Prompt files → new 1.3 *Your first skill — prompt files.*
- Skill packaging → new 5.3 *Skill packaging — bundle instructions + prompt + tool.*
- Fast Track bumped v2.0 → **v2.1**. Now 12 lessons, ~7–9 hours.

### ✅ Added Lesson 3.3 — Review It (D-019)
- Honest audit surfaced a real gap: the "humans govern outcomes" half of the Golden Rule had no dedicated teaching.
- Added **Lesson 3.3 — Review It (Govern Agent Output)** with: 5 AI-specific traps, 4-question review checklist, mindset shift, hands-on with a deliberately-flawed PR + Copilot Code Review.
- Fast Track bumped v2.1 → **v2.2**. Now 13 lessons, ~8–10 hours.

---

## Next up
👉 **Lesson 1 — Setting Up Your Learning Repo**, restarted under the new model.
We're on **Concept #1: The Git Repository.**
See `NEXT.md` for the exact pick-up point.
