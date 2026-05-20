# 🚀 Agentic SDLC Course — Fast Track

> **The simple, focused learning path.**
> 13 lessons · 6 phases · ~8–10 hours · each ends with a commit.
>
> For the deep reference, see [`90-reference-comprehensive-curriculum.md`](./90-reference-comprehensive-curriculum.md).

| | |
|---|---|
| **Version** | 2.2 (Fast Track) |
| **Date** | 2026-05-20 |
| **Tooling** | GitHub Copilot ecosystem only |
| **Status** | 🚧 Lesson 1.1 ✅ done · 1.2 next |

---

## 📑 Table of Contents

1. [The Setup](#1-the-setup)
2. [Roadmap at a Glance](#2-roadmap-at-a-glance)
3. [The Curriculum](#3-the-curriculum)
4. [What We Skip (on purpose)](#4-what-we-skip-on-purpose)
5. [Lesson Anatomy](#5-lesson-anatomy)
6. [Where We Are Now](#6-where-we-are-now)
7. [Required Tools](#7-required-tools)
8. [Resume Cold (5 min)](#8-resume-cold-5-min)

---

## 1. The Setup

### 👥 Who we are

| Role | Who |
|---|---|
| **Learner** | A traditional developer learning Agentic SDLC |
| **Teacher / Agent** | Me — explains concepts, hands you prompts, executes on your "go" |

### ��️ The Golden Rule

> ### **Humans set intent. Agents execute. Humans govern outcomes.**

### 🔁 How we work — *Tell Me What To Tell You*

```
  1. I explain the concept (plain language)
       ↓
  2. I hand you the prompt
       ↓
  3. You send it
       ↓
  4. I execute → I show you the result
       ↓
  5. You approve → I commit → we update the journal
```

> This pattern reappears as **"Interview Me"** in Phase 2.
> Both are *agent-led structured elicitation of human expertise.*

### 🎯 Running use case

**"Top 5 Stocks" MCP demo** — see [`02-running-use-case.md`](./02-running-use-case.md).

```
  [ One button ]
        ↓
  [ SPA UI (TypeScript) ]
        ↓
  [ MCP Client (TypeScript) ]
        ↓
  [ MCP Server (Python) ]
        ↓
  [ 5 stocks → hardcoded (Step 1) → Yahoo Finance (Step 2) ]
```

---

## 2. Roadmap at a Glance

| # | Phase | Lessons | Outcome |
|---|---|:---:|---|
| **1** | Mental Model | 4 | Set up the environment; speak the language; build the agent contract; ship a first skill |
| **2** | Spec-Driven Development | 2 | Write specs an agent can execute |
| **3** | Full SDLC *(the demo)* | 3 | Build · verify · review agent output critically |
| **4** | Autonomous Agents | 1 | Hand off an issue, get a draft PR back |
| **5** | Multi-Agent Orchestration | 3 | Agents collaborate; package the team as a skill |
| **6** | Production Realities | 1 | Cost · Security · Governance · Responsibility |

**Total:** 14 lessons · ~8–10 hours · each producing one commit.

---

## 3. The Curriculum

> Each lesson is **atomic**: one concept, one prompt, one commit. Stop after any lesson without losing your place.

### Phase 1 — The Mental Model

---

#### 📘 Lesson 1.0 — Environment Setup

> **Outcome:** A local Git repo ready for development — folder, `git init`, foundation files, pushed to GitHub.
> **Status:** ✅ Done — see [`lesson-1.0.md`](./lesson-1.0.md)

**Covers**
- Create project folder
- Initialize Git (`git init`, default branch = `main`)
- `.gitignore` — what to keep out of version control
- `.gitattributes` — consistent line endings across OS
- `LICENSE` — MIT for open sharing
- `README.md` — project landing page
- `.env.example` + secrets discipline
- Conventional Commits + PR template
- Push to GitHub
- First commit

---

#### 📘 Lesson 1.1 — What is Agentic SDLC?

> **Outcome:** You can explain agentic dev to a colleague in one minute.
> **Status:** ✅ Done — see [`lesson-1.1.md`](./lesson-1.1.md)

**Covers**
- The **Golden Rule** — intent · execute · govern.
- The **5 core words** — Agent · Spec · Context · Tool · Loop.
- The **3 autonomy levels** — Interactive → Autopilot → Fleet.
- The **7 Copilot surfaces** — completions, Chat, Inline Chat, Edits, Agent Mode, CLI, GitHub.com.
- The **6-element agentic prompt anatomy** *(canonical)*:

| # | Element | Asks |
|:-:|---|---|
| 1 | **Goal** | What to produce |
| 2 | **Context** | What the agent should already know |
| 3 | **Specification** | Explicit requirements |
| 4 | **Sources** | Citations to trusted references |
| 5 | **Guardrails** | What *not* to do |
| 6 | **Verification** | How to prove it worked |

> 💡 *Side note:* The **4S Framework** and **comment-driven development** apply to **inline completions**, not agentic prompts. Useful vocabulary; not the daily-driver pattern here.

---

#### 📘 Lesson 1.2 — The Agent Contract

> **Outcome:** A repo so well-configured any agent can drop in and work safely.
> **Status:** ⏳ In Progress

**The instruction layer (3 layers — narrowest wins)**

| Layer | File | Scope |
|---|---|---|
| Universal | `AGENTS.md` | Any agent, any task |
| Copilot overlay | `.github/copilot-instructions.md` | Copilot-specific tuning |
| Path-specific | `.github/instructions/*.md` | Per file type / folder |

**Plus**
- Memory files — `PROGRESS.md` · `DECISIONS.md` · `TODO.md`
- **Hello-Agent** task — prove the loop works

---

#### 📘 Lesson 1.3 — Your First Skill: Prompt Files

> **Outcome:** A reusable, invokable prompt — your first "skill."

**Covers**
- What `.github/prompts/*.prompt.md` files are.
- Anatomy: front-matter (`description`, `mode`, `tools`) + body using the 6-element pattern.
- Build a `/review-pr` (or `/explain-this-file`) prompt file you can invoke any time.

> 🎯 **Rule of thumb:** Every workflow you repeat is a prompt file waiting to be born.

---

### Phase 2 — Spec-Driven Development

---

#### 📘 Lesson 2.1 — Why Specs Are the New Source Code

> **Outcome:** You understand SDD and can run the *Interview Me* pattern.

**Covers**
- The **power inversion** — specs persist; code regenerates.
- The **Interview Me** pattern — agent asks, you answer, agent compiles.
- **Anatomy of a good spec** — Intent · User-visible behavior · Acceptance tests · Out-of-scope · Open questions.

---

#### 📘 Lesson 2.2 — Spec → Tasks → Code

> **Outcome:** First feature shipped from a spec.

**Covers**
- Run the interview → produce `specs/001-top5-stocks.md`.
- Agent extracts a task list from the spec.
- Approve and execute tasks one at a time.

---

### Phase 3 — The Full SDLC (the Stocks Demo)

---

#### 📘 Lesson 3.1 — Build It

> **Outcome:** A working end-to-end demo. Click → see 5 stocks.

**Covers**
- **MCP server** (Python) — one tool: `get_top_stocks`.
- **MCP client** (TypeScript).
- **SPA UI** — one HTML page, one button.
- What MCP **tools** really are and how Copilot uses them.

---

#### 📘 Lesson 3.2 — Verify It

> **Outcome:** Tests green in CI; first real PR merged.

**Covers**
- Happy-path test — Pytest (server) + Playwright (UI).
- GitHub Actions CI on every PR.
- ⚠️ The **tautological test trap** — tests that always pass.
- Your first real Pull Request: review → approve → merge.

---

#### 📘 Lesson 3.3 — Review It (Govern Agent Output)

> **Outcome:** You can read AI-generated code the way a senior reviews a junior's first PR.
> **Why it matters:** This is the *"humans govern outcomes"* half of the Golden Rule. The most important practical skill in the course.

**The 5 AI-specific traps**

| # | Trap | Smell |
|:-:|---|---|
| 1 | **Invented APIs** | Calls to functions that *should* exist but don't (or wrong signature) |
| 2 | **Plausible-but-wrong logic** | Looks like a senior wrote it; quietly does the wrong thing |
| 3 | **Tautological tests** | Always pass; tell you nothing |
| 4 | **Over-eager refactor** | You asked for 1 line; got changes to 12 files |
| 5 | **Missing edge case** | Happy path only; empty list / network failure / unicode untested |

**The 4-question review checklist**

| # | Question |
|:-:|---|
| 1 | **Does it run?** |
| 2 | **Does it do what was asked?** (matches *intent*, not just compiles) |
| 3 | **Is it secure?** (secrets · scope · imports) |
| 4 | **Does it match our conventions?** |

**The mindset**

> Read AI code the way a senior engineer reads a junior's first PR.
> *Polite. Specific. Skeptical.* Treat every diff as **guilty until proven innocent.**

**Hands-on**
- I deliberately ship a flawed PR for the Stocks demo. You find the trap(s).
- Enable **Copilot Code Review** as a second pair of eyes — and learn its limits.

---

### Phase 4 — Autonomous Agents

---

#### 📘 Lesson 4.1 — Copilot Cloud Agent: Issue → PR

> **Outcome:** Hand off a spec; get back a draft PR. *Magic.*

**Covers**
- Enable Copilot Coding Agent in repo settings.
- Open an Issue with a clean spec → assign to Copilot.
- Agent ships a draft PR.
- Review session logs · request changes · approve · merge.

> ⚠️ Cloud Agent **cannot self-merge.** Human approval always required.

---

### Phase 5 — Multi-Agent Orchestration

---

#### 📘 Lesson 5.1 — Why & When Multi-Agent

> **Outcome:** A mental library of when one agent isn't enough.

**The 5 workflow patterns**

| Pattern | When to use |
|---|---|
| **Prompt chaining** | Fixed sequence: do X, then Y, then Z |
| **Routing** | Easy → cheap model; hard → smart model |
| **Parallelization** | Multiple independent reviews at once |
| **Orchestrator-workers** | One agent plans, others execute |
| **Evaluator-optimizer** | Implement → test → iterate on failure |

> 🚫 Also: when *not* to use multi-agent (often!).

---

#### 📘 Lesson 5.2 — Build a Planner / Coder / Reviewer Team

> **Outcome:** Three Copilot Custom Agents collaborating on a real task.

| Role | What they do |
|---|---|
| **Planner** | Spec → task list |
| **Coder** | Implement one task at a time |
| **Reviewer** | Check the diff before merge |

---

#### 📘 Lesson 5.3 — Skill Packaging

> **Outcome:** A reusable, shareable, named **skill** that bundles everything.

**The skill recipe** *(three layers, one name)*

```
  ┌───────────────────────────────────────────────┐
  │  Instructions   .github/instructions/*.md     │
  │      +                                        │
  │  Prompt File    .github/prompts/*.prompt.md   │
  │      +                                        │
  │  MCP Tool       (Phase 3 server)              │
  │      =                                        │
  │  ★  One named, shareable Skill                │
  └───────────────────────────────────────────────┘
```

> Anyone in your org can now invoke it with one command.

---

### Phase 6 — Production Realities

---

#### 📘 Lesson 6.1 — Cost, Governance, Security, Responsibility

> **Outcome:** You can run agentic dev sustainably — solo or in a team.

| Topic | Covers |
|---|---|
| 💰 **Cost** | Plan tiers (Free → Enterprise) · premium request multipliers · model selection · Token-Based Billing transition (June 2026) |
| 🛡️ **Governance** | CODEOWNERS · branch protection · audit logs · agent labels on PRs |
| 🔒 **Security** | Content exclusions (`.env`, `secrets/**`) · prompt-injection awareness · secure SDLC pipeline |
| ⚖️ **Responsibility** | Microsoft's 6 Responsible AI principles + **you are the author of record for every committed line.** |

---

## 4. What We Skip (on purpose)

These are **valuable but not foundational.** All in [`90-reference-comprehensive-curriculum.md`](./90-reference-comprehensive-curriculum.md) — dip in when a real project needs them.

- Building production MCP servers from scratch
- Stuck-agent recovery patterns
- Copilot Spaces (grouped context)
- Fleet orchestration (many parallel cloud agents)
- Detailed multi-model strategy
- IP indemnity / duplication detection deep dive

---

## 5. Lesson Anatomy

Every lesson follows the same shape:

| Step | What |
|:-:|---|
| 1️⃣ | **What** — concept in plain language |
| 2️⃣ | **Why** — why it matters |
| 3️⃣ | **Prompt** — the exact words you send |
| 4️⃣ | **Why the prompt is good** — the reusable pattern inside it |
| 5️⃣ | **Result** — commit hash + one-line outcome |
| 6️⃣ | **What you unlocked** — the new capability |

---

## 6. Where We Are Now

| Phase | Status |
|---|---|
| **1.1** What is Agentic SDLC? | ✅ Done — [`lesson-1.1.md`](./lesson-1.1.md) |
| **1.2** The Agent Contract | ⏳ **Next up** |
| **1.3** Prompt Files | ⏳ |
| Phase 2 → 6 | ⏳ |

> The memory files (`PROGRESS.md` · `DECISIONS.md` · `NEXT.md`) will be created as part of Lesson 1.2.

---

## 7. Required Tools

| Tool | Purpose | Status |
|---|---|:-:|
| Git | Version control | ✅ |
| Python 3.10+ | MCP server stack | ✅ |
| Node.js 20+ | MCP client + SPA | ✅ |
| GitHub CLI (`gh`) | GitHub from terminal | ✅ |
| VS Code + Copilot extension | Editor + Copilot Chat | recommended |
| GitHub Copilot subscription | CLI · Cloud Agent · Chat · Custom Agents | assumed yes |
| MCP Inspector | MCP development (Phase 3+) | install when needed |

---

## 8. Resume Cold (5 min)

If context is ever lost:

| Step | File | Purpose |
|:-:|---|---|
| 1 | **`00-course.md`** *(this file)* | Agreement + roadmap + current status |
| 2 | [`PROGRESS.md`](./PROGRESS.md) *(created in Lesson 1.2)* | What's been done |
| 3 | [`DECISIONS.md`](./DECISIONS.md) *(created in Lesson 1.2)* | Why we chose what we chose |
| 4 | [`NEXT.md`](./NEXT.md) *(created in Lesson 1.2)* | The very next thing to do |
| 5 | [`./archive/`](./archive/) | Historical artifacts from the curriculum-design phase |

---

### 📜 Change History

| Version | Date | Highlights |
|---|---|---|
| **v2.2 (fresh start)** | 2026-05-20 | Archived all prior artifacts. Lesson 1.1 status reset to *Next up.* Ready to teach the curriculum from scratch. |
| **v2.2** | 2026-05-20 | Added Lesson 3.3 — *Review It (govern agent output).* The "humans govern outcomes" half of the Golden Rule, taught explicitly. |
| **v2.1** | 2026-05-20 | Better formatting + lesson cards. Added path-specific instructions (1.2), prompt files (1.3), skill packaging (5.3). |
| **v2.0** | 2026-05-19 | Fast Track curriculum introduced. v1.2 filed as `90-reference-comprehensive-curriculum.md` (now in archive). |
