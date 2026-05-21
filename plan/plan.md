# Project Plan — Top 5 Stocks MCP Server

> PoC intent — speed over polish.

## Stack

- **MCP Server**: Python (MCP SDK)
- **Client**: TypeScript (MCP TypeScript SDK)
- **UI**: React + TypeScript (Vite)
- **Data**: Hardcoded (no live API)

## Guardrails

- Hardcoded stock data — no live APIs
- One commit per plan item
- Tests for core logic only

## Plan Items

| # | Item | Agent Mode | Status |
|---|------|-----------|--------|
| 1 | Project Scaffolding | Interactive Agent | ✅ |
| 2 | MCP Server — Top 5 Stocks | Interactive Agent | ⬜ |
| 3 | TypeScript MCP Client | Interactive Agent | ⬜ |
| 4 | React UI — Stock Display | Interactive Agent | ⬜ |
| 5 | End-to-End Integration & README | Interactive Agent | ⬜ |

## Dependencies

- 2 depends on 1
- 3 depends on 2
- 4 depends on 3
- 5 depends on 1–4

## Done When

- MCP server responds with 5 stock tickers + prices
- UI displays them in a clean table
- All tests pass
- Anyone can clone and run it locally
