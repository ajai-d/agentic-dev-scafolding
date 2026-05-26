const path = require("path");
const request = require("supertest");

process.env.TASK_DB_FILE = path.join(__dirname, "task-tracker-test.db");

const app = require("../../api/server");

describe("health endpoints", () => {
  it("returns ok for service health", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
