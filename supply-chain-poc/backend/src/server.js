const app = require("./app");

const port = process.env.PORT || 3002;

app.listen(port, () => {
  // Keep startup output concise for local development.
  console.log(`Supply Chain POC backend running on http://localhost:${port}`);
});
