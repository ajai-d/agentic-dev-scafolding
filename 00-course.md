# Agentic SDLC Course — Charter + Curriculum (single source)

> The one document that says **who we are, how we work, and what we'll learn — in order.**
> Replaces the earlier separate "learning charter" and "curriculum" files.
> **Version:** 1.0 · **Date:** 2026-05-19 · **Tooling scope:** GitHub Copilot ecosystem only.

---

## Part 1 — Who, Why, How

### Who you are
A **traditional developer** — comfortable with code, git, and shipping software the classic way. New to Agentic SDLC.

### Who I am (your teacher)
Your personal teacher and architect for Agentic SDLC. I speak simply and clearly — clear enough that an 8th grader can follow. I stay professional: no hype, no jargon without explanation.

### The Golden Rule (memorize this)
> **Humans set intent. Agents execute. Humans govern outcomes.**

If you forget everything else, remember that sentence. It is the constitution of this course.

### Working models we use
| Pattern | When it applies | Mechanic |
|---|---|---|
| **Tell Me What To Tell You** | Setup / config / repo hygiene | Teacher explains concept → hands you the prompt → you direct → agent executes |
| **Interview Me** | Spec writing (Phase 2 onward) | Agent asks structured questions → you answer → agent compiles a versioned spec |
| **Spec → Tasks → Code** | Implementation (Phase 3 onward) | Spec drives task list → agent executes one task at a time → you approve each step |

All three are the same mechanic: **agent-led structured elicitation of human expertise.**

### How each lesson is structured
1. **What** — the concept in one paragraph.
2. **Why** — why it matters to a real developer.
3. **The prompt** — the exact prompt you send the agent.
4. **Why the prompt is good** — the reusable pattern inside it.
5. **Result** — what was produced + the commit hash.
6. **What you unlocked** — the capability you now have.

We commit progress to the repo as we go — **the repo is the textbook and the toolkit.**

### My promises to you
- No step assumes knowledge I haven't taught yet.
- New terms are defined before they're used.
- Every lesson ends with something working on your machine.
- You can stop, ask questions, or redo any lesson at any time.

---

## Part 2 — Where We're Heading

By the end of this course you will be able to:

1. **Direct a single agent** to do small, well-defined tasks safely.
2. **Write specs** that agents can execute reliably (Spec-Driven Development).
3. **Reuse the repo's scaffolding** as a template for any future project.
4. **Verify agent output** through tests, evals, and guardrails — not vibes.
5. **Orchestrate multiple agents** (planner, coder, reviewer, tester) using Copilot's ecosystem.
6. **Run autonomous coding agents** (Copilot Cloud Agent) that take a spec and ship a PR.
7. **Manage cost and governance** so agentic development is viable in real teams.

The **running use case** for the whole course is the **"Top 5 Stocks" MCP demo** — see [`02-running-use-case.md`](./02-running-use-case.md).

---

## Part 3 — Industry Sources We Draw From

| Source | What we'll borrow |
|---|---|
| **GitHub & GitHub Copilot** | `copilot-instructions.md`, path-specific instructions, Copilot CLI, Copilot Chat, Copilot Cloud Agent, Copilot Custom Agents, Copilot Spaces, PR-based workflows |
| **agents.md** (open standard) | The universal `AGENTS.md` file convention |
| **Broader industry patterns** | Model Context Protocol (MCP), Spec-Driven Development principles, verification-first prompting, multi-agent workflow patterns (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer), ADR-style decision records, sandboxing & governance |

**Tooling scope:** GitHub Copilot ecosystem only. Patterns from the broader industry are borrowed where useful; tooling is not.

---

## Part 4 — The Full Curriculum (8 Phases, ~33 Lessons)

Each lesson is atomic: one concept, one prompt, one commit. You can stop after any lesson.

---

### Phase 0 — Foundations (Mental Model)

**Goal:** Build the mental model before touching tools.

| # | Lesson | Outcome |
|---|---|---|
| **0.1** | What is Agentic SDLC? *(done — Lesson 0)* | Mental model: humans set intent, agents execute, humans govern. |
| **0.2** | The Agent Surface Map — Copilot autocomplete vs. Chat vs. CLI vs. Cloud Agent | Decision framework for which surface to use when. |
| **0.3** | Anatomy of a good prompt — *goal + constraints + verification* | A reusable prompt template you'll use forever. |

---

### Phase 1 — The Agent Contract (Repo Setup)

**Goal:** Build a repo so well-configured that any agent can drop into it and work safely. *(In progress — Concepts 1–5 done.)*

| # | Lesson | Outcome |
|---|---|---|
| **1.1** | Git foundation: repo, `.gitignore`, `.gitattributes`, `LICENSE`, `README.md` | Industry-grade repo skeleton. ✅ |
| **1.2** | `AGENTS.md` — the universal agent contract | A Copilot-compatible instructions file written to the open `agents.md` standard. |
| **1.3** | `.github/copilot-instructions.md` — Copilot-specific overlay | Copilot reads its native instructions file. |
| **1.4** | `.github/instructions/*.instructions.md` — path-specific instructions | Python rules apply only to `.py` files; TS rules only to `.ts`. |
| **1.5** | PR template + Conventional Commits | Machine-readable history; consistent PR shape. |
| **1.6** | Issue templates for agent-friendly task specification | Issues that Copilot Cloud Agent can pick up directly. |
| **1.7** | `.env.example` + secrets discipline | Block `.env`, document required keys. |
| **1.8** | Memory files (`PROGRESS.md`, `DECISIONS.md`, `NEXT.md`) ✅ *(already done)* | Externalize context so any session can resume cold. |
| **1.9** | Push to GitHub + branch protection basics | Real remote; agents can never silently overwrite `main`. |
| **1.10** | First Agent Task — `HELLO_AGENT.md` | Prove the full loop: prompt → agent → review → commit. |

---

### Phase 2 — Spec-Driven Development (Interview Me Pattern)

**Goal:** Replace "vibe coding" with a repeatable agent-led spec writing process.

| # | Lesson | Outcome |
|---|---|---|
| **2.1** | Why specs are the new source code | Understand the SDD power inversion (specs persist; code regenerates). |
| **2.2** | The Interview Me prompt | A reusable prompt that turns Copilot into a spec-interviewer. |
| **2.3** | Anatomy of a good spec — Intent, User-visible behavior, Acceptance tests, Out-of-scope, Open questions | The 5 sections every spec needs. |
| **2.4** | Run the interview for the "Top 5 Stocks" walking skeleton | A complete `specs/001-top5-stocks.md` produced collaboratively. |
| **2.5** | Spec → Tasks (agent extracts an executable task list from the spec) | A numbered, agent-prompt-sized task list. |
| **2.6** | Spec → Code (agent implements one task at a time; learner approves each) | First real working feature, built from a spec. |
| **2.7** | Spec versioning & change control | When requirements change: how to amend a spec, regenerate tasks, and re-run the agent. |
| *(later)* | *Optional graduation:* compare with **GitHub Spec Kit** & **Issues + Cloud Agent** as accelerators | Once principles are solid, learn the toolkits as upgrades. |

---

### Phase 3 — Building the Running Use Case

**Goal:** Use everything from Phases 1–2 to ship the Stocks demo end-to-end.

| # | Lesson | Outcome |
|---|---|---|
| **3.1** | The walking skeleton — MCP server (hardcoded) | A Python MCP server with one tool: `get_top_stocks` returning 5 fake stocks. |
| **3.2** | The MCP client (TypeScript) | A client that calls the server. |
| **3.3** | The SPA UI — one HTML page, one button | Click → see 5 stocks. End-to-end working. |
| **3.4** | Iterative enrichment — real Yahoo Finance data | Replace hardcoded list with real API calls + error handling. |

---

### Phase 4 — MCP Deep Dive

**Goal:** Master MCP — the universal AI extension layer.

| # | Lesson | Outcome |
|---|---|---|
| **4.1** | MCP concepts — Host, Client, Server; stdio vs. HTTP; tools vs. resources vs. prompts | Speak MCP fluently. |
| **4.2** | Refactor our server with `FastMCP` best practices | Type hints, docstrings, stderr-only logging, MCP Inspector. |
| **4.3** | Consume third-party MCP servers (GitHub MCP, filesystem) | Use existing servers in Copilot CLI and Copilot Chat. |
| **4.4** | Configure MCP servers in Copilot | Make Copilot itself agentic via MCP tools. |
| **4.5** | Publish our server *(optional)* | Make it installable for anyone to drop into Copilot. |

---

### Phase 5 — Verification, Evals & Guardrails

**Goal:** Earn trust in agent output through measurable verification — not vibes.

| # | Lesson | Outcome |
|---|---|---|
| **5.1** | Verification-first prompting — "write a failing test, then fix it" | A muscle memory that catches plausible-looking bugs. |
| **5.2** | CI as the eval harness — GitHub Actions runs tests on every agent PR | Green-before-merge is enforced, not requested. |
| **5.3** | `.github/workflows/copilot-setup-steps.yml` — pre-bake the cloud agent's environment | Cloud Agent runs with the same deps as local. |
| **5.4** | Sandboxing — devcontainers, permission allowlists, scoped tools | Agents can't accidentally touch what they shouldn't. |
| **5.5** | Security considerations — prompt injection, data exfiltration, secret leakage | A short threat-model for agent-authored code. |
| **5.6** | Handling stuck or runaway agents — when to stop, how to redirect | Recovery patterns when an agent loops or drifts. |
| **5.7** | Quality metrics — task success, intervention rate, defect escape, $/PR | A dashboard of agent trust. |

---

### Phase 6 — Multi-Agent Orchestration (Copilot-only)

**Goal:** Move from one agent to many — using proven patterns, all inside the Copilot ecosystem.

| # | Lesson | Outcome |
|---|---|---|
| **6.1** | Industry-standard workflow patterns — prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer | Mental library of when to use which. |
| **6.2** | Copilot Custom Agents — Planner / Coder / Reviewer / Tester as four named agents with scoped instructions + MCP tools | A four-role agent team, all in Copilot. |
| **6.3** | Copilot Spaces — grouped context across files/repos for multi-step work | Persistent task context outside chat. |
| **6.4** | Cross-surface workflows — Copilot Chat (IDE) + Copilot CLI (terminal) + Copilot Cloud Agent (GitHub) | Right Copilot surface for the right phase. |

---

### Phase 7 — Autonomous Coding Agents (Cloud Agent)

**Goal:** Hand a spec to the cloud and get back a reviewed PR.

| # | Lesson | Outcome |
|---|---|---|
| **7.1** | Enable Copilot Coding Agent (cloud) in repo settings | The agent exists in your repo. |
| **7.2** | Issue → PR flow — assign an issue, agent ships a draft PR | First fully autonomous task. |
| **7.3** | Reviewing agent PRs — session logs, diff hygiene, when to push back | You learn to govern, not write. |
| **7.4** | Copilot Code Review — agent reviews agent (and human) PRs | Automated first-pass review on every PR. |
| **7.5** | Fleet orchestration — multiple agents on multiple issues in parallel | Many tasks, one human. |

---

### Phase 8 — Cost, Governance & Production

**Goal:** Make agent-led development viable for real teams (and your wallet).

| # | Lesson | Outcome |
|---|---|---|
| **8.1** | Premium request economics | Read your usage page; understand multipliers; spot waste. |
| **8.2** | Model selection strategy | A decision flowchart: which model for which task. |
| **8.3** | Team workflows & governance — CODEOWNERS, agent labels, audit trail | Multi-developer + multi-agent without chaos. |

---

## Part 5 — Required Tools & Accounts

| Tool | Purpose | Status on this machine |
|---|---|---|
| Git | Version control | ✅ |
| Python 3.10+ | MCP server stack | ✅ (3.13) |
| Node.js 20+ | MCP client + SPA | ✅ (22) |
| GitHub CLI (`gh`) | GitHub from terminal | ✅ |
| VS Code (+ GitHub Copilot extension) | Editor + Copilot Chat | recommended |
| **GitHub Copilot subscription** | CLI + Cloud Agent + Chat + Custom Agents | assumed yes |
| **MCP Inspector** | MCP development & debugging (Phase 4) | TBD |

---

## Part 6 — Lesson Pacing (Suggested)

| Phase | Estimated effort |
|---|---|
| Phase 0 | ~30 min (mostly done) |
| Phase 1 | ~2–3 hours (in progress) |
| Phase 2 | ~2 hours |
| Phase 3 | ~3 hours |
| Phase 4 | ~2 hours |
| Phase 5 | ~2.5 hours |
| Phase 6 | ~2.5 hours |
| Phase 7 | ~2 hours |
| Phase 8 | ~1.5 hours |
| **Total** | **~18–20 hours**, ~33 lessons, each producing a commit. |

---

## Part 7 — Decisions Already Locked In

For full reasoning, see [`DECISIONS.md`](./DECISIONS.md). One-line summary:

| ID | Decision |
|---|---|
| D-001 | Use "Top 5 Stocks" MCP demo as the running example |
| D-002 | Stack: Python (server) + TypeScript (client + SPA) |
| D-003 | Yahoo Finance for real stock data (no API key) |
| D-004 | Externalize context via `PROGRESS.md`, `DECISIONS.md`, `NEXT.md` |
| D-005 | Two-layer agent instructions: `AGENTS.md` + `.github/copilot-instructions.md` |
| D-006 | Conventional Commits + PR template |
| D-007 | MIT License |
| D-008 | "Interview Me" pattern for SDD (not Spec Kit) |
| D-009 | Copilot-only curriculum |
| D-010 | Cost lessons taught late (Phase 8 only) |
| D-011 | No graduation project |
| D-012 | Tooling scope = GitHub Copilot only; non-Copilot vendor names removed |

---

## Part 8 — Best-Practices Coverage Audit

This curriculum was audited against current (2025–2026) industry best practices. ✅ = covered; ⏳ = covered in a later phase; 🔍 = added during audit.

| Best practice | Where covered |
|---|---|
| `AGENTS.md` (open standard) | 1.2 ✅ |
| `.github/copilot-instructions.md` | 1.3 ✅ |
| `.github/instructions/*.instructions.md` (path-specific) | 1.4 ✅ |
| `.github/workflows/copilot-setup-steps.yml` (Cloud Agent env) | 5.3 ✅ |
| Conventional Commits | 1.5 ✅ |
| PR templates | 1.5 ✅ |
| Issue templates for agentic workflows | 1.6 🔍 *(added)* |
| `.env` discipline + `.env.example` | 1.7 ✅ |
| ADR-style decision records (`DECISIONS.md`) | 1.8 ✅ |
| `PROGRESS.md` / `NEXT.md` memory files | 1.8 ✅ |
| Branch protection + agent permissions | 1.9 ✅ |
| Spec-Driven Development (Interview Me) | Phase 2 ✅ |
| Spec → Tasks → Code pipeline | 2.5–2.6 ✅ |
| MCP — concepts, FastMCP, third-party servers | Phase 4 ✅ |
| MCP servers configured in Copilot | 4.4 🔍 *(added)* |
| Verification-first prompting | 5.1 ✅ |
| CI as eval harness | 5.2 ✅ |
| Sandboxing & devcontainers | 5.4 ✅ |
| Prompt-injection / security threat model | 5.5 🔍 *(added)* |
| Handling stuck or runaway agents | 5.6 🔍 *(added)* |
| Quality metrics (success rate, intervention rate, $/PR) | 5.7 ✅ |
| Industry workflow patterns (5 patterns) | 6.1 ✅ |
| Copilot Custom Agents | 6.2 ✅ |
| Copilot Spaces | 6.3 🔍 *(added)* |
| Cross-surface Copilot workflows | 6.4 ✅ |
| Copilot Cloud Agent (issue → PR) | 7.1–7.2 ✅ |
| Reviewing agent PRs | 7.3 ✅ |
| Copilot Code Review | 7.4 🔍 *(added)* |
| Fleet orchestration | 7.5 ✅ |
| Premium request economics | 8.1 ✅ |
| Model selection strategy | 8.2 ✅ |
| CODEOWNERS, agent labels, audit | 8.3 ✅ |

---

## Part 9 — Open Items ✅ Resolved at v1.0

All 6 audit additions were accepted by the learner on 2026-05-19. Curriculum is **locked at v1.0**. Future changes require a new version + a new entry in `DECISIONS.md`.

| Lesson | Status |
|---|---|
| 1.6 — Issue templates | ✅ Accepted |
| 4.4 — MCP in Copilot | ✅ Accepted |
| 5.5 — Security threat model | ✅ Accepted |
| 5.6 — Handling stuck agents | ✅ Accepted |
| 6.3 — Copilot Spaces | ✅ Accepted *(optional — may be merged with 6.4 if Spaces feature shifts)* |
| 7.4 — Copilot Code Review | ✅ Accepted |

---

## Part 10 — Resume Cold (For Future You / Future Agent)

If context is ever lost, read in this order — 5 minutes, full context restored:

1. This file (`00-course.md`) — the agreement and the plan.
2. [`02-running-use-case.md`](./02-running-use-case.md) — what we're building.
3. [`PROGRESS.md`](./PROGRESS.md) — what's been done.
4. [`DECISIONS.md`](./DECISIONS.md) — why we chose what we chose.
5. [`NEXT.md`](./NEXT.md) — the very next thing to do.

---

*Change history: v1.0 (2026-05-19) — merged previous `00-learning-charter.md` and `04-curriculum.md` into one document. Added Phase 1.6, 4.4, 5.5, 5.6, 6.3, 7.4 from best-practices audit.*
