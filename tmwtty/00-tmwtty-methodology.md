# 📘 Tell Me What To Tell You™ (TMWTTY)

---

| | |
|:-:|---|
| 1 | [Executive Summary](#1️⃣-executive-summary) |
| 2 | [The Problem TMWTTY Solves](#2️⃣-the-problem-tmwtty-solves) |
| 3 | [The Pipeline](#3️⃣-the-pipeline) |
| 4 | [Folder Structure](#4️⃣-folder-structure) |
| 5 | [Agent Modes](#5️⃣-agent-modes) |
| 6 | [Philosophy](#6️⃣-philosophy) |
| 7 | [Guardrails](#7️⃣-guardrails) |
| 8 | [Agent Protocol](#8️⃣-agent-protocol) |
| 9 | [Reference](#9️⃣-reference) |

---

## 1️⃣ Executive Summary

TMWTTY is a structured framework for AI-assisted work. It eliminates the guesswork of prompt engineering — **the AI provides the exact prompts**, the user sends them back, and the AI executes. Every step is recorded as a replayable script, so any engineer — regardless of experience level — can follow it to reproduce the same outcome.

**All you need is a seed prompt stating your intent.** The AI takes it from there and guides you every step of the way.

**TMWTTY is general-purpose.** It can be applied to anything: writing, research, data analysis, ops runbooks. **In this repository, we apply TMWTTY to implement a full Agentic SDLC** — Spec → Plan → Execute → Deploy → Operate.

---

## 2️⃣ The Problem TMWTTY Solves

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

## 3️⃣ The Pipeline

```
SEED → SPEC → PLAN → EXECUTE → DEPLOY → OPERATE
```

Each stage is informed by the prior stage's output. No stage starts until the prior stage is approved. Sub-stages can vary per project — the Planning Agent decides which apply based on intent (PoC vs. production).

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

## 4️⃣ Folder Structure

Every TMWTTY project follows this layout:

| Folder / File | Purpose |
|---------------|---------|
| `tmwtty/` | The methodology reference (you're reading it) |
| `plan/seed.md` | The seed prompt — your project intent |
| `plan/spec.md` | Requirements spec produced by Spec Agent |
| `plan/plan.md` | Use cases, architecture, design, orchestration — living document |
| `replay-execution/replay-execution.md` | Step-by-step playbook captured during execution |

---

## 5️⃣ Agent Modes

The orchestration plan assigns one of these modes to each agent per sub-step:

| Mode | How It Works | Best For |
|------|-------------|----------|
| **Interactive Agent** | Agent and human work together step by step — the TMWTTY loop | Decisions, learning, risky changes, anything new |
| **Autonomous Agent** | Agent works independently, human reviews the output | Well-defined tasks with clear specs |
| **Multi-Agent Orchestration** | Multiple agents work in parallel on independent items | High volume, independent tasks, maximum throughput |

> The agent guides you through configuring and running each mode — you don't need to know how upfront.

---

## 6️⃣ Philosophy

The methodology is intentionally minimal — it's a conversation protocol, not a prescription. The agent and user negotiate the details (execution-log format, commit conventions, sub-stage selection) during the interactive plan-building phase. Every project decides its own specifics through the TMWTTY loop.

**Two interaction protocols:**

- **Interview Me** — used only by the **Spec Agent**. The agent doesn't know what you want, so it interviews you to elicit requirements.
- **TMWTTY** — used by every other agent. The agent already knows best practices. It proposes, you approve, it provides the prompt, you send it back, it executes, the prompt + result are recorded.

---

## 7️⃣ Guardrails

During the plan-building phase, the Planning Agent guides the developer through establishing industry-standard guardrails appropriate to the project. These are not prescribed — they are negotiated through the TMWTTY loop based on the project's scope, stack, and risk profile.

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
3. Clarify the project intent — **production** or **proof of concept** — and calibrate the pipeline accordingly

### For Each Stage & Sub-step

1. Announce which agent you are playing and which stage/sub-step you are entering
2. Use the agent's assigned protocol:
   - **Spec Agent → Interview Me** (elicit requirements through questions)
   - **All other agents → TMWTTY** (propose, approve, prompt, execute, record)
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
>
> The `replay-execution/` log is a **script of prompts** — anyone can copy-paste them into an AI agent to reproduce the same project.

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

## 9️⃣ Reference

| I want to... | Go to... |
|--------------|----------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Write my seed prompt | [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) |