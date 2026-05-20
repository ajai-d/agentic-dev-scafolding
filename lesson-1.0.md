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

## ✅ Lesson Complete

After this lesson, your repo has:

| File | Purpose |
|------|---------|
| `.gitignore` | Keeps junk out of version control |
| `.gitattributes` | Consistent line endings across all OS |
| `LICENSE` | MIT — open for anyone to use |

Your working tree is clean with one commit on `main`. You're ready for Lesson 1.1 (concepts) and Lesson 1.2 (the agent contract).
