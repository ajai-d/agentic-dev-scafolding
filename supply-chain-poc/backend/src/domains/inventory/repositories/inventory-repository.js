const db = require("../../../shared/db");

function mapProduct(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    stockOnHand: row.stockOnHand,
    lowStockThreshold: row.lowStockThreshold,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapAdjustment(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    productId: row.productId,
    type: row.type,
    quantity: row.quantity,
    reason: row.reason,
    createdAt: row.createdAt,
  };
}

async function createProduct(product) {
  const result = await db.run(
    `
      INSERT INTO products (sku, name, stockOnHand, lowStockThreshold, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      product.sku,
      product.name,
      product.stockOnHand,
      product.lowStockThreshold,
      product.createdAt,
      product.updatedAt,
    ]
  );

  return getProductById(result.lastID);
}

async function listProducts({ lowStockOnly = false } = {}) {
  const rows = lowStockOnly
    ? await db.all(
      `
        SELECT id, sku, name, stockOnHand, lowStockThreshold, createdAt, updatedAt
        FROM products
        WHERE stockOnHand <= lowStockThreshold
        ORDER BY id ASC
      `
    )
    : await db.all(
      `
        SELECT id, sku, name, stockOnHand, lowStockThreshold, createdAt, updatedAt
        FROM products
        ORDER BY id ASC
      `
    );

  return rows.map(mapProduct);
}

async function getProductById(id) {
  const row = await db.get(
    `
      SELECT id, sku, name, stockOnHand, lowStockThreshold, createdAt, updatedAt
      FROM products
      WHERE id = ?
    `,
    [id]
  );

  return mapProduct(row);
}

async function getProductsByIds(productIds) {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return [];
  }

  const placeholders = productIds.map(() => "?").join(", ");
  const rows = await db.all(
    `
      SELECT id, sku, name, stockOnHand, lowStockThreshold, createdAt, updatedAt
      FROM products
      WHERE id IN (${placeholders})
      ORDER BY id ASC
    `,
    productIds
  );

  return rows.map(mapProduct);
}

async function updateProduct(id, updates) {
  const existing = await getProductById(id);
  if (!existing) {
    return null;
  }

  const nextName = updates.name !== undefined ? updates.name : existing.name;
  const nextLowStockThreshold = updates.lowStockThreshold !== undefined
    ? updates.lowStockThreshold
    : existing.lowStockThreshold;

  await db.run(
    `
      UPDATE products
      SET name = ?, lowStockThreshold = ?, updatedAt = ?
      WHERE id = ?
    `,
    [nextName, nextLowStockThreshold, updates.updatedAt, id]
  );

  return getProductById(id);
}

async function createAdjustment(adjustment) {
  const result = await db.run(
    `
      INSERT INTO inventory_adjustments (productId, type, quantity, reason, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      adjustment.productId,
      adjustment.type,
      adjustment.quantity,
      adjustment.reason,
      adjustment.createdAt,
    ]
  );

  const row = await db.get(
    `
      SELECT id, productId, type, quantity, reason, createdAt
      FROM inventory_adjustments
      WHERE id = ?
    `,
    [result.lastID]
  );

  return mapAdjustment(row);
}

async function updateStockOnHand(productId, stockOnHand, updatedAt) {
  await db.run(
    `
      UPDATE products
      SET stockOnHand = ?, updatedAt = ?
      WHERE id = ?
    `,
    [stockOnHand, updatedAt, productId]
  );
}

module.exports = {
  createAdjustment,
  createProduct,
  getProductById,
  getProductsByIds,
  listProducts,
  updateProduct,
  updateStockOnHand,
};
