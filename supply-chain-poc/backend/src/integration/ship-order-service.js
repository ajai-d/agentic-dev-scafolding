const db = require("../shared/db");
const { AppError } = require("../shared/errors");
const inventoryService = require("../domains/inventory/services/inventory-service");
const orderRepository = require("../domains/orders/repositories/order-repository");

function nowIsoString() {
  return new Date().toISOString();
}

async function shipOrder(orderId) {
  return db.withTransaction(async () => {
    const order = await orderRepository.getOrderWithLinesById(orderId);

    if (!order) {
      throw new AppError("not_found", "Order not found", 404);
    }

    if (order.status !== "confirmed") {
      throw new AppError(
        "invalid_transition",
        `Cannot transition order from ${order.status} to shipped`,
        400,
        {
          currentStatus: order.status,
          targetStatus: "shipped",
        }
      );
    }

    await inventoryService.validateAndDeductStock(order.lines);
    return orderRepository.updateOrderStatus(orderId, "shipped", nowIsoString());
  });
}

module.exports = {
  shipOrder,
};
