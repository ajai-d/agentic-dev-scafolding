# 📘 Seed Prompt Template

> 🎯 **Your starting point.** Copy this template, fill it in, and save it to `plan/seed.md`. That's your project's seed.

| | |
|---|---|
| **What** | The reusable template that kicks off any TMWTTY project |
| **Format** | Intent + success criteria + working instructions |
| **Save to** | `plan/seed.md` |

---

## 🗺️ Template

```markdown
## What I Want To Build

[Describe your project in plain language. What does it do? Who is it for?]

## Done Looks Like

[How will you know it's complete? What's the minimum viable outcome?]

## Guardrails (optional)

[Constraints the agent must follow. Remove this section if not needed.]

- Example: No external API calls — use hardcoded data for v1
- Example: Python only — no JavaScript
- Example: Must work offline
- Example: Do not refactor existing code unless asked

## How To Work With Me

Read `tmwtty/00-introduction.md` for the methodology.
Build the plan interactively — propose items one at a time, I'll approve or adjust.
Then execute each item using TMWTTY (tell me what to tell you for each step).
Document every step in `replay-execution/` as we go.
Use GitHub Copilot best practices.
Use agent modes as appropriate: Interactive Agent, Autonomous Agent, or Multi-Agent Orchestration.
Structure prompts using: Goal, Context, Specification, Sources, Guardrails, Verification.
```

---

## ▶️ What To Do

1. Copy the template above
2. Fill in "What I Want To Build" and "Done Looks Like"
3. Save it to `plan/seed.md`
4. Give it to your AI agent with: *"Read `tmwtty/00-introduction.md` and follow TMWTTY."*