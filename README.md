# 📝 Final Challenge: Task Tracker App

## 📌 Requirements
- Add new tasks via input + button  
- Each task should have:  
  - name  
  - status (done/not done)  
  - delete button  
- Save and load tasks using `localStorage`  
- Allow filtering by search or status (e.g. "show completed")

## 🎨 Suggested UI
🔗 https://www.youware.com/project/2trbj2yvfn

## 💡 JavaScript Concepts
- Store tasks in an array of objects:  
  ```js
  { name: "Task 1", done: false }
  ```
- Render list dynamically with DOM  
- Toggle task status with a checkbox or button  
- Save updated task list to `localStorage`

## 🚀 Bonus Features
- Add due date  
- Sort tasks by created time or name  
- Dark mode toggle (for fun!)

## 🧠 Development Tips
- Use functions to separate concerns: `render()`, `addTask()`, `deleteTask()`, `filterTasks()`  
- Keep your data structure simple and clean  
- Update the UI every time the data changes  
- Test on both desktop and mobile browser

## 📤 Submission Instructions
- Create a GitHub repo named `js-task-tracker`  
- Push your code + add screenshots or short demo video  
- Write a README that includes:  
  - What features you built  
  - How to use it  
  - Any difficulties you faced  
- Send link to your mentor for final review
