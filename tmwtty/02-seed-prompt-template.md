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
```

---

## ▶️ What To Do

1. Copy the template above
2. Fill in "What I Want To Build" and "Done Looks Like"
3. Save it to `plan/seed.md`
4. Give it to your AI agent with: *"Read `tmwtty/00-tmwtty-methodology.md` and follow TMWTTY."*

---

## 📝 Example (filled in)

```markdown
## What I Want To Build

An MCP server that returns the top 5 performing stocks of the day,
with a TypeScript client and a simple React UI to display the results.

## Done Looks Like

- MCP server responds with 5 stock tickers + prices
- UI displays them in a clean table
- All tests pass
- Anyone can clone and run it locally

## Guardrails

- Use hardcoded stock data for v1 — no live API calls yet
- Python for the MCP server, TypeScript for client and UI
- One commit per plan item — atomic and traceable
- Never self-merge — human approves every artifact
```