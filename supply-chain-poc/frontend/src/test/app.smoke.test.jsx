import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "../App";

test("renders supply chain title, domain summary, and both domain cards", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Supply Chain POC" })).toBeInTheDocument();
  expect(
    screen.getByText("Independent domains: Order Management and Inventory Management"),
  ).toBeInTheDocument();

  expect(screen.getByRole("heading", { name: "Order Management Domain" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Inventory Management Domain" })).toBeInTheDocument();

  expect(screen.getByText(/Order lifecycle: Draft, Confirmed, Shipped, Cancelled/i)).toBeInTheDocument();
  expect(screen.getByText(/Product catalog and stock tracking/i)).toBeInTheDocument();
});
