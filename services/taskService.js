const taskRepository = require("../repositories/taskRepository");

function getAllTasks() {
  return taskRepository.findAll();
}

function getTaskById(id) {
  return taskRepository.findById(id);
}

function isValidTitle(title) {
  return typeof title === "string" && title.trim() !== "";
}

function createTask(title) {
  return taskRepository.create(title.trim());
}

function updateTask(id, changes) {
  return taskRepository.update(id, changes);
}

function deleteTask(id) {
  return taskRepository.remove(id);
}

module.exports = {
  getAllTasks,
  getTaskById,
  isValidTitle,
  createTask,
  updateTask,
  deleteTask,
};
