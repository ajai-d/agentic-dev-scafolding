const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");

let db = null;
let dbPath = null;
let initializingPromise = null;

function closeCurrentDb() {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve();
      return;
    }

    db.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      db = null;
      dbPath = null;
      resolve();
    });
  });
}

function resolveDbPath() {
  if (process.env.DB_PATH) {
    return process.env.DB_PATH;
  }

  return path.join(__dirname, "..", "..", "data", "inventory.sqlite");
}

function ensureDbDirectoryExists(targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        lastID: this.lastID,
        changes: this.changes,
      });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(row || null);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows || []);
    });
  });
}

async function initializeSchema() {
  await run("PRAGMA foreign_keys = ON");

  await run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderNumber TEXT NOT NULL UNIQUE,
      customerName TEXT NOT NULL,
      orderDate TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'confirmed', 'shipped', 'cancelled')),
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS order_lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      unitPrice REAL NOT NULL CHECK (unitPrice >= 0),
      FOREIGN KEY(orderId) REFERENCES orders(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sku TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      stockOnHand INTEGER NOT NULL CHECK (stockOnHand >= 0),
      lowStockThreshold INTEGER NOT NULL CHECK (lowStockThreshold >= 0),
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS inventory_adjustments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('inbound', 'outbound')),
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      reason TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(productId) REFERENCES products(id)
    )
  `);
}

async function initializeDbIfNeeded() {
  const requestedPath = resolveDbPath();

  if (db && dbPath === requestedPath) {
    return;
  }

  if (initializingPromise) {
    await initializingPromise;
    return;
  }

  initializingPromise = (async () => {
    if (db && dbPath !== requestedPath) {
      await closeCurrentDb();
    }

    ensureDbDirectoryExists(requestedPath);

    db = await new Promise((resolve, reject) => {
      const connection = new sqlite3.Database(requestedPath, (openErr) => {
        if (openErr) {
          reject(openErr);
          return;
        }

        resolve(connection);
      });
    });

    dbPath = requestedPath;
    await initializeSchema();
  })();

  try {
    await initializingPromise;
  } finally {
    initializingPromise = null;
  }
}

async function queryRun(sql, params = []) {
  await initializeDbIfNeeded();
  return run(sql, params);
}

async function queryGet(sql, params = []) {
  await initializeDbIfNeeded();
  return get(sql, params);
}

async function queryAll(sql, params = []) {
  await initializeDbIfNeeded();
  return all(sql, params);
}

async function withTransaction(work) {
  await initializeDbIfNeeded();
  await run("BEGIN IMMEDIATE TRANSACTION");

  try {
    const result = await work({ run: queryRun, get: queryGet, all: queryAll });
    await run("COMMIT");
    return result;
  } catch (err) {
    try {
      await run("ROLLBACK");
    } catch (_rollbackErr) {
      // Ignore rollback errors so the original error surfaces.
    }
    throw err;
  }
}

function closeDb() {
  return closeCurrentDb();
}

module.exports = {
  all: queryAll,
  closeDb,
  get: queryGet,
  resolveDbPath,
  run: queryRun,
  withTransaction,
};
