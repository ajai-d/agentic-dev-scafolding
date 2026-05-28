const express = require("express");
const { AppError, asyncHandler } = require("../../../shared/errors");
const service = require("../services/order-service");
const integrationService = require("../../../integration/ship-order-service");
const {
  parseListOrdersQuery,
  validateCreateOrder,
  validateStatusTransitionPayload,
} = require("../validators/order-validator");

const router = express.Router();

function parsePositiveIntegerId(rawValue) {
  const parsed = Number.parseInt(rawValue, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("validation_error", "id must be a positive integer", 400);
  }

  return parsed;
}

router.post("/orders", asyncHandler(async (req, res) => {
  validateCreateOrder(req.body);
  const order = await service.createOrder(req.body);
  res.status(201).json({ data: order });
}));

router.get("/orders", asyncHandler(async (req, res) => {
  const filters = parseListOrdersQuery(req.query);
  const orders = await service.listOrders(filters);
  res.status(200).json({ data: orders });
}));

router.get("/orders/:id", asyncHandler(async (req, res) => {
  const id = parsePositiveIntegerId(req.params.id);
  const order = await service.getOrder(id);
  res.status(200).json({ data: order });
}));

router.patch("/orders/:id/status", asyncHandler(async (req, res) => {
  const id = parsePositiveIntegerId(req.params.id);
  const status = validateStatusTransitionPayload(req.body);
  const order = status === "shipped"
    ? await integrationService.shipOrder(id)
    : await service.transitionOrderStatus(id, status);
  res.status(200).json({ data: order });
}));

module.exports = router;