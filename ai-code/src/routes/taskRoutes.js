const express = require("express");
const taskController = require("../controllers/taskController");
const {
  validateTaskId,
  validateCreateTask,
  validateUpdateTask,
  validateTaskFilters,
} = require("../middleware/taskValidation");

const router = express.Router();

router.get("/", validateTaskFilters, taskController.listTasks);
router.post("/", validateCreateTask, taskController.createTask);
router.get("/:id", validateTaskId, taskController.getTask);
router.put("/:id", validateTaskId, validateUpdateTask, taskController.updateTask);
router.delete("/:id", validateTaskId, taskController.deleteTask);

module.exports = router;
