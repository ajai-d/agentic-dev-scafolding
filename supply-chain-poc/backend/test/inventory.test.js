const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../src/app");
const { closeDb } = require("../src/shared/db");

let testDbPath = null;

test.beforeEach(async () => {
  const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "inventory-db-"));
  testDbPath = path.join(testDir, "inventory.test.sqlite");
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

test("POST /products creates product and GET /products lists it", async () => {
  const createResponse = await request(app)
    .post("/products")
    .send({
      sku: "SKU-1001",
      name: "Blue Widget",
      stockOnHand: 10,
      lowStockThreshold: 3,
    });

  assert.equal(createResponse.status, 201);
  assert.equal(createResponse.body.data.sku, "SKU-1001");
  assert.equal(createResponse.body.data.stockOnHand, 10);

  const listResponse = await request(app).get("/products");
  assert.equal(listResponse.status, 200);
  assert.equal(listResponse.body.data.length, 1);
  assert.equal(listResponse.body.data[0].name, "Blue Widget");
});

test("GET /products?lowStockOnly=true and GET /inventory/low-stock return only low stock products", async () => {
  await request(app).post("/products").send({
    sku: "SKU-LOW",
    name: "Low Stock Part",
    stockOnHand: 2,
    lowStockThreshold: 2,
  });

  await request(app).post("/products").send({
    sku: "SKU-OK",
    name: "Healthy Part",
    stockOnHand: 20,
    lowStockThreshold: 5,
  });

  const filtered = await request(app).get("/products?lowStockOnly=true");
  assert.equal(filtered.status, 200);
  assert.equal(filtered.body.data.length, 1);
  assert.equal(filtered.body.data[0].sku, "SKU-LOW");

  const lowStock = await request(app).get("/inventory/low-stock");
  assert.equal(lowStock.status, 200);
  assert.equal(lowStock.body.data.length, 1);
  assert.equal(lowStock.body.data[0].sku, "SKU-LOW");
});

test("PATCH /products/:id updates name and lowStockThreshold", async () => {
  const created = await request(app).post("/products").send({
    sku: "SKU-2001",
    name: "Original Name",
    stockOnHand: 8,
    lowStockThreshold: 2,
  });

  const productId = created.body.data.id;
  const patched = await request(app)
    .patch(`/products/${productId}`)
    .send({ name: "Updated Name", lowStockThreshold: 4 });

  assert.equal(patched.status, 200);
  assert.equal(patched.body.data.name, "Updated Name");
  assert.equal(patched.body.data.lowStockThreshold, 4);
});

test("POST /inventory/adjustments updates stock for inbound and outbound", async () => {
  const created = await request(app).post("/products").send({
    sku: "SKU-3001",
    name: "Adjustable Part",
    stockOnHand: 5,
    lowStockThreshold: 1,
  });

  const productId = created.body.data.id;

  const inbound = await request(app).post("/inventory/adjustments").send({
    productId,
    type: "inbound",
    quantity: 4,
    reason: "restock",
  });

  assert.equal(inbound.status, 200);
  assert.equal(inbound.body.data.product.stockOnHand, 9);

  const outbound = await request(app).post("/inventory/adjustments").send({
    productId,
    type: "outbound",
    quantity: 3,
  });

  assert.equal(outbound.status, 200);
  assert.equal(outbound.body.data.product.stockOnHand, 6);
});

test("POST /inventory/adjustments rejects negative stock", async () => {
  const created = await request(app).post("/products").send({
    sku: "SKU-NEG",
    name: "Limited Stock Part",
    stockOnHand: 1,
    lowStockThreshold: 0,
  });

  const response = await request(app).post("/inventory/adjustments").send({
    productId: created.body.data.id,
    type: "outbound",
    quantity: 2,
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error.code, "validation_error");
});

test("returns not_found for missing product patch and adjustment", async () => {
  const patchResponse = await request(app)
    .patch("/products/9999")
    .send({ name: "No Product" });
  assert.equal(patchResponse.status, 404);
  assert.equal(patchResponse.body.error.code, "not_found");

  const adjustmentResponse = await request(app)
    .post("/inventory/adjustments")
    .send({ productId: 9999, type: "inbound", quantity: 1 });
  assert.equal(adjustmentResponse.status, 404);
  assert.equal(adjustmentResponse.body.error.code, "not_found");
});

test("returns validation_error for invalid payloads", async () => {
  const invalidCreate = await request(app).post("/products").send({
    sku: "",
    name: "",
    stockOnHand: -1,
    lowStockThreshold: -1,
  });
  assert.equal(invalidCreate.status, 400);
  assert.equal(invalidCreate.body.error.code, "validation_error");

  const invalidQuery = await request(app).get("/products?lowStockOnly=maybe");
  assert.equal(invalidQuery.status, 400);
  assert.equal(invalidQuery.body.error.code, "validation_error");
});
