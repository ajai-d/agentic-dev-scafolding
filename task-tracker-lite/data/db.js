const path = require("path");
const sqlite3 = require("sqlite3").verbose();

function getDbFilePath() {
  return process.env.TASK_DB_FILE || path.join(__dirname, "tasks.db");
}

function createDbConnection() {
  return new sqlite3.Database(getDbFilePath());
}

module.exports = {
  createDbConnection,
  getDbFilePath,
};
