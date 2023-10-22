const searchForm = document.querySelector(".search form")
const searchInput = document.querySelector(".search form")
const apiForm = document.querySelector(".keys form")
const apiKeyDiv = document.querySelector(".apiKey")

document.addEventListener("DOMContentLoaded", ()=> {
    let storedKeys = getLocalStoredApiKeys()
    if(Object.keys(storedKeys).length === 0){
        apiKeyDiv.classList.remove("hidden")
    }
})
let page = 1

searchForm.addEventListener("submit", imageSearchHandler)
apiForm.addEventListener("submit", apiKeyHandler)

function imageSearchHandler(event){
    event.preventDefault()
    const keyword = document.querySelector("#input-feild").value
    searchStockImage(keyword)
}

function searchStockImage(keyword){
    let keys = getLocalStoredApiKeys()
    if(keys.pixabay.length > 0){
        getpixabayaImages(keyword, page, keys.pixabay)
    }
    if(keys.unsplash.length > 0){
        getunsplashImages(keyword, page, keys.unsplash)
    }
    if(keys.pexel.length > 0){
        getpexelImages(keyword, page, keys.pexel)
    }
    page++
}

function getpixabayaImages(keyword, pageNo, apiKey){
    let url = `https://pixabay.com/api/?key=${apiKey}&q=${keyword}&page=${pageNo}`;
    fetch(url).then((Response) => Response.json()).then((items) => {
    }).catch((error) => errorHandler(error, "pixabay"))
}

function getunsplashImages(keyword, pageNo, apiKey){
    let url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${pageNo}&query=${keyword}`;
    fetch(url).then((r)=> r.json()).then((items)=>{
    }).catch((error) => errorHandler(error, "unsplash"))
}

function getpexelImages(keyword, pageNo, apikey){
    let url = `https://api.pexels.com/v1/search?query=${keyword}&page=${pageNo}`;

    fetch(url, {headers: {Authorization: apikey,}}).then((r)=> r.json()).then((items)=> {
    }).catch((error) => errorHandler(error, "pexels"))
}

function errorHandler(error, website){
    alert(`there is error on ${website}. The Details of error are ${error}`)
}



function apiKeyHandler(event){
    event.preventDefault()
    const pixabayKey = document.querySelector("#pixa").value
    const unplashyKey = document.querySelector("#unsp").value
    const pexelKey = document.querySelector("#pexe").value

    let storedKeys = getLocalStoredApiKeys()
    storedKeys.pixabay = pixabayKey
    storedKeys.unsplash = unplashyKey
    storedKeys.pexel = pexelKey

    localStorage.setItem("apikeys", JSON.stringify(storedKeys))
    if(storedKeys.pixabay != "" || storedKeys.unsplash != "" || storedKeys.pexel != ""){
        apiKeyDiv.classList.add("hidden")
    }
}

function getLocalStoredApiKeys(){
    return localStorage.getItem("apikeys") ? JSON.parse(localStorage.getItem("apikeys")) : {}
}


document.querySelector("#setKeys").addEventListener("click", ()=>{
    let storedKeys = getLocalStoredApiKeys()
    apiKeyDiv.classList.remove("hidden")

    document.querySelector("#pixa").value = storedKeys.pixabay
    document.querySelector("#unsp").value = storedKeys.unsplash
    document.querySelector("#pexe").value = storedKeys.pexel
})

const navBtnPixabay = document.getElementById("Pixabay")
const navBtnpexel = document.getElementById("Pexels")
const navBtnUnsplash = document.getElementById("Unsplash")

const displayPixabayImages = document.querySelector(".pixabay-container")
const displayPexelImages = document.querySelector(".pexel-container")
const displayunsplashImages = document.querySelector(".unsplash-container")


navBtnPixabay.addEventListener("click", ()=>{
    navBtnPixabay.classList.add("active")
    navBtnpexel.classList.remove("active")
    navBtnUnsplash.classList.remove("active")
    displayPixabayImages.classList.remove("hidden")
    displayPexelImages.classList.add("hidden")
    displayunsplashImages.classList.add("hidden")
})
navBtnUnsplash.addEventListener("click", ()=>{
    navBtnPixabay.classList.remove("active")
    navBtnpexel.classList.remove("active")
    navBtnUnsplash.classList.add("active")
    displayPixabayImages.classList.add("hidden")
    displayPexelImages.classList.add("hidden")
    displayunsplashImages.classList.remove("hidden")
})
navBtnpexel.addEventListener("click", ()=>{
    navBtnPixabay.classList.remove("active")
    navBtnpexel.classList.add("active")
    navBtnUnsplash.classList.remove("active")
    displayPixabayImages.classList.add("hidden")
    displayPexelImages.classList.remove("hidden")
    displayunsplashImages.classList.add("hidden")
})