const addBtn = document.querySelector("#add-btn");
const tasksContainer = document.querySelector(".tasks");
const addInput = document.querySelector("#add");
const dynamicDate = document.querySelector(".heading p")


function DynamicDate(){
  const date = new Date();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = days[date.getDay()];

const day = date.getDate();



const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = months[date.getMonth()];

dynamicDate.innerHTML = `${dayName}, ${day} ${monthName}`;
}

DynamicDate()

let tasksAll = [];

function createTaskObject(taskText) {
  return {
    id: `task-${Date.now()}`,
    text: taskText,
    completed: false,
    removed: false,
    element: null,
  };
}

// 2. Create the DOM element for the task
function createTaskElementDOM(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.innerHTML = `
    <div class="text-check">
      <input type="checkbox" id="${task.id}">
      <label for="${task.id}">${task.text}</label>
    </div>
    <i class="ri-close-line"></i>
  `;
  task.element = taskDiv;

  addTaskEventListeners(task);

  return taskDiv;
}

function addTaskEventListeners(task) {
  const checkbox = task.element.querySelector('input[type="checkbox"]');
  const closeIcon = task.element.querySelector(".ri-close-line");

  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    reorderTasks();
  });

  closeIcon.addEventListener("click", function () {
    if (task.completed) {
      task.completed = false;
      const checkbox = task.element.querySelector('input[type="checkbox"]');
      checkbox.checked = false;
    }

    task.removed = true;
    const label = task.element.querySelector("label");
    label.style.textDecoration = "line-through";
    label.style.color = "gray";
    task.element.style.color = "gray";
    closeIcon.style.display = "none";

    // Add undo button
    const undoBtn = document.createElement("button");
    undoBtn.textContent = "Undo";
    undoBtn.classList.add("undo-btn");
    closeIcon.parentNode.appendChild(undoBtn);

    undoBtn.addEventListener("click", () => {
      task.removed = false;
      label.style.textDecoration = "none";
      label.style.color = "#fefefe";
      closeIcon.style.display = "inline";
      undoBtn.remove();
      reorderTasks();
    });

    reorderTasks();
  });
}

// 4. Main function to handle new task creation
function createTaskElement() {
  const taskText = addInput.value.trim();
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const task = createTaskObject(taskText);
  const taskDiv = createTaskElementDOM(task);

  tasksAll.push(task);
  tasksContainer.appendChild(taskDiv);
  addInput.value = "";
  reorderTasks();
}

function reorderTasks() {
  tasksContainer.innerHTML = "";

  const tasksNew = [];
  const tasksCompleted = [];
  const removedTasks = [];

  // Categorize tasks
  for (let i = 0; i < tasksAll.length; i++) {
    const t = tasksAll[i];
    if (t.removed) {
      removedTasks.push(t);
    } else if (t.completed) {
      tasksCompleted.push(t);
    } else {
      tasksNew.push(t);
    }
  }

  tasksContainer.style.transition = "all 0.3s ease";
  setTimeout(() => {
    tasksContainer.style.transition = "none";
  }, 300);

  // Append unchecked tasks first
  tasksNew.forEach((t) => {
    tasksContainer.appendChild(t.element);
  });

  // Insert checked tasks right after last unchecked
  tasksCompleted.forEach((t) => {
    tasksContainer.appendChild(t.element);
  });

  // Insert removed tasks after checked ones
  removedTasks.forEach((t) => {
    tasksContainer.appendChild(t.element);
  });


}

function showFilteredTasks(type) {
  tasksContainer.innerHTML = "";

  let filteredTasks = [];

  if (type === "completed") {
    filteredTasks = tasksAll.filter(task => task.completed && !task.removed);
  } else if (type === "new") {
    filteredTasks = tasksAll.filter(task => !task.completed && !task.removed);
  } else if (type === "removed") {
    filteredTasks = tasksAll.filter(task => task.removed);
  } else {
    // "all" or "my day"
    filteredTasks = tasksAll;
    reorderTasks();
  }

  filteredTasks.forEach(task => {
    tasksContainer.appendChild(task.element);
  });
}

addBtn.addEventListener("click", createTaskElement);

addInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createTaskElement();
  }
})

const navLinks = document.querySelectorAll(".link");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const type = link.getAttribute("data-type");
    showFilteredTasks(type);

    if (type === "all") {
      reorderTasks(); // ✅ Ye sirf "My Tasks" me chalega
    }
  });
});