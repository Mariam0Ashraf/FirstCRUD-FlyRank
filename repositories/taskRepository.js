function exampleTasks() {
  return [
    
    { id: 1, title: "Build a CRUD API", done: false },
    { id: 2, title: "Push the project to GitHub", done: false },
    { id: 3, title: "Fly to SARAJEVO with Mom", done: false },

  ];
}

let tasks = exampleTasks();
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

function update(id, changes) {
  const task = findById(id);

  if (!task) {
    return undefined;
  }

  if (changes.title !== undefined) {
    task.title = changes.title;
  }

  if (changes.done !== undefined) {
    task.done = changes.done;
  }

  return task;
}

function remove(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
}

function reset() {
  tasks = exampleTasks();
  nextId = 4;

  return tasks;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  reset,
};
