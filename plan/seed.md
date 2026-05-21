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

## How To Work With Me

Read `tmwtty/00-introduction.md` for the methodology.
Build the plan interactively — propose items one at a time, I'll approve or adjust.
Then execute each item using TMWTTY (tell me what to tell you for each step).
Document every step in `replay-execution/` as we go.
Use GitHub Copilot best practices.
Use agent modes as appropriate: Interactive Agent, Autonomous Agent, or Multi-Agent Orchestration.
Structure prompts using: Goal, Context, Specification, Sources, Guardrails, Verification.
