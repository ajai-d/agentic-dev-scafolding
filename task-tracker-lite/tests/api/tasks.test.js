const fs = require("fs");
const path = require("path");
const request = require("supertest");
const { createDbConnection } = require("../../data/db");

process.env.TASK_DB_FILE = path.join(__dirname, "task-tracker-test.db");

const app = require("../../api/server");

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

async function resetTasks() {
  const db = createDbConnection();
  try {
    await run(db, "DELETE FROM tasks");
    await run(db, "DELETE FROM sqlite_sequence WHERE name = 'tasks'");
  } finally {
    await close(db);
  }
}

describe("task endpoints", () => {
  beforeAll(async () => {
    await request(app).get("/health");
  });

  beforeEach(async () => {
    await resetTasks();
  });

  afterAll(() => {
    const testDb = process.env.TASK_DB_FILE;
    if (testDb && fs.existsSync(testDb)) {
      fs.unlinkSync(testDb);
    }
  });

  it("creates a task with valid payload", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Buy groceries",
      description: "Milk and eggs",
      priority: "medium",
      dueDate: "2026-06-01",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: "Buy groceries",
      description: "Milk and eggs",
      priority: "medium",
      status: "open",
      dueDate: "2026-06-01",
    });
    expect(typeof response.body.id).toBe("number");
  });

  it("rejects unknown fields in create payload", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Buy groceries",
      priority: "low",
      unexpected: true,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("validation_error");
  });

  it("rejects impossible calendar dates for dueDate", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Bad date",
      priority: "low",
      dueDate: "2026-02-31",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("validation_error");
  });

  it("lists tasks newest first and supports filters", async () => {
    const first = await request(app).post("/tasks").send({
      title: "First",
      priority: "low",
    });

    const second = await request(app).post("/tasks").send({
      title: "Second",
      priority: "high",
    });

    await request(app).patch(`/tasks/${first.body.id}`).send({ status: "done" });

    const allTasks = await request(app).get("/tasks");
    expect(allTasks.status).toBe(200);
    expect(allTasks.body.length).toBe(2);
    expect(allTasks.body[0].id).toBe(second.body.id);
    expect(allTasks.body[1].id).toBe(first.body.id);

    const filtered = await request(app).get("/tasks").query({ status: "done", priority: "low" });
    expect(filtered.status).toBe(200);
    expect(filtered.body.length).toBe(1);
    expect(filtered.body[0].id).toBe(first.body.id);
  });

  it("updates an existing task", async () => {
    const created = await request(app).post("/tasks").send({
      title: "Task A",
      priority: "low",
    });

    const response = await request(app).patch(`/tasks/${created.body.id}`).send({
      status: "done",
      title: "Task A updated",
      dueDate: "2026-07-10",
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: created.body.id,
      status: "done",
      title: "Task A updated",
      dueDate: "2026-07-10",
    });
  });

  it("returns 404 when updating missing task", async () => {
    const response = await request(app).patch("/tasks/9999").send({ status: "done" });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("not_found");
  });

  it("deletes existing task and returns 404 for missing task", async () => {
    const created = await request(app).post("/tasks").send({
      title: "To remove",
      priority: "medium",
    });

    const deleted = await request(app).delete(`/tasks/${created.body.id}`);
    expect(deleted.status).toBe(204);

    const missing = await request(app).delete(`/tasks/${created.body.id}`);
    expect(missing.status).toBe(404);
  });

  it("rejects invalid query filters", async () => {
    const response = await request(app).get("/tasks").query({ status: "bad" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("validation_error");
  });

  it("returns JSON 404 for unmatched API routes", async () => {
    const response = await request(app).get("/tasks/does-not-exist");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("not_found");
  });
});
