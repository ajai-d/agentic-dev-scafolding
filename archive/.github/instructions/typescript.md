---
applyTo: "**/*.ts"
---

# TypeScript Instructions

## Naming

- Use `camelCase` for functions, variables, and parameters.
- Use `PascalCase` for interfaces, types, and classes.
- Prefix interfaces with descriptive nouns (not `I` prefix) — e.g., `StockResult`, not `IStockResult`.

## JSDoc Comments

- Every exported function and interface **must** have a JSDoc comment:

```typescript
/**
 * Fetches the top performing stocks for the day.
 * @param limit - Number of stocks to return.
 * @returns An array of stock ticker symbols.
 */
export function getTopStocks(limit: number): string[] {
```

## Interfaces Over Types

- Prefer `interface` for object shapes — they're extendable.
- Use `type` only for unions, intersections, or mapped types.

```typescript
// ✅ Do this
interface StockResult {
  ticker: string;
  price: number;
}

// ❌ Avoid this for object shapes
type StockResult = {
  ticker: string;
  price: number;
};
```

## General

- Never use `any` — use `unknown` if the type is truly dynamic.
- Enable `strict: true` in `tsconfig.json`.
- Prefer `const` over `let`; never use `var`.
