# Plan Format

> The structured plan generated from your seed prompt. This is the roadmap for execution.

---

## Template

```markdown
# Project Plan

> Generated from seed prompt on [date].

## Objective

[One-paragraph summary of what we're building.]

## Agent Mode for This Project

[Which modes will be used — see 04-agent-modes.md]

- **Interactive** — Agent mode in VS Code, TMWTTY loop with approval at every step
- **Autonomous** — Coding Agent (cloud), assign issue and review PR
- **Parallel** — Multiple Coding Agents, independent items run simultaneously

## Plan Items

| # | Item | Agent Mode | Description | Status |
|---|------|-----------|-------------|--------|
| 1 | ... | Interactive | ... | ⬜ |
| 2 | ... | Autonomous | ... | ⬜ |
| 3 | ... | Parallel | ... | ⬜ |

## Dependencies

[Note any items that must be completed before others can start.]

## Done When

[Acceptance criteria — how do we know the project is complete?]
```

---

## Rules

1. **Each item is one prompt-sized unit** — small enough to execute in a single TMWTTY loop.
2. **Agent mode is per item** — choose based on complexity and need for human input.
3. **Status tracks progress** — ⬜ Pending → ⏳ In Progress → ✅ Done.
4. **Dependencies are explicit** — don't start item 3 if it depends on item 2.
5. **Plan can evolve** — update it as you learn more during execution.

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ⬜ | Pending |
| ⏳ | In Progress |
| ✅ | Done |
| ❌ | Blocked |
