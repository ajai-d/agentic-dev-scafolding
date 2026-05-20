# 📘 Tell Me What To Tell You™ (TMWTTY)

> 🎯 **The methodology.** Read once. Reference any time you start a new project.

<table>
<tr><td><b>What</b></td><td>A repeatable methodology for building software with AI agents</td></tr>
<tr><td><b>Outcome</b></td><td>You understand the 3 stages and can apply TMWTTY to any project</td></tr>
<tr><td><b>Read time</b></td><td>~5 minutes</td></tr>
<tr><td><b>Prerequisites</b></td><td>None</td></tr>
</table>

---

## 🗺️ Roadmap

| § | Topic |
|:-:|---|
| 1 | Executive Summary |
| 2 | The Problem TMWTTY Solves |
| 3 | The 3 Stages |
| 4 | Folder Structure |
| 5 | Agent Protocol |
| 6 | Reference |

---

## 1️⃣ Executive Summary

TMWTTY is a structured, 3-stage framework for AI-assisted software development. It eliminates the guesswork of prompt engineering by providing a deterministic workflow:

> **Seed → Plan → Execute**

Every step is documented as it's executed — producing both working software and a built-in history of how it was built. The result is a reusable tutorial that any engineer, regardless of experience level, can follow to reproduce the same outcome.

---

## 2️⃣ The Problem TMWTTY Solves

| Challenge | Without TMWTTY | With TMWTTY |
|-----------|----------------|-------------|
| "I don't know what to ask the AI" | Trial and error | AI provides the exact prompt |
| "My process isn't repeatable" | Knowledge lives in someone's head | Every step captured in a tutorial |
| "Others can't onboard quickly" | Tribal knowledge, shadowing | Self-service playbook anyone can follow |
| "I don't know which AI mode to use" | Chat for everything | Plan assigns the right mode per task |
| "Quality varies by person" | Inconsistent prompting | Standardized prompts, consistent output |
| "I lost track of what was done" | Reconstruct from memory | Built-in history with decisions documented |
| "Starting a new project from scratch" | Reinvent every time | Fork a tutorial, adapt, ship faster |

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
| `tutorial/` | Step-by-step playbook captured during execution |

---

## 5️⃣ Agent Protocol

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
| 6 | On approval — commit, push, and document the step in `tutorial/` |

> 🔁 Repeat for every plan item until the project is complete.

### Rules

- Never skip the approval step — the user confirms every artifact
- Document as you go — `tutorial/` captures each step as it happens
- One commit per plan item — atomic, traceable history
- If uncertain, ask — don't assume

---

## 6️⃣ Reference

| I want to... | Go to... |
|--------------|----------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Write my seed prompt | [`02-seed-prompt.md`](./02-seed-prompt.md) |
| See the plan format | [`03-plan-format.md`](./03-plan-format.md) |
| Understand agent modes | [`04-agent-modes.md`](./04-agent-modes.md) |