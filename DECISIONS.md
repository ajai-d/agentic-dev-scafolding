# DECISIONS — The "Why" Log

> Every real choice we make gets one short entry here. This is the project's **memory of reasoning** — so anyone (human or agent) can understand *why* the repo looks the way it does.
>
> Format inspired by **ADRs (Architecture Decision Records)** — kept deliberately short.

---

## Template

```
### D-### (YYYY-MM-DD) — <short title>
- **Context:** what situation forced a choice
- **Decision:** what we chose
- **Why:** the main reason
- **Alternatives considered:** what we rejected, and why
- **Revisit when:** condition that would make us reconsider
```

---

## D-001 (2026-05-19) — Use one running example for the whole course
- **Context:** Learner is new to Agentic SDLC and needs a concrete, repeating example.
- **Decision:** Use a **"Top 5 Stocks" MCP demo** across every lesson.
- **Why:** Small enough for a beginner, layered (UI + client + server) so we can grow into multi-agent work, and uses real industry tech (MCP).
- **Alternatives considered:**
  - "Todo app" — too generic, doesn't touch MCP naturally.
  - "Weather app" — fine, but stocks are more visually engaging and have richer follow-on lessons (real-time data, secrets, etc.).
- **Revisit when:** The use case stops teaching new things, or learner wants a different domain.

---

## D-002 (2026-05-19) — Tech stack: Python server + TypeScript client/UI
- **Context:** Need one simple stack to use for all lessons.
- **Decision:**
  - MCP **Server**: Python (official MCP SDK).
  - MCP **Client + SPA UI**: TypeScript + minimal HTML (no framework).
- **Why:** Python MCP SDK is the most mature; TypeScript is the web standard. Skipping frameworks keeps it 8th-grader friendly.
- **Alternatives considered:**
  - All-Python (server + client) — simpler, but loses the realistic web UI experience.
  - All-Node/TypeScript — possible, but Python MCP SDK is currently easier for beginners.
  - React/Next.js for UI — too much ceremony for a one-button page.
- **Revisit when:** A later lesson genuinely needs a framework, or MCP SDKs change significantly.

---

## D-003 (2026-05-19) — Yahoo Finance for real stock data (Step 2)
- **Context:** Step 2 of the use case requires real stock data.
- **Decision:** Use **Yahoo Finance** (free, no API key).
- **Why:** Removes secrets-handling complexity until we're ready to teach it.
- **Alternatives considered:**
  - Alpha Vantage — needs API key, better for teaching secrets management (deferred to a later lesson).
- **Revisit when:** We get to the "secrets management" lesson — at that point we may switch to a key-based API on purpose.

---

## D-004 (2026-05-19) — Externalize context via three memory files
- **Context:** Agentic work loses state when chat context is cleared. Need persistent memory.
- **Decision:** Maintain three files at repo root: `PROGRESS.md`, `DECISIONS.md`, `NEXT.md`.
- **Why:** Matches industry best practice for AI-agent repos: an ADR-style decision log, a journal of progress, and a queue of next actions. Lets any agent or human resume cold.
- **Alternatives considered:**
  - Single mega-file — harder to maintain, mixes concerns.
  - No external memory — fragile; loses everything on context reset.
- **Revisit when:** We adopt a tool-native format (e.g., `AGENTS.md`) in a later lesson — these files may be merged or renamed then.

---

> **Note (2026-05-19):** Entries D-005, D-006, D-007 below were originally added by the teacher during an unauthorized unilateral setup. They've been **kept here as a record of *the choices we will revisit*** when we reach the matching concepts in Lesson 1 under the corrected "Tell Me What To Tell You" model. The learner will approve or override each before any file gets re-created.

---

## D-005 (2026-05-19, pending re-confirmation) — Adopt `AGENTS.md` + `.github/copilot-instructions.md` layering
- **Context:** Need a way to instruct AI agents working in this repo. The open `agents.md` standard provides a cross-tool universal file; GitHub Copilot also reads a native `copilot-instructions.md`.
- **Decision:** Use a **two-layer model**:
  - `AGENTS.md` at repo root → **universal** instructions written to the open `agents.md` standard.
  - `.github/copilot-instructions.md` → **Copilot-specific** overlay.
- **Why:** `agents.md` is the open standard for AI-agent instructions; the GitHub-specific file is what Copilot natively reads. Together they cover this Copilot-centric curriculum without duplication.
- **Alternatives considered:**
  - Only `copilot-instructions.md` — works for Copilot but loses the universal/standard layer.
  - Single combined file — confuses tools that look for specific filenames.
- **Revisit when:** A new dominant standard emerges; or the curriculum scope changes.

---

## D-006 (2026-05-19) — Conventional Commits + Conventional PRs
- **Context:** Need a consistent commit/PR style that humans and agents can both follow.
- **Decision:** Adopt [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`). Use a PR template (`.github/PULL_REQUEST_TEMPLATE.md`) that mirrors the Intent / Execution / Governance model.
- **Why:** Machine-readable history → easier release notes, easier agent review, lower cognitive load.
- **Alternatives considered:** Freeform messages (rejected — too noisy for agentic workflows).
- **Revisit when:** Never, unless we adopt a stricter framework like changesets/semantic-release.

---

## D-007 (2026-05-19) — MIT License
- **Context:** Teaching repo intended to be freely reusable.
- **Decision:** MIT.
- **Why:** Most permissive common license; no friction for learners forking the scaffolding.
- **Alternatives considered:** Apache-2.0 (more verbose; patent grant unneeded here), CC-BY (wrong category — this is code + docs).
- **Revisit when:** Project becomes a commercial product or includes contributions requiring a CLA.

---

## D-008 (2026-05-19) — Use the "Interview Me" pattern for Spec-Driven Development (not Spec Kit)
- **Context:** Phase 2 of the curriculum needs an SDD method. Multiple options exist: plain Markdown, GitHub Spec Kit, the "Interview Me" pattern, GitHub Issues + Copilot Cloud Agent, and others.
- **Decision:** Adopt the **"Interview Me"** pattern as our SDD method. The agent asks structured clarifying questions, the learner answers, the agent compiles a spec.
- **Why:**
  - **Same mechanic as "Tell Me What To Tell You"** — the learner already knows the flow; reusing the muscle accelerates Phase 2.
  - **Toolkit-free** — just Markdown + GitHub Copilot + good questions.
  - **Teaches the principles** (intent → acceptance → scope) directly, not the slash-commands of a specific toolkit.
  - Toolkits (Spec Kit, Issues+Cloud Agent) become *accelerators* introduced later — not foundations.
- **Alternatives considered:**
  - **GitHub Spec Kit** — powerful but opinionated, slash-command-locked, requires `uv` + extra install. Defer to later as an "upgrade."
  - **Plain Markdown specs** — too unstructured; solo devs miss edge cases without interview-style probing.
  - **Issues + Cloud Agent** — fine for execution, but Issues weren't designed as specs and don't enforce structure.
- **Revisit when:** Working in a team/org that has already standardized on Spec Kit; or after Phase 2 is complete and the learner wants to compare toolkits.

---

## D-009 (2026-05-19) — Copilot-only curriculum
- **Context:** Phase 6 (multi-agent orchestration) could have used multiple AI ecosystems for variety. Other tools also exist for the broader agentic landscape.
- **Decision:** Stay **GitHub Copilot-only** across the entire curriculum. Use Copilot Chat, Copilot CLI, Copilot Cloud Agent, and Copilot Custom Agents for everything — including multi-agent work.
- **Why:** Reduces tool sprawl, keeps cognitive load low, focuses depth over breadth, and aligns with the learner's existing subscription/tooling. Patterns from the broader industry (e.g., the "Interview Me" pattern, the five multi-agent workflow patterns) are still borrowed where useful, but **implementation is Copilot-only**.
- **Alternatives considered:** Multi-vendor coverage (rejected — out of scope for a foundation course); brief modules on other ecosystems (rejected — adds tool surfaces to learn).
- **Revisit when:** Learner wants to compare ecosystems after completing the Copilot curriculum.

---

## D-010 (2026-05-19) — Cost/economics taught late (Phase 8 only)
- **Context:** Premium request economics could be introduced early (Phase 0) as a mental model, or late (Phase 8) as a production concern.
- **Decision:** **Late only.** No cost content in Phase 0; full coverage in Phase 8.
- **Why:** Avoids overwhelming a beginner with billing details before they understand the tools. Cost makes more sense once the learner has felt the agentic workflow firsthand.
- **Alternatives considered:** Both (rejected — adds early friction). Early only (rejected — premature without context).
- **Revisit when:** Never, unless the learner reports unexpected costs during Phases 1–7.

---

## D-011 (2026-05-19) — No graduation project
- **Context:** Phase 8 originally proposed a "graduation project" — applying the full scaffolding to a brand-new project.
- **Decision:** **No graduation project.** Course ends after Phase 8.3 (team workflows & governance).
- **Why:** Learner prefers to apply skills to real projects of their own choosing rather than a prescribed capstone.
- **Alternatives considered:** Optional graduation project (rejected — adds maintenance burden to the curriculum). Open-ended "now go build" guidance (kept implicit; no formal lesson).
- **Revisit when:** Learner requests a guided capstone later.

---

## D-012 (2026-05-19) — Tooling scope = GitHub Copilot only; non-Copilot vendor names removed from curriculum/lesson docs
- **Context:** The curriculum draft cited specific non-Copilot vendors and tools when referencing patterns we borrow from. Learner requested removing those vendor references while keeping the underlying patterns.
- **Decision:**
  - **Patterns** are kept (Interview Me, verification-first, the five multi-agent workflow patterns, etc.) — described in vendor-neutral language.
  - **Tooling references** to non-Copilot ecosystems are removed from curriculum and lesson docs.
  - `.gitignore` keeps defensive entries for common third-party agent scratch folders so the repo stays safe even if a future user runs other tools — but the curriculum does not teach those tools.
- **Why:** Maintain a single, focused tool surface (GitHub Copilot) for the learner, while still benefiting from industry-wide patterns.
- **Alternatives considered:** Strip patterns entirely (rejected — they're vendor-neutral concepts and provide value); cite all vendors for completeness (rejected — adds noise and tool surfaces to track).
- **Revisit when:** Scope expands beyond GitHub Copilot.

---

## D-013 (2026-05-19) — Merge charter + curriculum into a single document; lock curriculum at v1.0
- **Context:** Two separate top-level documents (`00-learning-charter.md` and `04-curriculum.md`) created confusion about where to look for what. A best-practices audit also surfaced 6 missing lessons.
- **Decision:**
  - Merge both files into a single `00-course.md` (charter + full curriculum + decisions summary + resume guide).
  - Delete `00-learning-charter.md` and `04-curriculum.md`.
  - Add 6 lessons surfaced by the audit: 1.6 (Issue templates), 4.4 (MCP in Copilot), 5.5 (Security threat model), 5.6 (Handling stuck agents), 6.3 (Copilot Spaces), 7.4 (Copilot Code Review).
  - Lock the curriculum at **v1.0**. Future changes require a new version + a new decision entry.
- **Why:**
  - Single source of truth removes "which file do I read?" friction.
  - Audit-driven additions close the only gaps the research surfaced.
  - Locking v1.0 prevents endless drift and creates a real milestone.
- **Alternatives considered:**
  - Keep both files and add cross-references (rejected — still two files to maintain).
  - Reject some audit additions (rejected by learner — all 6 accepted).
- **Revisit when:** A major change to the curriculum is requested → bump to v1.1 and log the diff.

---

## D-014 (2026-05-19) — Add explicit "Tools & Skills" coverage; bump curriculum to v1.1
- **Context:** Learner asked: *"What about tools and skills? I don't see them in the curriculum."* The v1.0 audit covered MCP infrastructure but never named "tools" or "skills" as first-class concepts, and missed Copilot's native **prompt files** (`.github/prompts/*.prompt.md`) entirely.
- **Decision:**
  - Add **0.4 — Tools, Skills & the Agent's Toolbox** (conceptual lesson).
  - Add **1.6 — Prompt files** (Copilot's reusable named-prompt feature).
  - Rename **4.2** from "Refactor server with FastMCP" to **"Build your own MCP tools — designing a tool well"** to foreground tool authorship.
  - Add **6.5 — Skill packaging in the Copilot ecosystem** (instructions + prompt file + MCP tool bundled as one reusable skill).
  - Bump curriculum from **v1.0 → v1.1**. Renumber downstream Phase 1 lessons (1.6 → 1.7, 1.7 → 1.8, etc.).
- **Why:** "Tools" and "skills" are first-class concepts in agentic AI vocabulary; teaching MCP without explicitly teaching what a tool *is* leaves a foundational gap. Prompt files are a real Copilot feature that turns reusable prompts into skill primitives — they're the lowest-friction way to learn skill packaging before MCP work begins.
- **Alternatives considered:**
  - Defer skill packaging to a later phase (rejected — needs to be visible early as a mental model).
  - Skip prompt files (rejected — they're the simplest "skill" Copilot supports and a natural bridge to Custom Agents + MCP).
  - Make 4.2 about both FastMCP best practices *and* tool design separately (rejected — too granular; one combined lesson is cleaner).
- **Revisit when:** Copilot's prompt-file feature changes substantially, or a new skill-packaging format emerges.

---

## D-015 (2026-05-19) — Incorporate GH-300 reference material; bump curriculum to v1.2
- **Context:** Learner shared a GitHub Copilot Mastery (GH-300 certification prep) guide and asked to incorporate any missing concepts — explicitly excluding the cert-prep apparatus (practice exam, exam tips). The audit surfaced ~11 gaps in v1.1.
- **Decision:** Adopt all 11 missing concepts as either new lessons or enrichments of existing lessons. Bump from **v1.1 → v1.2**.
  - **New lessons (2):**
    - **0.4** Chat power moves — slash commands + context references.
    - **5.8** Microsoft's 6 Responsible AI principles.
  - **Enriched lessons (5):**
    - **0.2** expanded to cover all 7 Copilot surfaces (completions, Chat, Inline Chat, Edits, Agent Mode, CLI, GitHub.com).
    - **0.3** added 4S Framework (Single, Specific, Short, Surround) and comment-driven development.
    - **5.1** added "tautological test trap" warning.
    - **5.5** expanded to include content exclusion patterns, duplication detection filter, IP indemnity prerequisites, and the secure SDLC pipeline.
    - **8.1** added plan tiers (Free / Pro / Pro+ / Business / Enterprise) and the Token-Based Billing transition (effective June 1, 2026).
- **Why:** The GH-300 reference is the most comprehensive working inventory of Copilot ecosystem topics. Skipping these would leave gaps in *daily-driver fluency* (slash commands, context references), *governance* (content exclusions, IP indemnity), and *responsibility* (the 6 principles).
- **Alternatives considered:**
  - Adopt only the doing-better topics (rejected — learner explicitly chose "all missing concepts").
  - Defer governance topics to a v2.0 (rejected — they're foundational, not advanced).
  - Restructure into a cert-prep curriculum (rejected — learner doesn't care about the cert).
- **Revisit when:** Copilot launches new surfaces, plan tiers shift again, or the Token-Based Billing rollout (June 2026) materially changes economics.

---

## D-016 (2026-05-19) — Switch active learning path to a Fast Track curriculum (v2.0); file v1.2 as reference
- **Context:** Learner reviewed the comprehensive v1.2 curriculum (8 phases, ~38 lessons, ~21–24 hours) and found it overwhelming. Wanted a simpler curriculum focused on **core concepts only**: spec-driven development, agentic dev basics, full SDLC, autonomous agents, multi-agent orchestration, plus "anything I'm missing."
- **Decision:**
  - Create a **Fast Track curriculum** (`00-course.md` v2.0) — 6 phases, **10 lessons**, ~6–8 hours total.
  - Rename the existing comprehensive curriculum to `90-reference-comprehensive-curriculum.md` (filed at the back of the repo).
  - Fast Track is the **active learning path**. Comprehensive is a **deep reference** to dip into when a real project needs more depth.
  - Topics covered in Fast Track: agent loop & surfaces, agent contract (instructions + memory + tools), Interview Me spec pattern, spec→tasks→code, full SDLC build & verify, Cloud Agent, 5 multi-agent patterns, Custom Agents (Planner/Coder/Reviewer), and one combined "production realities" lesson covering cost/governance/security/responsibility.
  - Topics deferred to reference: path-specific instructions, prompt files, MCP server authoring from scratch, skill packaging, stuck-agent recovery, Copilot Spaces, fleet orchestration, multi-model strategy detail, IP indemnity deep dive.
- **Why:**
  - Cognitive load — 38 lessons feels like a course; 10 lessons feels like a journey.
  - Most learners will never need the deep reference *until they need it*; better to have it available than mandatory.
  - The skipped topics are still 1 file away — discoverable, never lost.
- **Alternatives considered:**
  - Trim v1.2 in place (rejected — destroys the reference value).
  - Keep two separate active curricula (rejected — re-creates the confusion v1.0 had with the original charter+curriculum split).
  - Single 6-lesson minimal curriculum (rejected — under-serves the SDLC and multi-agent topics the learner explicitly called out).
- **Revisit when:** Learner finishes Fast Track and wants to deepen, *or* asks to swap back to the comprehensive version.
