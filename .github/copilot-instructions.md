# Copilot Instructions

> GitHub Copilot reads this file automatically. For universal rules, see [`AGENTS.md`](../AGENTS.md).

## Code Preferences

- **TypeScript** — always use `strict: true` in `tsconfig.json`. Prefer explicit types over `any`.
- **Python** — use type hints. Prefer `Pytest` for all test files.
- **General** — favor readability over cleverness. Small functions, clear names.

## Response Style

- Keep responses **concise** — explain only what's needed.
- Show code first, explain after (if explanation is required).
- Never generate placeholder content (`lorem ipsum`, `TODO: implement`, `foo/bar` examples).

## Testing

- Python → `pytest` with descriptive test names (`test_should_return_top_5_stocks`).
- TypeScript → `vitest` or `jest` with `describe/it` blocks.
- Always include at least one happy-path and one error-case test.

## What NOT To Do

- ❌ Don't use `any` in TypeScript.
- ❌ Don't generate fake data unless explicitly asked.
- ❌ Don't skip error handling — always handle the unhappy path.
- ❌ Don't ignore the rules in `AGENTS.md`.
