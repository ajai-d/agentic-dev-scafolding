# Lesson 0 — What Is Agentic SDLC, Really?

> **Goal of this lesson:** Build the mental model. No code yet. Just clear thinking.
> **Time:** ~10 minutes of reading. No setup required.

---

## 1. What

**SDLC** stands for **Software Development Life Cycle** — the steps a team takes to go from *"we have an idea"* to *"it's running in production."*

A traditional SDLC looks like this:

```
Idea  →  Requirements  →  Design  →  Code  →  Test  →  Review  →  Deploy  →  Operate
         (human)         (human)    (human)  (human)   (human)    (human)    (human)
```

**Humans do every step.** Tools help (IDEs, compilers, CI/CD), but humans drive each phase.

---

**Agentic SDLC** is the same life cycle — but **AI agents do most of the *doing*, while humans do the *directing and deciding*.**

```
Idea  →  Spec  →  Plan  →  Code  →  Test  →  Review  →  Deploy  →  Operate
(human)  (human)  (agent)  (agent)  (agent)  (human +   (agent)    (agent +
                                              agent)                human)
```

> **An "agent"** = an AI assistant (like **GitHub Copilot**) that can **read, think, use tools, and take actions** — not just chat. It can open files, run commands, write code, run tests, and open pull requests.

---

## 2. Why It Matters

Three shifts make this a big deal for traditional developers:

### Shift 1: Your job changes
- **Before:** You write the code.
- **After:** You **describe what you want**, **review what the agent did**, and **decide what ships.**

You move from *typing* to *thinking, directing, and judging.* Your value goes up — your hands move less, your brain moves more.

### Shift 2: Speed and scale change
- One developer + one agent can do the work of a small team for many kinds of tasks.
- Multiple agents can work in parallel — one writing code, one writing tests, one reviewing.

### Shift 3: The "source of truth" changes
- **Before:** The **code** is the truth. Specs go stale.
- **After:** The **spec** is the truth. Agents regenerate code from it. Specs stay alive.

This is called **spec-driven development**, and it's the heart of Agentic SDLC.

---

## 3. The Five Words You Need To Know

Memorize these. We'll use them in every lesson.

| Word | Plain meaning | Everyday example |
|---|---|---|
| **Agent** | An AI that can take actions, not just talk. | Copilot CLI opening files and running tests for you. |
| **Spec** | A short document that says *what* to build and *why* — not *how*. | "Build a function that adds two numbers and rejects strings." |
| **Context** | Everything the agent can see right now (files, instructions, history). | The open repo + your `AGENTS.md` file + your last message. |
| **Tool / Skill** | A specific action the agent knows how to do. | "Run tests", "open a PR", "search the web". |
| **Loop** | The repeating cycle of: think → act → check → repeat. | Agent writes code → runs tests → sees failure → fixes → retries. |

---

## 4. The Three Levels Of Autonomy

Autonomy is a **dial, not a switch.** You decide how much rope to give the agent.

| Level | Name | What happens | When to use it |
|---|---|---|---|
| **L1** | **Interactive** | Agent suggests; you approve every step. | Learning, sensitive code, high-stakes changes. |
| **L2** | **Autopilot** | Agent runs a whole task end-to-end; you review the result. | Well-defined tasks with good tests. |
| **L3** | **Fleet / Autonomous** | Many agents work in parallel on many tasks; you govern the system. | Mature teams with strong specs, evals, and guardrails. |

> **Rule of thumb:** Start at **L1**. Earn your way to **L2** and **L3** by building **trust through evidence** (tests, evals, clean PRs).

---

## 5. The Golden Rule Of Agentic SDLC

> **Humans set intent. Agents execute. Humans govern outcomes.**

- **Intent** = the spec, the goal, the constraints.
- **Execute** = the agent reads, writes, runs, and iterates.
- **Govern** = you review, approve, measure, and improve.

If you remember nothing else from this lesson, remember this sentence.

---

## 6. What Agentic SDLC Is *Not*

To avoid confusion, here's what it is **not**:

- ❌ **Not** "ChatGPT writes my code and I paste it." That's chat-assisted coding, not agentic.
- ❌ **Not** "the AI replaces developers." It replaces *typing*, not *thinking*.
- ❌ **Not** "magic." Agents fail, hallucinate, and need guardrails. Your job is to build those guardrails.
- ❌ **Not** "all-or-nothing." You can adopt one piece (e.g., specs) without going full autonomous.

---

## 7. Try It Yourself (No Code)

Take a small task you did this week — for example, *"added a new field to a form."*

Write down, in three lines:

1. **Intent** — what was the goal? (e.g., "Let users enter a phone number on signup.")
2. **Execution** — what did you actually *do*? (e.g., "Edited 4 files, ran tests, opened PR.")
3. **Governance** — how was it checked? (e.g., "Self-review + 1 teammate approval.")

Now ask yourself:
> *"If an agent had done step 2, what would I need to give it (intent) and check (governance) to feel safe?"*

That question is the **entire art of Agentic SDLC.**

---

## 8. What We Just Unlocked

You now have:

- ✅ A clear definition of **Agentic SDLC**.
- ✅ The **five core words**: Agent, Spec, Context, Tool, Loop.
- ✅ The **three autonomy levels**: Interactive → Autopilot → Fleet.
- ✅ The **golden rule**: *Humans set intent. Agents execute. Humans govern outcomes.*

You're ready to **build** something.

---

## 9. What's Next

**Lesson 1 — Setting Up Your Learning Repo**

We will:

- Create the GitHub repository that becomes your textbook + toolkit.
- Install the basic tools (git, an editor, and one AI coding agent).
- Run your first agent-driven task: *"Add a hello-world script to the repo."*

When you're ready, say **"go"** and we'll begin.
