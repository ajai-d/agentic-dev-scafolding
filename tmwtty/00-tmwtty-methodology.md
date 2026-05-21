# 📘 Tell Me What To Tell You™ (TMWTTY)

> A repeatable methodology for building software with AI agents — an Agentic SDLC pipeline.

---

| | |
|:-:|---|
| 1 | [Executive Summary](#1-executive-summary) |
| 2 | [The Golden Rule](#2-the-golden-rule) |
| 3 | [The Pipeline](#3-the-pipeline) |
| 4 | [Agents](#4-agents) |
| 5 | [Two Interaction Protocols](#5-two-interaction-protocols) |
| 6 | [Folder Structure](#6-folder-structure) |
| 7 | [Guardrails](#7-guardrails) |
| 8 | [Agent Protocol](#8-agent-protocol) |
| 9 | [Reference](#9-reference) |

---

## 1. Executive Summary

TMWTTY is an Agentic SDLC pipeline. Software is built by specialized AI agents — one per SDLC stage — coordinated by a human. Each stage produces a concrete artifact, gated by human approval, and every step is recorded as a replayable script.

> **Pipeline:** Seed → Spec → Plan → Setup → Implement → Test → Deploy → Operate

---

## 2. The Golden Rule

> **Humans set intent. Agents execute. Humans govern outcomes.**

- **Intent** = the seed and the spec
- **Execute** = agents run the orchestration plan
- **Govern** = human approves every artifact at every gate

---

## 3. The Pipeline

```
SEED → SPEC → PLAN → SETUP → IMPLEMENT → TEST → DEPLOY → OPERATE
```

| # | Stage | Driver | Output | Informed by |
|---|-------|--------|--------|-------------|
| 0 | **Seed** | Human | 1-sentence intent in `plan/seed.md` | — |
| 1 | **Spec** | Spec Agent | Requirements spec — what, why, acceptance criteria, edge cases | Seed |
| 2 | **Plan** | Architecture + Design + Planning Agents | Architecture, design, use case breakdown, agent orchestration plan | Spec |
| 3 | **Setup** | Setup Agent | Git, dev environment, Copilot config (custom instructions, agents, MCP servers), agent registry | Plan |
| 4 | **Implement** | Implementation Agents | Working code per use case | Setup |
| 5 | **Test** | Test Agents | Validated code — unit, integration, e2e | Implement |
| 6 | **Deploy** | Deployment Agent | CI/CD, infrastructure as code, running system | Test |
| 7 | **Operate** | Human + Agents | Monitoring, observability, iteration | Deploy |

Each stage is informed by the prior stage. No stage starts until the prior stage is approved.

---

## 4. Agents

Each agent has one job, one input, one output.

| Agent | Job | Protocol |
|-------|-----|----------|
| **Spec Agent** | Elicit requirements from the human | Interview Me |
| **Architecture Agent** | Propose system design and tech stack | TMWTTY |
| **Design Agent** | Define API contracts, data models, interfaces | TMWTTY |
| **Planning Agent** | Break work into use cases; produce orchestration plan | TMWTTY |
| **Setup Agent** | Initialize git, dev env, Copilot config, agent registry | TMWTTY |
| **Implementation Agent** | Build code per use case | TMWTTY |
| **Test Agent** | Validate code | TMWTTY |
| **Deployment Agent** | CI/CD, IaC, deploy | TMWTTY |

> One AI may play all roles sequentially. The roles constrain behavior so the AI stays on track.

---

## 5. Two Interaction Protocols

### Interview Me (Spec Agent only)

The Spec Agent doesn't know what you want. It interviews you — asks targeted questions to surface intent, requirements, edge cases, and acceptance criteria — then synthesizes the spec.

### TMWTTY (every other agent)

All other agents already know best practices. They propose, you approve, they execute:

| Step | Action |
|:----:|--------|
| 1 | Agent explains the concept — what and why |
| 2 | Agent proposes an artifact (architecture, design, plan, code, etc.) |
| 3 | You review and approve the artifact |
| 4 | Agent provides the exact prompt for you to send |
| 5 | You send the prompt back |
| 6 | Agent executes |
| 7 | You review the output |
| 8 | Agent commits, pushes, and records the prompt + result in `replay-execution/` |

> 🔁 The `replay-execution/` log is a **script of prompts** — anyone can copy-paste them to reproduce the same project.

---

## 6. Folder Structure

| Folder / File | Purpose |
|---------------|---------|
| `tmwtty/` | The methodology reference (you're reading it) |
| `plan/seed.md` | The seed prompt — your project intent |
| `plan/spec.md` | Requirements spec produced by Spec Agent |
| `plan/plan.md` | Architecture, design, use cases, orchestration plan |
| `replay-execution/replay-execution.md` | Step-by-step playbook captured during execution |

---

## 7. Guardrails

The Planning Agent guides the developer through establishing industry-standard guardrails appropriate to the project. Areas to cover:

| Category | Examples |
|----------|----------|
| **Security** | Secrets management, dependency scanning, least-privilege access |
| **Quality** | Testing strategy, linting, type safety, code review gates |
| **Architecture** | Separation of concerns, API contract design, dependency boundaries |
| **Operations** | CI/CD pipeline, environment parity, observability |
| **Process** | Commit conventions, branch strategy, approval workflows |

---

## 8. Agent Protocol

> If you are an AI agent reading this, here is exactly what to do.

### On First Contact

1. Read the user's seed prompt in [`plan/seed.md`](../plan/seed.md)
2. Acknowledge the intent and confirm what "done" looks like
3. Clarify the project intent — **production** or **proof of concept** — and calibrate accordingly

### For Each Stage

1. Announce which agent you are playing and which stage you are entering
2. Use the agent's assigned protocol (Interview Me for Spec, TMWTTY for everything else)
3. Produce the stage's defined artifact
4. Wait for human approval at the gate before advancing
5. Each stage is informed by the prior stage — do not skip ahead

### Rules

- Optimize every plan for: shortest path to done, minimal token usage, industry-standard architecture, coding best practices, and clear dependency ordering
- Use GitHub Copilot best practices and structured prompts (context engineering)
- Never skip a gate — the user approves every artifact
- Document as you go — `replay-execution/` captures each step as it happens
- One commit per artifact — atomic, traceable history
- If uncertain, ask — don't assume
- Guide the user through tooling — when an agent requires Copilot configuration (Agent mode, Coding Agent, MCP servers, custom instructions), walk the user step by step through configuring and running it

---

## 9. Reference

| I want to... | Go to... |
|--------------|----------|
| Start building | [`01-getting-started.md`](./01-getting-started.md) |
| Write my seed prompt | [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) |