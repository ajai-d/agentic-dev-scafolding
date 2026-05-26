const allowedPriorities = new Set(["low", "medium", "high"]);
const allowedStatuses = new Set(["open", "done"]);
const createAllowedFields = new Set(["title", "description", "priority", "dueDate"]);
const patchAllowedFields = new Set(["title", "description", "priority", "status", "dueDate"]);

function isIsoDate(value) {
  if (typeof value !== "string") {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map((part) => Number.parseInt(part, 10));
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function rejectUnknownFields(payload, allowedFields, details) {
  Object.keys(payload).forEach((key) => {
    if (!allowedFields.has(key)) {
      details.push({ field: key, message: "Unknown field is not allowed" });
    }
  });
}

function validateId(rawId) {
  const id = Number.parseInt(rawId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return {
      ok: false,
      error: {
        error: "validation_error",
        message: "Invalid task id",
        details: [{ field: "id", message: "Task id must be a positive integer" }],
      },
    };
  }

  return { ok: true, value: id };
}

function validateListQuery(query) {
  const details = [];

  if (query.status !== undefined && !allowedStatuses.has(query.status)) {
    details.push({ field: "status", message: "Must be one of: open, done" });
  }

  if (query.priority !== undefined && !allowedPriorities.has(query.priority)) {
    details.push({ field: "priority", message: "Must be one of: low, medium, high" });
  }

  if (details.length > 0) {
    return {
      ok: false,
      error: {
        error: "validation_error",
        message: "Invalid query parameters",
        details,
      },
    };
  }

  return {
    ok: true,
    value: {
      status: query.status,
      priority: query.priority,
    },
  };
}

function normalizeTitle(value, details, required) {
  if (value === undefined) {
    if (required) {
      details.push({ field: "title", message: "Title is required" });
    }
    return undefined;
  }

  if (typeof value !== "string") {
    details.push({ field: "title", message: "Title must be a string" });
    return undefined;
  }

  const trimmed = value.trim();
  if (trimmed.length < 1 || trimmed.length > 120) {
    details.push({ field: "title", message: "Title must be 1 to 120 characters" });
    return undefined;
  }

  return trimmed;
}

function validateDescription(value, details) {
  if (value === undefined) {
    return undefined;
  }

  if (value !== null && typeof value !== "string") {
    details.push({ field: "description", message: "Description must be a string" });
    return undefined;
  }

  if (typeof value === "string" && value.length > 500) {
    details.push({ field: "description", message: "Description must be at most 500 characters" });
  }

  return value;
}

function validatePriority(value, details, required) {
  if (value === undefined) {
    if (required) {
      details.push({ field: "priority", message: "Priority is required" });
    }
    return undefined;
  }

  if (!allowedPriorities.has(value)) {
    details.push({ field: "priority", message: "Priority must be one of: low, medium, high" });
    return undefined;
  }

  return value;
}

function validateStatus(value, details) {
  if (value === undefined) {
    return undefined;
  }

  if (!allowedStatuses.has(value)) {
    details.push({ field: "status", message: "Status must be one of: open, done" });
    return undefined;
  }

  return value;
}

function validateDueDate(value, details) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (!isIsoDate(value)) {
    details.push({ field: "dueDate", message: "dueDate must be a valid ISO date (YYYY-MM-DD)" });
    return undefined;
  }

  return value;
}

function validateCreatePayload(payload) {
  const details = [];
  rejectUnknownFields(payload, createAllowedFields, details);

  const normalized = {
    title: normalizeTitle(payload.title, details, true),
    description: validateDescription(payload.description, details),
    priority: validatePriority(payload.priority, details, true),
    dueDate: validateDueDate(payload.dueDate, details),
  };

  if (details.length > 0) {
    return {
      ok: false,
      error: {
        error: "validation_error",
        message: "Invalid request payload",
        details,
      },
    };
  }

  return { ok: true, value: normalized };
}

function validatePatchPayload(payload) {
  const details = [];
  rejectUnknownFields(payload, patchAllowedFields, details);

  if (Object.keys(payload).length === 0) {
    details.push({ field: "body", message: "At least one allowed field must be provided" });
  }

  const normalized = {
    title: normalizeTitle(payload.title, details, false),
    description: validateDescription(payload.description, details),
    priority: validatePriority(payload.priority, details, false),
    status: validateStatus(payload.status, details),
    dueDate: validateDueDate(payload.dueDate, details),
  };

  if (details.length > 0) {
    return {
      ok: false,
      error: {
        error: "validation_error",
        message: "Invalid request payload",
        details,
      },
    };
  }

  const patch = {};
  Object.keys(normalized).forEach((key) => {
    if (payload[key] !== undefined) {
      patch[key] = normalized[key];
    }
  });

  return { ok: true, value: patch };
}

module.exports = {
  validateId,
  validateListQuery,
  validateCreatePayload,
  validatePatchPayload,
};
