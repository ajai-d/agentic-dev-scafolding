# Specification

## Summary

An MCP server that exposes a tool returning the top 5 performing stocks of the day (by % daily gain from a major US index). Starts with mock data, architected to swap in a real API (Yahoo Finance) later. Includes a TypeScript client and a simple web UI displaying results in a table.

## Functional Requirements

- **FR-1:** MCP server exposes a `get_top_stocks` tool that returns 5 stock objects (ticker, company name, price, % change)
- **FR-2:** Data layer is abstracted behind an interface so mock can be swapped for Yahoo Finance without changing server logic
- **FR-3:** Mock provider returns realistic hardcoded data (5 stocks with tickers, prices, % gains)
- **FR-4:** TypeScript MCP client connects to the server and calls `get_top_stocks`
- **FR-5:** Web UI displays results in a clean HTML table (ticker, name, price, % change)

## Non-Functional Requirements

- **NFR-1:** TypeScript throughout (server, client, UI tooling)
- **NFR-2:** Runs locally with `npm install` + `npm start` — no external services required
- **NFR-3:** Data provider interface documented so future Yahoo Finance integration is straightforward

## Acceptance Criteria

- **AC-1:** `npm install && npm start` launches the MCP server successfully
- **AC-2:** Client connects and receives exactly 5 stock entries
- **AC-3:** UI renders a table with columns: Ticker, Name, Price, Change %
- **AC-4:** All unit tests pass (`npm test`)
- **AC-5:** README documents setup, run, and how to swap data providers

## Out of Scope

- Authentication / authorization
- Persistent storage / database
- Real-time streaming or WebSocket updates
- Cloud deployment
- Real API integration (deferred to v2)

## Open Questions

- None
