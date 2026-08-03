const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");
const infoRoutes = require("./routes/infoRoutes");
const taskRoutes = require("./routes/taskRoutes");
const statsRoutes = require("./routes/statsRoutes");
const resetRoutes = require("./routes/resetRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.use("/", infoRoutes);
app.use("/tasks", taskRoutes);
app.use("/stats", statsRoutes);
app.use("/reset", resetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
