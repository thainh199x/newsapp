"use strict";

// SELECTING ELEMENTS
const registerBtn = document.getElementById("btn-submit");
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputConfirmPassword = document.getElementById("input-password-confirm");

// LẤY DỮ LIỆU TỪ LOCAL STORAGE
const userArr = getFromStorage("user") || [];
const userNameArr = getFromStorage("username") || [];

let validate = false;
// TẠO HÀM KIỂM TRA INPUT HỢP LỆ HAY KHÔNG
const checkValidate = function () {
  if (inputFirstName.value === "") {
    alert("氏を入力してください");
  } else if (inputLastName.value === "") {
    alert("名を入力してください");
  } else if (inputUserName.value === "") {
    alert("ユーザー名を入力してください");
  } else if (userNameArr.includes(inputUserName.value)) {
    alert("このユーザー名は存在しました");
  } else if (inputPassword.value === "") {
    alert("パスワードを入力してください");
  } else if (inputPassword.value.length < 8) {
    alert("パスワードは8文字以上である必要があります");
  } else if (inputConfirmPassword.value === "") {
    alert("パスワードを確認してください");
  } else if (inputConfirmPassword.value !== inputPassword.value) {
    alert("パスワードが間違いました");
  } else {
    alert("完了しました!");
    validate = true;
  }
};

// SỰ KIỆN VỚI NÚT REGISTER
registerBtn.addEventListener("click", function () {
  checkValidate();
  if (validate) {
    let userData = new User(
      inputFirstName.value,
      inputLastName.value,
      inputUserName.value,
      inputPassword.value,
      inputConfirmPassword.value
    );
    // thêm user vừa đăng ký vào userArr và lưu vào local storage
    userArr.push(userData);
    saveToStorage("user", userArr);
    userNameArr.push(userData.userName);
    saveToStorage("username", userNameArr);
    window.location.href = "../pages/login.html";
  }
});
console.log(userArr);
// localStorage.clear();
