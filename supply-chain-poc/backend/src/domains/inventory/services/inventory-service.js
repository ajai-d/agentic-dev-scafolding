const db = require("../../../shared/db");
const { AppError } = require("../../../shared/errors");
const repository = require("../repositories/inventory-repository");

function isSqliteUniqueConstraintError(err) {
  return err && err.code === "SQLITE_CONSTRAINT" && String(err.message).includes("products.sku");
}

function nowIsoString() {
  return new Date().toISOString();
}

function normalizeOrderLines(lines) {
  if (!Array.isArray(lines)) {
    return [];
  }

  return lines
    .filter((line) => line && Number.isInteger(line.productId) && Number.isInteger(line.quantity))
    .map((line) => ({
      productId: line.productId,
      quantity: line.quantity,
    }));
}

function aggregateRequestedByProduct(lines) {
  const aggregated = new Map();

  for (const line of lines) {
    const current = aggregated.get(line.productId) || 0;
    aggregated.set(line.productId, current + line.quantity);
  }

  return aggregated;
}

async function createProduct(payload) {
  const now = nowIsoString();

  try {
    return await repository.createProduct({
      sku: payload.sku.trim(),
      name: payload.name.trim(),
      stockOnHand: payload.stockOnHand,
      lowStockThreshold: payload.lowStockThreshold,
      createdAt: now,
      updatedAt: now,
    });
  } catch (err) {
    if (isSqliteUniqueConstraintError(err)) {
      throw new AppError("validation_error", "sku already exists", 400);
    }

    throw err;
  }
}

async function listProducts({ lowStockOnly = false } = {}) {
  return repository.listProducts({ lowStockOnly });
}

async function patchProduct(id, updates) {
  const updated = await repository.updateProduct(id, {
    ...updates,
    updatedAt: nowIsoString(),
  });

  if (!updated) {
    throw new AppError("not_found", "Product not found", 404);
  }

  return updated;
}

async function createAdjustment(payload) {
  return db.withTransaction(async () => {
    const product = await repository.getProductById(payload.productId);

    if (!product) {
      throw new AppError("not_found", "Product not found", 404);
    }

    const delta = payload.type === "inbound" ? payload.quantity : -payload.quantity;
    const nextStock = product.stockOnHand + delta;

    if (nextStock < 0) {
      throw new AppError(
        "validation_error",
        "Adjustment would result in negative stock",
        400
      );
    }

    const now = nowIsoString();

    await repository.updateStockOnHand(product.id, nextStock, now);
    const adjustment = await repository.createAdjustment({
      productId: payload.productId,
      type: payload.type,
      quantity: payload.quantity,
      reason: payload.reason || null,
      createdAt: now,
    });

    const updatedProduct = await repository.getProductById(product.id);

    return {
      adjustment,
      product: updatedProduct,
    };
  });
}

async function listLowStockProducts() {
  return repository.listProducts({ lowStockOnly: true });
}

async function validateAndDeductStock(lines) {
  const normalizedLines = normalizeOrderLines(lines);
  const requestedByProduct = aggregateRequestedByProduct(normalizedLines);
  const productIds = Array.from(requestedByProduct.keys());

  const products = await repository.getProductsByIds(productIds);
  const productById = new Map(products.map((product) => [product.id, product]));

  const shortages = productIds
    .map((productId) => {
      const requested = requestedByProduct.get(productId);
      const product = productById.get(productId);
      const available = product ? product.stockOnHand : 0;

      if (available >= requested) {
        return null;
      }

      return {
        productId,
        requested,
        available,
      };
    })
    .filter(Boolean);

  if (shortages.length > 0) {
    throw new AppError(
      "insufficient_stock",
      "Insufficient stock for one or more order lines",
      400,
      shortages
    );
  }

  const now = nowIsoString();

  for (const productId of productIds) {
    const requested = requestedByProduct.get(productId);
    const product = productById.get(productId);
    const nextStock = product.stockOnHand - requested;
    await repository.updateStockOnHand(productId, nextStock, now);
  }
}

module.exports = {
  createAdjustment,
  createProduct,
  listLowStockProducts,
  listProducts,
  patchProduct,
  validateAndDeductStock,
};
