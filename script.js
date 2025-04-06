const addBtn = document.querySelector("#add-btn");
const tasksContainer = document.querySelector(".tasks");
const addInput = document.querySelector("#add");
const dynamicDate = document.querySelector(".heading p");
const navLinks = document.querySelectorAll(".link");
const notifiCount = document.querySelectorAll(".link span");

function showDate() {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getMonth()];
  dynamicDate.innerHTML = `${dayName}, ${day} ${monthName}`;
}
showDate();

addBtn.addEventListener("click", addTask);

let tasksAll = [];

function makeTask(taskText) {
  return {
    id: `task-${Date.now()}`,
    text: taskText,
    completed: false,
    removed: false,
    element: null,
  };
}

function makeTaskElement(task) {
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

  setTaskListeners(task);

  gsap.from(taskDiv, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power2.out",
  });

  return taskDiv;
}

function setTaskListeners(task) {
  const checkbox = task.element.querySelector('input[type="checkbox"]');
  const closeIcon = task.element.querySelector(".ri-close-line");

  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;

    const label = task.element.querySelector("label");
    const tl = gsap.timeline();

    if (task.completed) {
      tl.to(task.element, {
        scale: 1.02,
        duration: 0.3,
        ease: "power1.out",
      }).to(task.element, {
        scale: 1,
        duration: 0.2,
      });
    } else {
      tl.to(task.element, {
        duration: 0.3,
      });
    }

    sortTasks();
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

    const undoBtn = document.createElement("button");
    undoBtn.textContent = "Undo";
    undoBtn.style.position = "absolute";
    undoBtn.style.top = ".4vw";
    undoBtn.style.right = ".4vw";
    undoBtn.style.padding = ".5vw .9vw";
    undoBtn.style.border = "none";
    undoBtn.style.backgroundColor = "#FFC107";
    undoBtn.style.borderRadius = ".4vw";
    undoBtn.style.fontSize = ".9em";
    undoBtn.style.cursor = "pointer";
    undoBtn.style.fontWeight = "700";
    undoBtn.style.opacity = "0";
    undoBtn.style.transform = "scale(0.8)";
    undoBtn.style.transition = "all 0.3s ease";
    undoBtn.classList.add("undo-btn");
    closeIcon.parentNode.appendChild(undoBtn);

    requestAnimationFrame(() => {
      undoBtn.style.opacity = "1";
      undoBtn.style.transform = "scale(1)";
    });

    undoBtn.addEventListener("click", () => {
      task.removed = false;
      label.style.textDecoration = "none";
      label.style.color = "#fefefe";
      closeIcon.style.display = "inline";
      undoBtn.style.opacity = "0";
      undoBtn.style.transform = "scale(0.8)";
      setTimeout(() => undoBtn.remove(), 300);
      sortTasks();
    });

    sortTasks();
    updateCounts();
  });
}

function addTask() {
  const taskText = addInput.value.trim();
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const duplicateTask = tasksAll.find(
    (task) => task.text.trim().toLowerCase() === taskText.trim().toLowerCase()
  );

  if (duplicateTask) {
    alert("Task already exists!");
    addInput.value = "";
    return;
  }

  const task = makeTask(taskText);
  const taskDiv = makeTaskElement(task);

  tasksAll.push(task);
  tasksContainer.appendChild(taskDiv);

  addInput.value = "";
  sortTasks();
  updateCounts();
}

function sortTasks() {
  tasksContainer.innerHTML = "";

  const tasksNew = [];
  const tasksCompleted = [];
  const removedTasks = [];

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

  // tasksContainer.style.transition = "all 0.3s ease";
  // setTimeout(() => {
  //   tasksContainer.style.transition = "none";
  // }, 300);

  // tasksNew.forEach((t) => {
  //   tasksContainer.appendChild(t.element);
  // });

  // tasksCompleted.forEach((t) => {
  //   tasksContainer.appendChild(t.element);
  // });

  // removedTasks.forEach((t) => {
  //   tasksContainer.appendChild(t.element);
  // });

  gsap.to(tasksContainer, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      tasksContainer.innerHTML = "";

      [...tasksNew, ...tasksCompleted, ...removedTasks].forEach((t, index) => {
        tasksContainer.appendChild(t.element);
      });

      gsap.to(tasksContainer, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
        stagger: 0.05,
      });
    },
  });

  updateCounts();
}

function filterTasks(type) {
  tasksContainer.innerHTML = "";

  let filteredTasks = [];

  document.querySelector(".heading h1").textContent =
    type === "all"
      ? "My Tasks"
      : type.charAt(0).toUpperCase() + type.slice(1) + " Tasks";

  if (type === "completed") {
    filteredTasks = tasksAll.filter((task) => task.completed && !task.removed);
  } else if (type === "new") {
    filteredTasks = tasksAll.filter((task) => !task.completed && !task.removed);
  } else if (type === "removed") {
    filteredTasks = tasksAll.filter((task) => task.removed);
  } else {
    filteredTasks = tasksAll;
    sortTasks();
  }
  gsap.to(tasksContainer, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      tasksContainer.innerHTML = "";

      filteredTasks.forEach((task) => {
        tasksContainer.appendChild(task.element);
      });

      gsap.fromTo(
        tasksContainer.children,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      gsap.to(tasksContainer, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    },
  });

  updateCounts();
}

addInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const type = link.getAttribute("data-type");
    filterTasks(type);

    if (type === "all") {
      sortTasks();
    }
  });
});

function updateCounts() {
  const allCount = tasksAll.length;
  const completedCount = tasksAll.filter(
    (task) => task.completed && !task.removed
  ).length;
  const newCount = tasksAll.filter(
    (task) => !task.completed && !task.removed
  ).length;
  const removedCount = tasksAll.filter((task) => task.removed).length;

  const counts = [allCount, completedCount, newCount, removedCount];

  notifiCount.forEach((span, index) => {
    span.textContent = counts[index] > 0 ? counts[index] : "";
  });
}

updateCounts();

window.addEventListener("load", () => {
  gsap.from(".vertical-nav header", {
    opacity: 0,
    x: -30,
    duration: 1,
    ease: "power4.out",
  });

  gsap.from(".links", {
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: "power4.out",
    stagger: 0.2,
    delay: 0.3,
  });

  gsap.from(".heading h1, .heading p", {
    opacity: 0,
    y: -20,
    duration: 1,
    delay: 1,
    ease: "power2.out",
  });

  gsap.from(".add-task", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1.2,
    ease: "back.out(1.7)",
  });
});
