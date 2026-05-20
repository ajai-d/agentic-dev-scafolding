# $([char]0x1F4D8) GitHub Copilot Modes & Capabilities

> $([char]0x1F3AF) **Reference guide.** The official GitHub Copilot modes, tools, and configuration the agent helps you set up.

<table>
<tr><td><b>What</b></td><td>Complete reference for GitHub Copilot capabilities used in TMWTTY</td></tr>
<tr><td><b>Source</b></td><td>GitHub official documentation (2025-2026)</td></tr>
<tr><td><b>Key point</b></td><td>The agent guides you through setup — you don't need to know this upfront</td></tr>
</table>

---

## $([char]0x1F5FA)$([char]0xFE0F) Roadmap

| $([char]0x00A7) | Topic |
|:-:|---|
| 1 | Copilot Chat Modes |
| 2 | Coding Agent (Cloud) |
| 3 | MCP Servers & Tools |
| 4 | Custom Instructions |
| 5 | How TMWTTY Maps to Modes |
| 6 | Choosing the Right Mode |

---

## 1$([char]0xFE0F)$([char]0x20E3) Copilot Chat Modes (VS Code)

These are the three modes available in the Copilot Chat panel:

| Mode | What It Does | Edits Code? | Runs Commands? |
|------|-------------|:-----------:|:--------------:|
| **Ask** | Q&A, explanations, code snippets | No | No |
| **Edit** | Focused changes to specific files you choose | Yes | No |
| **Agent** | Autonomous multi-file edits, runs terminal commands, iterates until done | Yes | Yes |

### Ask Mode

- Answers questions about your code or general programming
- Provides explanations, examples, and debugging advice
- Does NOT modify any files
- **Use when:** Learning, exploring ideas, understanding code

### Edit Mode

- Makes targeted changes to files you specify
- Shows diffs for you to accept or reject
- Scoped to what you select
- **Use when:** Refactoring a function, fixing a bug, small focused changes

### Agent Mode

- Reads your entire workspace
- Creates a plan, edits multiple files, runs terminal commands
- Self-heals — if tests fail, it fixes and retries
- Asks permission before major actions
- **Use when:** Multi-file features, scaffolding, migrations, anything complex

---

## 2$([char]0xFE0F)$([char]0x20E3) Coding Agent (Cloud)

The **Copilot Coding Agent** operates outside your IDE — entirely in the cloud:

| Feature | Description |
|---------|-------------|
| **Trigger** | Assign a GitHub Issue to Copilot |
| **Runs on** | GitHub-hosted cloud environment |
| **Output** | Opens a Pull Request with the solution |
| **CI/CD** | Runs tests, fixes failures, pushes updates |
| **Review** | You review and merge the PR |

### How it works

1. Create or select a GitHub Issue
2. Assign it to `Copilot`
3. Copilot spins up a cloud environment, writes code, runs tests
4. Opens a PR referencing the issue
5. You review, request changes, or merge

### Configuration

- Add `.github/copilot-setup-steps.yml` to your repo to define the environment (dependencies, build steps)
- The agent reads this file to know how to set up and test your project

---

## 3$([char]0xFE0F)$([char]0x20E3) MCP Servers & Tools

**Model Context Protocol (MCP)** connects Copilot to external tools and data sources.

| Concept | What It Is |
|---------|-----------|
| **MCP Server** | A service that exposes tools/data to Copilot (databases, APIs, file systems) |
| **Tools** | Individual capabilities an MCP server provides (e.g., query DB, create file) |
| **Configuration** | `.vscode/mcp.json` in your workspace or user-level settings |

### What MCP enables

- Query databases directly from Copilot chat
- Interact with external APIs
- Access file systems, search engines, documentation
- Use custom project-specific tools

### Configuration file (`.vscode/mcp.json`)

`json
{
  "servers": {
    "my-server": {
      "type": "stdio",
      "command": "node",
      "args": ["./mcp-server/index.js"]
    }
  }
}
`

> MCP tools are only available in **Agent mode** — not Ask or Edit.

---

## 4$([char]0xFE0F)$([char]0x20E3) Custom Instructions

Tell Copilot how to behave in your project:

| File | Scope | Purpose |
|------|-------|---------|
| `.github/copilot-instructions.md` | Whole project | Coding style, patterns, dependencies, architecture rules |
| `.github/instructions/*.md` | Path-specific | Rules for specific file types or directories |

### Example `.github/copilot-instructions.md`

`markdown
- Use TypeScript with strict mode
- Prefer functional components in React
- Use async/await, never .then()
- All functions must have JSDoc comments
- Use pytest for Python tests
`

> These files act as a persistent system prompt — Copilot reads them automatically.

---

## 5$([char]0xFE0F)$([char]0x20E3) How TMWTTY Maps to Modes

| TMWTTY Stage | Copilot Mode | Why |
|:-------------|:-------------|:----|
| **Seed** | Ask or Agent | Discuss intent, confirm understanding |
| **Plan (building)** | Agent (interactive) | Agent proposes items, you approve one at a time |
| **Execute (simple items)** | Agent | Multi-file work with terminal commands |
| **Execute (complex items)** | Coding Agent (cloud) | Assign as issue, get a PR back |
| **Execute (parallel items)** | Multiple Coding Agents | Assign multiple issues simultaneously |

### TMWTTY mode labels in the plan

| Plan Label | Maps To | Description |
|:-----------|:--------|:------------|
| `Interactive` | Agent mode (VS Code) | TMWTTY loop with approval at every step |
| `Autonomous` | Coding Agent (cloud) | Assign issue, review PR |
| `Parallel` | Multiple Coding Agents | Independent items run simultaneously |

---

## 6$([char]0xFE0F)$([char]0x20E3) Choosing the Right Mode

`
Is this a learning moment, decision, or risky change?
  -> YES -> Interactive (Agent mode, TMWTTY loop)

Is the spec clear and well-defined?
  -> YES -> Can it run without your IDE open?
              -> YES -> Autonomous (Coding Agent, assign issue)
              -> NO  -> Interactive (Agent mode)

Are there multiple independent items?
  -> YES -> Parallel (assign multiple issues)
`

> Remember: The agent guides you through configuring and using each mode.
> You don't need to memorize this — the plan tells you what mode each item uses,
> and the agent walks you through it when the time comes.