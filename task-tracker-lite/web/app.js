function createApp({ documentRef = document, fetchImpl = fetch, baseUrl = "" } = {}) {
  const statusEl = documentRef.getElementById("api-status");
  const formEl = documentRef.getElementById("task-form");
  const taskListEl = documentRef.getElementById("task-list");
  const titleInputEl = documentRef.getElementById("title-input");
  const descriptionInputEl = documentRef.getElementById("description-input");
  const priorityInputEl = documentRef.getElementById("priority-input");
  const dueDateInputEl = documentRef.getElementById("due-date-input");

  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.classList.remove("ok", "error");
    statusEl.classList.add(isError ? "error" : "ok");
  }

  function renderTasks(tasks) {
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

      const title = documentRef.createElement("strong");
      title.textContent = task.title;

      const meta = documentRef.createElement("span");
      meta.className = "task-meta";
      meta.textContent = `${task.priority} | ${task.status}`;

      item.appendChild(title);
      item.appendChild(meta);
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
        const errPayload = await response.json();
        throw new Error(errPayload.message || `Create failed (${response.status})`);
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
