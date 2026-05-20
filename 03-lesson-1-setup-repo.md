# Lesson 1 — Setting Up Your Learning Repo

> **Style:** "Tell Me What To Tell You." This file is a **prompt book**, not a tutorial. Each concept records:
> 1. What the concept is (briefly).
> 2. The exact **prompt** the learner sent.
> 3. Why the prompt is well-formed.
> 4. The result (commit hash + one-line summary).
>
> Implementation details live in the actual files — not here.

---

## Roadmap (the full plan)

The lesson is divided into small, atomic **concepts**. Each one produces a single file (or a single behavior change) and a single commit. You can stop after any concept and resume later without losing context.

### ✅ Foundations (done)

| # | Concept | What it produces |
|---|---|---|
| 1 | The Git Repository | `.git/` initialized on `main` |
| 2 | `.gitignore` | Files Git will ignore (junk + secrets) |
| 3 | `.gitattributes` | Line-ending + binary-type rules |
| 4 | `LICENSE` | MIT license, SPDX-detectable |
| 5 | `README.md` | Repo front door |

### ⏳ Agent contract & PR hygiene (next)

| # | Concept | What it produces | Why |
|---|---|---|---|
| 6 | `AGENTS.md` | Universal instructions any AI agent reads first | The constitution of the repo — biggest concept in Lesson 1 |
| 7 | `.github/copilot-instructions.md` | GitHub Copilot–specific overlay | Copilot has its own native instructions file; this is the layer it reads |
| 8 | `.github/PULL_REQUEST_TEMPLATE.md` | Checklist baked into every PR | Forces Intent / Changes / Verification on every change |
| 9 | `.env.example` | Documents required env vars without committing real secrets | Prevents the #1 security mistake |

### ⏳ Conventions & remote (after #9)

| # | Concept | What it produces | Why |
|---|---|---|---|
| 10 | **Conventional Commits** | A documented commit-message style (no new file; updates `AGENTS.md` if needed) | Makes history machine-readable so agents can parse/review it |
| 11 | **Push to GitHub** | Public/private remote at `github.com/ajai-d/agentic-dev-scafolding` | Real cloud backup + collaboration surface |
| 12 | **First Agent Task — `HELLO_AGENT.md`** | A tiny file written by the agent on a directive | Proves the full loop: spec → agent action → human review → commit |

### 🕒 Deferred to later lessons (mentioned so you know they exist)

| Item | When we'll cover it | Why deferred |
|---|---|---|
| Other tool-specific instruction files (non-Copilot ecosystems) | Not in scope | This curriculum is **Copilot-only** (per D-009 / D-012). `AGENTS.md` already covers the cross-tool universals we care about. |
| CI workflow (`.github/workflows/ci.yml`) | Lesson 4 (Evals & Guardrails) | Needs tests to exist first |
| Branch protection rules on GitHub | Lesson 5 (Multi-agent orchestration) | Needed once multiple agents push |
| `CODEOWNERS`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` | When collaborators appear | Premature for a solo learning repo |

---

## Goal

Set up a real, industry-grade repo by directing an agent — concept by concept — using reusable prompts.

---

## Concept #1 — The Git Repository

**What it is:** A folder with a hidden `.git` subfolder that remembers every change. Required for everything else.

**Why it matters:** Agents only work *inside* repos. History = trust = governance.

**📋 Prompt**
```
Initialize a fresh Git repository in C:\projects\agentic-dev-scafolding
with main as the default branch. If a repo already exists there, leave it
alone and just tell me its current state. Then show me a short confirmation:
the branch name and whether there are any commits yet.
```

**🔑 Why this prompt is good**
- Specific path.
- Specific desired state (`main` as default).
- Safety clause (`if a repo exists, leave it alone`).
- Verification request (`show me a short confirmation`).
- Pattern: **goal + constraints + verification.**

**✅ Result:** Fresh repo, branch `main`, 0 commits. No commit yet.

---

## Concept #2 — `.gitignore`

**What it is:** A list of file patterns Git ignores. The repo's bouncer.

**Why it matters:** Prevents committing junk and — most importantly — **secrets**.

**📋 Prompt**
```
Create a .gitignore file at the repo root for our project. Base it on
GitHub's official templates for Python and Node, and also ignore:
- common editor folders (VS Code, JetBrains),
- OS junk (macOS, Windows),
- all .env files except .env.example,
- common AI/agent scratch folders (.aider*, .claude/, .cursor/),
- test output folders (Playwright, pytest, coverage).

Show me the final file content and the file size before I approve it.
```

**🔑 Why this prompt is good**
- Cites a trusted source (GitHub's official templates).
- Explicit categories — nothing missed.
- Secrets-with-exception rule (`.env` blocked, `.env.example` allowed).
- Show-before-commit (governance).

**✅ Result:** Committed as `53e9beb chore: add .gitignore (python, node, editors, os, secrets, agents)`.

---

## Concept #3 — `.gitattributes`

**What it is:** Tells Git how to handle file types — most importantly line endings.

**Why it matters:** Cross-platform teams (especially Windows ↔ Linux) get noisy diffs without it.

**📋 Prompt**
```
Create a .gitattributes file at the repo root. Use these rules:
- Default: normalize all text files to LF line endings on commit
  (so Windows, Mac, and Linux contributors all see clean diffs).
- Explicitly mark common text file types (.md, .py, .ts, .tsx, .js,
  .jsx, .json, .yml, .yaml, .html, .css, .sh) as LF.
- Windows-only scripts (.ps1, .bat, .cmd) must stay CRLF
  (or they won't run on Windows).
- Common binaries (.png, .jpg, .jpeg, .gif, .ico, .pdf, .zip) marked
  as binary so Git doesn't touch them.

Show me the file before committing. Also normalize any existing files
in the repo to the new rules so we don't get future CRLF warnings.
```

**🔑 Why this prompt is good**
- Embeds the *why* in the prompt itself.
- Lists exact extensions.
- Calls out the Windows-script exception.
- Asks for re-normalization in one shot.
- Show-before-commit.

**✅ Result:** Committed as `03292d0 chore: add .gitattributes (line endings, binary types)`. Re-normalize ran; no second commit needed (only `.gitignore` was tracked, already LF-clean) — reported honestly.

---

## Concept #4 — `LICENSE`

**What it is:** The legal terms under which others may use the code.

**Why it matters:** No license = "all rights reserved" = nobody can use it.

**📋 Prompt**
```
Create a LICENSE file at the repo root using the official MIT License text
(from https://choosealicense.com/licenses/mit/). Use:
- Copyright year: current year
- Copyright holder: Ajai Peddapanga

Show me the file before committing. Confirm the SPDX identifier
that GitHub will auto-detect.
```

**🔑 Why this prompt is good**
- Cites the canonical source (`choosealicense.com`).
- Specifies the variables (year, holder) — no placeholders left behind.
- Asks for SPDX confirmation (so GitHub's auto-badge works).
- Show-before-commit.

**✅ Result:** Committed as `7e2cfb4 chore: add MIT LICENSE`. SPDX: `MIT`.

---

## Concept #5 — `README.md`

**What it is:** The repo's front door.

**Why it matters:** First impression for humans and agents alike.

**📋 Prompt**
```
Create a README.md at the repo root for our project "Agentic Dev Scaffolding".
Include these sections:
- Title + one-line description
- License badge (MIT) and "Made with Markdown" badge
- "What this repo is" — 2-3 sentences explaining it is a teaching repo + reusable
  scaffolding template for Agentic SDLC, organized around the "Top 5 Stocks" MCP demo
- "Who it's for" — traditional developers learning Agentic SDLC; anyone who can
  read English and run a terminal command
- "Repo map" — a table linking the key files
- "How to resume cold" — 5-step list pointing to charter → use case → PROGRESS
  → DECISIONS → NEXT
- "Tech stack" — table with Python (MCP server), TypeScript (client+SPA),
  Pytest+Playwright (tests), GitHub Actions (CI)
- "License" — one line linking to LICENSE

Show me before committing.
```

**🔑 Why this prompt is good**
- Explicit section list — no creative drift.
- Repeats locked-in facts (stack, audience).
- Show-before-commit.

**✅ Result:** Committed as `a149029 docs: add README.md`.

---

_(Concept #6 coming up next.)_
