const express = require("express");
const systemController = require("../controllers/systemController");
const taskController = require("../controllers/taskController");
const taskRoutes = require("./taskRoutes");

const router = express.Router();

router.get("/", systemController.getApiInfo);
router.get("/health", systemController.getHealth);
router.get("/stats", taskController.getStats);
router.post("/reset", taskController.resetTasks);
router.use("/tasks", taskRoutes);

module.exports = router;
