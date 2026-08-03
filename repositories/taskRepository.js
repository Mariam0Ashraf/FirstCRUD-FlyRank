const tasks = [
  { id: 1, title: "Learn Express", done: true },
  { id: 2, title: "Build a CRUD API", done: false },
  { id: 3, title: "Push the project to GitHub", done: false },
];

let nextId = 4;

function findAll() {
  return tasks;
}

function findById(id) {
  return tasks.find((task) => task.id === id);
}

function create(title) {
  const task = { id: nextId, title, done: false };

  tasks.push(task);
  nextId++;

  return task;
}

module.exports = {
  findAll,
  findById,
  create,
};
