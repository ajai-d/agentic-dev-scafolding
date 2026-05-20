# 📘 Getting Started with TMWTTY

> 🎯 **Two steps. That's it.**

<table>
<tr><td><b>What</b></td><td>How to start any TMWTTY project</td></tr>
<tr><td><b>Outcome</b></td><td>Your AI agent is working with you using the TMWTTY methodology</td></tr>
<tr><td><b>Time</b></td><td>~2 minutes</td></tr>
</table>

---

## Step 1 — Fill In Your Seed Prompt

Open [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) and fill in the template:

- **What I Want To Build** — your intent in plain language
- **Done Looks Like** — how you'll know it's complete
- **How To Work With Me** — tells the AI to follow TMWTTY (already written for you)

---

## Step 2 — Give It To Your AI Agent

Paste your completed seed prompt and add this one line:

> Read `tmwtty/00-introduction.md` and follow the TMWTTY methodology.

That's it. The agent will:

1. Read the methodology
2. Interview you to build the plan interactively
3. Execute each item using the TMWTTY loop
4. Document everything in `tutorial/`

---

## 📚 Reference

| File | Purpose |
|------|---------|
| [`00-introduction.md`](./00-introduction.md) | The methodology — what the agent reads |
| [`02-seed-prompt-template.md`](./02-seed-prompt-template.md) | Your seed — what you fill in |
| [`03-plan-format.md`](./03-plan-format.md) | How the plan is structured |
| [`04-agent-modes.md`](./04-agent-modes.md) | Interactive / Autopilot / Fleet reference |