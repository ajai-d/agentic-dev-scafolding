---
applyTo: "**/*.py"
---

# Python Instructions

## Naming

- Use `snake_case` for functions, variables, and file names.
- Use `PascalCase` for classes only.

## Docstrings

- Every public function and class **must** have a docstring.
- Use Google-style docstrings:

```python
def get_top_stocks(limit: int) -> list[str]:
    """Fetch the top performing stocks.

    Args:
        limit: Number of stocks to return.

    Returns:
        A list of stock ticker symbols.
    """
```

## Type Hints

- All function parameters and return values **must** have type hints.
- Use modern syntax (`list[str]`, `dict[str, int]`, `X | None`) — not `typing.List`.

## General

- Prefer f-strings over `.format()` or `%` formatting.
- One class per file unless tightly coupled.
