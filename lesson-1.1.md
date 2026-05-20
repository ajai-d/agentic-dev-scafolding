# 📘 Lesson 1.1 — What is Agentic SDLC?

> 🎯 **The mental model.** Read once. Re-read any time the Golden Rule feels fuzzy.

<table>
<tr><td><b>Phase</b></td><td>1 — Mental Model</td></tr>
<tr><td><b>Outcome</b></td><td>You can explain agentic dev to a colleague in one minute.</td></tr>
<tr><td><b>Read time</b></td><td>~10 minutes</td></tr>
<tr><td><b>Prerequisites</b></td><td>None</td></tr>
<tr><td><b>Hands-on?</b></td><td>No code yet — pure mindset</td></tr>
</table>

---

## 🗺️ Roadmap

| § | Topic |
|:-:|---|
| 1 | What is Agentic SDLC? |
| 2 | The Golden Rule |
| 3 | The 5 Core Words |
| 4 | The 3 Autonomy Levels |
| 5 | The 7 Copilot Surfaces |
| 6 | The 6-Element Prompt Anatomy |
| 7 | What This Is **Not** |
| 8 | Try It Yourself |
| 9 | What You Just Unlocked |
| 10 | What's Next |

---

## 1️⃣ What is Agentic SDLC?

**SDLC** = **Software Development Life Cycle** — the path from *"we have an idea"* to *"it's running in production."*

### Traditional SDLC

```
┌──────┐   ┌──────────────┐   ┌────────┐   ┌──────┐   ┌──────┐   ┌────────┐   ┌────────┐   ┌─────────┐
│ Idea │ → │ Requirements │ → │ Design │ → │ Code │ → │ Test │ → │ Review │ → │ Deploy │ → │ Operate │
└──────┘   └──────────────┘   └────────┘   └──────┘   └──────┘   └────────┘   └────────┘   └─────────┘
                          (humans do every step; tools assist)
```

### Agentic SDLC

```
┌──────┐   ┌──────┐   ┌───────┐   ┌───────┐   ┌───────┐   ┌──────────────┐   ┌────────┐   ┌───────────────┐
│ Idea │ → │ Spec │ → │ Plan  │ → │ Code  │ → │ Test  │ → │ Review       │ → │ Deploy │ → │ Operate       │
│      │   │      │   │       │   │       │   │       │   │ (human+agent)│   │        │   │ (agent+human) │
│ 👤   │   │ 👤   │   │ 🤖    │   │ 🤖    │   │ 🤖    │   │              │   │ 🤖     │   │               │
└──────┘   └──────┘   └───────┘   └───────┘   └───────┘   └──────────────┘   └────────┘   └───────────────┘
```

> �� **An "agent"** is an AI assistant — like **GitHub Copilot** — that can **read, think, use tools, and take actions.** Not just chat. It opens files, runs commands, writes code, runs tests, and opens pull requests.

### The shift in one sentence

> ### *You move from typing to thinking, directing, and judging.*

---

## 2️⃣ The Golden Rule

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   Humans set intent.   Agents execute.   Humans govern       ║
║                                          outcomes.           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

Three distinct roles. **Never mix them.**

| 🎯 Role | What it means | Example |
|---|---|---|
| **Intent** | The goal, the spec, the constraints | *"Add pagination to the search endpoint."* |
| **Execute** | Read, write, run, iterate | The agent edits 4 files, runs the tests, opens a PR. |
| **Govern** | Review, approve, measure, improve | You read the diff, request a fix, then merge. |

> 🧠 **If you remember nothing else from this lesson, remember this sentence.**
> Every later lesson is just better tools wrapped around this same loop.

---

## 3️⃣ The 5 Core Words

Memorize these. They appear in every later lesson.

| Word | Plain meaning | Everyday example |
|---|---|---|
| 🤖 **Agent** | An AI that takes actions, not just talks | Copilot CLI opens files and runs tests for you |
| 📋 **Spec** | A short document that says *what* and *why* — not *how* | *"A function that adds two numbers and rejects strings."* |
| 🧩 **Context** | Everything the agent can see right now | The open repo + your instructions file + your last message |
| 🔧 **Tool** | A specific action the agent knows how to do | *run tests* · *open a PR* · *search the web* |
| 🔁 **Loop** | Think → act → check → repeat | Agent writes code → runs tests → sees failure → fixes → retries |

---

## 4️⃣ The 3 Autonomy Levels

Autonomy is **a dial, not a switch.** *You* decide how much rope to give the agent.

| Level | Name | What happens | Use it when |
|:-:|---|---|---|
| **L1** | 🟢 **Interactive** | Agent suggests; you approve every step | Learning · sensitive code · high-stakes changes |
| **L2** | 🟡 **Autopilot** | Agent runs a task end-to-end; you review the result | Well-defined tasks with strong tests |
| **L3** | 🔴 **Fleet / Autonomous** | Many agents work in parallel; you govern the system | Mature teams with strong specs · evals · guardrails |

> 🎯 **Rule of thumb:**
> Start at **L1.** Earn your way to **L2** and **L3** by building *trust through evidence* — clean PRs, green tests, eval data.
>
> **Trust is earned, never given.**

---

## 5️⃣ The 7 Copilot Surfaces

GitHub Copilot shows up in seven distinct places. Knowing which to reach for is half the skill.

| # | Surface | What it is | When to use it |
|:-:|---|---|---|
| 1 | **Inline completions** | Ghost-text as you type | Fast loops · boilerplate · obvious next line |
| 2 | **Copilot Chat** | Sidebar conversation | Asking questions · multi-turn exploration |
| 3 | **Inline Chat** *(`Ctrl+I`)* | Quick chat right in the editor | Fix a small thing without leaving code |
| 4 | **Copilot Edits** | Multi-file coordinated changes with diff review | Refactors · feature work across files |
| 5 | **Agent Mode** | Autonomous plan → edit → run → iterate | Complete tasks that need terminal actions |
| 6 | **Copilot CLI** | Terminal-native agent (`copilot`) | Git ops · shell tasks · scripted automation |
| 7 | **GitHub.com** | PR summaries · code review · Cloud Agent | Async work · issue → PR · team workflows |

### 🧭 Decision rule — *match surface to scope*

```
  One line              →  Inline completions
  One file              →  Chat or Inline Chat
  Many files            →  Copilot Edits
  End-to-end task       →  Agent Mode or CLI
  Async / Issue → PR    →  Cloud Agent (GitHub.com)
```

---

## 6️⃣ The 6-Element Prompt Anatomy

A good *agentic* prompt has up to six elements. Use what each prompt needs — **not all six on every prompt.**

| # | Element | Asks | Example phrase |
|:-:|---|---|---|
| 1 | 🎯 **Goal** | What to produce | *"Create a `.gitignore` file…"* |
| 2 | 📚 **Context** | What the agent should already know | *"…for a Python + Node project."* |
| 3 | 📋 **Specification** | Explicit requirements | *"Include sections for Python, Node, editors, OS, secrets."* |
| 4 | 🔗 **Sources** | Citations to trusted references | *"Base it on GitHub''s official templates."* |
| 5 | 🛡️ **Guardrails** | What *not* to do | *"Don''t include `.env.example` in the ignore list."* |
| 6 | ✅ **Verification** | How to prove it worked | *"Show me the file before committing."* |

> 📝 **Side note:** Older frameworks like the **4S Framework** *(Single · Specific · Short · Surround)* and **comment-driven development** are real techniques — but they apply to **inline completions**, not agentic execution prompts. Useful vocabulary; not the daily-driver pattern here.

---

## 7️⃣ What This Is **Not**

To avoid common confusion, Agentic SDLC is *not*:

| ❌ Myth | ✅ Reality |
|---|---|
| *"ChatGPT writes my code and I paste it."* | That's chat-assisted coding — not agentic. |
| *"The AI replaces developers."* | It replaces *typing*, not *thinking*. |
| *"It's magic."* | Agents fail, hallucinate, and need guardrails. Building those guardrails is your job. |
| *"It's all-or-nothing."* | You can adopt one piece (e.g., specs) without going fully autonomous. |

---

## 8️⃣ Try It Yourself

Pick a small task you did this week — for example, *"added a phone-number field to the signup form."*

Write down, in three lines:

| Layer | Your answer |
|---|---|
| 1️⃣ **Intent** | *What was the goal?* (e.g., *"Let users enter a phone number on signup."*) |
| 2️⃣ **Execution** | *What did you actually do?* (e.g., *"Edited 4 files, ran tests, opened a PR."*) |
| 3️⃣ **Governance** | *How was it checked?* (e.g., *"Self-review + 1 teammate approval."*) |

Now ask yourself:

> 🔎 *"If an agent had done step 2 — what would I need to give it (intent) and check (governance) to feel safe?"*

That question is **the entire art of Agentic SDLC.**

---

## 9️⃣ What You Just Unlocked

You can now:

- ✅ Define **Agentic SDLC** in one sentence and contrast it with traditional SDLC.
- ✅ Recite **the Golden Rule** — *humans set intent, agents execute, humans govern outcomes.*
- ✅ Use the **5 core words** (Agent · Spec · Context · Tool · Loop) without looking them up.
- ✅ Choose an **autonomy level** (Interactive → Autopilot → Fleet) for any task.
- ✅ Pick the right **Copilot surface** for a given scope.
- ✅ Write a prompt using the **6-element anatomy.**

---

## 🔟 What''s Next

**Lesson 1.2 — The Agent Contract.** We turn this folder into a real, agent-ready repository:

- The **three-layer instruction stack** — `AGENTS.md` + `.github/copilot-instructions.md` + path-specific.
- The **memory layer** — `PROGRESS.md`, `DECISIONS.md`, `NEXT.md`.
- **Conventional Commits** · PR template · `.env.example`.
- Push to **GitHub**.
- A tiny **Hello-Agent** task to prove the loop works end-to-end.

When you''re ready, say **"Next lesson."**

---

### 📚 Quick reference card

```
┌─────────────────────────────────────────────────────────────────┐
│  GOLDEN RULE                                                    │
│  Humans set intent. Agents execute. Humans govern outcomes.     │
├─────────────────────────────────────────────────────────────────┤
│  5 WORDS    Agent · Spec · Context · Tool · Loop                │
│  3 LEVELS   Interactive → Autopilot → Fleet                     │
│  7 SURFACES completions · Chat · Inline Chat · Edits ·          │
│             Agent Mode · CLI · GitHub.com                       │
│  6 PROMPT   Goal · Context · Specification · Sources ·          │
│  ELEMENTS   Guardrails · Verification                           │
└─────────────────────────────────────────────────────────────────┘
```
