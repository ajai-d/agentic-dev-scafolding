# Lesson 1.2 — The Agent Contract

> **Outcome:** A repo so well-configured any agent can drop in and work safely.

---

## What You'll Build

By the end of this lesson, your repo will have a complete "agent contract" — the set of files that tell any AI agent how to behave, what to remember, and what never to do.

---

## Concepts

### Concept 1: `AGENTS.md` — Universal Agent Instructions

**What it is:**
A file at the repo root that any AI agent reads to understand the house rules. Think of it as an employee handbook for robots.

**What it covers:**
- Project identity (name, purpose, audience)
- Language & tone (8th-grade reading level)
- Commit conventions (Conventional Commits)
- File formatting (UTF-8, LF, trailing newline)
- Safety rules (no secrets, no deleting without asking)
- Memory files to read before starting work

**Try it yourself — give your AI agent this prompt:**

> Create an AGENTS.md file for this repo. It should define: the project name (Agentic Dev Scaffolding), the language style (clear, 8th-grade reading level), commit conventions (Conventional Commits), file formatting rules (UTF-8, LF line endings, trailing newline), and a rule that agents must never commit secrets or delete files without asking.

**Expected result:** An [`AGENTS.md`](./AGENTS.md) file at the repo root with sections for project info, tone, commits, formatting, and safety rules. ✅

---

### Concept 2: `.github/copilot-instructions.md` — Copilot Overlay

**What it is:**
A file inside `.github/` that only GitHub Copilot reads. It layers on top of `AGENTS.md` with Copilot-specific preferences — languages, test frameworks, response style.

**Why it's separate from AGENTS.md:**
`AGENTS.md` is universal (works with any AI tool). This file is Copilot-specific tuning that other agents should ignore.

**Try it yourself — give your AI agent this prompt:**

> Create `.github/copilot-instructions.md` for this repo. It should tell Copilot to: always use TypeScript with strict mode for code, prefer Pytest for Python tests, keep responses concise, reference AGENTS.md for general rules, and never generate placeholder/lorem-ipsum content.

**Expected result:** A [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) file with sections for code preferences, response style, testing conventions, and a "What NOT To Do" list. ✅

---

### Concept 3: Path-Specific Instructions

_(Pending)_

---

### Concept 4: Prompt Files

_(Pending)_

---

### Concept 5: Memory Files

_(Pending — already created: PROGRESS.md, DECISIONS.md, TODO.md)_

---

### Concept 6: Conventional Commits + PR Template

_(Pending)_

---

### Concept 7: `.env.example` — Secrets Pattern

_(Pending)_

---

### Concept 8: Fresh `README.md`

_(Pending)_

---

### Concept 9: Hello-Agent — Prove the Loop Works

_(Pending)_
