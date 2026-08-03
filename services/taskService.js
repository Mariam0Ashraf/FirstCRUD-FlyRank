const taskRepository = require("../repositories/taskRepository");

function getAllTasks() {
  return taskRepository.findAll();
}

function getTaskById(id) {
  return taskRepository.findById(id);
}

module.exports = {
  getAllTasks,
  getTaskById,
};
