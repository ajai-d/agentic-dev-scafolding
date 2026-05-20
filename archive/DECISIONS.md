# DECISIONS

Architectural and process decisions made during this course. Reference these to stay consistent.

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| D-001 | Copilot-only ecosystem | No Claude Code/Cursor tooling — all tools = GitHub Copilot surfaces | 2026-05-19 |
| D-002 | "Tell Me What To Tell You™" model | Guided prompt loop: instructor gives prompt → learner sends → agent executes → documents | 2026-05-19 |
| D-003 | Fast Track curriculum (13 lessons) | Comprehensive version too overwhelming; 8-10 hours more accessible | 2026-05-19 |
| D-004 | "Top 5 Stocks" running use case | MCP server (Python/FastMCP) → client (TS) → UI (React/Vite) → tests | 2026-05-19 |
| D-005 | Conventional Commits | `feat/docs/chore/fix` prefixes for all commits | 2026-05-19 |
| D-006 | 6-element prompt anatomy | Goal, Context, Specification, Sources, Guardrails, Verification | 2026-05-19 |
| D-007 | Interview Me pattern for SDD | AI asks clarifying questions to build spec (from Anthropic, adapted) | 2026-05-19 |
| D-008 | Conceptual lessons = direct write | No prompt ritual for pure theory — just document | 2026-05-19 |
| D-009 | Execution lessons = TMWTTY loop | Explain → prompt → execute → commit → document in lesson .md | 2026-05-19 |
| D-010 | Cost/governance lessons at end | Phase 6, not Phase 0 — learn the craft first | 2026-05-19 |
| D-011 | Target audience: 8th grader | Clear, simple language — anyone can follow | 2026-05-19 |
| D-012 | Incremental pushes to GitHub | Push after every commit — never lose work | 2026-05-20 |
| D-013 | Trademark "TMWTTY" (not patent) | Abstract methods can't be patented; trademark is the right IP protection | 2026-05-20 |
