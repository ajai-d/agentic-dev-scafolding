const { createDbConnection } = require("./db");

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function get(db, sql, params = []) {
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

function all(db, sql, params = []) {
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

function close(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function mapRowToTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    status: row.status,
    dueDate: row.due_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function createTask(input) {
  const db = createDbConnection();
  const now = new Date().toISOString();

  try {
    const result = await run(
      db,
      `
      INSERT INTO tasks (title, description, priority, status, due_date, created_at, updated_at)
      VALUES (?, ?, ?, 'open', ?, ?, ?)
      `,
      [input.title, input.description ?? null, input.priority, input.dueDate ?? null, now, now]
    );

    const row = await get(db, "SELECT * FROM tasks WHERE id = ?", [result.lastID]);
    return mapRowToTask(row);
  } finally {
    await close(db);
  }
}

async function listTasks(filters) {
  const db = createDbConnection();
  const where = [];
  const params = [];

  if (filters.status) {
    where.push("status = ?");
    params.push(filters.status);
  }

  if (filters.priority) {
    where.push("priority = ?");
    params.push(filters.priority);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const sql = `SELECT * FROM tasks ${whereClause} ORDER BY created_at DESC, id DESC`;

  try {
    const rows = await all(db, sql, params);
    return rows.map(mapRowToTask);
  } finally {
    await close(db);
  }
}

async function getTaskById(id) {
  const db = createDbConnection();

  try {
    const row = await get(db, "SELECT * FROM tasks WHERE id = ?", [id]);
    return row ? mapRowToTask(row) : null;
  } finally {
    await close(db);
  }
}

async function updateTask(id, patch) {
  const db = createDbConnection();

  try {
    const existing = await get(db, "SELECT * FROM tasks WHERE id = ?", [id]);
    if (!existing) {
      return null;
    }

    const merged = {
      title: patch.title ?? existing.title,
      description: patch.description !== undefined ? patch.description : existing.description,
      priority: patch.priority ?? existing.priority,
      status: patch.status ?? existing.status,
      due_date: patch.dueDate !== undefined ? patch.dueDate : existing.due_date,
      updated_at: new Date().toISOString(),
    };

    await run(
      db,
      `
      UPDATE tasks
      SET title = ?, description = ?, priority = ?, status = ?, due_date = ?, updated_at = ?
      WHERE id = ?
      `,
      [
        merged.title,
        merged.description,
        merged.priority,
        merged.status,
        merged.due_date,
        merged.updated_at,
        id,
      ]
    );

    const row = await get(db, "SELECT * FROM tasks WHERE id = ?", [id]);
    return mapRowToTask(row);
  } finally {
    await close(db);
  }
}

async function deleteTask(id) {
  const db = createDbConnection();

  try {
    const result = await run(db, "DELETE FROM tasks WHERE id = ?", [id]);
    return result.changes > 0;
  } finally {
    await close(db);
  }
}

module.exports = {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
