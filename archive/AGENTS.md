# AGENTS.md

> Universal instructions for any AI agent working in this repository.

## Project

| Field | Value |
|-------|-------|
| **Name** | Agentic Dev Scaffolding |
| **Purpose** | A learning repo teaching Agentic SDLC from scratch |
| **Audience** | Traditional developers new to AI-assisted workflows |

## Language & Tone

- Write at an **8th-grade reading level** — clear, short sentences.
- Prefer plain English over jargon.
- When introducing a technical term, define it immediately.

## Commit Conventions

Use **Conventional Commits**:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

| Type | When to use |
|------|-------------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Maintenance (deps, config, cleanup) |
| `test` | Adding or updating tests |
| `refactor` | Code change that doesn't add a feature or fix a bug |

## File Formatting

- **Encoding:** UTF-8
- **Line endings:** LF (Unix-style)
- **Indentation:** 2 spaces (unless language convention differs)
- **Trailing newline:** Every file must end with one blank line

## Safety Rules

🚫 **Never** commit secrets (API keys, tokens, passwords) — use `.env` files + `.gitignore`.

🚫 **Never** delete files without explicit human approval.

🚫 **Never** push directly to `main` without confirming the change with the user.

## Memory Files

Before starting work, read these files for context:

| File | Purpose |
|------|---------|
| `PROGRESS.md` | Where we are in the course |
| `DECISIONS.md` | Standing decisions — follow them |
| `TODO.md` | Open tasks |
| `00-course.md` | Full curriculum and working model |
