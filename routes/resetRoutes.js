const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

router.post("/", (req, res) => {
  res.json(taskService.resetTasks());
});

module.exports = router;
