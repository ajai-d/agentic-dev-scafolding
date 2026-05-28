const express = require("express");
const { AppError, asyncHandler } = require("../../../shared/errors");
const service = require("../services/inventory-service");
const {
  parseLowStockOnly,
  validateCreateAdjustment,
  validateCreateProduct,
  validatePatchProduct,
} = require("../validators/inventory-validator");

const router = express.Router();

function parsePositiveIntegerId(rawValue) {
  const parsed = Number.parseInt(rawValue, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("validation_error", "id must be a positive integer", 400);
  }

  return parsed;
}

router.post("/products", asyncHandler(async (req, res) => {
  validateCreateProduct(req.body);
  const product = await service.createProduct(req.body);
  res.status(201).json({ data: product });
}));

router.get("/products", asyncHandler(async (req, res) => {
  const lowStockOnly = parseLowStockOnly(req.query.lowStockOnly);
  const products = await service.listProducts({ lowStockOnly });
  res.status(200).json({ data: products });
}));

router.patch("/products/:id", asyncHandler(async (req, res) => {
  const id = parsePositiveIntegerId(req.params.id);
  const updates = validatePatchProduct(req.body);
  const product = await service.patchProduct(id, updates);
  res.status(200).json({ data: product });
}));

router.post("/inventory/adjustments", asyncHandler(async (req, res) => {
  validateCreateAdjustment(req.body);
  const result = await service.createAdjustment(req.body);
  res.status(200).json({ data: result });
}));

router.get("/inventory/low-stock", asyncHandler(async (_req, res) => {
  const products = await service.listLowStockProducts();
  res.status(200).json({ data: products });
}));

module.exports = router;
