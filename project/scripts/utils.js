//UTILS
function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
function qsa(selector, parent = document) {
    return parent.querySelectorAll(selector);
}
function dce(type) {
    return document.createElement(type);
}
function getDomainFromUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    return link.hostname;
}
function getVideoIdFromUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    const queryString = link.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("v");
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function setLocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}
function getLocalStorage(name) {
    let data = localStorage.getItem(name);
    if (data != undefined) {
        return JSON.parse(data);
    }
    return null;
}
//END UTILS

//GET DATA
async function getTemplateFromFile(file) {
    const path = `partials/${file}.html`;
    return await fetch(path).then((data) => data.text());
}
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}
//END GET DATA

//FOR HEADER AND FOOTER
async function loadFooter() {
    const templateFooter = await getTemplateFromFile('footer');
    qs('footer').innerHTML = templateFooter;
    loadDataInFooter();
}
async function loadHeader() {
    const templateHeader = await getTemplateFromFile('header');
    qs('header').innerHTML = templateHeader;
    putCategoriesInNav();
    searchFunctions();
}
function loadDataInFooter() {
    const today = new Date();
    document.querySelector("#currentYear").innerHTML = `&copy;${today.getFullYear()}`;
    document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
}
async function putCategoriesInNav() {
    try {
        let result = await getData("https://www.themealdb.com/api/json/v1/1/categories.php");
        categories = result.categories;
        let nav = qs("nav");
        categories.forEach(category => {
            let itemNav = dce("a");
            itemNav.id = `navId${category.idCategory}`;
            itemNav.href = `category.html?id=${category.idCategory}`;
            itemNav.textContent = category.strCategory;
            nav.append(itemNav);
        });
        markActualPage();
    } catch (error) {
        console.error('Error fetching categories for nav:', error);
    }
}
function getCurrentPage() {
    const url = window.location.href;
    const link = document.createElement('a');
    link.href = url;
    const pathname = link.pathname;
    return pathname === '/' ? 'index.html' : pathname.split('/').pop();
}
function markActualPage() {
    const page = getCurrentPage();
    switch (page) {
        case "index.html":
            qs("nav a:nth-child(1)").className = "selected";
            break;
        case "category.html":
            const id = getParam("id");
            qs(`#navId${id}`).className = "selected";
            break;
        default:
            break;
    }
}
function searchFunctions() {
    qs("#search>div>button").addEventListener("click", (e) => {
        search();
    });
    qs("#search>div>input[type='text']").addEventListener("keyup", (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            search();
        }
    });
}
function search() {
    const value = qs("#search>div>input[type='text']").value;
    window.location = `search.html?q=${value}`;
}
// END FOR HEADER AND FOOTER

let categories = [];

loadHeader();
loadFooter();