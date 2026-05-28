const { AppError } = require("../../../shared/errors");

const ALLOWED_STATUSES = ["draft", "confirmed", "shipped", "cancelled"];

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isNonNegativeNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isValidDateString(value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return false;
  }

  const parsed = Date.parse(value);
  return !Number.isNaN(parsed);
}

function validateCreateOrder(payload) {
  const details = [];

  if (!payload || typeof payload !== "object") {
    throw new AppError("validation_error", "Invalid request body", 400);
  }

  if (typeof payload.orderNumber !== "string" || payload.orderNumber.trim().length === 0) {
    details.push("orderNumber is required and must be a non-empty string");
  }

  if (typeof payload.customerName !== "string" || payload.customerName.trim().length === 0) {
    details.push("customerName is required and must be a non-empty string");
  }

  if (!isValidDateString(payload.orderDate)) {
    details.push("orderDate is required and must be a valid date string");
  }

  if (!Array.isArray(payload.lines) || payload.lines.length === 0) {
    details.push("lines is required and must contain at least one line item");
  } else {
    payload.lines.forEach((line, index) => {
      if (!line || typeof line !== "object") {
        details.push(`lines[${index}] must be an object`);
        return;
      }

      if (!isPositiveInteger(line.productId)) {
        details.push(`lines[${index}].productId must be a positive integer`);
      }

      if (!isPositiveInteger(line.quantity)) {
        details.push(`lines[${index}].quantity must be a positive integer`);
      }

      if (!isNonNegativeNumber(line.unitPrice)) {
        details.push(`lines[${index}].unitPrice must be a number greater than or equal to 0`);
      }
    });
  }

  if (details.length > 0) {
    throw new AppError("validation_error", "Invalid order payload", 400, details);
  }
}

function parseListOrdersQuery(query) {
  const details = [];
  const filters = {};

  if (query.status !== undefined) {
    if (!ALLOWED_STATUSES.includes(query.status)) {
      details.push("status must be one of draft, confirmed, shipped, cancelled");
    } else {
      filters.status = query.status;
    }
  }

  if (query.fromDate !== undefined) {
    if (!isValidDateString(query.fromDate)) {
      details.push("fromDate must be a valid date string when provided");
    } else {
      filters.fromDate = query.fromDate;
    }
  }

  if (query.toDate !== undefined) {
    if (!isValidDateString(query.toDate)) {
      details.push("toDate must be a valid date string when provided");
    } else {
      filters.toDate = query.toDate;
    }
  }

  if (filters.fromDate && filters.toDate) {
    const fromTimestamp = Date.parse(filters.fromDate);
    const toTimestamp = Date.parse(filters.toDate);

    if (fromTimestamp > toTimestamp) {
      details.push("fromDate must be less than or equal to toDate");
    }
  }

  if (details.length > 0) {
    throw new AppError("validation_error", "Invalid order query parameters", 400, details);
  }

  return filters;
}

function validateStatusTransitionPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new AppError("validation_error", "Invalid request body", 400);
  }

  if (!ALLOWED_STATUSES.includes(payload.status)) {
    throw new AppError(
      "validation_error",
      "status must be one of draft, confirmed, shipped, cancelled",
      400
    );
  }

  return payload.status;
}

module.exports = {
  parseListOrdersQuery,
  validateCreateOrder,
  validateStatusTransitionPayload,
};