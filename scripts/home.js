"use strict";

// SELECTING ELEMENTS
const logoutBtn = document.getElementById("btn-logout");
const loginModalEl = document.getElementById("login-modal");
const mainContentEl = document.getElementById("main-content");
const welcomeEl = document.getElementById("welcome-message");

// LẤY DỮ LIỆU NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
const currentUser = getFromStorage("loginUser") || "";
console.log(currentUser);

if (currentUser !== "") {
  // HIỂN THỊ TRANG HOME VỚI NÚT LOGOUT VÀ CÂU WELCOME
  loginModalEl.style.display = "none";
  welcomeEl.textContent = `welcome ${currentUser}`;
} else {
  // HIỂN THỊ TRANG HOME VỚI NÚT LOGIN VÀ REGISTER
  mainContentEl.style.display = "none";
}

// KHI BẤM NÚT LOGOUT SẼ XOÁ DỮ LIỆU NGƯỜI DÙNG ĐANG ĐĂNG NHẬP VÀ ĐI TỚ TRANG LOGIN
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loginUser");
  window.location.href = "../pages/login.html";
});

// localStorage.clear();
