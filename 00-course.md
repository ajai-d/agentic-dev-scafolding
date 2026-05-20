# Agentic SDLC Course — Fast Track (v2.0)

> **The simple, focused learning path.** ~10 lessons, ~6–8 hours total, each ending in a commit.
>
> For the deep reference covering every Copilot feature and edge case, see [`90-reference-comprehensive-curriculum.md`](./90-reference-comprehensive-curriculum.md).
>
> **Version:** 2.0 (Fast Track) · **Date:** 2026-05-19 · **Tooling:** GitHub Copilot only.

---

## 1. The Setup

### Who we are
- **You** — a traditional developer learning Agentic SDLC.
- **Me** — your teacher and the agent that executes your prompts.

### The Golden Rule (memorize)
> **Humans set intent. Agents execute. Humans govern outcomes.**

### How we work (the loop)
1. I explain a concept in plain language.
2. I hand you the prompt.
3. You send it.
4. I execute. I show you the result.
5. You approve. I commit. We update the journal.

This is called **"Tell Me What To Tell You."** It is the same shape as **"Interview Me"** (Phase 2 pattern) — *agent-led structured elicitation of human expertise.*

### Running use case
**"Top 5 Stocks" MCP demo** — see [`02-running-use-case.md`](./02-running-use-case.md).
- Step 1: Hardcoded list of 5 stocks.
- Step 2: Real Yahoo Finance API.
- One button. One MCP server. One MCP client. One SPA.

---

## 2. The Six Phases — Roadmap At A Glance

| Phase | Lessons | What you will be able to do at the end |
|---|---|---|
| **1. Mental model** | 2 | Speak the language; understand what an agent really is |
| **2. Spec-driven development** | 2 | Write specs an agent can execute |
| **3. Full SDLC (the Stocks demo)** | 2 | Build + verify a real working app, end-to-end |
| **4. Autonomous agents** | 1 | Hand off an issue, agent ships a PR |
| **5. Multi-agent orchestration** | 2 | Make agents work together (Planner, Coder, Reviewer) |
| **6. Production realities** | 1 | Cost, security, governance — keep it sustainable |

**Total:** 10 lessons, ~6–8 hours.

---

## 3. The Curriculum — Lesson By Lesson

### Phase 1 — The Mental Model

**1.1 What is Agentic SDLC?** *(done — Lesson 0)*
- The Golden Rule.
- The five core words: **Agent · Spec · Context · Tool · Loop.**
- The three autonomy levels: **Interactive → Autopilot → Fleet.**
- The 7 Copilot surfaces (completions, Chat, Inline Chat, Edits, Agent Mode, CLI, GitHub.com) — when to use each.
- Anatomy of a good prompt: **goal + constraints + verification.**

**1.2 The Agent Contract** *(in progress)*
*A repo so well-configured any agent can drop in and work safely.* Covers:
- Foundation files (Git, `.gitignore`, `.gitattributes`, `LICENSE`, `README`) — ✅ already done.
- **Instruction layer**: `AGENTS.md` (universal) + `.github/copilot-instructions.md` (Copilot overlay).
- **Memory layer**: `PROGRESS.md`, `DECISIONS.md`, `NEXT.md` — ✅ already done.
- **Tool layer** preview: what tools and skills mean (deep dive in Phase 3).
- Conventional Commits + PR template + `.env.example`.
- Push to GitHub.
- A tiny "Hello Agent" task to prove the full loop works.

---

### Phase 2 — Spec-Driven Development

**2.1 Why specs are the new source code**
- The power inversion: specs persist, code regenerates.
- The **Interview Me** pattern: the agent asks questions, you answer, the agent compiles a spec.
- Anatomy of a good spec: **Intent · User-visible behavior · Acceptance tests · Out-of-scope · Open questions.**

**2.2 Spec → Tasks → Code**
- Run the interview to produce `specs/001-top5-stocks.md`.
- Have the agent extract a task list from the spec.
- Approve and execute tasks one at a time.

---

### Phase 3 — The Full SDLC (the Stocks Demo)

**3.1 Build it**
- MCP server in Python with one tool: `get_top_stocks` (hardcoded → real Yahoo Finance).
- MCP client in TypeScript.
- One-page SPA with one button.
- End-to-end: click → see 5 stocks.
- Along the way: learn what MCP **tools** really are and how Copilot uses them.

**3.2 Verify it**
- Write a happy-path test (Pytest + Playwright).
- GitHub Actions CI runs it on every PR.
- Watch out for the **tautological test trap** (tests that always pass).
- Open your first real Pull Request → review → merge.

---

### Phase 4 — Autonomous Agents

**4.1 Copilot Cloud Agent — issue → PR**
- Enable Copilot Coding Agent in the repo.
- Open a GitHub Issue with a clean spec.
- Assign it to Copilot.
- Agent ships a draft PR.
- You review session logs, request changes if needed, approve, merge.
- Discover the one thing Cloud Agent **cannot** do: self-merge. Human approval is always required.

---

### Phase 5 — Multi-Agent Orchestration

**5.1 Why & when multi-agent**
- The 5 workflow patterns (in plain language):
  - **Prompt chaining** — do X, then Y, then Z.
  - **Routing** — easy task to cheap model; hard task to smart model.
  - **Parallelization** — review for security and style at the same time.
  - **Orchestrator-workers** — one agent plans, others execute.
  - **Evaluator-optimizer** — implement → test → if failing, iterate.
- When *not* to use multi-agent (it is not always the answer).

**5.2 Build a Planner / Coder / Reviewer team**
- Three **Copilot Custom Agents** with scoped instructions:
  - **Planner** — turns a spec into tasks.
  - **Coder** — implements one task at a time.
  - **Reviewer** — checks the diff before merge.
- Run a small feature through the team end-to-end.

---

### Phase 6 — Production Realities

**6.1 Cost, governance, security, responsible AI** *(one combined practical lesson)*
- **Cost awareness:** plan tiers (Free → Enterprise), premium request multipliers, when to pick which model. Token-Based Billing transition (June 2026) — what is changing.
- **Governance:** CODEOWNERS, branch protection, audit logs, agent labels on PRs.
- **Security:** content exclusions (`.env`, `secrets/**`), prompt-injection awareness, the secure SDLC pipeline.
- **Responsibility:** Microsoft 6 Responsible AI principles in one paragraph + the rule that matters most — **you are the author of record for every line of code you commit, no matter who wrote it.**

---

## 4. What We Deliberately *Do Not* Cover Here

The Fast Track skips topics that are valuable but not foundational. They are all in [`90-reference-comprehensive-curriculum.md`](./90-reference-comprehensive-curriculum.md) if you want them later:

- Path-specific instructions (`.github/instructions/*.instructions.md`)
- Prompt files (`.github/prompts/*.prompt.md`)
- Building production MCP servers from scratch
- Skill packaging (instructions + prompt + tool as one unit)
- Stuck-agent recovery patterns
- Copilot Spaces (grouped context)
- Fleet orchestration (many parallel cloud agents)
- Detailed multi-model strategy
- IP indemnity / duplication detection deep dive

Dip in whenever a real project needs them.

---

## 5. How Each Lesson Is Structured

| Step | What |
|---|---|
| 1 | **What** — concept in plain language |
| 2 | **Why** — why it matters |
| 3 | **Prompt** — the exact words you send |
| 4 | **Why the prompt is good** — the reusable pattern inside it |
| 5 | **Result** — commit hash + one-line outcome |
| 6 | **What you unlocked** — the new capability |

---

## 6. Current State (where we are right now)

- ✅ **Lesson 1.1** — done (Lesson 0 doc).
- 🚧 **Lesson 1.2** — in progress.
  - ✅ Foundation files done (Git, `.gitignore`, `.gitattributes`, `LICENSE`, `README`).
  - ✅ Memory files done (`PROGRESS`, `DECISIONS`, `NEXT`).
  - ⏳ Remaining for 1.2: `AGENTS.md` → `.github/copilot-instructions.md` → Conventional Commits + PR template → `.env.example` → Push to GitHub → Hello Agent task.

See [`NEXT.md`](./NEXT.md) for the very next prompt to send.

---

## 7. Required Tools (One-Time Setup)

| Tool | Status |
|---|---|
| Git, Python 3.10+, Node 20+, GitHub CLI | ✅ |
| VS Code + GitHub Copilot extension | recommended |
| GitHub Copilot subscription | assumed yes |
| MCP Inspector (Phase 3+) | install when needed |

---

## 8. Resume Cold (5 minutes)

If context is ever lost:
1. This file (`00-course.md`) — the agreement + roadmap.
2. [`02-running-use-case.md`](./02-running-use-case.md) — what we are building.
3. [`PROGRESS.md`](./PROGRESS.md) — what has been done.
4. [`DECISIONS.md`](./DECISIONS.md) — why we chose what we chose.
5. [`NEXT.md`](./NEXT.md) — the very next thing to do.

---

*Change history:*
*v2.0 (2026-05-19) — Fast Track curriculum. Replaces v1.2 as the active learning path. v1.2 retained as `90-reference-comprehensive-curriculum.md` for deeper dives.*
