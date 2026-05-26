# Task Tracker Lite - Spec Addendum: Inline Task Detail

Spec ID: SPEC-003
Parent spec: `plan/spec.md`
Status: Implemented, Verified

## Goal

Add an inline task detail view that opens when users click Open, supports a single expanded task at a time, and includes quick actions for Mark Done and Delete.

## Business Requirements

- Preserve existing create/list workflows.
- Provide richer per-task context without leaving the task list.
- Keep interaction simple with one expanded task at a time.
- Include quick actions in detail view: Mark Done and Delete.

## Scope

- Add Open/Close control on each task row.
- Render inline detail section under expanded task.
- Enforce single-open expansion model.
- Add quick actions in detail section:
  - Mark Done (only when status is open)
  - Delete

## Use Cases

### UC-003-01 Open Task Detail Inline
Actor: User
Trigger: User clicks Open on a task
Preconditions: Task list is loaded
Main flow:
1. User clicks Open on a task row.
2. UI expands inline detail section for that task.
3. UI shows full fields: title, description, priority, status, dueDate, createdAt, updatedAt.
Postconditions: Task detail is visible inline.
Exceptions:
- Task list reload fails and status shows API error.

### UC-003-02 Single Expanded Task Policy
Actor: User
Trigger: User opens a second task while first is expanded
Preconditions: One task is already expanded
Main flow:
1. User clicks Open on another task.
2. UI collapses previous detail section.
3. UI expands detail for the newly selected task.
Postconditions: Only one task detail section remains open.
Exceptions:
- None; operation is client-side state transition.

### UC-003-03 Quick Actions from Detail
Actor: User
Trigger: User uses Mark Done or Delete in expanded detail
Preconditions: Task detail is expanded
Main flow (Mark Done):
1. User clicks Mark Done.
2. UI calls PATCH /tasks/:id with status done.
3. UI refreshes list and shows updated status.
Main flow (Delete):
1. User clicks Delete.
2. UI calls DELETE /tasks/:id.
3. UI refreshes list and removes task.
Postconditions: Action result is reflected in list view.
Exceptions:
- API action fails and status shows error message.

## Acceptance Criteria

- Each non-empty task row has Open/Close control.
- Clicking Open renders inline details for that task.
- Only one task detail section is open at any time.
- Detail view shows title, description, priority, status, dueDate, createdAt, updatedAt.
- Mark Done appears only for open tasks and updates status to done.
- Delete removes task from list.
- Existing functionality remains unchanged.
- `npm run quality:check` passes.

## Traceability

- UC-003-01 -> Open/Close rendering and inline detail layout.
- UC-003-02 -> Single `expandedTaskId` state and re-render behavior.
- UC-003-03 -> Detail quick-action handlers for PATCH and DELETE.

## Verification Evidence

- Quality gate: `npm run quality:check` passed (lint, API tests, UI smoke).
- UI smoke tests include detail expansion and quick-action behavior.
