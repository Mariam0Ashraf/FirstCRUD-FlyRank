const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

router.get("/", (req, res) => {
  const filters = {};

  if (req.query.done !== undefined) {
    filters.done = req.query.done === "true";
  }

  if (req.query.search !== undefined) {
    filters.search = req.query.search;
  }

  res.json(taskService.getAllTasks(filters));
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  res.json(task);
});

router.post("/", (req, res) => {
  const { title } = req.body || {};

  if (!taskService.isValidTitle(title)) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = taskService.createTask(title);

  res.status(201).json(task);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body || {};

  if (title === undefined && done === undefined) {
    return res.status(400).json({ error: "Title or done is required" });
  }

  if (title !== undefined && !taskService.isValidTitle(title)) {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "Done must be true or false" });
  }

  const changes = {};

  if (title !== undefined) {
    changes.title = title.trim();
  }

  if (done !== undefined) {
    changes.done = done;
  }

  const task = taskService.updateTask(id, changes);

  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleted = taskService.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  res.status(204).send();
});

module.exports = router;
