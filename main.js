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

searchForm.addEventListener("submit", formSubmitHandler)
apiForm.addEventListener("submit", apiKeyHandler)

function formSubmitHandler(event){
    event.preventDefault()
    const keyword = searchInput.value
    searchStockImage(keyword)
}

function apiKeyHandler(event){
    event.preventDefault()
    const pixabayKey = document.querySelector("#pixa").value
    const unplashyKey = document.querySelector("#unsp").value
    const pexelKey = document.querySelector("#pexe").value

    console.log(pexelKey)
    let storedKeys = getLocalStoredApiKeys()
    storedKeys.pixaby = pixabayKey
    storedKeys.unsplash = unplashyKey
    storedKeys.pexel = pexelKey

    localStorage.setItem("apikeys", JSON.stringify(storedKeys))
    if(storedKeys.pixaby != "" || storedKeys.unsplash != "" || storedKeys.pexel != ""){
        apiKeyDiv.classList.add("hidden")
    }
}

function getLocalStoredApiKeys(){
    return localStorage.getItem("apikeys") ? JSON.parse(localStorage.getItem("apikeys")) : {}
}

function searchStockImage(keyword){
    
}

document.querySelector("#setKeys").addEventListener("click", ()=>{
    let storedKeys = getLocalStoredApiKeys()
    apiKeyDiv.classList.remove("hidden")

    document.querySelector("#pixa").value = storedKeys.pixaby
    document.querySelector("#unsp").value = storedKeys.unsplash
    document.querySelector("#pexe").value = storedKeys.pexel
})