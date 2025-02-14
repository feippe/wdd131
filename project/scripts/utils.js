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
        let nav = qs("nav");
        result.categories.forEach(category => {
            let itemNav = dce("a");
            itemNav.href = `category.html?id=${category.idCategory}`;
            itemNav.textContent = category.strCategory;
            nav.append(itemNav);
        });
    } catch (error) {
        console.error('Error fetching categories for nav:', error);
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

loadHeader();
loadFooter();