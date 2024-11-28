// Select elements from the DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from local storage or initialize as an empty array

// Function to render tasks on the screen
function renderTasks() {
  taskList.innerHTML = ""; // Clear the current list to avoid duplicates

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    // Checkbox to mark the task as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index)); // Toggle completion on change

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.style.textDecoration = "line-through"; // Strike-through text for completed tasks
    }

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = "✏️";
    editButton.className = "edit-button";
    editButton.addEventListener("click", () => editTask(index)); // Edit task on click

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => deleteTask(index)); // Delete task on click

    // Append elements to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);
  });

  updateProgress(); // Update progress whenever tasks are rendered
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim(); // Get the input value and trim whitespace
  if (taskText === "") return; // Do nothing if the input is empty

  tasks.push({ text: taskText, completed: false }); // Add the new task to the array
  saveTasks(); // Save the updated tasks to local storage
  renderTasks(); // Re-render the tasks
  taskInput.value = ""; // Clear the input field
}

// Function to toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed; // Toggle the "completed" property
  saveTasks(); // Save the updated tasks to local storage
  renderTasks(); // Re-render the tasks
}

// Function to edit a task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text); // Prompt the user for the new text
  if (newText === null || newText.trim() === "") return; // Do nothing if input is empty or canceled

  tasks[index].text = newText.trim(); // Update the task text
  saveTasks(); // Save the updated tasks to local storage
  renderTasks(); // Re-render the tasks
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task from the array
  saveTasks(); // Save the updated tasks to local storage
  renderTasks(); // Re-render the tasks
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert tasks array to a JSON string and store it
}

// Function to update the progress bar and progress text
function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length; // Count completed tasks
  const totalTasks = tasks.length; // Total number of tasks

  // Update progress text
  progressText.textContent = `${completedTasks} / ${totalTasks}`;

  // Update progress bar width
  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progressBar.style.width = `${progressPercentage}%`;
   // Dynamically change progress bar color based on percentage
   if (progressPercentage === 100) {
    progressBar.style.backgroundColor = "green"; // Fully completed (100%) = Green
  } else if (progressPercentage >= 50) {
    progressBar.style.backgroundColor = "orange"; // Partially completed (>50%) = Orange
  } else {
    progressBar.style.backgroundColor = "red"; // Low progress (<50%) = Red
  }
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener("click", addTask);

// Render tasks on page load
renderTasks();
