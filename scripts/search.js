"use strict";

// SELECTING ELEMENTS
const searchContainer = document.getElementById("news-container");
const previousBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNumber = document.getElementById("page-num");
const inputSearch = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");

const pageSize = getFromStorage("pageSize") || 5;

// TẠO HÀM HIỂN THỊ BẢN TIN
const renderSearchResult = function (data) {
  for (let i = 0; i < pageSize; i++) {
    const html = `<div class="card flex-row flex-wrap">
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          src="${data.articles[i].urlToImage}"
          class="card-img"
          alt="no image"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            ${data.articles[i].title}
          </h5>
          <p class="card-text">
            ${data.articles[i].content}
          </p>
          <a
            href="${data.articles[i].url}"
            >View</a
          >
        </div>
      </div>
    </div>
  </div>
</div>`;
    searchContainer.insertAdjacentHTML("beforeend", html);
  }
};

// TẠO HÀM LẤY DỮ LIỆU TỪ API
let page = 1;
const getSearchResult = async function (search, pageSize, page) {
  try {
    const getAPI = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&pageSize=${pageSize}&page=${page}&apiKey=bddeb098871c40c9904272aa80a1da73`
    );
    const data = await getAPI.json();
    console.log(data);
    // ẩn nút next khi đi đến trang cuối
    if (page > data.totalResults / pageSize) {
      nextBtn.style.display = "none";
    }
    // hiển thị nút next khi đang ở trang chưa cuối
    else {
      nextBtn.style.display = "block";
    }
    renderSearchResult(data);
  } catch (err) {
    console.error(`${err.message} 💥`);
  }
};

// NẾU LÀ TRANG 1 THÌ SẼ ẨN NÚT PREVIOUS
if (page === 1) {
  previousBtn.style.display = "none";
}

// SỰ KIẾN VỚI NÚT NEXT
nextBtn.addEventListener("click", function () {
  page++;
  console.log(page);
  searchContainer.innerHTML = "";
  pageNumber.textContent = page;
  getSearchResult(inputSearch.value, pageSize, page);
  // hiển thị nút previous khi ở trang 2 trở đi
  if (page > 1) {
    previousBtn.style.display = "block";
  }
});

// SỰ KIỆN VỚI NÚT PREVIOUS
previousBtn.addEventListener("click", function () {
  page--;
  console.log(page);
  searchContainer.innerHTML = "";
  pageNumber.textContent = page;
  getSearchResult(inputSearch.value, pageSize, page);
  // ẩn nút previous khi quay về trang 1
  if (page === 1) {
    previousBtn.style.display = "none";
  }
});

// SỰ KIỆN KHI CLICK NÚT SEARCH
searchBtn.addEventListener("click", function () {
  if (inputSearch.value === "") {
    alert("探したいものを入力してください");
  } else {
    page = 1;
    previousBtn.style.display = "none";
    pageNumber.textContent = page;
    searchContainer.innerHTML = "";
    getSearchResult(inputSearch.value, pageSize, page);
  }
});
