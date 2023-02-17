"use strict";

// SELECTING ELEMENTS
const loginBtn = document.getElementById("btn-submit");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");

// LẤY DỮ LIỆU TỪ LOCAL STORAGE
const userArr = getFromStorage("user") || [];

let currentUser = "";
let validate = false;

// TẠO HÀM KIỂM TRA INPUT HỢP LỆ HAY KHÔNG
const checkValidate = function () {
  if (inputUserName.value === "") {
    alert("ユーザー名を入力してください");
  } else if (inputPassword.value === "") {
    alert("パスワードを入力してください");
  } else {
    for (let i = 0; i < userArr.length; i++) {
      if (
        userArr[i].userName === inputUserName.value &&
        userArr[i].password === inputPassword.value
      ) {
        validate = true;
      }
    }
    if (!validate) {
      alert("間違った! 再試行");
    }
  }
};

// SỰ KIẾN VỚI NÚT LOGIN
loginBtn.addEventListener("click", function () {
  checkValidate();
  if (validate) {
    // lưu tên người dùng đang đăng nhập vào local storage và đi tới trang home
    currentUser = inputUserName.value;
    saveToStorage("loginUser", currentUser);
    window.location.href = "../index.html";
  }
});
console.log(userArr);
console.log(currentUser);
// localStorage.clear();
