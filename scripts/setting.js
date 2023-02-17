"use strict";
// SELECTING ELEMENTS
const saveSettingBtn = document.getElementById("btn-submit");
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");

// SỰ KIẾN VỚI NÚT SAVE
saveSettingBtn.addEventListener("click", function () {
  // nếu người dùng không nhập thông tin setting
  if (inputPageSize.value === "") {
    alert("まだ設定しないので, ページサイズが5です。");
  }
  if (inputCategory.value === "General") {
    alert("カテゴリをまだ選択しないので, カテゴリが「全て」です。");
  }
  // khi người dùng nhập thông tin setting
  const category = inputCategory.value;
  const pageSize = inputPageSize.value;
  localStorage.removeItem("category");
  localStorage.removeItem("pageSize");
  saveToStorage("category", category);
  saveToStorage("pageSize", pageSize);
  alert("saved");
});
