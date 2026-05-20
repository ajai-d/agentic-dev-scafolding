# Running Use Case — "Top 5 Stocks" MCP Demo

> **Purpose of this document:** Lock in the **one simple use case** we will use throughout the entire course. Every lesson — from "your first agent task" to "multi-agent autonomous coding" — will build on this example.
>
> **Status:** ✅ Locked in. Changes require a new version of this doc.

---

## 1. Why This Use Case

We need an example that is:

- **Small enough** for a beginner (even an 8th grader) to follow.
- **Real enough** to touch industry-standard technology (**MCP** — the Model Context Protocol).
- **Layered** — has a UI, a client, and a server — so we can later split work across multiple agents.
- **Fun** — stocks are concrete, visible, and easy to reason about.

---

## 2. Intent (the *what* and *why*)

> Teach any developer — even a beginner — how to build a working **MCP Server, MCP Client, and Single Page Application (SPA) UI** end-to-end, using Agentic AI Coding.

- **Done =** anyone can clone the repo, run **one command**, click **one button**, and see the **Top 5 stocks** on screen.
- **Why it matters:** MCP is becoming the standard way AI agents talk to tools. Learning it on a small, fun example builds skills that transfer to any real project.

---

## 3. Execution (the *how* — the agent does this; you direct and review)

We build in **three progressive steps**. Each step is a complete, working version.

### Step 1 — Walking Skeleton (hardcoded data)

- Build an **MCP Server** with **one tool**: `get_top_stocks` that returns a **hardcoded list of 5 fake stocks**.
- Build an **MCP Client** that calls that tool.
- Build a **one-page SPA** with **one button**: *"Get Top Stocks"*. Clicking it shows the 5 stocks.

**Outcome:** End-to-end flow works. Nothing is real yet, but everything is wired.

### Step 2 — Real Data (iterative enrichment)

- Replace the hardcoded list with a **real stock API call** (Yahoo Finance — free, no API key needed).
- Add basic error handling (what if the API is down? what if the network is slow?).

**Outcome:** Real data flowing through the same pipes.

### Step 3 — Reusable Scaffolding

- Extract the pieces (server template, client template, SPA template) into a **starter folder** anyone can copy for *any* future MCP project — not just stocks.
- This is the **scaffolding** the rest of the course (and your real projects) will reuse.

**Outcome:** A drop-in template for any future MCP-based project.

---

## 4. Governance (how we trust the agent's work)

| Rule | What it means |
|---|---|
| **Automated happy-path test** | Click the button → result list appears → list has 5 items → no item is null. |
| **Pass bar** | All tests green in CI. **No merge if red.** |
| **Human review** | You read every PR diff before merge. |
| **Scope guardrail** | Agent may only touch files inside the project's working folder (e.g., `/demo/`). No stray edits elsewhere. |
| **No secrets in code** | API keys (when introduced) go in `.env` files — never committed. |

---

## 5. Tech Stack (locked in)

| Layer | Choice | Why |
|---|---|---|
| **MCP Server** | **Python** (official MCP SDK) | Most mature SDK; easiest for beginners. |
| **MCP Client** | **TypeScript** (official MCP SDK) | Standard in the web ecosystem. |
| **SPA UI** | **Minimal HTML + TypeScript** (no React, no framework) | Keeps it 8th-grader friendly. We can add frameworks later if we want. |
| **Stock data (Step 2)** | **Yahoo Finance** (free, no key) | Simplest. We'll switch to a key-based API later when we teach secrets management. |
| **Tests** | **Pytest** (server) + **Playwright** (E2E UI) | Industry standard, simple to run. |
| **CI** | **GitHub Actions** | Free, standard, agent-friendly. |

---

## 6. What "Done" Looks Like (Definition of Done)

At the **end of the course**, the following must all be true:

- ✅ The repo can be cloned by anyone.
- ✅ One command (e.g., `make demo` or `npm run demo`) starts everything.
- ✅ A browser opens. One button shows the Top 5 stocks (real data).
- ✅ Happy-path E2E test is green in CI.
- ✅ The `/scaffolding/` folder can be copied to start a brand-new MCP project in minutes.
- ✅ Documentation explains every piece in plain language.

---

## 7. What This Use Case Is *Not*

- ❌ **Not** a financial product. Don't trade based on it.
- ❌ **Not** a production system. We optimize for learning, not scale.
- ❌ **Not** locked to stocks forever — the **scaffolding** is the real product. Stocks are just the teaching example.

---

## 8. Change Log

| Version | Date | Change | Approved by |
|---|---|---|---|
| 1.0 | 2026-05-19 | Initial lock-in. | Learner ✅ |

---

**Next step:** Lesson 1 — *Setting Up Your Learning Repo.*
