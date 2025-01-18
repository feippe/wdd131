async function loadFooter() {
    const templateFooter = await getTemplateFromFile('footer');
    qs('footer').innerHTML = templateFooter;
    printYearInFooter();
    printLastModified();
}

function printYearInFooter() {
    const today = new Date();
    qs("#currentYear").innerHTML = `&copy;${today.getFullYear()}`;
}

function printLastModified() {
    qs("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
}

loadFooter();

qs('nav svg#svgOpenMenu').addEventListener('click', e => {
    qs('nav>ul').classList.toggle('opened');
    qs('nav svg#svgOpenMenu').style.display = 'none';
    qs('nav svg#svgCloseMenu').style.display = 'inline-block';
});
qs('nav svg#svgCloseMenu').addEventListener('click', e => {
    qs('nav>ul').classList.toggle('opened');
    qs('nav svg#svgCloseMenu').style.display = 'none';
    qs('nav svg#svgOpenMenu').style.display = 'inline-block';
});