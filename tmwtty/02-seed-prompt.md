# Seed Prompt Template

> Fill this in to kick off any TMWTTY project. Give the completed prompt to your AI agent.

---

## The Template

```markdown
## What I Want To Build

[Describe your project in plain language. What does it do? Who is it for?]

## Tech Stack (optional)

[List any preferences — languages, frameworks, tools. Leave blank if you want the AI to recommend.]

## Constraints

[Any limitations — budget, timeline, must-use tools, must-avoid approaches.]

## Success Looks Like

[How will you know it's done? What's the minimum viable outcome?]
```

---

## Example (filled in)

```markdown
## What I Want To Build

An MCP server that returns the top 5 performing stocks of the day.
It should have a Python backend using FastMCP, a TypeScript client,
and a simple React UI to display the results.

## Tech Stack

- Python 3.11+ with FastMCP
- TypeScript with strict mode
- React + Vite for the UI
- Pytest for backend tests
- Playwright for E2E tests

## Constraints

- Must use GitHub Copilot as the only AI tool
- Must follow spec-driven development
- Should be completable in under 10 hours

## Success Looks Like

- MCP server responds with 5 stock tickers + prices
- UI displays them in a clean table
- All tests pass
- Anyone can clone and run it locally
```

---

## What Happens Next

After you give this to your AI agent, it will generate a **structured plan** (see [`03-plan-format.md`](./03-plan-format.md)) that breaks your seed into actionable items.
