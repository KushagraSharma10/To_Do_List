# 📝 ToDo List Web App

A clean, animated, and modern ToDo List web application built using **HTML, CSS (SCSS style)**, **JavaScript**, and **GSAP** animations.  
This app provides a smooth user experience with task filtering, animations, and a beautiful UI.

---

## ✨ Features

- ✅ Add, Complete, Remove, and Undo Tasks
- 📆 Dynamic current date display
- 📁 Filter tasks by:
  - All Tasks
  - Completed
  - New (Pending)
  - Removed
- 🎯 Real-time task counter for each category
- 💫 Smooth animations using GSAP
- 🎨 Clean and modern UI with dark-glass theme
- 🖱 Hover interactions and responsive layout


---

## 🖼️ Preview

![Preview]('./landingPage.png')

---

## ⚙️ Technologies Used

| Technology  | Purpose                      |
|-------------|------------------------------|
| HTML        | Markup structure             |
| CSS (SCSS)  | Styling & layout             |
| JavaScript  | Logic, task management       |
| GSAP        | Animations                   |
| Remix Icons | Icons in task and sidebar    |

---

## 🚀 Getting Started

1. Clone this repo:
   ```bash
   git clone https://github.com/KushagraSharma10/To_Do_List.git
   ```

2. Open `index.html` in your browser:
   ```bash
   cd todo-list-app
   open index.html   # Or simply double click
   ```

3. Enjoy adding and managing your tasks! 🎉

---

## 🔄 Workflow Overview

Here's how the app works under the hood:

### 1. **Page Load**
- Sidebar, heading, and task input smoothly animate in using GSAP.
- Current date is auto-inserted.

### 2. **Adding a Task**
- User types in the input and clicks "Add Task" or hits **Enter**.
- The new task animates in (`opacity + slide up`).
- Task is stored in memory and sorted.

### 3. **Mark as Completed**
- Clicking checkbox applies a smooth **scale animation**.
- Task is moved into the **Completed** category.

### 4. **Remove Task**
- Clicking the ❌ icon applies strike-through + grey out.
- Undo button fades in with scale.
- Task is moved to **Removed** category.

### 5. **Undo Remove**
- Clicking Undo smoothly restores the task and animates it back into view.

### 6. **Filtering**
- Clicking sidebar categories filters tasks and shows with **fade & stagger** animation.

---

## 📂 Folder Structure

```bash
📁 todo-list-app/
├── 📄 index.html
├── 📄 style.css
├── 📄 script.js
└── 📄 README.md
```

---

## 🧠 Learnings & Concepts

- DOM manipulation & event handling
- JS object-based task storage
- Conditional rendering and filtering
- **GSAP animations** for smooth transitions
- Responsive and accessible UI design

---

## 💡 Future Improvements

- 🔁 Add LocalStorage support (tasks saved on refresh)
- 📝 Edit task text inline
- 🌗 Dark/Light mode toggle
- 📱 Mobile responsiveness

---

## 🤝 Contribute

Pull requests and suggestions are always welcome!  
If you find any bugs or want to collaborate, feel free to reach out.

---


## ⭐ If you like it...

Give it a ⭐ on [GitHub](https://github.com/KushagraSharma10/To_Do_List)  
Share it with your friends 💌

---

> Made with ❤️ by Kushagra Sharma!