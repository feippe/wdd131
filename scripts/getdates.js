function printYearInFooter() {
    const today = new Date();
    document.querySelector("#currentYear").innerHTML = `&copy;${today.getFullYear()}`;
}

function printLastModified() {
    document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
}


printYearInFooter();
printLastModified();