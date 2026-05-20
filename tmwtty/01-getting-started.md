# 📘 Getting Started with TMWTTY

> 🎯 **From zero to building — in 5 steps.** Each step is a prompt you give your AI agent.

<table>
<tr><td><b>What</b></td><td>Set up a new project using TMWTTY</td></tr>
<tr><td><b>Outcome</b></td><td>A repo with the TMWTTY folder structure, ready for your seed prompt</td></tr>
<tr><td><b>Read time</b></td><td>~5 minutes</td></tr>
<tr><td><b>Prerequisites</b></td><td>Git installed, a terminal, an AI agent (GitHub Copilot recommended)</td></tr>
</table>

---

## 🗺️ Roadmap

| § | Step |
|:-:|---|
| 1 | Create project and initialize Git |
| 2 | Add the TMWTTY folder structure |
| 3 | Fill in the seed prompt |
| 4 | Generate the plan |
| 5 | Start executing |

---

## 1️⃣ Create Project and Initialize Git

**Give your AI agent this prompt:**

> Create a new project folder called `my-project`, initialize a Git repository with `main` as the default branch, and add a `.gitignore` for Python and Node projects.

**Expected result:** A folder with `git init` done, branch set to `main`, and a `.gitignore` in place.

---

## 2️⃣ Add the TMWTTY Folder Structure

**Give your AI agent this prompt:**

> Create the following folder structure with a README.md in each folder: `tmwtty/` (methodology reference), `plan/` (structured project plan), `project/` (source code), `tutorial/` (steps captured during execution). Copy the TMWTTY methodology files into `tmwtty/`.

**Expected result:** Four folders, each with a README explaining its purpose.

---

## 3️⃣ Fill In the Seed Prompt

**Give your AI agent this prompt:**

> I want to build [describe your project here]. Help me fill in the seed prompt template from `tmwtty/02-seed-prompt.md` with my project details.

**Expected result:** A completed seed prompt with your intent, tech stack, constraints, and success criteria.

---

## 4️⃣ Generate the Plan

**Give your AI agent this prompt:**

> Based on my seed prompt, generate a structured plan following the format in `tmwtty/03-plan-format.md`. Assign an agent mode (Interactive, Autopilot, or Fleet) to each item. Save it to `plan/plan.md`.

**Expected result:** A `plan/plan.md` with numbered items, agent modes, and status tracking.

---

## 5️⃣ Start Executing

**Give your AI agent this prompt:**

> Let's start executing the plan. Begin with item 1. Tell me what to tell you.

**Expected result:** The TMWTTY loop begins — AI explains, gives you the prompt, you send it, AI executes, you approve, it documents.

---

## 📚 Quick Reference

| I want to... | Go to... |
|--------------|----------|
| Understand the methodology | [`00-introduction.md`](./00-introduction.md) |
| See the seed prompt template | [`02-seed-prompt.md`](./02-seed-prompt.md) |
| See the plan format | [`03-plan-format.md`](./03-plan-format.md) |
| Understand agent modes | [`04-agent-modes.md`](./04-agent-modes.md) |