const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(taskService.getAllTasks());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  res.json(task);
});

module.exports = router;
