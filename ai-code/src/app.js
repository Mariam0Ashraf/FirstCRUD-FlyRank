const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./docs/openapi.json");
const routes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

/**
 * Builds the app without starting it, so the same app can be used by the
 * server and by tests. Order matters: routes, then the unknown-route catcher,
 * then the error handler last.
 */
function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
  app.use(routes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
