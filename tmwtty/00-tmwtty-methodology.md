# 📘 Tell Me What To Tell You™ (TMWTTY)

> A repeatable methodology for building software with AI agents.

---

| | |
|:-:|---|
| 1 | [Executive Summary](#1️⃣-executive-summary) |
| 2 | [The Problem TMWTTY Solves](#2️⃣-the-problem-tmwtty-solves) |
| 3 | [The 3 Stages](#3️⃣-the-3-stages) |
| 4 | [Folder Structure](#4️⃣-folder-structure) |
| 5 | [Agent Modes](#5️⃣-agent-modes) |
| 6 | [Philosophy](#6️⃣-philosophy) |
| 7 | [Guardrails](#7️⃣-guardrails) |
| 8 | [Agent Protocol](#8️⃣-agent-protocol) |
| 9 | [Reference](#9️⃣-reference) |

---

## 1️⃣ Executive Summary

TMWTTY is a structured, 3-stage framework for AI-assisted software development. It eliminates the guesswork of prompt engineering by providing a deterministic workflow:

> **Seed → Plan → Execute**

Every step is documented as it's executed — producing both working software and a built-in history of how it was built. The result is a reusable replay-execution log that any engineer, regardless of experience level, can follow to reproduce the same outcome.

---

## 2️⃣ The Problem TMWTTY Solves

| Challenge | Without TMWTTY | With TMWTTY |
|-----------|----------------|-------------|
| "I don't know what to ask the AI" | Trial and error | AI interviews you to elicit the right requirements |
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

The AI transforms your seed into an **optimized plan** — deliverables sequenced by dependency, with an agent mode assigned to each item. The plan prioritizes:

- **Efficiency** — shortest path to done, minimal token usage, no unnecessary steps
- **Best practices** — industry-standard coding, architecture, and security patterns
- **Atomicity** — each item is a single, independently deliverable unit of work
- **Production-grade** — when the intent is production, the output is deployment-ready: CI/CD, infrastructure as code, observability, security hardening, and cloud-native deployment using well-architected framework principles. The agent clarifies the intent (production vs. proof of concept) upfront and calibrates the plan accordingly.

You review, refine, and approve before execution begins.

### Stage 3 — Execute

For each item in the plan, follow **spec-driven development** using the **"Interview Me" method**: the AI interviews you to surface requirements and acceptance criteria, produces a spec, then provides the exact prompt for you to send back. You send it, the AI executes, and the prompt + result are recorded in `replay-execution/` — creating a replayable script anyone can follow.

| Step | Action |
|:----:|--------|
| 1 | AI explains the concept — what and why |
| 2 | AI interviews you — asks targeted questions to elicit requirements and acceptance criteria |
| 3 | AI produces a spec from your answers |
| 4 | You review and approve the spec |
| 5 | AI provides the exact prompt for you to send |
| 6 | You send the prompt back |
| 7 | AI executes against the approved spec |
| 8 | You review the output |
| 9 | AI commits, pushes, and records the prompt + result in `replay-execution/` |

> 🔁 Then move to the next item. Repeat until the plan is complete.

---

## 4️⃣ Folder Structure

Every TMWTTY project follows this layout:

| Folder / File | Purpose |
|---------------|---------|
| `tmwtty/` | The methodology reference (you're reading it) |
| `plan/seed.md` | The seed prompt — your project intent |
| `plan/plan.md` | The structured plan — living document updated during execution |
| `replay-execution/replay-execution.md` | Step-by-step playbook captured during execution |

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

## 7️⃣ Guardrails

During the plan-building phase, the agent guides the developer through establishing industry-standard guardrails appropriate to the project. These are not prescribed — they are negotiated through the TMWTTY loop based on the project's scope, stack, and risk profile.

Areas to cover:

| Category | Examples |
|----------|----------|
| **Security** | Secrets management, dependency scanning, least-privilege access |
| **Quality** | Testing strategy, linting, type safety, code review gates |
| **Architecture** | Separation of concerns, API contract design, dependency boundaries |
| **Operations** | CI/CD pipeline, environment parity, observability |
| **Process** | Commit conventions, branch strategy, approval workflows |

> The agent surfaces the right guardrails at the right time — the developer doesn't need to know them upfront.

---

## 8️⃣ Agent Protocol

> If you are an AI agent reading this, here is exactly what to do.

### On First Contact

1. Read the user's seed prompt in [`plan/seed.md`](../plan/seed.md)
2. Acknowledge the intent and confirm you understand what "done" looks like
3. Clarify the project intent — **production** or **proof of concept** — and calibrate the plan accordingly

### Stage 2 — Build the Plan Interactively

3. **First plan item is always environment setup** — git initialization, GitHub Copilot configuration (custom instructions, agents, MCP servers), dev tooling, and project scaffolding with industry best practices
4. Propose remaining plan items **one at a time** — name, description, and agent mode
5. Wait for approval or adjustment before proposing the next item
6. After all items are approved, write the full plan to `plan/plan.md` — the plan is a living document, updated as decisions are made during execution

### Stage 3 — Execute Each Plan Item (Spec-Driven Development)

For each item in the plan, run this loop:

| Step | You (the agent) do this |
|:----:|-------------------------|
| 1 | Explain the concept — what and why |
| 2 | Interview the user — ask targeted questions to elicit requirements, inputs, outputs, edge cases, and acceptance criteria |
| 3 | Synthesize the answers into a spec |
| 4 | Present the spec for approval |
| 5 | Provide the exact prompt for the user to send back |
| 6 | Wait for the user to send the prompt |
| 7 | Execute against the approved spec |
| 8 | Present the result for review |
| 9 | On approval — commit, push, and record the prompt + result in `replay-execution/` |

> 🔁 Repeat for every plan item until the project is complete.
> 
> The `replay-execution/` log is a **script of prompts** — anyone can copy-paste them into an AI agent to reproduce the same project.

### Rules

- Optimize every plan for: shortest path to done, minimal token usage, industry-standard architecture, coding best practices, and clear dependency ordering
- Use GitHub Copilot best practices
- Use structured prompts following context engineering best practices
- Never skip the approval step — the user confirms every artifact
- Document as you go — `replay-execution/` captures each step as it happens
- One commit per plan item — atomic, traceable history
- If uncertain, ask — don't assume
- Guide the user through tooling — when a plan item requires a specific Copilot mode (Agent, Coding Agent, MCP servers, custom instructions), walk the user step by step through configuring and running it (the user is not expected to know how)

---

## 9️⃣ Reference

| I want to... | Go to... |
|--------------|----------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Write my seed prompt | [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) |