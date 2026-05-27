import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App smoke", () => {
  it("renders title and both domain cards", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Supply Chain POC", level: 1 }),
    ).toBeTruthy();

    expect(
      screen.getByRole("heading", {
        name: "Order Management Domain",
        level: 2,
      }),
    ).toBeTruthy();

    expect(
      screen.getByRole("heading", {
        name: "Inventory Management Domain",
        level: 2,
      }),
    ).toBeTruthy();
  });

  it("shows text indicating independent domains", () => {
    render(<App />);

    expect(
      screen.getByText(
        "Independent domains: Order Management and Inventory Management",
      ),
    ).toBeTruthy();
  });
});
