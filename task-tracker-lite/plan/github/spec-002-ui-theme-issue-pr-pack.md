# SPEC-002 GitHub Issue + PR Pack

## Issue

Title:
SPEC-002: Implement yellow UI theme with readability safeguards

Body:
## Summary
Implement SPEC-002 as a presentation-only enhancement to apply a coherent yellow visual theme while preserving all existing Task Tracker Lite behavior.

## Scope
- Apply yellow-themed background treatment.
- Keep container/panel surfaces neutral and readable.
- Update controls and primary action styling for contrast and clarity.
- Preserve desktop and mobile usability.

## Out of Scope
- API/data/schema changes
- Feature behavior changes
- Layout restructuring

## Spec References
- Canonical registry: plan/spec.md (SPEC-002)
- Addendum spec: plan/spec-ui-theme.md
- Plan delta: plan/plan.md (SPEC-002 Plan Delta)

## Use Cases
- UC-002-01 Visual Identity at First Load
- UC-002-02 Form Interaction Readability
- UC-002-03 Mobile Usability Preservation

## Acceptance Criteria
- Yellow theme is visible and coherent.
- Text/controls remain readable on desktop and mobile.
- Functional behavior is unchanged.
- quality:check passes.

## Verification
Run:
- npm run quality:check

Expected:
- lint passes
- tests pass
- ui smoke passes

## Branch

Suggested branch name:
feature/spec-002-yellow-theme

## Commit

Suggested commit message:
Implement SPEC-002 yellow UI theme and record full spec-plan-execute traceability

## PR

Title:
SPEC-002: Yellow UI theme enhancement with full TMWTTY traceability

Body:
## What changed
- Added SPEC-002 use-case-driven addendum in plan/spec-ui-theme.md.
- Added SPEC-002 plan delta in plan/plan.md (2a/2b/2c).
- Implemented yellow visual theme in web/styles.css.
- Updated Spec Registry status in plan/spec.md to Implemented, Verified.
- Added replay evidence entry in replay-execution/replay-execution.md.

## Why
Close the SPEC-002 loop end-to-end using TMWTTY:
Spec -> Use Cases -> Plan -> Execute -> Verification Evidence.

## Validation
- npm run quality:check
- Result: pass (lint, tests, ui smoke)

## Risk
Low.
Presentation layer only, no API/data behavior changes.

## Reviewer checklist
- Confirm SPEC-002 use cases exist and map to implementation.
- Confirm plan delta exists and is scoped to presentation layer.
- Confirm quality gate evidence is present.

## Optional CLI Flow

From repository root:
1. git checkout -b feature/spec-002-yellow-theme
2. git add task-tracker-lite/plan/spec-ui-theme.md task-tracker-lite/plan/plan.md task-tracker-lite/web/styles.css task-tracker-lite/plan/spec.md task-tracker-lite/replay-execution/replay-execution.md task-tracker-lite/plan/github/spec-002-ui-theme-issue-pr-pack.md
3. git commit -m "Implement SPEC-002 yellow UI theme and record full spec-plan-execute traceability"
4. git push -u origin feature/spec-002-yellow-theme
