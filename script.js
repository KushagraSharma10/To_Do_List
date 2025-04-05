const addBtn = document.querySelector('#add-btn');
const tasksContainer = document.querySelector('.tasks');
const addInput = document.querySelector('#add');


let tasksAll = [];

// Create a new task
function createTaskElement() {
  const taskText = addInput.value.trim();
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const taskId = `task-${Date.now()}`;
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  taskDiv.innerHTML = `
    <div class="text-check">
      <input type="checkbox" id="${taskId}">
      <label for="${taskId}">${taskText}</label>
    </div>
    <i class="ri-close-line"></i>
  `;

  // Create a task object
  const task = {
    id: taskId,
    text: taskText,
    completed: false,
    removed: false,
    element: taskDiv,
  };

  // Add task to the all tasks array
  tasksAll.push(task);

  // Get checkbox and close icon elements
  const checkbox = taskDiv.querySelector('input[type="checkbox"]');
  const closeIcon = taskDiv.querySelector('.ri-close-line');

  // When checkbox changes, update its status and reorder tasks
  checkbox.addEventListener('change', function () {
    task.completed = checkbox.checked;
    reorderTasks();
  });

  // When close icon is clicked, mark as removed and then update view
  closeIcon.addEventListener('click', function () {
    task.removed = true;
    taskDiv.style.textDecoration = 'line-through';
    taskDiv.style.color = 'gray';
    closeIcon.style.opacity = '0';
    setTimeout(() => {
   
      if (tasksContainer.contains(taskDiv)) {
        tasksContainer.removeChild(taskDiv);
      }
      reorderTasks();
    }, 500);
  });

  // Add the new task element to the container
  tasksContainer.appendChild(taskDiv);
  addInput.value = '';

  // Reorder tasks so new tasks show up in the correct section
  reorderTasks();
}

// Reorder tasks based on their status using simple loops
function reorderTasks() {
  tasksContainer.innerHTML = '';

  // Temporary arrays to hold new and completed tasks
  let tasksNew = [];
  let tasksCompleted = [];

  // Loop through all tasks
  for (let i = 0; i < tasksAll.length; i++) {
    const t = tasksAll[i];
    if (t.removed) {
      // Skip removed tasks (they can be handled separately if needed)
      continue;
    }
    if (t.completed) {
      tasksCompleted.push(t);
      console.log("task completed", tasksCompleted)
    } else {
      tasksNew.push(t);
      console.log("taskNew: ", tasksNew)
    }
  }

  // Append new tasks first
  for (let i = 0; i < tasksNew.length; i++) {
    tasksContainer.appendChild(tasksNew[i].element);
  }
  // Then append completed tasks
  for (let i = 0; i < tasksCompleted.length; i++) {
    tasksContainer.appendChild(tasksCompleted[i].element);
  }
}

addBtn.addEventListener('click', createTaskElement);
