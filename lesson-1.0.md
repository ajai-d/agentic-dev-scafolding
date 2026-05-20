# Lesson 1.0 — Environment Setup

> **Outcome:** A local Git repo ready for agentic development — folder, `git init`, foundation files.

---

## Prerequisites

- A computer with **Git** installed ([download](https://git-scm.com/downloads))
- A terminal (PowerShell, Terminal, or VS Code integrated terminal)
- A GitHub account ([sign up](https://github.com/signup))

---

## Concepts

### Concept 1: Create the Project Folder

**What it is:** An empty directory where all your project files will live.

**Try it yourself — give your AI agent this prompt:**

> Create a new project folder called `agentic-dev-scaffolding` and navigate into it.

**Or do it manually:**

```powershell
mkdir C:\projects\agentic-dev-scaffolding
cd C:\projects\agentic-dev-scaffolding
```

---

### Concept 2: Initialize Git

**What it is:** Git is version control — it tracks every change so you can undo, branch, and collaborate. `git init` turns your folder into a repository.

**Try it yourself — give your AI agent this prompt:**

> Initialize a Git repository in this folder with `main` as the default branch.

**Or do it manually:**

```powershell
git init
git branch -M main
```

---

### Concept 3: `.gitignore`

**What it is:** A file that tells Git what to **never** track — temporary files, secrets, installed packages, OS junk.

**Try it yourself — give your AI agent this prompt:**

> Create a `.gitignore` file that excludes: Python virtual environments, Node modules, `.env` files, OS files (`.DS_Store`, `Thumbs.db`), editor folders (`.vscode`, `.idea`), and any folder named `scratch/`.

**Expected result:** A `.gitignore` file with organized sections for Python, Node, OS, editors, secrets, and scratch folders.

---

### Concept 4: `.gitattributes`

**What it is:** Makes sure line endings are consistent no matter what OS your team uses. Windows uses CRLF, Mac/Linux uses LF. Without this, Git shows fake "changes" that are just line-ending differences.

**Try it yourself — give your AI agent this prompt:**

> Create a `.gitattributes` file that normalizes all text files to LF, forces CRLF for Windows batch/PowerShell scripts, and marks images and fonts as binary.

**Expected result:** A `.gitattributes` file with `* text=auto eol=lf` at the top, CRLF overrides for `*.ps1`/`*.bat`/`*.cmd`, and binary markers for image/font extensions.

---

### Concept 5: `LICENSE`

**What it is:** Tells the world what they can and can't do with your code. Without one, it's legally "all rights reserved." MIT is the simplest — anyone can use, copy, modify, just keep the copyright notice.

**Try it yourself — give your AI agent this prompt:**

> Create a LICENSE file using the MIT license with copyright holder "Ajai Peddapanga" and year 2026.

**Expected result:** A standard MIT license text file with your name and year.

---

### Concept 6: First Commit

**What it is:** Your first snapshot in history. Bundles all foundation files into one recorded checkpoint.

**Try it yourself — give your AI agent this prompt:**

> Stage all files and create the first commit with the message "chore: initialize repo with git config and MIT license".

**Or do it manually:**

```powershell
git add .
git commit -m "chore: initialize repo with git config and MIT license"
```

---

### Concept 7: `README.md`

**What it is:** Your project's front door — the first thing anyone sees on GitHub. Explains what this is, how to get started, and what to expect.

**Try it yourself — give your AI agent this prompt:**

> Create a README.md that explains: this is a learning repo for Agentic SDLC, lists the course structure (link to 00-course.md), shows prerequisites (Git, Node, Python, GitHub account), and has a "Getting Started" section that tells people to clone and follow the lessons in order.

**Expected result:** A [`README.md`](./README.md) with sections for course structure, prerequisites, getting started, and the TMWTTY™ learning model.

---

### Concept 8: `.env.example`

**What it is:** Shows what environment variables the project needs — without actual secrets. Developers copy it to `.env` and fill in real values. `.gitignore` excludes `.env` but allows `.env.example`.

**Try it yourself — give your AI agent this prompt:**

> Create a `.env.example` file with placeholder entries for: `GITHUB_TOKEN`, `OPENAI_API_KEY`, and `STOCK_API_KEY`. Add a comment at the top explaining to copy it to `.env` and fill in real values.

**Expected result:** A [`.env.example`](./.env.example) with commented instructions and placeholder values.

---

### Concept 9: Conventional Commits + PR Template

**What it is:** Conventional Commits is a naming convention for commit messages: `type(scope): description`. A PR template auto-fills the description when opening a Pull Request.

**Try it yourself — give your AI agent this prompt:**

> Create `.github/PULL_REQUEST_TEMPLATE.md` with sections for: Summary (what changed), Type of change (checklist: feat/fix/docs/chore), How to test, and a Checklist (tests pass, docs updated, no secrets committed).

**Expected result:** A [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md) that GitHub auto-fills on every new PR.

---

### Concept 10: Push to GitHub

**What it is:** Publishing your local repo to GitHub so it's backed up, shareable, and collaborative.

**Try it yourself — give your AI agent this prompt:**

> Create a public GitHub repo called `agentic-dev-scaffolding` and push all local commits to it.

**Or do it manually:**

```powershell
gh repo create agentic-dev-scaffolding --public --source=. --push
```

**Expected result:** Your repo is live at `https://github.com/<your-username>/agentic-dev-scaffolding`.

---

## ✅ Lesson Complete

After this lesson, your repo has:

| File | Purpose |
|------|---------|
| `.gitignore` | Keeps junk out of version control |
| `.gitattributes` | Consistent line endings across all OS |
| `LICENSE` | MIT — open for anyone to use |
| `README.md` | Project landing page |
| `.env.example` | Secrets template (copy to `.env`) |
| `.github/PULL_REQUEST_TEMPLATE.md` | Auto-fills PR descriptions |

Your working tree is clean, pushed to GitHub, and ready for Lesson 1.1 (concepts) and Lesson 1.2 (the agent contract).
