# Seed - Supply Chain POC

## What I Want To Build

Build a simple Supply Chain Management web application with two core modules:

1. Order Management
- Create sales orders with order id, customer, order date, and status.
- Add one or more line items per order with product, quantity, and unit price.
- View and search orders by status and date.
- Update order status through a simple lifecycle (Draft, Confirmed, Shipped, Cancelled).

2. Inventory Management
- Maintain product catalog with SKU, name, and current stock.
- Track stock on hand and low-stock threshold.
- Support basic stock adjustments (inbound and outbound).
- Show low-stock alerts in the UI.

## Done Looks Like

The project is considered done when all of the following are true:

1. Functional Scope
- Users can create, view, and update orders in the Order Management module.
- Users can create products and adjust stock in the Inventory Management module.
- Inventory is reduced when an order is confirmed or shipped (as defined in spec).
- Low-stock items are clearly visible in the UI.

2. Quality and Validation
- Core flows are covered by automated tests (API and at least one UI smoke path).
- Basic input validation is enforced (required fields, non-negative quantities).
- Error responses are consistent and understandable.

3. Delivery Expectations
- App can run locally with clear setup instructions.
- A simple README explains architecture, run commands, and known limitations.
- The work is executed using TMWTTY stages: Seed -> Spec -> Plan -> Execute.

## Constraints

- Keep architecture simple and local-first.
- Prioritize clarity and correctness over advanced features.
- No external enterprise integrations in this POC.

## Out of Scope for POC

- Advanced forecasting and demand planning.
- Multi-warehouse optimization.
- Supplier portal or procurement workflow.
- Complex role-based access control.
