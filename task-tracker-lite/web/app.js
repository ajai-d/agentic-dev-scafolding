function createApp({ documentRef = document, fetchImpl = fetch, baseUrl = "" } = {}) {
  const statusEl = documentRef.getElementById("api-status");
  const formEl = documentRef.getElementById("task-form");
  const taskListEl = documentRef.getElementById("task-list");
  const titleInputEl = documentRef.getElementById("title-input");
  const descriptionInputEl = documentRef.getElementById("description-input");
  const priorityInputEl = documentRef.getElementById("priority-input");
  const dueDateInputEl = documentRef.getElementById("due-date-input");
  let expandedTaskId = null;
  let lastTasks = [];

  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.classList.remove("ok", "error");
    statusEl.classList.add(isError ? "error" : "ok");
  }

  function toDisplayValue(value) {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    return String(value);
  }

  async function parseErrorMessage(response, fallbackMessage) {
    try {
      const payload = await response.json();
      if (payload && payload.message) {
        return payload.message;
      }
    } catch {
      // Ignore parsing errors and return fallback.
    }
    return fallbackMessage;
  }

  function renderTaskDetails(task) {
    const detail = documentRef.createElement("div");
    detail.className = "task-detail";

    const fields = [
      ["Title", task.title],
      ["Description", task.description],
      ["Priority", task.priority],
      ["Status", task.status],
      ["Due Date", task.dueDate],
      ["Created At", task.createdAt],
      ["Updated At", task.updatedAt],
    ];

    fields.forEach(([label, value]) => {
      const row = documentRef.createElement("p");
      row.className = "task-detail-row";

      const labelEl = documentRef.createElement("strong");
      labelEl.textContent = `${label}: `;

      const valueEl = documentRef.createElement("span");
      valueEl.textContent = toDisplayValue(value);

      row.appendChild(labelEl);
      row.appendChild(valueEl);
      detail.appendChild(row);
    });

    const actions = documentRef.createElement("div");
    actions.className = "task-detail-actions";

    if (task.status !== "done") {
      const markDoneBtn = documentRef.createElement("button");
      markDoneBtn.type = "button";
      markDoneBtn.className = "task-action-btn";
      markDoneBtn.setAttribute("data-action", "mark-done");
      markDoneBtn.setAttribute("data-task-id", String(task.id));
      markDoneBtn.textContent = "Mark Done";
      actions.appendChild(markDoneBtn);
    }

    const deleteBtn = documentRef.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "task-action-btn danger";
    deleteBtn.setAttribute("data-action", "delete");
    deleteBtn.setAttribute("data-task-id", String(task.id));
    deleteBtn.textContent = "Delete";
    actions.appendChild(deleteBtn);

    detail.appendChild(actions);

    return detail;
  }

  function renderTasks(tasks) {
    lastTasks = tasks;

    if (expandedTaskId !== null && !tasks.some((task) => task.id === expandedTaskId)) {
      expandedTaskId = null;
    }

    taskListEl.innerHTML = "";

    if (!tasks.length) {
      const emptyItem = documentRef.createElement("li");
      emptyItem.className = "task-item empty";
      emptyItem.textContent = "No tasks yet.";
      taskListEl.appendChild(emptyItem);
      return;
    }

    tasks.forEach((task) => {
      const item = documentRef.createElement("li");
      item.className = "task-item";
      item.setAttribute("data-task-id", String(task.id));

      const row = documentRef.createElement("div");
      row.className = "task-row";

      const summary = documentRef.createElement("div");
      summary.className = "task-summary";

      const title = documentRef.createElement("strong");
      title.textContent = task.title;

      const meta = documentRef.createElement("span");
      meta.className = "task-meta";
      meta.textContent = `${task.priority} | ${task.status}`;

      summary.appendChild(title);
      summary.appendChild(meta);

      const controls = documentRef.createElement("div");
      controls.className = "task-controls";

      const openButton = documentRef.createElement("button");
      openButton.type = "button";
      openButton.className = "task-open-btn";
      openButton.setAttribute("data-action", "toggle-open");
      openButton.setAttribute("data-task-id", String(task.id));
      openButton.textContent = expandedTaskId === task.id ? "Close" : "Open";
      controls.appendChild(openButton);

      row.appendChild(summary);
      row.appendChild(controls);

      item.appendChild(row);

      if (expandedTaskId === task.id) {
        item.appendChild(renderTaskDetails(task));
      }

      taskListEl.appendChild(item);
    });
  }

  async function checkApi() {
    try {
      const response = await fetchImpl(`${baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`Unexpected status ${response.status}`);
      }
      setStatus("API is reachable.");
    } catch (error) {
      setStatus(`API check failed: ${error.message}`, true);
    }
  }

  async function loadTasks() {
    try {
      const response = await fetchImpl(`${baseUrl}/tasks`);
      if (!response.ok) {
        throw new Error(`Failed to load tasks (${response.status})`);
      }
      const tasks = await response.json();
      renderTasks(tasks);
    } catch (error) {
      setStatus(`Failed to load tasks: ${error.message}`, true);
    }
  }

  async function markTaskDone(taskId) {
    const response = await fetchImpl(`${baseUrl}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "done" }),
    });

    if (!response.ok) {
      const message = await parseErrorMessage(response, `Mark done failed (${response.status})`);
      throw new Error(message);
    }

    setStatus("Task marked done.");
    await loadTasks();
  }

  async function deleteTask(taskId) {
    const response = await fetchImpl(`${baseUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const message = await parseErrorMessage(response, `Delete failed (${response.status})`);
      throw new Error(message);
    }

    if (expandedTaskId === taskId) {
      expandedTaskId = null;
    }

    setStatus("Task deleted.");
    await loadTasks();
  }

  async function onTaskListClick(event) {
    const targetButton = event.target.closest("button[data-action][data-task-id]");
    if (!targetButton || !taskListEl.contains(targetButton)) {
      return;
    }

    const taskId = Number(targetButton.getAttribute("data-task-id"));
    const action = targetButton.getAttribute("data-action");

    if (!Number.isInteger(taskId)) {
      return;
    }

    try {
      if (action === "toggle-open") {
        expandedTaskId = expandedTaskId === taskId ? null : taskId;
        renderTasks(lastTasks);
        return;
      }

      if (action === "mark-done") {
        await markTaskDone(taskId);
        return;
      }

      if (action === "delete") {
        await deleteTask(taskId);
      }
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  async function createTask(event) {
    event.preventDefault();

    const payload = {
      title: titleInputEl.value,
      description: descriptionInputEl.value || undefined,
      priority: priorityInputEl.value,
      dueDate: dueDateInputEl.value || undefined,
    };

    try {
      const response = await fetchImpl(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await parseErrorMessage(response, `Create failed (${response.status})`);
        throw new Error(message);
      }

      formEl.reset();
      priorityInputEl.value = "medium";
      setStatus("Task created successfully.");
      await loadTasks();
    } catch (error) {
      setStatus(`Create failed: ${error.message}`, true);
    }
  }

  function wireEvents() {
    formEl.addEventListener("submit", createTask);
    taskListEl.addEventListener("click", onTaskListClick);
  }

  async function initApp() {
    wireEvents();
    await checkApi();
    await loadTasks();
  }

  return {
    initApp,
    loadTasks,
    checkApi,
  };
}

if (
  typeof window !== "undefined" &&
  document.getElementById("task-form") &&
  document.getElementById("task-list")
) {
  const app = createApp();
  app.initApp();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createApp,
  };
}
