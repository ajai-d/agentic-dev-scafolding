const db = require("../../../shared/db");

function mapOrder(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    orderNumber: row.orderNumber,
    customerName: row.customerName,
    orderDate: row.orderDate,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapOrderLine(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    orderId: row.orderId,
    productId: row.productId,
    quantity: row.quantity,
    unitPrice: row.unitPrice,
  };
}

async function createOrder(order, lines) {
  const orderInsert = await db.run(
    `
      INSERT INTO orders (orderNumber, customerName, orderDate, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      order.orderNumber,
      order.customerName,
      order.orderDate,
      order.status,
      order.createdAt,
      order.updatedAt,
    ]
  );

  const orderId = orderInsert.lastID;

  for (const line of lines) {
    await db.run(
      `
        INSERT INTO order_lines (orderId, productId, quantity, unitPrice)
        VALUES (?, ?, ?, ?)
      `,
      [orderId, line.productId, line.quantity, line.unitPrice]
    );
  }

  return getOrderWithLinesById(orderId);
}

async function listOrders(filters = {}) {
  const whereClauses = [];
  const params = [];

  if (filters.status) {
    whereClauses.push("status = ?");
    params.push(filters.status);
  }

  if (filters.fromDate) {
    whereClauses.push("orderDate >= ?");
    params.push(filters.fromDate);
  }

  if (filters.toDate) {
    whereClauses.push("orderDate <= ?");
    params.push(filters.toDate);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const rows = await db.all(
    `
      SELECT id, orderNumber, customerName, orderDate, status, createdAt, updatedAt
      FROM orders
      ${whereSql}
      ORDER BY id ASC
    `,
    params
  );

  return rows.map(mapOrder);
}

async function getOrderById(id) {
  const row = await db.get(
    `
      SELECT id, orderNumber, customerName, orderDate, status, createdAt, updatedAt
      FROM orders
      WHERE id = ?
    `,
    [id]
  );

  return mapOrder(row);
}

async function getOrderLinesByOrderId(orderId) {
  const rows = await db.all(
    `
      SELECT id, orderId, productId, quantity, unitPrice
      FROM order_lines
      WHERE orderId = ?
      ORDER BY id ASC
    `,
    [orderId]
  );

  return rows.map(mapOrderLine);
}

async function getOrderWithLinesById(id) {
  const order = await getOrderById(id);

  if (!order) {
    return null;
  }

  const lines = await getOrderLinesByOrderId(id);
  return {
    ...order,
    lines,
  };
}

async function updateOrderStatus(id, status, updatedAt) {
  const result = await db.run(
    `
      UPDATE orders
      SET status = ?, updatedAt = ?
      WHERE id = ?
    `,
    [status, updatedAt, id]
  );

  if (result.changes === 0) {
    return null;
  }

  return getOrderWithLinesById(id);
}

module.exports = {
  createOrder,
  getOrderWithLinesById,
  listOrders,
  updateOrderStatus,
};