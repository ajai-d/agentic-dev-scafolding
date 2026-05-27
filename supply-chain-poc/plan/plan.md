# Supply Chain POC - Plan

Project: supply-chain-poc
Stage: Plan
Risk level: 2

## 2a. Architecture

### Objective
Define an implementation-ready architecture that keeps Order Management and Inventory Management as separate domains with independent SDLC tracks, while preserving a minimal explicit integration contract.

### System Context
The system is a local-first web application for two operational personas:
- Order Manager (order lifecycle)
- Warehouse User (inventory operations)

Technical runtime:
- Frontend: React
- Backend: Node.js 22 + Express
- Database: SQLite (single DB for POC)

### Domain Architecture

#### Domain A: Order Management
Responsibilities:
- Order header and order line lifecycle
- Order state transition rules
- Order querying/filtering
- Ship request initiation

Owns:
- `orders` and `order_lines` domain logic
- Order status policy (`draft`, `confirmed`, `shipped`, `cancelled`)
- Order-focused API surface

Does not own:
- Stock truth
- Inventory adjustment rules

#### Domain B: Inventory Management
Responsibilities:
- Product catalog management
- Stock on hand and threshold management
- Inventory adjustments (inbound/outbound)
- Low-stock signaling

Owns:
- `products` and inventory adjustment logic
- Stock validation and stock deduction behavior
- Inventory-focused API surface

Does not own:
- Order lifecycle semantics

### Integration Boundary (Cross-Domain Contract)
Only one mandatory runtime integration is allowed in this cycle:
- Ship-time contract
  1. Order domain requests stock validation from Inventory domain.
  2. Inventory domain validates all line items.
  3. If sufficient, Inventory domain applies atomic stock deduction.
  4. Order domain transitions order to `shipped`.

Failure rule:
- If any line is short, inventory returns shortage details and shipping is blocked.

### Architectural Boundaries and Rules
- Domain logic isolation: no direct business-rule leakage between domains.
- API separation: route groups organized by domain.
- Shared database allowed for POC, but ownership is logical by table/aggregate.
- Cross-domain behavior must go through explicit service contract functions.

### Suggested Structure (Domain-Oriented)
- `src/domains/orders/`
  - controllers
  - services
  - repositories
  - validators
- `src/domains/inventory/`
  - controllers
  - services
  - repositories
  - validators
- `src/integration/`
  - ship-order workflow orchestration
- `src/shared/`
  - db connection
  - error model
  - utilities

### Data Ownership Model
- Inventory domain owns:
  - products table
  - stock mutation rules
- Order domain owns:
  - orders table
  - order_lines table
  - transition policy
- Cross-domain reference:
  - `order_lines.product_id` references inventory product identity only.

### Risk and Mitigations (Risk Level 2)
- Risk: Domain leakage due to shared DB.
  - Mitigation: repository boundaries and service-level contract enforcement.
- Risk: Inconsistent ship operation.
  - Mitigation: single orchestration service for ship operation with transaction control.
- Risk: Overengineering for POC.
  - Mitigation: keep contract minimal and avoid introducing messaging/event bus in this cycle.

### Architecture Exit Criteria
- Domain boundaries are explicit and accepted.
- Integration contract is explicit and testable.
- Ownership of responsibilities is unambiguous.
- Structure is ready for 2b design contracts.

---

## 2b. Design

### Objective
Define concrete domain interfaces, payload contracts, validation behavior, and transaction design for independent domain implementation with a safe ship-time integration.

### Domain API Contracts

#### Inventory Domain API

1. `POST /products`
- Request body:
  - `sku` (string, required, unique)
  - `name` (string, required)
  - `stockOnHand` (integer, required, >= 0)
  - `lowStockThreshold` (integer, required, >= 0)
- Response: `201` created product

2. `GET /products`
- Query support (optional): `lowStockOnly=true|false`
- Response: `200` array of products

3. `PATCH /products/:id`
- Request body (partial): `name`, `lowStockThreshold`
- Response: `200` updated product

4. `POST /inventory/adjustments`
- Request body:
  - `productId` (integer, required)
  - `type` (`inbound|outbound`, required)
  - `quantity` (integer, required, > 0)
  - `reason` (string, optional)
- Response: `200` updated stock snapshot

5. `GET /inventory/low-stock`
- Response: `200` products where `stockOnHand <= lowStockThreshold`

#### Order Domain API

1. `POST /orders`
- Request body:
  - `orderNumber` (string, required, unique)
  - `customerName` (string, required)
  - `orderDate` (ISO date, required)
  - `lines[]` (required, min 1)
    - `productId` (integer, required)
    - `quantity` (integer, required, > 0)
    - `unitPrice` (number, required, >= 0)
- Response: `201` created order + lines, status `draft`

2. `GET /orders`
- Query support: `status`, `fromDate`, `toDate`
- Response: `200` array of order summaries

3. `GET /orders/:id`
- Response: `200` order header + lines

4. `PATCH /orders/:id/status`
- Request body: `status` target
- Allowed transitions:
  - `draft -> confirmed`
  - `confirmed -> shipped`
  - `draft|confirmed -> cancelled`
- Response: `200` updated order

### Cross-Domain Integration Contract

#### Ship Workflow Contract

Internal service contract (recommended abstraction):
- `shipOrder(orderId)` in orchestration layer

Behavior:
1. Load order and verify current status is `confirmed`.
2. Build inventory check request from order lines.
3. Inventory domain validates sufficiency for all lines.
4. If any shortage:
   - return domain error `insufficient_stock`
   - include itemized shortages (`productId`, requested, available)
5. If sufficient:
   - apply atomic stock deduction
   - transition order to `shipped`

Atomicity rule:
- Stock deduction + order status update must complete as all-or-nothing within one transaction scope.

### Validation and Error Contract

Shared JSON error format:
- `error` (machine code)
- `message` (human-readable)
- `details` (optional structured data)

Required machine error codes:
- `validation_error`
- `not_found`
- `invalid_transition`
- `insufficient_stock`
- `internal_error`

### Domain Service and Repository Contracts

#### Inventory Service (logical)
- `createProduct(input)`
- `listProducts(filters)`
- `updateProduct(id, patch)`
- `applyAdjustment(input)`
- `getLowStockProducts()`
- `validateAndDeductStock(lines)`

#### Order Service (logical)
- `createOrder(input)`
- `listOrders(filters)`
- `getOrder(id)`
- `transitionOrderStatus(id, targetStatus)`

#### Orchestration Service
- `shipOrder(orderId)`

### Test Design (2b-aligned)

Inventory domain tests:
- Product create/list/update validation
- Adjustment rules and no-negative-stock protection
- Low-stock threshold behavior

Order domain tests:
- Create order with line validation
- Status transition rules and rejection paths

Cross-domain integration tests:
- Confirmed order ships successfully with stock deduction
- Shipping blocked with shortage details
- Transaction rollback on failure path

UI smoke tests:
- Create product and order minimal path
- Confirm then ship path with visible success/failure outcome

### Design Exit Criteria
- API payloads and validation rules are explicit.
- Domain service/repository responsibilities are clear.
- Ship integration contract is explicit and testable.
- Error model is consistent across domains.
- Test design covers domain and integration behavior.

---

## 2c. Orchestration

### Objective
Define an interactive execution strategy that preserves domain boundaries and keeps process overhead proportional to risk level 2.

### Approved Orchestration Policy (Hybrid)

Use a hybrid model:
1. Context-switch role play for planning and non-boundary-critical work.
2. Isolated custom agents for boundary-critical implementation/testing work.

Rationale:
- Faster than full custom-agent decomposition.
- Safer than pure role-play for domain-integrity-critical steps.

### Agent Assignment Model

#### Role-play (shared context) agents
- Spec Agent
- Architecture Agent
- Design Agent
- Planning Agent
- Setup Agent
- Code Review Agent
- Code Scanning Agent
- CI/CD Agent
- Observability Agent

#### Custom (isolated context) agents
- Inventory Implementation Agent
- Order Implementation Agent
- Integration Agent
- Test Agent

### Execute Work Breakdown (Domain-Oriented)

1. `E1` Setup baseline (shared role-play)
- Initialize repository structure and tooling.
- Create domain-oriented folder structure.

2. `E2` Inventory domain implementation (custom Inventory agent)
- Implement product and inventory adjustment capabilities.
- Implement low-stock API and rules.

3. `E3` Order domain implementation (custom Order agent)
- Implement order and order-line creation.
- Implement status transition logic excluding final ship orchestration.

4. `E4` Cross-domain ship integration (custom Integration agent)
- Implement `shipOrder(orderId)` orchestration.
- Enforce stock check + atomic deduction + status transition contract.

5. `E5` Test implementation (custom Test agent)
- Domain tests (Inventory + Order).
- Integration tests (ship success/failure + rollback).
- UI smoke path for key happy path.

6. `E6` Review, scan, and CI hardening (role-play)
- Code review findings and remediation.
- Baseline scan + lint/test workflow.
- CI quality gate.

### Independent SDLC Tracks

#### Inventory SDLC track
- Issue set: Inventory-only features and defects.
- Branches: prefixed `inventory/*`.
- Validation: Inventory domain tests + affected integration tests.

#### Order SDLC track
- Issue set: Order-only features and defects.
- Branches: prefixed `orders/*`.
- Validation: Order domain tests + affected integration tests.

#### Integration SDLC track
- Issue set: cross-domain contract and orchestration behavior.
- Branches: prefixed `integration/*`.
- Validation: integration tests mandatory.

### GitHub Issue and PR Strategy

For non-trivial work, enforce issue-driven flow:
- issue -> branch -> implement -> validate -> PR -> review -> merge

Recommended issue structure:
- One issue per Execute unit (`E2`, `E3`, `E4`, `E5`).
- Optional umbrella issue for release coordination.

### Handoff Contracts

#### Inventory -> Integration
- Exported contract documentation for stock validation and deduction method.
- Test fixtures for product stock states.

#### Order -> Integration
- Exported contract documentation for order and order-line retrieval and status preconditions.
- Transition policy and error semantics.

#### Integration -> Test
- Final orchestration behavior and expected response envelopes.
- Known edge-case matrix (shortage, invalid state, rollback path).

### Promotion Triggers (Role-play -> Custom)

If any trigger occurs, promote step to isolated custom agent:
- Repeated domain leakage in review findings.
- Failing integration tests after one refinement cycle.
- Data-integrity risk (transaction inconsistencies).
- Ambiguous ownership between domains.

### Interactive Approval Gates

Gate A (before Execute starts):
- 2a + 2b + 2c approved.

Gate B (after E2/E3 domain implementations):
- Domain boundaries preserved.
- Domain tests passing independently.

Gate C (after E4 integration):
- Ship-time integration contract satisfied.
- Failure paths verified.

Gate D (after E5/E6):
- Quality gate passes (`lint`, domain tests, integration tests, smoke tests).
- Replay log updated with approved prompts and results.

### Orchestration Exit Criteria
- Hybrid agent strategy is explicitly defined and accepted.
- Independent SDLC tracks are explicit (Inventory, Order, Integration).
- Work breakdown, handoffs, and gates are testable and actionable.
- Team can begin Execute without additional planning ambiguity.
