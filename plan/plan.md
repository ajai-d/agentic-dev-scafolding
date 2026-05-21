# Project Plan — Top 5 Stocks MCP Server

> Generated from seed prompt. PoC intent — speed over polish.

## Stack

- **MCP Server**: Python (MCP SDK)
- **Client**: TypeScript (MCP TypeScript SDK)
- **UI**: React + TypeScript
- **Data**: Hardcoded (no live API)

## Plan Items

| # | Item | Agent Mode | Description | Status |
|---|------|-----------|-------------|--------|
| 1 | Project Scaffolding | Interactive Agent | Initialize repo structure, install dependencies, configure Python MCP server, TypeScript client, and React UI projects. Set up `.gitignore`, `README.md`, and workspace config. | ✅ |
| 2 | MCP Server — Top 5 Stocks | Interactive Agent | Build Python MCP server using MCP SDK exposing a tool that returns top 5 performing stocks with ticker symbols and prices. Hardcoded data. Unit tests. | ⬜ |
| 3 | TypeScript MCP Client | Interactive Agent | Build TypeScript client using MCP TypeScript SDK that connects to the Python MCP server and calls the top 5 stocks tool. Unit tests. | ⬜ |
| 4 | React UI — Stock Display | Interactive Agent | Build React app that uses the TypeScript client to fetch top 5 stocks and displays them in a clean table. Component tests. | ⬜ |
| 5 | End-to-End Integration & Documentation | Interactive Agent | Wire everything together, verify full flow (server → client → UI), ensure all tests pass, write README for clone-and-run. | ⬜ |

## Dependencies

- Item 2 depends on Item 1
- Item 3 depends on Item 2
- Item 4 depends on Item 3
- Item 5 depends on Items 1–4

## Done When

- MCP server responds with 5 stock tickers + prices
- UI displays them in a clean table
- All tests pass
- Anyone can clone and run it locally
