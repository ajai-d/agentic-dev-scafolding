# Agent Modes

> Reference guide for all agent execution modes. The plan specifies which mode to use per item.

---

## Overview

| Mode | Human Involvement | Speed | Best For |
|------|-------------------|-------|----------|
| **Interactive** | High — approve every step | Slow | Decisions, learning, sensitive changes |
| **Autopilot** | Low — review at checkpoints | Fast | Well-defined tasks with clear specs |
| **Fleet** | Minimal — review final output | Fastest | Parallel work, independent tasks |

---

## Interactive Mode

```
Human ←→ Agent (every step)
```

**How it works:**
- Agent explains the concept
- Agent gives you the prompt
- You send it back
- Agent executes
- You approve
- Agent commits

**Use when:**
- You're learning something new
- Decisions need human judgment
- Changes are risky or irreversible
- You want to understand every detail

**Example:** Setting up repo structure, choosing tech stack, reviewing architecture.

---

## Autopilot Mode

```
Human → Agent (runs) → Human (reviews)
```

**How it works:**
- You give the agent a well-defined task
- Agent runs through all steps autonomously
- Agent pauses at checkpoints for your review
- You approve the batch of work

**Use when:**
- The spec is clear and unambiguous
- The task is low-risk
- You trust the agent's output quality
- Speed matters more than learning

**Example:** Implementing an API endpoint from a spec, writing tests for existing code.

---

## Fleet Mode

```
Human → [Agent 1, Agent 2, Agent 3, ...] → Human (reviews all)
```

**How it works:**
- You break work into independent parallel tasks
- Multiple agents work simultaneously on different items
- Each agent delivers its output
- You review all outputs together

**Use when:**
- Tasks are independent (no dependencies between them)
- Volume is high (many similar tasks)
- Each task is well-scoped
- You want maximum throughput

**Example:** Building multiple API endpoints in parallel, writing tests for 5 modules simultaneously.

---

## Choosing the Right Mode

```
Is this a learning moment or risky decision?
  → YES → Interactive

Is the spec clear and the task well-defined?
  → YES → Can multiple tasks run in parallel?
              → YES → Fleet
              → NO  → Autopilot

  → NO  → Interactive (clarify first, then switch)
```

---

## Mixing Modes

A single project will use **multiple modes**. The plan specifies the mode per item:

| # | Item | Agent Mode | Why |
|---|------|-----------|-----|
| 1 | Set up repo | Interactive | Need decisions on structure |
| 2 | Build MCP server | Autopilot | Spec is clear from seed |
| 3 | Write all unit tests | Fleet | Tests are independent |
| 4 | Review + integrate | Interactive | Need human judgment |
