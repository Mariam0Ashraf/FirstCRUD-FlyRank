const taskRepository = require("../repositories/taskRepository");
const ApiError = require("../errors/ApiError");

/**
 * Holds the rules of the application. It knows nothing about HTTP: when a task
 * is missing it throws an ApiError and lets the error handler pick the status.
 */

function listTasks(filters = {}) {
  let tasks = taskRepository.findAll();

  if (filters.done !== undefined) {
    tasks = tasks.filter((task) => task.done === filters.done);
  }

  if (filters.search !== undefined) {
    const term = filters.search.toLowerCase();
    tasks = tasks.filter((task) => task.title.toLowerCase().includes(term));
  }

  return tasks;
}

function getTask(id) {
  const task = taskRepository.findById(id);

  if (!task) {
    throw ApiError.notFound(`Task ${id} not found`);
  }

  return task;
}

function createTask(input) {
  return taskRepository.create(input);
}

function updateTask(id, changes) {
  const task = taskRepository.update(id, changes);

  if (!task) {
    throw ApiError.notFound(`Task ${id} not found`);
  }

  return task;
}

function deleteTask(id) {
  const removed = taskRepository.remove(id);

  if (!removed) {
    throw ApiError.notFound(`Task ${id} not found`);
  }
}

function getStats() {
  const { total, done } = taskRepository.count();

  return { total, done, open: total - done };
}

function resetTasks() {
  return taskRepository.seed();
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
