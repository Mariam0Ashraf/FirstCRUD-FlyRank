const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(taskService.getStats());
});

module.exports = router;
