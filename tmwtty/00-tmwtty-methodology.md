# Tell Me What To Tell You (TMWTTY)

> **A framework for AI-assisted work where the AI writes the prompts.**

TMWTTY is a methodology for working with AI agents that removes the burden of prompt engineering. Instead of crafting prompts yourself, you provide a short statement of intent — and the AI proposes each next step, supplies the exact prompt to send back, and executes only after your explicit approval. Every interaction is captured in a replay-execution log that serves as both project history and a reproducible reference.

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
| 7 | [Runtime](#7-runtime) | GitHub Copilot runtime modes and features |
| 8 | [Guardrails](#8-guardrails) | Security, quality, and process boundaries |
| 9 | [Risk calibration](#9-risk-calibration) | How the pipeline adapts to project risk |
| 10 | [Failure handling](#10-failure-handling) | Retry, abandon, and escalation semantics |
| 11 | [Limitations](#11-limitations) | Honest constraints of the methodology |
| 12 | [Agent protocol](#12-agent-protocol) | Operating instructions for AI agents |
| 13 | [Reference](#13-reference) | Related documents |

---

## 1. Overview

### What is TMWTTY?

**TMWTTY ("Tell Me What To Tell You")** is a framework for AI-assisted work. The defining characteristic of TMWTTY is that **the user does not need to write prompts**. Instead, the AI proposes each action, supplies the exact prompt to send back, and waits for the user to send it before executing.

This approach delivers three core properties:

- **Determinism** — Every action is explicitly approved by the user; nothing happens autonomously without consent.
- **Reproducibility** — Every prompt and result is captured in a replay-execution log that documents how the project was built.
- **Generality** — TMWTTY is not specific to software. It applies equally well to writing, research, data analysis, operational runbooks, and other domains.

In this repository, TMWTTY is applied to a full Agentic SDLC: going from a short statement of intent to a deployed, production-grade system, with AI agents doing the work under human direction.

### The problem TMWTTY solves

| Challenge | Without TMWTTY | With TMWTTY |
|-----------|----------------|-------------|
| *"I don't know what to ask the AI."* | Trial and error. | The AI interviews you to surface the right requirements. |
| *"My process isn't repeatable."* | Knowledge lives in one person's head. | Every step is captured in a replay-execution log. |
| *"Others can't onboard quickly."* | Tribal knowledge, shadowing. | A reproducible sequence of prompts that any team member can replay end to end. |
| *"I don't know which AI mode to use."* | Chat for everything. | The plan assigns the appropriate mode to each task. |
| *"Quality varies by person."* | Inconsistent prompting. | Standardized prompts produce consistent output. |
| *"I lost track of what was done."* | Reconstruct from memory. | Built-in history with documented decisions. |
| *"I'm starting from scratch again."* | Reinvent every time. | Fork an existing replay-execution log, adapt, and ship faster. |

---

## 2. Core concepts

| Term | Definition |
|------|------------|
| **Seed prompt** | A short description of what the user wants to build. Saved in `plan/seed.md`. Example: *"An MCP server that returns the top five performing stocks."* |
| **Spec** | A document capturing requirements, acceptance criteria, and edge cases. Produced by the Spec Agent. Saved in `plan/spec.md`. |
| **Plan** | A living document containing use cases, architecture, design, and the agent orchestration plan. Saved in `plan/plan.md`. |
| **Replay-execution log** | A markdown file capturing every prompt and result from the project. Acts as both project history and a reference template for similar future work. See [Limitations](#11-limitations) for caveats on direct replay. Saved in `replay-execution/replay-execution.md`. |
| **Agent** | A specialized AI role assigned to a single responsibility (for example, Spec Agent or Implementation Agent). For lower-risk projects, a single AI plays all roles sequentially. For higher-risk projects, real subagents with isolated contexts are used (see [Section 9](#9-risk-calibration)). |
| **Skill** | An atomic capability an agent can invoke (for example, *run tests*, *open a PR*, *search the web*, *generate documentation*). Skills are the building blocks; agents are the personas that orchestrate skills. |
| **Risk level** | A 1–5 calibration of the project's risk profile that determines how much process the pipeline enforces. See [Section 9](#9-risk-calibration). |
| **Agentic SDLC** | A software development lifecycle in which AI agents perform most of the work — designing, coding, testing, and deploying — under human direction. |

---

## 3. How it works

The core mechanism of TMWTTY is a seven-step loop executed by the AI on every task. The user's role is to approve at two gates: the proposed artifact (step 2) and the result of execution (step 6).

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
│   4. You send it      →  Review, refine, or say "go"   │
│                           to send as-is                 │
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

### Fast-path approval

For low-risk steps, the user may respond to step 2 with **"go"** or **"approved — execute"** to skip the explicit prompt-review in step 4. The AI executes immediately and records what it ran. This trades the prompt-review gate for velocity and is appropriate when the user already understands and trusts the proposed approach.

The risk calibration (see [Section 9](#9-risk-calibration)) determines whether fast-path is allowed for a given sub-step.

---

## 4. Interaction protocols

TMWTTY uses two distinct interaction protocols depending on what the AI needs from the user.

### 4.1 Interview Me

Used **only by the Spec Agent**.

The Spec Agent has no prior knowledge of what the user wants to build. It conducts a structured interview — asking targeted questions to elicit requirements, edge cases, and acceptance criteria — and synthesizes the responses into a formal specification.

> **Note:** The Spec Agent should propose sensible defaults when the user lacks domain expertise (for example, suggesting OAuth 2.0 when the user says "I want secure login"). Pure interviewing without expert pushback risks producing weak specs.

This protocol runs exactly once per project, at the start of the Spec stage.

### 4.2 TMWTTY loop

Used by **every other agent** in the pipeline. These agents bring industry-standard expertise to their respective domains. Rather than interviewing the user, they propose an artifact for approval, supply the prompt to send back, execute, and record the result.

---

## 5. Applying TMWTTY to the SDLC

When TMWTTY is applied to software development, it produces a structured, six-stage pipeline:

```
SEED → SPEC → PLAN → EXECUTE → DEPLOY → OPERATE
```

Each stage is **informed by the prior stage's output**. No stage begins until the prior stage is approved.

> **Note:** The sub-steps shown below are the default set. The Planning Agent tailors them to the project's [risk level](#9-risk-calibration). A risk-1 prototype may use only Implement and Test; a risk-5 system uses every sub-step plus additional gates.

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

#### Orchestration decision framework

The Planning Agent assigns each use case to one of the following execution patterns:

| Pattern | When to use |
|---------|-------------|
| **Sequential** | Use cases share files, depend on prior outputs, or require careful review. |
| **Parallel (`/fleet`)** | Use cases are file-independent and can run concurrently (for example, separate microservices, separate components). |
| **Delegated (`/delegate`)** | Use case is fully specified, has clear acceptance criteria, and can run asynchronously (issue → PR via the Coding Agent). |
| **Hierarchical (subagents)** | Use case is large enough to need its own internal decomposition by a dedicated subagent. |

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

TMWTTY runs in **GitHub Copilot** — either of two runtimes plays the agent roles:

| Runtime | Recommended for | Notes |
|---------|-----------------|-------|
| **VS Code Agent mode** | Code-heavy projects (recommended default) | Inline diffs, collapsible subagent panels, visual approval gates make the TMWTTY loop feel natural |
| **Copilot CLI** | Ops, runbooks, headless or remote environments | Terminal-native; better for scripting and CI |

Each agent in the pipeline is a role played by the chosen runtime. Both runtimes support the same set of modes and features described below.

> **Important:** For projects at risk level 4 or 5 (see [Section 9](#9-risk-calibration)), each agent role must run as a **separate custom agent with an isolated context**, not as different roles played by a single shared context. Cosmetic role separation is acceptable for risk levels 1–3.

### 7.1 Agent modes

The Planning Agent selects the appropriate mode for each sub-step.

| Mode | Description | TMWTTY usage |
|------|-------------|--------------|
| **Interactive** *(default)* | The user explicitly approves each tool action. | The default for every stage. Implements the TMWTTY loop. |
| **Autopilot** | The agent runs fully autonomously without approval prompts. | Used when the spec is precise and the work is low risk. |
| **Plan** | The agent generates a multi-step plan, waits for user approval, then executes. | Used during the Plan stage. |
| **Fleet** (`/fleet`) | The agent decomposes work into parallel subtasks executed by subagents. | Used when use cases are file-independent and can run concurrently. |

### 7.2 Features

| Feature | Command / Location | TMWTTY usage |
|---------|--------------------|--------------|
| **Custom Agents** | `.github/agents/<name>.md` | Each pipeline role is defined as a persistent custom agent with focused instructions, tools, and optional model selection. |
| **Skills** | Per-agent skill declarations | Atomic capabilities (run tests, open PR, scan dependencies, generate docs, etc.). Agents declare which skills they need; the runtime invokes them when appropriate. Custom skills can be added per project. |
| **AGENTS.md** | Repository root | Project-wide instructions that all agents read. Used to encode TMWTTY conventions, commit standards, and project context. |
| **Subagents** | Auto-spawned or `/agent <name>` | Isolated-context agents for specialized subtasks. Required for risk levels 4–5. |
| **Delegate** | `/delegate` | Hands off a fully specified use case to the GitHub Copilot Coding Agent (cloud, async) for issue-to-PR execution. |
| **MCP Servers** | Per-agent configuration | Connects agents to external tools, data sources, or alternate models. |

---

## 8. Guardrails

During the Plan stage, the Planning Agent guides the user through establishing industry-standard guardrails appropriate to the project. Guardrails are **negotiated, not prescribed** — they are determined through the TMWTTY loop based on the project's scope, technology stack, and [risk level](#9-risk-calibration).

| Category | Examples |
|----------|----------|
| **Security** | Secrets management, dependency scanning, least-privilege access |
| **Quality** | Testing strategy, linting, type safety, code review gates |
| **Architecture** | Separation of concerns, API contract design, dependency boundaries |
| **Operations** | CI/CD pipelines, environment parity, observability |
| **Process** | Commit conventions, branch strategy, approval workflows |

---

## 9. Risk calibration

The TMWTTY pipeline scales with the project's risk profile. The Planning Agent assesses risk on a 1–5 scale and adjusts the depth of process accordingly.

| Level | Profile | Pipeline behavior |
|:-----:|---------|-------------------|
| **1** | Throwaway prototype or experiment | Minimal sub-steps (Implement + light Test). Fast-path approval allowed throughout. Shared context. |
| **2** | Internal tool, low blast radius | Spec is informal. Code review optional. Fast-path allowed for routine sub-steps. Shared context. |
| **3** | Team-facing product, moderate stakes | Full Spec → Plan → Execute → Test. Fast-path allowed for Setup and routine implementations. Shared context acceptable. |
| **4** | Customer-facing or revenue-impacting | Full pipeline including Code Scanning and Security. Fast-path disabled for Implement and Test. **Isolated subagent contexts required.** |
| **5** | Regulated, safety-critical, or mission-critical | Full pipeline plus formal review gates. No fast-path. Mandatory isolated subagents. Mandatory threat modeling and external review. |

The Planning Agent confirms the assessed risk level with the user during the Plan stage before proceeding.

---

## 10. Failure handling

The methodology defines explicit semantics for when things go wrong.

| State | Trigger | Response |
|-------|---------|----------|
| **Retry** | A sub-step fails on first attempt (transient error, simple mistake). | Agent retries up to twice with adjusted approach. |
| **Refine** | User rejects the proposed artifact (steps 2 or 6). | Agent revises based on user feedback, then re-proposes. Maximum three refinement cycles per artifact. |
| **Abandon** | Three refinement cycles fail to converge, or the user explicitly says "abandon this approach." | Agent records the failure in the replay-execution log, returns to the prior approved artifact, and asks the user how to proceed. |
| **Escalate** | The agent detects ambiguity it cannot resolve, a guardrail violation, or a risk-level mismatch. | Agent halts, surfaces the issue clearly, and waits for human direction. Never proceeds on assumption. |

Every abandon and escalate event is recorded in `replay-execution/replay-execution.md` with rationale, supporting future learning and process refinement.

---

## 11. Limitations

TMWTTY is not a silver bullet. Users should understand the following constraints.

| Constraint | Explanation |
|------------|-------------|
| **Replay logs degrade over time** | Dependencies, model behavior, and file state shift. A six-month-old log replayed in a fresh repository will likely require adaptation. Treat the log as a **structured reference**, not a guaranteed-replayable script. |
| **Velocity tax** | The full pipeline trades speed for safety. For routine production work, this overhead may exceed the benefit. Use risk calibration to right-size the process. |
| **Spec quality depends on the user** | The Spec Agent can only elicit what the user knows. Domain expertise gaps produce weak specs. The Spec Agent mitigates this by proposing defaults but cannot fully replace expertise. |
| **Cost** | Multiple agents with verbose context and interactive loops consume more tokens than single-agent autonomous execution. Plan for higher inference costs on complex projects. |
| **Single-context role separation is cosmetic** | At risk levels 1–3, all roles share one AI context. Real isolation requires subagents (risk 4–5). |
| **No native evaluation framework** | The methodology does not currently include automated evaluation of agent behavior or outcome quality. Teams should add their own evals for production use. |

---

## 12. Agent protocol

> This section provides operating instructions for AI agents executing TMWTTY. Human readers can skip to [Section 13](#13-reference).

### 12.1 On first contact

1. Read the user's seed prompt in [`plan/seed.md`](../plan/seed.md).
2. Acknowledge the intent and confirm your understanding of what "done" looks like.
3. Assess the project's [risk level](#9-risk-calibration) (1–5) and confirm it with the user.
4. Calibrate the pipeline (which sub-steps apply, whether fast-path is allowed, whether subagents are required) based on the confirmed risk level.

### 12.2 For each stage and sub-step

1. Announce which agent role you are playing and which stage or sub-step you are entering.
2. Use the agent's assigned protocol:
   - **Spec Agent** → Interview Me (elicit requirements; propose defaults when the user lacks expertise).
   - **All other agents** → TMWTTY loop (propose, approve, prompt, execute, record).
3. Produce the defined artifact for the sub-step.
4. Wait for explicit human approval at each gate before advancing.
5. Each stage is informed by the prior stage — do not skip ahead.

### 12.3 The TMWTTY loop

| Step | Action |
|:----:|--------|
| 1 | Explain the concept — what you are about to do and why. |
| 2 | Propose the artifact (use cases, architecture, design, code, etc.). |
| 3 | Wait for the user to approve the artifact. If the user says **"go"** and fast-path is allowed for this sub-step, skip to step 6. |
| 4 | Provide the exact prompt for the user to send back. The user may review and refine before sending. |
| 5 | Wait for the user to send the prompt. |
| 6 | Execute. |
| 7 | Present the result for review. |
| 8 | On approval, commit, push, and record the prompt and result in `replay-execution/`. |

Repeat for every sub-step until the pipeline is complete.

### 12.4 Failure semantics

Follow the table in [Section 10](#10-failure-handling). Never proceed on assumption when escalation is warranted.

### 12.5 Rules

- **Optimize plans** for the shortest path to done given the risk level, minimal token usage, and industry-standard practices.
- **Follow GitHub Copilot best practices** and use structured prompts that conform to context engineering principles.
- **Never skip a gate** at risk levels 4–5. Fast-path is disabled for sensitive sub-steps.
- **Document continuously.** The replay-execution log must capture each step, each abandon, and each escalation.
- **One commit per artifact** to preserve an atomic, traceable history.
- **When uncertain, ask.** Do not assume.
- **Guide the user through tooling.** When a sub-step requires a specific Copilot mode or feature, walk the user through the configuration step by step.
- **Honor the risk level.** At levels 4–5, use isolated subagent contexts. At levels 1–3, shared context is acceptable.

---

## 13. Reference

| To... | See... |
|-------|--------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Create a seed prompt | [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) |