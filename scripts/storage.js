"use strict";

// TẠO HÀM LƯU DỮ LIỆU VÀO LOCAL STORAGE
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// TẠO HÀM LẤY DỮ LIỆU TỪ LOCAL STORAGE
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
