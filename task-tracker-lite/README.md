# Task Tracker Lite

Task Tracker Lite is a simple 3-tier demo app:
- Web: vanilla HTML/CSS/JS
- API: Node.js + Express
- Data: local SQLite database file

## Prerequisites

- Node.js 22 LTS

## Setup

1. Install dependencies:

   npm install

2. Initialize database:

   npm run init-db

3. Start server:

   npm run dev

4. Open app:

   http://localhost:3000

## Useful commands

- `npm run dev` - start local dev server with reload
- `npm start` - start server without reload
- `npm run init-db` - create/update local SQLite schema
- `npm test` - run all Vitest suites
- `npm run test:ui-smoke` - run UI smoke test only
- `npm run lint` - run static analysis
- `npm run quality:check` - run lint + full tests + UI smoke (local CI gate)

## CI Workflow

Optional GitHub Actions workflow is available at:

- `.github/workflows/task-tracker-lite-ci.yml`

It runs on push and pull request events affecting `task-tracker-lite/**` and executes:

1. `npm ci`
2. `npm run init-db`
3. `npm run quality:check`

## Release Checklist (Demo Readiness)

Before presenting the demo, run:

1. `npm run init-db`
2. `npm run quality:check`
3. `npm run dev`
4. Open `http://localhost:3000` and validate:
   - create task
   - list task
   - task persists after page refresh

## Known Limitations

- No authentication or multi-user support
- No pagination or advanced filtering
- UI currently supports create and list flows only (status update/delete are API-ready but not yet exposed in UI controls)
- Local SQLite file storage only
