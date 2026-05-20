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

### ✅ Course doc consolidated; curriculum locked at v1.0
- Researched 2025–2026 best practices (GitHub Copilot CLI/Coding Agent/instructions/setup-steps, `agents.md`, Spec Kit, MCP, multi-agent patterns).
- Decided to drop Spec Kit in favor of the "Interview Me" pattern (D-008).
- Decided Copilot-only (no other AI ecosystems) (D-009).
- Decided cost lessons taught late (D-010), no graduation project (D-011).
- Removed non-Copilot vendor references from all docs (D-012).
- Merged `00-learning-charter.md` and `04-curriculum.md` into single `00-course.md` (D-013).
- Added 6 best-practice lessons from audit: 1.6, 4.4, 5.5, 5.6, 6.3, 7.4.
- Curriculum locked at **v1.0**.

---

## Next up
👉 **Lesson 1 — Setting Up Your Learning Repo**, restarted under the new model.
We're on **Concept #1: The Git Repository.**
See `NEXT.md` for the exact pick-up point.
