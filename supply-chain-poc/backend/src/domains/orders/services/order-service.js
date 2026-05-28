const db = require("../../../shared/db");
const { AppError } = require("../../../shared/errors");
const repository = require("../repositories/order-repository");

const ALLOWED_TRANSITIONS = {
  draft: new Set(["confirmed", "cancelled"]),
  confirmed: new Set(["shipped", "cancelled"]),
  shipped: new Set([]),
  cancelled: new Set([]),
};

function isSqliteUniqueConstraintError(err) {
  return err && err.code === "SQLITE_CONSTRAINT" && String(err.message).includes("orders.orderNumber");
}

function nowIsoString() {
  return new Date().toISOString();
}

function canTransition(currentStatus, targetStatus) {
  const allowedTargets = ALLOWED_TRANSITIONS[currentStatus] || new Set();
  return allowedTargets.has(targetStatus);
}

async function createOrder(payload) {
  const now = nowIsoString();
  const order = {
    orderNumber: payload.orderNumber.trim(),
    customerName: payload.customerName.trim(),
    orderDate: payload.orderDate,
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  const lines = payload.lines.map((line) => ({
    productId: line.productId,
    quantity: line.quantity,
    unitPrice: line.unitPrice,
  }));

  try {
    return await db.withTransaction(async () => repository.createOrder(order, lines));
  } catch (err) {
    if (isSqliteUniqueConstraintError(err)) {
      throw new AppError("validation_error", "orderNumber already exists", 400);
    }

    throw err;
  }
}

async function listOrders(filters = {}) {
  return repository.listOrders(filters);
}

async function getOrder(id) {
  const order = await repository.getOrderWithLinesById(id);

  if (!order) {
    throw new AppError("not_found", "Order not found", 404);
  }

  return order;
}

async function transitionOrderStatus(id, targetStatus) {
  return db.withTransaction(async () => {
    const existing = await repository.getOrderWithLinesById(id);

    if (!existing) {
      throw new AppError("not_found", "Order not found", 404);
    }

    if (!canTransition(existing.status, targetStatus)) {
      throw new AppError(
        "invalid_transition",
        `Cannot transition order from ${existing.status} to ${targetStatus}`,
        400,
        {
          currentStatus: existing.status,
          targetStatus,
        }
      );
    }

    const updated = await repository.updateOrderStatus(id, targetStatus, nowIsoString());
    return updated;
  });
}

module.exports = {
  createOrder,
  getOrder,
  listOrders,
  transitionOrderStatus,
};