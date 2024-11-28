// Select DOM Elements
const input = document.getElementById("task-input");
const addButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

// Task Array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update Progress
function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // Update Progress Bar and Text
  progressBar.style.width = `${progressPercentage}%`;
  progressText.textContent = `${completedTasks} / ${totalTasks}`;

  // Change Progress Bar Color
  if (progressPercentage === 100) {
    progressBar.style.backgroundColor = "green";
  } else if (progressPercentage >= 50) {
    progressBar.style.backgroundColor = "orange";
  } else {
    progressBar.style.backgroundColor = "red";
  }
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear existing tasks
  tasks.forEach((task, index) => {
    // Create task item
    const listItem = document.createElement("li");
    listItem.className = `task-item ${task.completed ? "completed" : ""}`;

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      updateProgress();
    });

    // Task Text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = "task-text";

    // Edit Button
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.innerHTML = "✏️";
    editButton.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null) {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
        updateProgress();
      }
    });

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = "🗑️";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      updateProgress();
    });

    // Append elements
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// Add Task
addButton.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  updateProgress();
  input.value = ""; // Clear input
});

// Initial Render
renderTasks();
updateProgress();
