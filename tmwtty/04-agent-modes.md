# 📘 Agent Modes & Prompt Anatomy

> 🎯 **Quick reference.** The three execution modes and the six elements of a good prompt.

<table>
<tr><td><b>What</b></td><td>How the agent works with you and how to structure prompts</td></tr>
<tr><td><b>Key point</b></td><td>The agent picks the right mode per plan item — you don’t need to memorize this</td></tr>
</table>

---

## 1️⃣ The Three Agent Modes

| Mode | How It Works | Best For |
|------|-------------|----------|
| **Interactive Agent** | Agent and human work together step by step — the TMWTTY loop | Decisions, learning, risky changes, anything new |
| **Autonomous Agent** | Agent works independently, human reviews the output | Well-defined tasks with clear specs |
| **Multi-Agent Orchestration** | Multiple agents work in parallel on independent items | High volume, independent tasks, maximum throughput |

> The plan specifies the mode for each item. The agent guides you through setup when the time comes.

---

## 2️⃣ The 6 Elements of a Good Prompt

Every prompt the agent gives you follows this structure:

| # | Element | What It Answers |
|:-:|---------|----------------|
| 1 | **Goal** | What to produce |
| 2 | **Context** | What the agent should already know |
| 3 | **Specification** | Explicit requirements |
| 4 | **Sources** | Citations to trusted references |
| 5 | **Guardrails** | What *not* to do |
| 6 | **Verification** | How to prove it worked |

> You don’t need to write prompts in this format yourself — the agent does it for you.
> This is here so you understand *why* the prompts the agent gives you are structured the way they are.
