const createApp = require("./app");
const config = require("./config");

const app = createApp();

app.listen(config.port, () => {
  console.log(`Task API listening on http://localhost:${config.port}`);
  console.log(`Swagger UI on http://localhost:${config.port}/docs`);
});
