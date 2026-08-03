const taskService = require("../services/taskService");

/**
 * Translates between HTTP and the service layer: reads what the middleware
 * already validated, calls one service function, picks the status code.
 */

function listTasks(req, res) {
  res.status(200).json(taskService.listTasks(req.taskFilters));
}

function getTask(req, res) {
  res.status(200).json(taskService.getTask(req.taskId));
}

function createTask(req, res) {
  res.status(201).json(taskService.createTask(req.validatedTask));
}

function updateTask(req, res) {
  res.status(200).json(taskService.updateTask(req.taskId, req.validatedTask));
}

function deleteTask(req, res) {
  taskService.deleteTask(req.taskId);

  res.status(204).end();
}

function getStats(req, res) {
  res.status(200).json(taskService.getStats());
}

function resetTasks(req, res) {
  res.status(200).json(taskService.resetTasks());
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  resetTasks,
};
