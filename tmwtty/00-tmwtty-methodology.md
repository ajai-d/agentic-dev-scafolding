# 📘 Tell Me What To Tell You™ (TMWTTY)

---

| | |
|:-:|---|
| 1 | [What Is TMWTTY?](#1️⃣-what-is-tmwtty) |
| 2 | [How It Works](#2️⃣-how-it-works) |
| 3 | [Key Terms](#3️⃣-key-terms) |
| 4 | [The Two Protocols](#4️⃣-the-two-protocols) |
| 5 | [Applying TMWTTY to SDLC — The Pipeline](#5️⃣-applying-tmwtty-to-sdlc--the-pipeline) |
| 6 | [Folder Structure](#6️⃣-folder-structure) |
| 7 | [Agent Modes](#7️⃣-agent-modes) |
| 8 | [Guardrails](#8️⃣-guardrails) |
| 9 | [The Problem TMWTTY Solves](#9️⃣-the-problem-tmwtty-solves) |
| 🔟 | [Agent Protocol (for AI agents)](#-agent-protocol-for-ai-agents) |
| 1️⃣1️⃣ | [Reference](#1️⃣1️⃣-reference) |

---

## 1️⃣ What Is TMWTTY?

**TMWTTY ("Tell Me What To Tell You")** is a framework for working with AI agents.

The core idea is simple: **the user doesn't write prompts — the AI writes them.** The AI proposes what should happen next, hands you the exact prompt to send back, and only acts when you send it. The prompt you send back is your way of saying *"yes, do this."*

This solves three problems at once:

| Problem | How TMWTTY solves it |
|---------|----------------------|
| You don't know what to ask the AI | The AI tells you what to ask |
| You worry the AI will do something you didn't intend | Nothing happens until you explicitly send the prompt back |
| You can't reproduce or share what you built | Every prompt + result is recorded in a replayable log |

**TMWTTY is general-purpose** — it works for writing, research, data analysis, ops runbooks, or anything else.

**In this repository, we apply TMWTTY to a full Agentic SDLC** (Software Development Life Cycle): going from a one-sentence idea to a running, deployed system, built entirely by AI agents under your direction.

---

## 2️⃣ How It Works

Here's the core loop, called **the TMWTTY loop**:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   1. AI proposes      → "Here's what I think we        │
│                          should do next, and why."     │
│                                                         │
│   2. You approve      → "Yes, that's right."           │
│                                                         │
│   3. AI gives prompt  → "Here's the exact prompt to    │
│                          send back to me."             │
│                                                         │
│   4. You send it      → (copy-paste the prompt)        │
│                                                         │
│   5. AI executes      → does the work                  │
│                                                         │
│   6. You review       → check the result               │
│                                                         │
│   7. AI records       → commits the prompt + result    │
│                          to replay-execution log       │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↻ repeat
```

The replay-execution log becomes a **script of prompts** anyone can copy-paste to reproduce the same outcome.

---

## 3️⃣ Key Terms

| Term | Definition |
|------|------------|
| **Seed prompt** | A single sentence stating what you want to build (e.g., *"I want an MCP server that returns the top 5 stocks"*). Saved in `plan/seed.md`. |
| **Spec** | A document describing requirements, acceptance criteria, and edge cases. Produced by the Spec Agent. Saved in `plan/spec.md`. |
| **Plan** | The architecture, design, use cases, and orchestration plan for the project. Saved in `plan/plan.md`. |
| **Replay-execution log** | A markdown file capturing every prompt and result from the project, so anyone can copy-paste their way to the same outcome. Saved in `replay-execution/replay-execution.md`. |
| **Agent** | A specialized AI role with one job (e.g., Spec Agent, Implementation Agent, Test Agent). In practice, one AI plays all roles sequentially. |
| **Agentic SDLC** | A software development lifecycle where AI agents do most of the work (designing, coding, testing, deploying) under human direction. |

---

## 4️⃣ The Two Protocols

TMWTTY uses **two different conversation protocols** depending on what the AI needs from you.

### 🎤 Interview Me — used by the Spec Agent only

The Spec Agent has no idea what you want to build. So it **interviews you** — asks targeted questions to surface requirements, edge cases, and acceptance criteria — then synthesizes the answers into a spec.

Used only once, at the start of the Spec stage.

### 🔁 TMWTTY Loop — used by every other agent

Every other agent (Architecture, Design, Implementation, Test, etc.) already knows industry best practices. So instead of interviewing, it **proposes** — and you approve.

This is the 7-step loop shown in Section 2 above.

---

## 5️⃣ Applying TMWTTY to SDLC — The Pipeline

When TMWTTY is applied to software development, it follows this pipeline:

```
SEED → SPEC → PLAN → EXECUTE → DEPLOY → OPERATE
```

Each stage is **informed by the prior stage's output**. No stage starts until the prior stage is approved. Each stage has sub-steps, and each sub-step has a specialized agent assigned to it. **Sub-stages can vary per project** — the Planning Agent decides which ones apply based on intent (PoC vs. production).

### 🌱 Seed

| Sub-step | Agent | Output |
|----------|-------|--------|
| 0a. Intent | Human | 1-sentence intent in `plan/seed.md` |

### 📋 Spec

| Sub-step | Agent | Output |
|----------|-------|--------|
| 1a. Discovery Interview | Spec Agent | Raw interview notes |
| 1b. Requirements Doc | Spec Agent | Documented requirements |
| 1c. Acceptance Criteria | Spec Agent | Measurable "done" criteria |

### 🗺️ Plan

| Sub-step | Agent | Output |
|----------|-------|--------|
| 2a. Use Cases | Use Case Agent | Business use cases, dependencies, complexity |
| 2b. Architecture | Architecture Agent | System design, components, tech stack |
| 2c. Design | Design Agent | API contracts, data models, interfaces |
| 2d. Orchestration | Planning Agent | Atomic work breakdown + agent orchestration plan |

### 🛠️ Execute

| Sub-step | Agent | Output |
|----------|-------|--------|
| 3a. Setup | Setup Agent | Git, env, Copilot config, agent registry |
| 3b. Implement | Implementation Agent | Working code per use case |
| 3c. Code Review | Code Review Agent | Reviewed code — quality, best practices, anti-patterns |
| 3d. Code Scanning | Code Scanning Agent | SAST, dependency scan, license compliance |
| 3e. Security | Security Agent | Threat modeling, secrets scan, OWASP checks |
| 3f. Test | Test Agent | Unit, integration, e2e tests |

### 🚀 Deploy

| Sub-step | Agent | Output |
|----------|-------|--------|
| 4a. CI/CD Pipeline | Deployment Agent | Build + deploy automation |
| 4b. Infrastructure as Code | Deployment Agent | IaC templates (Bicep, Terraform, etc.) |
| 4c. Deployment | Deployment Agent | Running system in target environment |
| 4d. Smoke Tests | Deployment Agent | Verified deployment |

### 📡 Operate

| Sub-step | Agent | Output |
|----------|-------|--------|
| 5a. Monitoring | Monitoring Agent | Alerts, dashboards |
| 5b. Observability | Observability Agent | Logs, metrics, traces |
| 5c. Iteration | Human + Agents | Feedback loop into next Seed |

---

## 6️⃣ Folder Structure

Every TMWTTY project follows this layout:

| Folder / File | Purpose |
|---------------|---------|
| `tmwtty/` | The methodology reference (you're reading it) |
| `plan/seed.md` | The seed prompt — your project intent |
| `plan/spec.md` | Requirements spec produced by the Spec Agent |
| `plan/plan.md` | Use cases, architecture, design, orchestration — living document |
| `replay-execution/replay-execution.md` | Step-by-step playbook captured during execution |

---

## 7️⃣ Agent Modes

The Orchestration Plan assigns one of these modes to each agent per sub-step. The mode determines how much autonomy the agent has.

| Mode | How It Works | Best For |
|------|-------------|----------|
| **Interactive Agent** | Agent and human work together step by step using the TMWTTY loop | Decisions, learning, risky changes, anything new |
| **Autonomous Agent** | Agent works independently end-to-end; human reviews the final output | Well-defined tasks with clear specs |
| **Multi-Agent Orchestration** | Multiple agents work in parallel on independent items | High volume, independent tasks, maximum throughput |

> The agent guides you through configuring and running each mode — you don't need to know how upfront.

---

## 8️⃣ Guardrails

During the Plan stage, the Planning Agent guides the developer through establishing industry-standard guardrails appropriate to the project. Guardrails are **not prescribed** — they are negotiated through the TMWTTY loop based on the project's scope, stack, and risk profile.

| Category | Examples |
|----------|----------|
| **Security** | Secrets management, dependency scanning, least-privilege access |
| **Quality** | Testing strategy, linting, type safety, code review gates |
| **Architecture** | Separation of concerns, API contract design, dependency boundaries |
| **Operations** | CI/CD pipeline, environment parity, observability |
| **Process** | Commit conventions, branch strategy, approval workflows |

> The agent surfaces the right guardrails at the right time — the developer doesn't need to know them upfront.

---

## 9️⃣ The Problem TMWTTY Solves

| Challenge | Without TMWTTY | With TMWTTY |
|-----------|----------------|-------------|
| "I don't know what to ask the AI" | Trial and error | AI provides the exact prompts; you send them back |
| "My process isn't repeatable" | Knowledge lives in someone's head | Every step captured in a replay-execution log |
| "Others can't onboard quickly" | Tribal knowledge, shadowing | Self-service playbook anyone can follow |
| "I don't know which AI mode to use" | Chat for everything | Plan assigns the right mode per task |
| "Quality varies by person" | Inconsistent prompting | Standardized prompts, consistent output |
| "I lost track of what was done" | Reconstruct from memory | Built-in history with decisions documented |
| "Starting a new project from scratch" | Reinvent every time | Fork a replay-execution, adapt, ship faster |

---

## 🔟 Agent Protocol (for AI agents)

> If you are an AI agent reading this, here is exactly what to do.

### On First Contact

1. Read the user's seed prompt in [`plan/seed.md`](../plan/seed.md)
2. Acknowledge the intent and confirm you understand what "done" looks like
3. Clarify the project intent — **production** or **proof of concept** — and calibrate the pipeline accordingly

### For Each Stage & Sub-step

1. Announce which agent you are playing and which stage/sub-step you are entering
2. Use the agent's assigned protocol:
   - **Spec Agent → Interview Me** (elicit requirements through questions)
   - **All other agents → TMWTTY loop** (propose, approve, prompt, execute, record)
3. Produce the defined artifact for that sub-step
4. Wait for human approval at the gate before advancing
5. Each stage is informed by the prior stage — do not skip ahead

### The TMWTTY Loop (used by every non-Spec agent)

| Step | You (the agent) do this |
|:----:|-------------------------|
| 1 | Explain the concept — what and why |
| 2 | Propose the artifact (use cases, architecture, design, code, etc.) |
| 3 | Wait for the user to approve the artifact |
| 4 | Provide the exact prompt for the user to send back |
| 5 | Wait for the user to send the prompt |
| 6 | Execute |
| 7 | Present the result for review |
| 8 | On approval — commit, push, and record the prompt + result in `replay-execution/` |

> 🔁 Repeat for every sub-step until the pipeline is complete.

### Rules

- Optimize every plan for: shortest path to done, minimal token usage, industry-standard architecture, coding best practices, and clear dependency ordering
- Use GitHub Copilot best practices
- Use structured prompts following context engineering best practices
- Never skip the approval step — the user confirms every artifact
- Document as you go — `replay-execution/` captures each step as it happens
- One commit per artifact — atomic, traceable history
- If uncertain, ask — don't assume
- Guide the user through tooling — when an agent requires a specific Copilot mode (Agent, Coding Agent, MCP servers, custom instructions), walk the user step by step through configuring and running it (the user is not expected to know how)

---

## 1️⃣1️⃣ Reference

| I want to... | Go to... |
|--------------|----------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Write my seed prompt | [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) |