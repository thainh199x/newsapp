"use strict";
// SELECTING ELEMENTS
const addBtn = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");
const todoListEl = document.getElementById("todo-list");

// LẤY DỮ LIỆU TỪ STORAGE
const currentUser = getFromStorage("loginUser") || "";
console.log(currentUser);
const userArr = getFromStorage("user") || [];
console.log(userArr);
const todoArr = getFromStorage("todo") || [];
console.log(todoArr);

// KHỞI TẠO CLASS TASK
class task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// TẠO HÀM THÊM HOẶC XÓA CLASS CHECKED KHI CLICK VÀO DÒNG TASK
const clickTask = function (taskPosition, positionInTodoArr) {
  for (let j = 0; j < todoArr.length; j++) {
    if (j === taskPosition) {
      todoListEl.children[j].classList.toggle("checked");
      todoArr[positionInTodoArr].isDone = !todoArr[positionInTodoArr].isDone;
      console.log(todoArr[positionInTodoArr]);
      localStorage.removeItem("todo");
      saveToStorage("todo", todoArr);
    }
  }
};

// TẠO HÀM XÓA TASK KHI CLICK VÀO NÚT X
const deleteTask = function (taskPosition) {
  if (confirm("削除しますか!")) {
    for (let i = 0; i < todoArr.length; i++) {
      if (i === taskPosition) {
        todoArr.splice(i, 1);
        localStorage.removeItem("todo");
        saveToStorage("todo", todoArr);
        todoListEl.innerHTML = "";
        renderTodoList(todoArr);
      }
    }
  }
};

// TẠO HÀM HIỂN THỊ TASK THEO CURRENT USER
const renderTodoList = function () {
  let j = 0; // số thứ tự thẻ li khi hiển thị theo current user
  for (let i = 0; i < todoArr.length; i++) {
    let html;
    if (todoArr[i].owner === currentUser) {
      if (todoArr[i].isDone === true) {
        html = `<li class="checked" onclick ="clickTask(${j}, ${i})">
  ${todoArr[i].task}
  <span class="close" onclick="deleteTask(${i})">×</span>
</li>`;
        todoListEl.insertAdjacentHTML("beforeend", html);
        j++;
      } else {
        html = `<li onclick ="clickTask(${j}, ${i})">
  ${todoArr[i].task}
  <span class="close" onclick="deleteTask(${i})">×</span>
</li>`;
        todoListEl.insertAdjacentHTML("beforeend", html);
        j++;
      }
    }
  }
};

// SỰ KIỆN VỚI NÚT ADD
addBtn.addEventListener("click", function () {
  if (inputTask.value === "") {
    alert("やることを入力してください");
  } else {
    let data = new task(inputTask.value, currentUser, false);
    console.log(data);
    todoArr.push(data);
    saveToStorage("todo", todoArr);
    todoListEl.innerHTML = "";
    renderTodoList(todoArr);
    inputTask.value = "";
  }
});
renderTodoList(todoArr);
// localStorage.removeItem("todo");
