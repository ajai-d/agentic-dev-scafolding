# Supply Chain POC - Specification

Project: supply-chain-poc
Stage: Spec
Risk level: 2

## 1a. Discovery Decisions (User + Auto-Accepted Defaults)

User-confirmed decisions:
- Primary users: Warehouse User + Order Manager
- Roles/auth: No auth for POC; roles are conceptual only
- Inventory deduction point: Deduct stock on Shipped
- Insufficient stock behavior: Block shipping with shortage error
- Stack: Node.js + Express + SQLite + React
- Order workflow: Draft -> Confirmed -> Shipped; Draft/Confirmed can be Cancelled; Shipped is terminal
- Low-stock model: Per-product threshold
- Domain model: Order Management and Inventory Management are separate domains with independent SDLC tracks

Auto-accepted recommendations to close discovery quickly:
- Single-warehouse model for POC
- Hard validation on quantities (non-negative; integer quantities)
- Local-first runtime and persistence only
- UI scope includes list/detail/manage flows for orders and products; no advanced analytics

## 1b. Business Requirements (BRD)

### Purpose
Build a simple Supply Chain Management web app with two separate domains:
1. Order Management domain
2. Inventory Management domain

Each domain has independent lifecycle ownership and can run its own SDLC cycle (Spec, Plan, Execute) while honoring a minimal shared integration contract.

### Goals
- Manage order lifecycle from draft to shipment.
- Maintain product inventory and low-stock visibility.
- Prevent invalid shipments when stock is insufficient.
- Keep implementation simple and demo-friendly.

### Stakeholders
- Primary: Order Manager
- Primary: Warehouse User
- Secondary: Demo reviewer/operator

### Success Metrics
- Users can create and manage orders with line items.
- Users can maintain products and stock levels.
- Shipping an order deducts stock accurately.
- Shipping is blocked with clear shortage details if stock is insufficient.
- Low-stock products are clearly visible.
- Local quality checks pass.

### Constraints
- POC scope only; no external ERP/WMS integration.
- No authentication/authorization implementation in this cycle.
- Single local SQLite database.
- Runtime target: Node.js 22 LTS.
- Domain boundaries must remain explicit in requirements, plan, and execution artifacts.

### Out of Scope
- Multi-warehouse support.
- Returns/refunds and advanced logistics workflows.
- Forecasting/planning optimization.
- Supplier procurement workflows.

### Domain Boundaries and Independent SDLC

#### Domain A: Order Management
- Owns order lifecycle, order headers, line items, and transition rules.
- Owns all order-specific use cases, requirements, tests, and release decisions.

#### Domain B: Inventory Management
- Owns product catalog, stock levels, adjustments, and low-stock alerts.
- Owns all inventory-specific use cases, requirements, tests, and release decisions.

#### Cross-domain integration contract (minimal and explicit)
- Order Management depends on Inventory Management only for ship-time stock validation and stock deduction.
- Integration rule: inventory deduction occurs only when an order transitions to Shipped.
- Integration failure rule: shipping is blocked when any order line is short.

#### SDLC execution rule
- Each domain may run independent SDLC cadence and backlog.
- Cross-domain changes require a coordinated integration item with explicit acceptance criteria.

## 1c. Use Cases

### Inventory Management Domain Use Cases

#### UC-IM-01 Create Product
Actor: Warehouse User
Trigger: User creates new product
Preconditions: App loaded
Main flow:
1. User enters SKU, product name, stock on hand, low-stock threshold.
2. System validates fields and creates product record.
3. Product appears in inventory list.
Postconditions: Product available for order line items.
Exceptions:
- Duplicate SKU rejected.
- Invalid values rejected.

#### UC-IM-02 Adjust Inventory
Actor: Warehouse User
Trigger: User records inbound/outbound adjustment
Preconditions: Product exists
Main flow:
1. User selects product and adjustment type/quantity.
2. System applies stock change.
3. Inventory list updates current stock and low-stock status.
Postconditions: Stock on hand reflects adjustment.
Exceptions:
- Adjustment causing negative stock is rejected.

#### UC-IM-03 Low-Stock Monitoring
Actor: Warehouse User
Trigger: User views inventory dashboard/list
Preconditions: Products exist
Main flow:
1. System compares stock_on_hand against product low_stock_threshold.
2. System highlights low-stock products.
Postconditions: User sees actionable low-stock alerts.
Exceptions:
- None.

### Order Management Domain Use Cases

#### UC-OM-01 Create Order (Draft)
Actor: Order Manager
Trigger: User creates a new order
Preconditions: Products exist
Main flow:
1. User creates order header (order id/customer/date) with Draft status.
2. User adds one or more line items (product, quantity, unit price).
3. System validates and saves order.
Postconditions: Draft order exists.
Exceptions:
- Missing/invalid required fields rejected.
- Invalid quantities/prices rejected.

#### UC-OM-02 Confirm Order
Actor: Order Manager
Trigger: User transitions Draft -> Confirmed
Preconditions: Order in Draft
Main flow:
1. User confirms draft order.
2. System updates status to Confirmed.
Postconditions: Order is ready for shipping workflow.
Exceptions:
- Invalid transition rejected.

#### UC-OM-03 Ship Order
Actor: Warehouse User
Trigger: User transitions Confirmed -> Shipped
Preconditions: Order in Confirmed
Main flow:
1. User requests ship action.
2. System validates each line item has sufficient inventory.
3. System deducts stock for all line items.
4. System marks order as Shipped.
Postconditions: Order shipped and inventory updated.
Exceptions:
- If any item short, shipping is blocked and shortage details are returned.

#### UC-OM-04 Cancel Order
Actor: Order Manager
Trigger: User cancels Draft or Confirmed order
Preconditions: Order in Draft or Confirmed
Main flow:
1. User requests cancel action.
2. System updates status to Cancelled.
Postconditions: Order is terminal and no further transitions allowed.
Exceptions:
- Cancelling Shipped order is rejected.

### Cross-Domain Integration Use Case

#### UC-X-01 Ship-time Inventory Contract
Actor: Warehouse User
Trigger: Shipping request for a confirmed order
Preconditions: Order exists in Confirmed state; referenced products exist
Main flow:
1. Order domain requests stock check from inventory domain.
2. Inventory domain evaluates all line-item quantities.
3. If sufficient, inventory domain performs atomic deduction and returns success.
4. Order domain completes transition to Shipped.
Postconditions: Order and inventory are consistent.
Exceptions:
- Any shortage response blocks shipment and returns itemized shortage details.

## 1d. Technical Specification

### Functional Requirements (FR)
- FR-IM-01: Inventory domain must support CRUD-lite for products (create, list, update key fields).
- FR-IM-02: Inventory domain must support inventory adjustments (inbound/outbound).
- FR-IM-03: Inventory domain must provide low-stock evaluation per product threshold.
- FR-OM-01: Order domain must support order creation with line items.
- FR-OM-02: Order domain must enforce order status transitions:
  - Draft -> Confirmed
  - Confirmed -> Shipped
  - Draft/Confirmed -> Cancelled
- FR-OM-03: Order domain must support filtering/searching orders by status/date.
- FR-X-01: Cross-domain integration must deduct inventory only when order is Shipped.
- FR-X-02: Cross-domain integration must block shipping when any line item is short and return shortage details.

### Non-Functional Requirements (NFR)
- NFR-01: App runs locally with simple setup.
- NFR-02: API returns consistent JSON errors.
- NFR-03: Basic validation at API boundary for all writes.
- NFR-04: Automated tests cover domain-specific core flows and at least one integration flow.
- NFR-05: Domain-level delivery and validation must be independently executable.

### Data Model (Initial)
Inventory domain-owned entities:
- Product
  - id
  - sku (unique)
  - name
  - stockOnHand
  - lowStockThreshold
  - createdAt
  - updatedAt

Order domain-owned entities:
- Order
  - id
  - orderNumber
  - customerName
  - orderDate
  - status (draft|confirmed|shipped|cancelled)
  - createdAt
  - updatedAt
- OrderLine
  - id
  - orderId
  - productId
  - quantity
  - unitPrice

Cross-domain reference:
- OrderLine.productId references Inventory.Product.id.
- Ownership remains with originating domain; no ownership transfer across domains.

### API Surface (Initial)
Inventory domain API:
- Products
  - POST /products
  - GET /products
  - PATCH /products/:id
- Inventory
  - POST /inventory/adjustments
  - GET /inventory/low-stock

Order domain API:
- Orders
  - POST /orders
  - GET /orders
  - GET /orders/:id
  - PATCH /orders/:id/status

Cross-domain integration endpoint behavior:
- Shipping operation in Order domain must perform Inventory stock validation/deduction before final status update.

### Validation Rules (Initial)
- Quantities must be positive integers.
- Unit price must be non-negative numeric.
- SKU unique and required.
- Order status transitions restricted to allowed state graph.
- Ship-time inventory transaction must be atomic (all-or-nothing stock deduction).
- Domain-specific validation failures must include domain-context error codes/messages.

### Acceptance Criteria (Traceable)
- AC-IM-01: Inventory domain supports product create/list/update and adjustment flows. (UC-IM-01/UC-IM-02)
- AC-IM-02: Low-stock flags respect per-product thresholds. (UC-IM-03)
- AC-OM-01: Order domain supports draft/create/confirm/cancel transitions and order retrieval/filtering. (UC-OM-01/UC-OM-02/UC-OM-04)
- AC-X-01: Shipping deducts inventory only at Shipped transition. (UC-OM-03/UC-X-01)
- AC-X-02: Shipping is blocked with shortage details when stock is insufficient. (UC-OM-03/UC-X-01)
- AC-SDLC-01: Domain-level SDLC work can be planned/executed independently, with explicit integration items for cross-domain behavior.
