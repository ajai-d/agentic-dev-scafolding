const express = require("express");
const path = require("path");
const { createDbConnection } = require("../data/db");
const { ensureSchema } = require("../data/schema");
const taskRepository = require("../data/task-repository");
const {
  validateId,
  validateListQuery,
  validateCreatePayload,
  validatePatchPayload,
} = require("./task-validation");

const app = express();
const port = process.env.PORT || 3000;

const schemaInitPromise = (async () => {
  const db = createDbConnection();
  try {
    await ensureSchema(db);
  } finally {
    await new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
})();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "web")));

function sendError(res, statusCode, payload) {
  res.status(statusCode).json(payload);
}

app.use(async (_req, _res, next) => {
  try {
    await schemaInitPromise;
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/health/db", (_req, res) => {
  const db = createDbConnection();

  db.get("SELECT 1 AS ok", (err) => {
    db.close();
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.status(200).json({ status: "ok" });
  });
});

app.post("/tasks", async (req, res, next) => {
  const validation = validateCreatePayload(req.body || {});
  if (!validation.ok) {
    return sendError(res, 400, validation.error);
  }

  try {
    const created = await taskRepository.createTask(validation.value);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
});

app.get("/tasks", async (req, res, next) => {
  const validation = validateListQuery(req.query || {});
  if (!validation.ok) {
    return sendError(res, 400, validation.error);
  }

  try {
    const tasks = await taskRepository.listTasks(validation.value);
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
});

app.patch("/tasks/:id", async (req, res, next) => {
  const idValidation = validateId(req.params.id);
  if (!idValidation.ok) {
    return sendError(res, 400, idValidation.error);
  }

  const payloadValidation = validatePatchPayload(req.body || {});
  if (!payloadValidation.ok) {
    return sendError(res, 400, payloadValidation.error);
  }

  try {
    const updated = await taskRepository.updateTask(idValidation.value, payloadValidation.value);
    if (!updated) {
      return sendError(res, 404, {
        error: "not_found",
        message: "Task not found",
      });
    }
    return res.status(200).json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/tasks/:id", async (req, res, next) => {
  const idValidation = validateId(req.params.id);
  if (!idValidation.ok) {
    return sendError(res, 400, idValidation.error);
  }

  try {
    const deleted = await taskRepository.deleteTask(idValidation.value);
    if (!deleted) {
      return sendError(res, 404, {
        error: "not_found",
        message: "Task not found",
      });
    }
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
});

app.use(["/tasks", "/api"], (_req, res) => {
  return sendError(res, 404, {
    error: "not_found",
    message: "Route not found",
  });
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "..", "web", "index.html"));
});

app.use((err, _req, res, ..._next) => {
  void _next;
  console.error(err);
  sendError(res, 500, {
    error: "internal_error",
    message: "An unexpected error occurred",
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Task Tracker Lite server running on http://localhost:${port}`);
  });
}

module.exports = app;
