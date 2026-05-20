# Agentic Dev Scaffolding

> A step-by-step course on **Agentic SDLC** — from ground zero to autonomous multi-agent coding — built around a single, evolving use case: a **"Top 5 Stocks" MCP demo**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Made with: Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](https://www.markdownguide.org/)

---

## What this repo is

A **teaching repo** and a **reusable scaffolding template** in one. The lessons (numbered `00-…`, `01-…`, `02-…`) walk you through Agentic SDLC concept by concept. The reusable bits (config files, agent instructions, templates) double as a starter you can drop into any new MCP / agentic project. Everything is organized around a single running example: a **"Top 5 Stocks" MCP demo**.

## Who it's for

- **Traditional developers** learning Agentic SDLC.
- Anyone — even a complete beginner — who can read English and run a terminal command.

## Repo map

| File | Purpose |
|---|---|
| [`00-course.md`](./00-course.md) | The active learning path — Fast Track curriculum (10 lessons, ~6–8 hours). |
| [`90-reference-comprehensive-curriculum.md`](./90-reference-comprehensive-curriculum.md) | Deep reference covering every Copilot feature (38 lessons). For dipping into when a project needs it. |
| [`01-lesson-0-what-is-agentic-sdlc.md`](./01-lesson-0-what-is-agentic-sdlc.md) | The mental model. Start here for the *what* and *why*. |
| [`02-running-use-case.md`](./02-running-use-case.md) | The "Top 5 Stocks" demo we build across every lesson. |
| [`03-lesson-1-setup-repo.md`](./03-lesson-1-setup-repo.md) | Lesson 1 — repo setup, concept by concept (with the prompts that built each piece). |
| [`PROGRESS.md`](./PROGRESS.md) | Journal — what we've done. |
| [`DECISIONS.md`](./DECISIONS.md) | Why we chose what we chose. |
| [`NEXT.md`](./NEXT.md) | The pick-up point if context is ever lost. |

## How to resume cold

If you (or an agent) ever lose context, read these in order — five minutes, full context restored:

1. [`00-course.md`](./00-course.md) — the agreement *and* the full curriculum.
2. [`02-running-use-case.md`](./02-running-use-case.md) — what we're building.
3. [`PROGRESS.md`](./PROGRESS.md) — what's been done.
4. [`DECISIONS.md`](./DECISIONS.md) — why.
5. [`NEXT.md`](./NEXT.md) — what to do right now.

## Tech stack

| Layer | Choice |
|---|---|
| MCP Server | **Python** (official MCP SDK) |
| MCP Client + SPA UI | **TypeScript** (minimal HTML, no framework) |
| Tests | **Pytest** (server) + **Playwright** (E2E UI) |
| CI | **GitHub Actions** |

See [`DECISIONS.md`](./DECISIONS.md) for the *why* behind each choice.

## License

[MIT](./LICENSE) — use freely, attribute kindly.
