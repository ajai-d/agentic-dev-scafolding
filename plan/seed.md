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

Follow `tmwtty/00-introduction.md`.
Use GitHub Copilot best practices.
Use agent modes as appropriate: Interactive Agent, Autonomous Agent, or Multi-Agent Orchestration.

Structure every prompt using these 6 elements:

| # | Element | What It Answers |
|:-:|---------|----------------|
| 1 | **Goal** | What to produce |
| 2 | **Context** | What the agent should already know |
| 3 | **Specification** | Explicit requirements |
| 4 | **Sources** | Citations to trusted references |
| 5 | **Guardrails** | What *not* to do |
| 6 | **Verification** | How to prove it worked |
