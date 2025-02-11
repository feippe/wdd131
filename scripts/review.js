function printYearInFooter() {
    const today = new Date();
    document.querySelector("#currentYear").innerHTML = `&copy;${today.getFullYear()}`;
}

function printLastModified() {
    document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
}

function getParameterValue(parameterName) {
    const params = new URLSearchParams(window.location.search);
    return params.get(parameterName);
}

function saveInLS(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function getFromLS(name) {
    let data = localStorage.getItem(name);
    if (data != undefined) {
        return JSON.parse(data);
    }
    return null;
}

function saveAndLoad() {
    let ratings = [];
    let rating = Number(getParameterValue("rdoOverallRating"));
    if (rating != undefined) {
        let ratingsInLS = getFromLS("ratings");
        if (ratingsInLS != null) {
            ratings = ratingsInLS;
        }
        ratings.push(rating);
        saveInLS("ratings", ratings);
    }

    let countRating = ratings.length;
    let sum = 0;
    ratings.forEach(r => {
        sum += r;
    });

    let main = document.querySelector("main");

    let pc = document.createElement("p");
    pc.innerHTML = `Count: ${countRating}`;
    main.append(pc);

    let ra = Math.round(((sum / countRating) + Number.EPSILON) * 100) / 100;

    let pr = document.createElement("p");
    pr.innerHTML = `Rating: ${ra}`;
    main.append(pr);

}

printYearInFooter();
printLastModified();
saveAndLoad();

