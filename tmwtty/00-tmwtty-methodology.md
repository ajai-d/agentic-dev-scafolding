# Tell Me What To Tell You (TMWTTY)

> **A framework for AI-assisted work where the AI writes the prompts.**

TMWTTY is a methodology for working with AI agents that removes the burden of prompt engineering. Instead of crafting prompts yourself, you provide a short statement of intent — and the AI proposes each next step, supplies the exact prompt to send back, and executes only after your explicit approval. Every interaction is captured in a replayable log, making any project reproducible by anyone.

This document is the canonical reference for the TMWTTY methodology and its application to a full Agentic Software Development Life Cycle (SDLC).

---

## In this article

| # | Section | Purpose |
|:-:|---------|---------|
| 1 | [Overview](#1-overview) | What TMWTTY is and the problems it solves |
| 2 | [Core concepts](#2-core-concepts) | Key terms used throughout the methodology |
| 3 | [How it works](#3-how-it-works) | The TMWTTY loop explained step by step |
| 4 | [Interaction protocols](#4-interaction-protocols) | Interview Me and the TMWTTY loop |
| 5 | [Applying TMWTTY to the SDLC](#5-applying-tmwtty-to-the-sdlc) | The end-to-end pipeline |
| 6 | [Repository layout](#6-repository-layout) | Required folders and files |
| 7 | [Runtime](#7-runtime) | GitHub Copilot CLI modes and features |
| 8 | [Guardrails](#8-guardrails) | Security, quality, and process boundaries |
| 9 | [Agent protocol](#9-agent-protocol) | Operating instructions for AI agents |
| 10 | [Reference](#10-reference) | Related documents |

---

## 1. Overview

### What is TMWTTY?

**TMWTTY ("Tell Me What To Tell You")** is a framework for AI-assisted work. The defining characteristic of TMWTTY is that **the user does not need to write prompts**. Instead, the AI proposes each action, supplies the exact prompt to send back, and waits for the user to send it before executing.

This approach delivers three core properties:

- **Determinism** — Every action is explicitly approved by the user; nothing happens autonomously without consent.
- **Reproducibility** — Every prompt and result is captured in a replay-execution log that anyone can copy, paste, and re-run to produce the same outcome.
- **Generality** — TMWTTY is not specific to software. It applies equally well to writing, research, data analysis, operational runbooks, and other domains.

In this repository, TMWTTY is applied to a full Agentic SDLC: going from a short statement of intent to a deployed, production-grade system, with AI agents doing the work under human direction.

### The problem TMWTTY solves

| Challenge | Without TMWTTY | With TMWTTY |
|-----------|----------------|-------------|
| *"I don't know what to ask the AI."* | Trial and error | The AI interviews you to surface the right requirements. |
| *"My process isn't repeatable."* | Knowledge lives in one person's head. | Every step is captured in a replay-execution log. |
| *"Others can't onboard quickly."* | Tribal knowledge, shadowing. | A reproducible sequence of prompts that any team member can replay end to end. |
| *"I don't know which AI mode to use."* | Chat for everything. | The plan assigns the appropriate mode to each task. |
| *"Quality varies by person."* | Inconsistent prompting. | Standardized prompts produce consistent output. |
| *"I lost track of what was done."* | Reconstruct from memory. | Built-in history with documented decisions. |
| *"I'm starting from scratch again."* | Reinvent every time. | Fork an existing replay-execution log, adapt, and ship faster. |

---

## 2. Core concepts

The following terms are used throughout the methodology. Each represents either an artifact produced during a project or a role played by the AI.

| Term | Definition |
|------|------------|
| **Seed prompt** | A short description of what the user wants to build. Saved in `plan/seed.md`. Example: *"An MCP server that returns the top five performing stocks."* |
| **Spec** | A document capturing requirements, acceptance criteria, and edge cases. Produced by the Spec Agent. Saved in `plan/spec.md`. |
| **Plan** | A living document containing use cases, architecture, design, and the agent orchestration plan. Saved in `plan/plan.md`. |
| **Replay-execution log** | A markdown file capturing every prompt and result from the project. Acts as a script anyone can copy and paste to reproduce the same outcome. Saved in `replay-execution/replay-execution.md`. |
| **Agent** | A specialized AI role assigned to a single responsibility (for example, Spec Agent or Implementation Agent). In practice, a single AI plays all roles sequentially. |
| **Agentic SDLC** | A software development lifecycle in which AI agents perform most of the work — designing, coding, testing, and deploying — under human direction. |

---

## 3. How it works

The core mechanism of TMWTTY is a seven-step loop executed by the AI on every task. The user's role is to approve at two gates: the proposed artifact (step 3) and the result of execution (step 6).

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   1. AI proposes      →  "Here's what I think we       │
│                           should do next, and why."    │
│                                                         │
│   2. You approve      →  "Yes, that's right."          │
│                                                         │
│   3. AI gives prompt  →  "Here's the exact prompt to   │
│                           send back to me."            │
│                                                         │
│   4. You send it      →  (copy and paste the prompt)   │
│                                                         │
│   5. AI executes      →  Performs the work             │
│                                                         │
│   6. You review       →  Verify the result             │
│                                                         │
│   7. AI records       →  Commits the prompt and        │
│                           result to the replay-        │
│                           execution log                │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↻ repeat
```

The output of step 7 — the replay-execution log — is the project's most valuable artifact alongside the working deliverable. Anyone can read the log, copy the prompts in order, paste them into an AI agent, and reproduce the entire project end to end.

---

## 4. Interaction protocols

TMWTTY uses two distinct interaction protocols depending on what the AI needs from the user.

### 4.1 Interview Me

Used **only by the Spec Agent**.

The Spec Agent has no prior knowledge of what the user wants to build. It therefore conducts a structured interview — asking targeted questions to elicit requirements, edge cases, and acceptance criteria — and synthesizes the responses into a formal specification.

This protocol runs exactly once per project, at the start of the Spec stage.

### 4.2 TMWTTY loop

Used by **every other agent** in the pipeline.

These agents (Architecture, Design, Implementation, Test, and so on) bring industry-standard expertise to their respective domains. Rather than interviewing the user, they propose an artifact for approval, supply the prompt to send back, execute, and record the result. This is the seven-step loop described in Section 3.

---

## 5. Applying TMWTTY to the SDLC

When TMWTTY is applied to software development, it produces a structured, six-stage pipeline:

```
SEED → SPEC → PLAN → EXECUTE → DEPLOY → OPERATE
```

Each stage is **informed by the prior stage's output**. No stage begins until the prior stage is approved. Each stage contains one or more sub-steps, and each sub-step has a specialized agent assigned to it.

> **Note:** The sub-steps shown below are the default set. The Planning Agent tailors them to the project — for example, a proof of concept may omit Code Scanning and Security, while a production deployment uses the full pipeline.

### Seed

| Sub-step | Agent | Output |
|----------|-------|--------|
| 0a. Intent | Human | A short description of intent in `plan/seed.md` |

### Spec

| Sub-step | Agent | Output |
|----------|-------|--------|
| 1a. Discovery interview | Spec Agent | Raw interview notes |
| 1b. Requirements document | Spec Agent | Documented requirements |
| 1c. Acceptance criteria | Spec Agent | Measurable definition of done |

### Plan

| Sub-step | Agent | Output |
|----------|-------|--------|
| 2a. Use cases | Use Case Agent | Business use cases with dependencies and complexity assessment |
| 2b. Architecture | Architecture Agent | System design, components, and tech stack |
| 2c. Design | Design Agent | API contracts, data models, and interfaces |
| 2d. Orchestration | Planning Agent | Atomic work breakdown and agent orchestration plan |

### Execute

| Sub-step | Agent | Output |
|----------|-------|--------|
| 3a. Setup | Setup Agent | Git initialization, development environment, Copilot configuration, and agent registry |
| 3b. Implement | Implementation Agent | Working code for each use case |
| 3c. Code review | Code Review Agent | Code reviewed for quality, best practices, and anti-patterns |
| 3d. Code scanning | Code Scanning Agent | SAST, dependency scanning, and license compliance results |
| 3e. Security | Security Agent | Threat modeling, secrets scanning, and OWASP checks |
| 3f. Test | Test Agent | Unit, integration, and end-to-end tests |

### Deploy

| Sub-step | Agent | Output |
|----------|-------|--------|
| 4a. CI/CD pipeline | Deployment Agent | Build and deploy automation |
| 4b. Infrastructure as code | Deployment Agent | IaC templates (Bicep, Terraform, or equivalent) |
| 4c. Deployment | Deployment Agent | Running system in the target environment |
| 4d. Smoke tests | Deployment Agent | Verified deployment |

### Operate

| Sub-step | Agent | Output |
|----------|-------|--------|
| 5a. Monitoring | Monitoring Agent | Alerts and dashboards |
| 5b. Observability | Observability Agent | Logs, metrics, and traces |
| 5c. Iteration | Human + Agents | Feedback loop into the next Seed |

---

## 6. Repository layout

Every TMWTTY project uses the following structure:

| Path | Purpose |
|------|---------|
| `tmwtty/` | The methodology reference (this document). |
| `plan/seed.md` | The seed prompt expressing project intent. |
| `plan/spec.md` | The requirements specification produced by the Spec Agent. |
| `plan/plan.md` | Use cases, architecture, design, and orchestration — maintained as a living document. |
| `replay-execution/replay-execution.md` | The step-by-step playbook captured during execution. |

---

## 7. Runtime

TMWTTY runs in **GitHub Copilot CLI**. Each agent in the pipeline (Spec Agent, Architecture Agent, Implementation Agent, and so on) is a role played by Copilot CLI — one AI, many hats.

### 7.1 Agent modes

The Planning Agent selects the appropriate mode for each sub-step.

| Mode | Description | TMWTTY usage |
|------|-------------|--------------|
| **Interactive** *(default)* | The user explicitly approves each tool action. | The default for every stage. Implements the TMWTTY loop. |
| **Autopilot** | The agent runs fully autonomously without approval prompts. | Used when the spec is precise and the work is low risk. |
| **Plan** | The agent generates a multi-step plan, waits for user approval, then executes. | Used during the Plan stage. |
| **Fleet** (`/fleet`) | The agent decomposes work into parallel subtasks executed by subagents. | Used when use cases are independent and can run concurrently. |

### 7.2 Features

| Feature | Command | TMWTTY usage |
|---------|---------|--------------|
| **Custom Agents** | `/agent <name>` | Each pipeline role is defined as a persistent custom agent in `.github/agents/`. |
| **Subagents** | (implicit) | Spawned by Plan and Fleet modes for specialized subtasks. |
| **Delegate** | `/delegate` | Hands off a fully specified use case to the GitHub Copilot Coding Agent for asynchronous execution (issue → PR). |
| **MCP Servers** | per-agent configuration | Connects agents to external tools, data sources, or alternate models. |

> **Tip:** Users do not need to know how to configure these modes and features upfront. The Planning Agent guides the user through every configuration step as it becomes necessary.

---

## 8. Guardrails

During the Plan stage, the Planning Agent guides the user through establishing industry-standard guardrails appropriate to the project. Guardrails are **negotiated, not prescribed** — they are determined through the TMWTTY loop based on the project's scope, technology stack, and risk profile.

| Category | Examples |
|----------|----------|
| **Security** | Secrets management, dependency scanning, least-privilege access |
| **Quality** | Testing strategy, linting, type safety, code review gates |
| **Architecture** | Separation of concerns, API contract design, dependency boundaries |
| **Operations** | CI/CD pipelines, environment parity, observability |
| **Process** | Commit conventions, branch strategy, approval workflows |

> **Note:** The user is not expected to know which guardrails apply in advance. The agent surfaces the right guardrails at the right time.

---

## 9. Agent protocol

> This section provides operating instructions for AI agents executing TMWTTY. Human readers can skip to [Section 10](#10-reference).

### 9.1 On first contact

1. Read the user's seed prompt in [`plan/seed.md`](../plan/seed.md).
2. Acknowledge the intent and confirm your understanding of what "done" looks like.
3. Clarify the project's intent — **production** or **proof of concept** — and calibrate the pipeline accordingly.

### 9.2 For each stage and sub-step

1. Announce which agent role you are playing and which stage or sub-step you are entering.
2. Use the agent's assigned protocol:
   - **Spec Agent** → Interview Me (elicit requirements through questions).
   - **All other agents** → TMWTTY loop (propose, approve, prompt, execute, record).
3. Produce the defined artifact for the sub-step.
4. Wait for explicit human approval at each gate before advancing.
5. Each stage is informed by the prior stage — do not skip ahead.

### 9.3 The TMWTTY loop

| Step | Action |
|:----:|--------|
| 1 | Explain the concept — what you are about to do and why. |
| 2 | Propose the artifact (use cases, architecture, design, code, etc.). |
| 3 | Wait for the user to approve the artifact. |
| 4 | Provide the exact prompt for the user to send back. |
| 5 | Wait for the user to send the prompt. |
| 6 | Execute. |
| 7 | Present the result for review. |
| 8 | On approval, commit, push, and record the prompt and result in `replay-execution/`. |

Repeat for every sub-step until the pipeline is complete.

### 9.4 Rules

- **Optimize plans** for the shortest path to done, minimal token usage, industry-standard architecture, coding best practices, and clear dependency ordering.
- **Follow GitHub Copilot best practices** and use structured prompts that conform to context engineering principles.
- **Never skip an approval gate.** The user confirms every artifact.
- **Document continuously.** The replay-execution log must capture each step as it happens.
- **One commit per artifact** to preserve an atomic, traceable history.
- **When uncertain, ask.** Do not assume.
- **Guide the user through tooling.** When a sub-step requires a specific Copilot mode (Interactive, Autopilot, Plan, Fleet) or feature (Custom Agents, Subagents, Delegate, MCP), walk the user through the configuration step by step. The user is not expected to know how upfront.

---

## 10. Reference

| To... | See... |
|-------|--------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Create a seed prompt | [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) |