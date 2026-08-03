const taskRepository = require("../repositories/taskRepository");

function getAllTasks(filters) {
  let tasks = taskRepository.findAll();

  if (filters.done !== undefined) {
    tasks = tasks.filter((task) => task.done === filters.done);
  }

  if (filters.search !== undefined) {
    const search = filters.search.toLowerCase();
    tasks = tasks.filter((task) => task.title.toLowerCase().includes(search));
  }

  return tasks;
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

function getStats() {
  const tasks = taskRepository.findAll();
  const done = tasks.filter((task) => task.done).length;

  return {
    total: tasks.length,
    done: done,
    open: tasks.length - done,
  };
}

function resetTasks() {
  return taskRepository.reset();
}

module.exports = {
  getAllTasks,
  getTaskById,
  isValidTitle,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  resetTasks,
};
