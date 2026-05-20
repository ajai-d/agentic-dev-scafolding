# 📘 Seed Prompt

> 🎯 **Your starting point.** Fill this in and give it to your AI agent. That's all you need to begin.

<table>
<tr><td><b>What</b></td><td>The seed that kicks off any TMWTTY project</td></tr>
<tr><td><b>Format</b></td><td>Intent + success criteria + working instructions</td></tr>
</table>

---

## 🗺️ Template

```markdown
## What I Want To Build

[Describe your project in plain language. What does it do? Who is it for?]

## Done Looks Like

[How will you know it's complete? What's the minimum viable outcome?]

## How To Work With Me

Read `tmwtty/00-introduction.md` for the methodology.
Build the plan interactively — propose items one at a time, I'll approve or adjust.
Then execute each item using TMWTTY (tell me what to tell you for each step).
Document every step in `tutorial/` as we go.
```

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

## How To Work With Me

Read `tmwtty/00-introduction.md` for the methodology.
Build the plan interactively — propose items one at a time, I'll approve or adjust.
Then execute each item using TMWTTY (tell me what to tell you for each step).
Document every step in `tutorial/` as we go.
```

---

## ▶️ What Happens Next

Give this to your AI agent. It will:

1. Read the introduction to understand TMWTTY
2. Interview you to build the plan (Interactive mode)
3. Execute each plan item using the TMWTTY loop
4. Document steps in `tutorial/` as it goes