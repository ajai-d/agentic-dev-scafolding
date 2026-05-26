/* @vitest-environment jsdom */

const fs = require("fs");
const path = require("path");
const request = require("supertest");

process.env.TASK_DB_FILE = path.join(__dirname, "task-tracker-ui-test.db");

const app = require("../../api/server");
const { createApp } = require("../../web/app");

function loadMarkup() {
  document.body.innerHTML = `
    <main class="container">
      <h1>Task Tracker Lite</h1>
      <p class="status" id="api-status">Checking API status...</p>
      <section class="panel">
        <h2>Create Task</h2>
        <form id="task-form" class="task-form">
          <label>Title<input id="title-input" name="title" type="text" maxlength="120" required /></label>
          <label>Description<textarea id="description-input" name="description" maxlength="500"></textarea></label>
          <label>Priority
            <select id="priority-input" name="priority" required>
              <option value="low">low</option>
              <option value="medium" selected>medium</option>
              <option value="high">high</option>
            </select>
          </label>
          <label>Due Date<input id="due-date-input" name="dueDate" type="date" /></label>
          <button id="create-task-btn" type="submit">Create Task</button>
        </form>
      </section>
      <section class="panel">
        <h2>Tasks</h2>
        <ul id="task-list" class="task-list"></ul>
      </section>
    </main>
  `;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(predicate, timeoutMs = 1500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (predicate()) {
      return;
    }
    await delay(25);
  }
  throw new Error("Timed out waiting for condition");
}

describe("UI smoke test", () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    const address = server.address();
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  beforeEach(() => {
    loadMarkup();
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }

    const testDb = process.env.TASK_DB_FILE;
    if (testDb && fs.existsSync(testDb)) {
      fs.unlinkSync(testDb);
    }
  });

  it("creates a task from the UI and shows it in the list", async () => {
    const appInstance = createApp({
      documentRef: document,
      fetchImpl: fetch,
      baseUrl,
    });

    await appInstance.initApp();

    document.getElementById("title-input").value = "UI smoke task";
    document.getElementById("description-input").value = "created by smoke test";
    document.getElementById("priority-input").value = "high";
    document.getElementById("task-form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    await waitFor(() => {
      const firstTaskItem = document.querySelector("#task-list .task-item");
      return firstTaskItem && firstTaskItem.textContent.includes("UI smoke task");
    });

    const taskItems = [...document.querySelectorAll("#task-list .task-item")];
    expect(taskItems.length).toBeGreaterThan(0);
    expect(taskItems[0].textContent).toContain("UI smoke task");

    const tasksResponse = await request(app).get("/tasks");
    expect(tasksResponse.status).toBe(200);
    expect(tasksResponse.body.some((task) => task.title === "UI smoke task")).toBe(true);
  });
});
