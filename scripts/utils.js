function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
function qsa(selector, parent = document) {
    return parent.querySelectorAll(selector);
}
function dce(type) {
    return document.createElement(type);
}
async function getTemplateFromFile(file) {
    const path = `partials/${file}.html`;
    return await fetch(path).then((data) => data.text());
}