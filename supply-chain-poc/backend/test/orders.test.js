const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../src/app");
const { closeDb } = require("../src/shared/db");
const orderRepository = require("../src/domains/orders/repositories/order-repository");

let testDbPath = null;

test.beforeEach(async () => {
  const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "orders-db-"));
  testDbPath = path.join(testDir, "orders.test.sqlite");
  process.env.DB_PATH = testDbPath;
  await closeDb();
});

test.afterEach(async () => {
  await closeDb();
  if (testDbPath) {
    const testDir = path.dirname(testDbPath);
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  delete process.env.DB_PATH;
});

async function createOrder(payload = {}) {
  return request(app)
    .post("/orders")
    .send({
      orderNumber: payload.orderNumber || "ORD-1001",
      customerName: payload.customerName || "Acme Corp",
      orderDate: payload.orderDate || "2026-05-27",
      lines: payload.lines || [
        {
          productId: 1,
          quantity: 2,
          unitPrice: 10.5,
        },
      ],
    });
}

async function createProduct(payload = {}) {
  return request(app)
    .post("/products")
    .send({
      sku: payload.sku || "SKU-ORD-1001",
      name: payload.name || "Order Test Product",
      stockOnHand: payload.stockOnHand ?? 10,
      lowStockThreshold: payload.lowStockThreshold ?? 2,
    });
}

test("POST /orders creates draft order and GET /orders/:id returns it with lines", async () => {
  const created = await createOrder();

  assert.equal(created.status, 201);
  assert.equal(created.body.data.status, "draft");
  assert.equal(created.body.data.lines.length, 1);

  const orderId = created.body.data.id;
  const fetched = await request(app).get(`/orders/${orderId}`);

  assert.equal(fetched.status, 200);
  assert.equal(fetched.body.data.id, orderId);
  assert.equal(fetched.body.data.orderNumber, "ORD-1001");
  assert.equal(fetched.body.data.lines[0].productId, 1);
});

test("GET /orders filters by status and date range", async () => {
  await createOrder({ orderNumber: "ORD-DRAFT", orderDate: "2026-05-20" });

  const confirmable = await createOrder({
    orderNumber: "ORD-CONFIRMED",
    orderDate: "2026-05-25",
  });

  await request(app)
    .patch(`/orders/${confirmable.body.data.id}/status`)
    .send({ status: "confirmed" });

  const byStatus = await request(app).get("/orders?status=confirmed");
  assert.equal(byStatus.status, 200);
  assert.equal(byStatus.body.data.length, 1);
  assert.equal(byStatus.body.data[0].orderNumber, "ORD-CONFIRMED");

  const byDate = await request(app).get("/orders?fromDate=2026-05-24&toDate=2026-05-30");
  assert.equal(byDate.status, 200);
  assert.equal(byDate.body.data.length, 1);
  assert.equal(byDate.body.data[0].orderNumber, "ORD-CONFIRMED");
});

test("PATCH /orders/:id/status enforces allowed transitions", async () => {
  const product = await createProduct({ sku: "SKU-TRANSITIONS", stockOnHand: 20 });
  const created = await createOrder({
    orderNumber: "ORD-TRANSITIONS",
    lines: [
      {
        productId: product.body.data.id,
        quantity: 2,
        unitPrice: 10.5,
      },
    ],
  });
  const orderId = created.body.data.id;

  const toConfirmed = await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "confirmed" });

  assert.equal(toConfirmed.status, 200);
  assert.equal(toConfirmed.body.data.status, "confirmed");

  const toShipped = await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "shipped" });

  assert.equal(toShipped.status, 200);
  assert.equal(toShipped.body.data.status, "shipped");

  const invalid = await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "cancelled" });

  assert.equal(invalid.status, 400);
  assert.equal(invalid.body.error.code, "invalid_transition");
});

test("shipping succeeds when confirmed order has sufficient stock", async () => {
  const product = await createProduct({ sku: "SKU-SHIP-SUCCESS", stockOnHand: 7 });
  const productId = product.body.data.id;

  const created = await createOrder({
    orderNumber: "ORD-SHIP-SUCCESS",
    lines: [
      {
        productId,
        quantity: 3,
        unitPrice: 5,
      },
    ],
  });

  const orderId = created.body.data.id;

  await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "confirmed" });

  const ship = await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "shipped" });

  assert.equal(ship.status, 200);
  assert.equal(ship.body.data.status, "shipped");

  const products = await request(app).get("/products");
  assert.equal(products.status, 200);
  assert.equal(products.body.data[0].stockOnHand, 4);
});

test("shipping aggregates quantities across multiple lines for the same product", async () => {
  const product = await createProduct({ sku: "SKU-SHIP-MULTI", stockOnHand: 10 });
  const productId = product.body.data.id;

  const created = await createOrder({
    orderNumber: "ORD-SHIP-MULTI",
    lines: [
      {
        productId,
        quantity: 3,
        unitPrice: 5,
      },
      {
        productId,
        quantity: 4,
        unitPrice: 5,
      },
    ],
  });

  const orderId = created.body.data.id;

  await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "confirmed" });

  const ship = await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "shipped" });

  assert.equal(ship.status, 200);
  assert.equal(ship.body.data.status, "shipped");

  const products = await request(app).get("/products");
  assert.equal(products.status, 200);
  assert.equal(products.body.data[0].stockOnHand, 3);
});

test("shipping is blocked with itemized shortages when stock is insufficient", async () => {
  const product = await createProduct({ sku: "SKU-SHIP-BLOCK", stockOnHand: 2 });
  const productId = product.body.data.id;

  const created = await createOrder({
    orderNumber: "ORD-SHIP-BLOCK",
    lines: [
      {
        productId,
        quantity: 5,
        unitPrice: 8,
      },
    ],
  });

  const orderId = created.body.data.id;

  await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "confirmed" });

  const ship = await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "shipped" });

  assert.equal(ship.status, 400);
  assert.equal(ship.body.error.code, "insufficient_stock");
  assert.deepEqual(ship.body.error.details, [
    {
      productId,
      requested: 5,
      available: 2,
    },
  ]);

  const order = await request(app).get(`/orders/${orderId}`);
  assert.equal(order.status, 200);
  assert.equal(order.body.data.status, "confirmed");
});

test("shipping rolls back stock deduction when order update fails", async () => {
  const product = await createProduct({ sku: "SKU-SHIP-ROLLBACK", stockOnHand: 9 });
  const productId = product.body.data.id;

  const created = await createOrder({
    orderNumber: "ORD-SHIP-ROLLBACK",
    lines: [
      {
        productId,
        quantity: 4,
        unitPrice: 12,
      },
    ],
  });

  const orderId = created.body.data.id;

  await request(app)
    .patch(`/orders/${orderId}/status`)
    .send({ status: "confirmed" });

  const originalUpdateOrderStatus = orderRepository.updateOrderStatus;
  orderRepository.updateOrderStatus = async () => {
    throw new Error("simulated order status update failure");
  };

  try {
    const ship = await request(app)
      .patch(`/orders/${orderId}/status`)
      .send({ status: "shipped" });

    assert.equal(ship.status, 500);
    assert.equal(ship.body.error.code, "internal_error");
  } finally {
    orderRepository.updateOrderStatus = originalUpdateOrderStatus;
  }

  const products = await request(app).get("/products");
  assert.equal(products.status, 200);
  assert.equal(products.body.data[0].stockOnHand, 9);

  const order = await request(app).get(`/orders/${orderId}`);
  assert.equal(order.status, 200);
  assert.equal(order.body.data.status, "confirmed");
});

test("PATCH /orders/:id/status allows cancellation from draft or confirmed", async () => {
  const draft = await createOrder({ orderNumber: "ORD-CANCEL-DRAFT" });
  const cancelDraft = await request(app)
    .patch(`/orders/${draft.body.data.id}/status`)
    .send({ status: "cancelled" });
  assert.equal(cancelDraft.status, 200);
  assert.equal(cancelDraft.body.data.status, "cancelled");

  const confirmed = await createOrder({ orderNumber: "ORD-CANCEL-CONFIRMED" });
  await request(app)
    .patch(`/orders/${confirmed.body.data.id}/status`)
    .send({ status: "confirmed" });

  const cancelConfirmed = await request(app)
    .patch(`/orders/${confirmed.body.data.id}/status`)
    .send({ status: "cancelled" });
  assert.equal(cancelConfirmed.status, 200);
  assert.equal(cancelConfirmed.body.data.status, "cancelled");
});

test("returns validation_error and not_found for invalid order requests", async () => {
  const invalidCreate = await request(app).post("/orders").send({
    orderNumber: "",
    customerName: "",
    orderDate: "not-a-date",
    lines: [],
  });

  assert.equal(invalidCreate.status, 400);
  assert.equal(invalidCreate.body.error.code, "validation_error");

  const invalidList = await request(app).get("/orders?status=bad");
  assert.equal(invalidList.status, 400);
  assert.equal(invalidList.body.error.code, "validation_error");

  const notFound = await request(app).get("/orders/9999");
  assert.equal(notFound.status, 404);
  assert.equal(notFound.body.error.code, "not_found");

  const invalidId = await request(app).patch("/orders/abc/status").send({ status: "confirmed" });
  assert.equal(invalidId.status, 400);
  assert.equal(invalidId.body.error.code, "validation_error");
});