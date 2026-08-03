/**
 * In-memory store. Everything lives in this module's variables, so the data is
 * gone the moment the process stops. Callers only ever receive copies, so the
 * stored tasks cannot be changed from the outside by accident.
 */

const SEED_TASKS = [
  { id: 1, title: "Learn Express", done: true },
  { id: 2, title: "Build a CRUD API", done: false },
  { id: 3, title: "Push the project to GitHub", done: false },
];

let tasks = [];
let nextId = 1;

function copy(task) {
  return { ...task };
}

function seed() {
  tasks = SEED_TASKS.map(copy);
  nextId = tasks.length + 1;

  return tasks.map(copy);
}

function findAll() {
  return tasks.map(copy);
}

function findById(id) {
  const task = tasks.find((item) => item.id === id);

  return task ? copy(task) : null;
}

function create({ title }) {
  const task = { id: nextId, title, done: false };

  tasks.push(task);
  nextId += 1;

  return copy(task);
}

function update(id, changes) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return null;
  }

  Object.assign(task, changes);

  return copy(task);
}

function remove(id) {
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
}

function count() {
  return {
    total: tasks.length,
    done: tasks.filter((task) => task.done).length,
  };
}

seed();

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  count,
  seed,
};
