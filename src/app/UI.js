import escape from 'escape-html'
import 'remixicon/fonts/remixicon.css'
import { addNewTask, getTasks, updateTask, deleteTasks } from './Task'

function getInputValue(id) {
  return document.getElementById(id).value
}

function getAddTaskForm() {
  return document.getElementById('add-task-form')
}

function getUpdateTaskForm() {
  return document.getElementById('update-task-form')
}

let selectedTasks = new Set()

function onDeleteTasksClick() {
  if (selectedTasks.size === 0) return;
  deleteTasks(selectedTasks)
  updateTaskList();
}

function toggleSelectedTask(index, taskElement) {
  const icon = taskElement.querySelector('.task-mark > i')
  if (selectedTasks.has(index)) {
    selectedTasks.delete(index)
    icon.className = 'ri-checkbox-blank-circle-line'
  } else {
    selectedTasks.add(index)
    icon.className = 'ri-check-double-line'
  }

  document.getElementById("delete-tasks").disabled = (selectedTasks.size === 0)
  document.getElementById("update-tasks").disabled = (selectedTasks.size === 0)
}

function addtaskClickListeners() {
  selectedTasks.clear();
  document.getElementById("delete-tasks").disabled = true;
  document.getElementById("update-tasks").disabled = true;

  const tasks = document.querySelectorAll('#todayTasksContainer > .todayTask')
  for (let i = 0; i < tasks.length; i++) {
    const taskElement = tasks[i];
    taskElement.addEventListener('click', () => {
      toggleSelectedTask(i, taskElement);
    })
  }
}

function formatNumberOfTasks(numTasks) {
  if (numTasks > 15) {
    return '15+'
  } else {
    return numTasks.toString()
  }
}

function updateTaskList() {
  const tasks = getTasks()

  document.getElementById('number-of-tasks').innerText = formatNumberOfTasks(tasks.length)

  const container = document.getElementById('todayTasksContainer')
  container.innerHTML = 
    tasks.map(task => `
    <article class="todayTask">
      <div class="task-mark">
        <i class="ri-checkbox-blank-circle-line"></i>
      </div>
      <div class="task-title">
        <h3>${escape(task.title)}</h3>
        <p>
          <span>
            <i class="ri-calendar-2-line"></i>
          </span>
          ${escape(task.dueTime)}
        </p>
      </div>
      <div class="task-description">
        <p>${escape(task.description)}</p>
      </div>
      <div class="task-priority">
        <h5 class="priority-${escape(task.priority)}">#${escape(task.priority)}</h5>
      </div>
    </article>
    `)
    .join('\n')

  addtaskClickListeners();
}

function onAddTaskSubmit(event) {
  event.preventDefault();

  const title = getInputValue('title')
  const dueDate = getInputValue('dueDate')
  const dueTime = getInputValue('dueTime')
  const priority = getInputValue('priority')
  const description = getInputValue('description')

  addNewTask({ title, dueDate, dueTime, priority, description })
  getAddTaskForm().reset()
  updateTaskList()
  goToTodaysTasks();
}

function onUpdateTaskSubmit() {
  // Code to update task
}

function showElement(id) {
  const element = document.getElementById(id)
  element.classList.add('d-flex')
  element.classList.remove('d-none')
}

function hideElement(id) {
  const element = document.getElementById(id)
  element.classList.remove('d-flex')
  element.classList.add('d-none')
}

function goToAddTaskForm() {
  showElement('add-task');
  hideElement('daily-tasks');
  hideElement('update-task');
}

function goToUpdateTaskForm() {
  showElement('update-task');
  hideElement('daily-tasks');
}

function goToTodaysTasks() {
  hideElement('add-task');
  showElement('daily-tasks');
}

function addListeners() {
  getAddTaskForm().addEventListener('submit', onAddTaskSubmit);
  getUpdateTaskForm().addEventListener('submit', onUpdateTaskSubmit);
  document.getElementById("delete-tasks").addEventListener('click', onDeleteTasksClick);
  document.getElementById('new-task-btn').addEventListener('click', goToAddTaskForm);
  document.getElementById('update-tasks').addEventListener('click', goToUpdateTaskForm);
  document.getElementById('daily-tasks-btn').addEventListener('click', goToTodaysTasks);
  document.getElementById('hide-aside').addEventListener('click', toggleAside);
  document.getElementById('show-aside').addEventListener('click', toggleAside);
}

function toggleAside() {
  const aside = document.getElementById("aside");
  if (!aside.classList.contains('d-none')) {
    aside.classList.add("d-none");
    document.getElementById("show-aside").classList.remove("d-none");
    document.getElementById("show-aside").classList.add("d-flex");
    document.getElementById("main").classList.add("m-0");
  } else {
    aside.classList.remove("d-none");
    aside.classList.add("d-flex");
    document.getElementById("show-aside").classList.add("d-none");
    document.getElementById("main").classList.remove("m-0");
  }
}

export function initializeUI() {
  onUpdateTaskSubmit();
  updateTaskList();
  addListeners();
}