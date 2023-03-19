export function getTasks() {
  const tasks = sessionStorage.getItem("tasks");
  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}

function setTasks(tasks) {
  sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

export function addNewTask(data) {
  const tasks = getTasks();
  setTasks([...tasks, data]);
}

export function updateTask(selectedTasks) {
  // Code to update task
}

export function deleteTasks(selectedTasks) {
  const tasks = getTasks();
  const newTasks = tasks.filter((task, i) => !selectedTasks.has(i));
  setTasks(newTasks);
}
