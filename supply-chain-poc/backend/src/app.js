const cors = require("cors");
const express = require("express");
const inventoryRouter = require("./domains/inventory");
const ordersRouter = require("./domains/orders");
const { errorHandler, notFoundHandler } = require("./shared/errors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(inventoryRouter);
app.use(ordersRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({
    service: "supply-chain-poc-backend",
    status: "ok",
  });
});

app.get("/api/info", (_req, res) => {
  res.status(200).json({
    project: "Supply Chain POC",
    domains: ["orders", "inventory"],
    stage: "E3 Order implementation",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
