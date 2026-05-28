const { AppError } = require("../../../shared/errors");

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function validateCreateProduct(payload) {
  const details = [];

  if (!payload || typeof payload !== "object") {
    throw new AppError("validation_error", "Invalid request body", 400);
  }

  if (typeof payload.sku !== "string" || payload.sku.trim().length === 0) {
    details.push("sku is required and must be a non-empty string");
  }

  if (typeof payload.name !== "string" || payload.name.trim().length === 0) {
    details.push("name is required and must be a non-empty string");
  }

  if (!isNonNegativeInteger(payload.stockOnHand)) {
    details.push("stockOnHand must be an integer greater than or equal to 0");
  }

  if (!isNonNegativeInteger(payload.lowStockThreshold)) {
    details.push("lowStockThreshold must be an integer greater than or equal to 0");
  }

  if (details.length > 0) {
    throw new AppError("validation_error", "Invalid product payload", 400, details);
  }
}

function parseLowStockOnly(queryValue) {
  if (queryValue === undefined) {
    return false;
  }

  if (queryValue === "true") {
    return true;
  }

  if (queryValue === "false") {
    return false;
  }

  throw new AppError("validation_error", "lowStockOnly must be true or false", 400);
}

function validatePatchProduct(payload) {
  const details = [];
  const updates = {};

  if (!payload || typeof payload !== "object") {
    throw new AppError("validation_error", "Invalid request body", 400);
  }

  if (Object.prototype.hasOwnProperty.call(payload, "name")) {
    if (typeof payload.name !== "string" || payload.name.trim().length === 0) {
      details.push("name must be a non-empty string when provided");
    } else {
      updates.name = payload.name.trim();
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, "lowStockThreshold")) {
    if (!isNonNegativeInteger(payload.lowStockThreshold)) {
      details.push("lowStockThreshold must be an integer greater than or equal to 0");
    } else {
      updates.lowStockThreshold = payload.lowStockThreshold;
    }
  }

  if (Object.keys(updates).length === 0 && details.length === 0) {
    details.push("At least one updatable field (name, lowStockThreshold) is required");
  }

  if (details.length > 0) {
    throw new AppError("validation_error", "Invalid product patch payload", 400, details);
  }

  return updates;
}

function validateCreateAdjustment(payload) {
  const details = [];

  if (!payload || typeof payload !== "object") {
    throw new AppError("validation_error", "Invalid request body", 400);
  }

  if (!isPositiveInteger(payload.productId)) {
    details.push("productId must be a positive integer");
  }

  if (!["inbound", "outbound"].includes(payload.type)) {
    details.push("type must be either inbound or outbound");
  }

  if (!isPositiveInteger(payload.quantity)) {
    details.push("quantity must be a positive integer");
  }

  if (
    Object.prototype.hasOwnProperty.call(payload, "reason")
    && payload.reason !== undefined
    && payload.reason !== null
    && typeof payload.reason !== "string"
  ) {
    details.push("reason must be a string when provided");
  }

  if (details.length > 0) {
    throw new AppError("validation_error", "Invalid adjustment payload", 400, details);
  }
}

module.exports = {
  parseLowStockOnly,
  validateCreateAdjustment,
  validateCreateProduct,
  validatePatchProduct,
};
