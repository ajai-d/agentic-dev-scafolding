# 📘 Tell Me What To Tell You™ (TMWTTY)

| | |
|---|---|
| **What** | A repeatable methodology for building software with AI agents |
| **Outcome** | You understand the 3 stages and can apply TMWTTY to any project |
| **Read time** | ~5 minutes |
| **Prerequisites** | None |

---

| | |
|:-:|---|
| 1 | [Executive Summary](#1️⃣-executive-summary) |
| 2 | [The Problem TMWTTY Solves](#2️⃣-the-problem-tmwtty-solves) |
| 3 | [The 3 Stages](#3️⃣-the-3-stages) |
| 4 | [Folder Structure](#4️⃣-folder-structure) |
| 5 | [Agent Modes](#5️⃣-agent-modes) |
| 6 | [Philosophy](#6️⃣-philosophy) |
| 7 | [Agent Protocol](#7️⃣-agent-protocol) |
| 8 | [Reference](#8️⃣-reference) |

---

## 1️⃣ Executive Summary

TMWTTY is a structured, 3-stage framework for AI-assisted software development. It eliminates the guesswork of prompt engineering by providing a deterministic workflow:

> **Seed → Plan → Execute**

Every step is documented as it's executed — producing both working software and a built-in history of how it was built. The result is a reusable replay-execution log that any engineer, regardless of experience level, can follow to reproduce the same outcome.

---

## 2️⃣ The Problem TMWTTY Solves

| Challenge | Without TMWTTY | With TMWTTY |
|-----------|----------------|-------------|
| "I don't know what to ask the AI" | Trial and error | AI provides the exact prompt |
| "My process isn't repeatable" | Knowledge lives in someone's head | Every step captured in a replay-execution log |
| "Others can't onboard quickly" | Tribal knowledge, shadowing | Self-service playbook anyone can follow |
| "I don't know which AI mode to use" | Chat for everything | Plan assigns the right mode per task |
| "Quality varies by person" | Inconsistent prompting | Standardized prompts, consistent output |
| "I lost track of what was done" | Reconstruct from memory | Built-in history with decisions documented |
| "Starting a new project from scratch" | Reinvent every time | Fork a replay-execution, adapt, ship faster |

---

## 3️⃣ The 3 Stages

```
  ┌────────────────┐        ┌────────────────┐         ┌────────────────┐
  │                │        │                │         │                │
  │    1. SEED     │        │    2. PLAN     │         │   3. EXECUTE   │
  │                │        │                │         │                │
  │  State intent  │───────▶│  Structured    │───────▶│  TMWTTY loop   │
  │  in plain      │        │  roadmap w/    │         │  per plan      │
  │  language      │        │  agent modes   │         │  item          │
  │                │        │                │         │                │
  └────────────────┘        └────────────────┘         └────────────────┘
```

### Stage 1 — Seed

State your intent in plain language:

> *"I want to build an MCP server that returns the top 5 performing stocks."*

One sentence. No jargon. This is the genesis of the project.

### Stage 2 — Plan

The AI transforms your seed into a **structured plan** — deliverables sequenced by dependency, with an agent mode assigned to each item.

You review, refine, and approve before execution begins.

### Stage 3 — Execute

For each item in the plan, the TMWTTY loop runs:

| Step | Action |
|:----:|--------|
| 1 | AI explains the concept |
| 2 | AI provides the exact prompt to send |
| 3 | You send it back |
| 4 | AI executes |
| 5 | You review and approve |
| 6 | AI commits, pushes, and documents the step |

> 🔁 Then move to the next item. Repeat until the plan is complete.

---

## 4️⃣ Folder Structure

Every TMWTTY project follows this layout:

| Folder | Purpose |
|--------|---------|
| `tmwtty/` | The methodology reference (you're reading it) |
| `plan/` | The structured plan for this project |
| `project/` | Production source code |
| `replay-execution/` | Step-by-step playbook captured during execution |

---

## 5️⃣ Agent Modes

The plan assigns one of these modes to each item:

| Mode | How It Works | Best For |
|------|-------------|----------|
| **Interactive Agent** | Agent and human work together step by step — the TMWTTY loop | Decisions, learning, risky changes, anything new |
| **Autonomous Agent** | Agent works independently, human reviews the output | Well-defined tasks with clear specs |
| **Multi-Agent Orchestration** | Multiple agents work in parallel on independent items | High volume, independent tasks, maximum throughput |

> The agent guides you through configuring and running each mode — you don't need to know how upfront.

---

## 6️⃣ Philosophy

The methodology is intentionally minimal — it's a conversation protocol, not a prescription. The agent and user negotiate the details (execution-log format, commit conventions, folder structure) during the interactive plan-building phase. Every project decides its own specifics through the TMWTTY loop.

---

## 7️⃣ Agent Protocol

> If you are an AI agent reading this, here is exactly what to do.

### On First Contact

1. Read the user's seed prompt in [`plan/seed.md`](../plan/seed.md)
2. Acknowledge the intent and confirm you understand what "done" looks like

### Stage 2 — Build the Plan Interactively

3. Propose plan items **one at a time** — name, description, and agent mode
4. Wait for approval or adjustment before proposing the next item
5. After all items are approved, write the full plan to `plan/plan.md` using the format in [`03-plan-format.md`](./03-plan-format.md)

### Stage 3 — Execute Each Plan Item

For each item in the plan, run this loop:

| Step | You (the agent) do this |
|:----:|-------------------------|
| 1 | Explain the concept — what and why |
| 2 | Provide the exact prompt the user should send back |
| 3 | Wait for the user to send it |
| 4 | Execute the work |
| 5 | Present the result for review |
| 6 | On approval — commit, push, and document the step in `replay-execution/` |

> 🔁 Repeat for every plan item until the project is complete.

### Rules

- Use GitHub Copilot best practices
- Use structured prompts following context engineering best practices
- Never skip the approval step — the user confirms every artifact
- Document as you go — `replay-execution/` captures each step as it happens
- One commit per plan item — atomic, traceable history
- If uncertain, ask — don't assume
- Guide the user through tooling — when a plan item requires a specific Copilot mode (Agent, Coding Agent, MCP servers, custom instructions), walk the user step by step through configuring and running it (the user is not expected to know how)

---

## 8️⃣ Reference

| I want to... | Go to... |
|--------------|----------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Write my seed prompt | [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) |
| See the plan format | [`03-plan-format.md`](./03-plan-format.md) |