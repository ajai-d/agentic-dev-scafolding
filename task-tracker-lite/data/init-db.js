const { createDbConnection, getDbFilePath } = require("./db");
const { ensureSchema } = require("./schema");

async function initDb() {
  const db = createDbConnection();

  try {
    await ensureSchema(db);
  } catch (err) {
    console.error("Failed to initialize database:", err.message);
    process.exitCode = 1;
  }

  db.close((err) => {
    if (err) {
      console.error("Failed to initialize database:", err.message);
      process.exitCode = 1;
      return;
    }
    console.log(`Database initialized at ${getDbFilePath()}`);
  });
}

initDb();
