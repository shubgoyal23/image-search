const searchForm = document.querySelector(".search form");
const searchInput = document.querySelector(".search form");
const apiForm = document.querySelector(".keys form");
const apiKeyDiv = document.querySelector(".apiKey");
const navBtnPixabay = document.getElementById("Pixabay");
const navBtnpexel = document.getElementById("Pexels");
const navBtnUnsplash = document.getElementById("Unsplash");
const navBtnShowAll = document.getElementById("Show-all");
const displayPixabayImages = document.querySelector(".pixabay-container");
const displayPexelImages = document.querySelector(".pexel-container");
const displayunsplashImages = document.querySelector(".unsplash-container");
const showMoreBtn = document.querySelector("#showMore");

document.addEventListener("DOMContentLoaded", () => {
  let storedKeys = getLocalStoredApiKeys();
  if (Object.keys(storedKeys).length === 0) {
    apiKeyDiv.classList.remove("hidden");
  }
});
let page = 1;
let previousSearch;

searchForm.addEventListener("submit", imageSearchHandler);
apiForm.addEventListener("submit", apiKeyHandler);

function imageSearchHandler(event) {
  event.preventDefault();
  const keyword = document.querySelector("#input-feild").value;
  if(previousSearch != keyword){
    displayPixabayImages.innerHTML = "" 
    displayunsplashImages.innerHTML = "" 
    displayPexelImages.innerHTML = "" 
  }
  previousSearch = keyword
  searchStockImage(keyword);
}

function searchStockImage(keyword) {
  let keys = getLocalStoredApiKeys();
  if (keys.pixabay.length > 0) {
    getpixabayaImages(keyword, page, keys.pixabay);
  }
  if (keys.unsplash.length > 0) {
    getunsplashImages(keyword, page, keys.unsplash);
  }
  if (keys.pexel.length > 0) {
    getpexelImages(keyword, page, keys.pexel);
  }
  page++;
  if (page > 1) {
    showMoreBtn.classList.remove("hidden")
  }
}

showMoreBtn.addEventListener("click", ()=>{
    const keyword = document.querySelector("#input-feild").value;
    searchStockImage(keyword);
})

function getpixabayaImages(keyword, pageNo, apiKey) {
  let url = `https://pixabay.com/api/?key=${apiKey}&q=${keyword}&page=${pageNo}&per_page=30`;
  fetch(url)
    .then((Response) => Response.json())
    .then((items) => pixabayDataHandler(items))
    .catch((error) => errorHandler(error, "pixabay"));
}

function getunsplashImages(keyword, pageNo, apiKey) {
  let url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${pageNo}&query=${keyword}&per_page=15`;
  fetch(url)
    .then((r) => r.json())
    .then((items) => unsplashDataHandler(items))
    .catch((error) => errorHandler(error, "unsplash"));
}

function getpexelImages(keyword, pageNo, apikey) {
  let url = `https://api.pexels.com/v1/search?query=${keyword}&page=${pageNo}&per_page=15`;

  fetch(url, { headers: { Authorization: apikey } })
    .then((r) => r.json())
    .then((items) => pexelDataHandler(items))
    .catch((error) => errorHandler(error, "pexels"));
}

function errorHandler(error, website) {
  alert(`there is error on ${website}. The Details of error are ${error}`);
}

function pixabayDataHandler(items) {
  items.hits.map((photo) => {
    const div = document.createElement("div");
    div.classList.add("image-div");
    div.innerHTML = `<div class="image">
        <img src=${photo.webformatURL} alt=${photo.tags}>
    </div>
    <div class="tittle">
        <p><a href=${photo.pageURL} target="_blank">${photo.tags} </a></p>
        <p>By <a href= "https://pixabay.com/users/${photo.user}-${photo.user_id}" target="_blank">${photo.user}</a></p> 
    </div>`;
    displayPixabayImages.appendChild(div);
  });
}
function unsplashDataHandler(items) {
  items.results.map((photo) => {
    const div = document.createElement("div");
    div.classList.add("image-div");
    div.innerHTML = `<div class="image">
        <img src=${photo.urls.regular} alt=${photo.alt_description}>
    </div>
    <div class="tittle">
        <p><a href=${photo.links.html} target="_blank">${photo.description} </a></p>
        <p>By <a href= "https://unsplash.com/@${photo.user.username}" target="_blank">${photo.user.name}</a></p> 
    </div>`;
    displayunsplashImages.appendChild(div);
  });
}
function pexelDataHandler(items) {
  items.photos.map((photo) => {
    const div = document.createElement("div");
    div.classList.add("image-div");
    div.innerHTML = `<div class="image">
        <img src=${photo.src.large} alt=${photo.alt}>
    </div>
    <div class="tittle">
        <p><a href=${photo.url} target="_blank">${photo.alt} </a></p>
        <p>By <a href=${photo.photographer_url} target="_blank">${photo.photographer}</a></p> 
    </div>`;
    displayPexelImages.appendChild(div);
  });
}

function apiKeyHandler(event) {
  event.preventDefault();
  const pixabayKey = document.querySelector("#pixa").value;
  const unplashyKey = document.querySelector("#unsp").value;
  const pexelKey = document.querySelector("#pexe").value;

  let storedKeys = getLocalStoredApiKeys();
  storedKeys.pixabay = pixabayKey;
  storedKeys.unsplash = unplashyKey;
  storedKeys.pexel = pexelKey;

  localStorage.setItem("apikeys", JSON.stringify(storedKeys));
  if (
    storedKeys.pixabay != "" ||
    storedKeys.unsplash != "" ||
    storedKeys.pexel != ""
  ) {
    apiKeyDiv.classList.add("hidden");
  }
}

function getLocalStoredApiKeys() {
  return localStorage.getItem("apikeys")
    ? JSON.parse(localStorage.getItem("apikeys"))
    : {};
}

document.querySelector("#setKeys").addEventListener("click", () => {
  let storedKeys = getLocalStoredApiKeys();
  apiKeyDiv.classList.remove("hidden");

  document.querySelector("#pixa").value = storedKeys.pixabay;
  document.querySelector("#unsp").value = storedKeys.unsplash;
  document.querySelector("#pexe").value = storedKeys.pexel;
});

document
  .getElementById("close-keys-tab")
  .addEventListener("click", () => apiKeyDiv.classList.add("hidden"));

navBtnPixabay.addEventListener("click", () => {
  navBtnPixabay.classList.add("active");
  navBtnpexel.classList.remove("active");
  navBtnUnsplash.classList.remove("active");
  displayPixabayImages.classList.remove("hidden");
  displayPexelImages.classList.add("hidden");
  displayunsplashImages.classList.add("hidden");
  navBtnShowAll.classList.remove("active");
});
navBtnUnsplash.addEventListener("click", () => {
  navBtnPixabay.classList.remove("active");
  navBtnpexel.classList.remove("active");
  navBtnUnsplash.classList.add("active");
  displayPixabayImages.classList.add("hidden");
  displayPexelImages.classList.add("hidden");
  displayunsplashImages.classList.remove("hidden");
  navBtnShowAll.classList.remove("active");
});
navBtnpexel.addEventListener("click", () => {
  navBtnPixabay.classList.remove("active");
  navBtnpexel.classList.add("active");
  navBtnUnsplash.classList.remove("active");
  displayPixabayImages.classList.add("hidden");
  displayPexelImages.classList.remove("hidden");
  displayunsplashImages.classList.add("hidden");
  navBtnShowAll.classList.remove("active");
});
navBtnShowAll.addEventListener("click", () => {
  navBtnPixabay.classList.remove("active");
  navBtnpexel.classList.remove("active");
  navBtnUnsplash.classList.remove("active");
  navBtnShowAll.classList.add("active");
  displayPixabayImages.classList.remove("hidden");
  displayPexelImages.classList.remove("hidden");
  displayunsplashImages.classList.remove("hidden");
});
