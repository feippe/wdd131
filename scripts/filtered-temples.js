const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Montevideo Uruguay",
        location: "Montevideo, Uruguay",
        dedicated: "2001, March, 18",
        area: 10700,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/montevideo-uruguay-temple/montevideo-uruguay-temple-18474-main.jpg"
    },
    {
        templeName: "Buenos Aires Argentina",
        location: "Buenos Aires, Argentina",
        dedicated: "1986, January, 17-19",
        area: 30659,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/buenos-aires-argentina-temple/buenos-aires-argentina-temple-4087-main.jpg"
    },
    {
        templeName: "Santiago Chile",
        location: "Santiago, Chile",
        dedicated: "1983, September, 15-17",
        area: 20831,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/024-Santiago-Chile-Temple.jpg"
    }
];

function showTemples(temples) {
    document.querySelector('#templesList').innerHTML = "";
    temples.forEach(temple => {
        document.querySelector('#templesList').appendChild(getCardTemplate(temple));
    });
}

function getCardTemplate(temple) {
    let card = dce("div");
    card.className = "card";

    let name = dce("h3");
    name.className = "name";
    name.textContent = temple.templeName;
    card.appendChild(name);

    let location = dce("div");
    location.className = "data";
    let labelLocation = dce("label");
    labelLocation.textContent = "Location:";
    location.appendChild(labelLocation);
    let spanLocation = dce("span");
    spanLocation.textContent = temple.location;
    location.appendChild(spanLocation);
    card.appendChild(location);

    let dedicated = dce("div");
    dedicated.className = "data";
    let labelDedicated = dce("label");
    labelDedicated.textContent = "Dedicated:";
    dedicated.appendChild(labelDedicated);
    let spanDedicated = dce("span");
    spanDedicated.textContent = temple.dedicated;
    dedicated.appendChild(spanDedicated);
    card.appendChild(dedicated);

    let size = dce("div");
    size.className = "data";
    let labelSize = dce("label");
    labelSize.textContent = "Size:";
    size.appendChild(labelSize);
    let spanSize = dce("span");
    spanSize.textContent = `${temple.area} sq ft`;
    size.appendChild(spanSize);
    card.appendChild(size);

    let img = dce("img");
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("width", "399");
    img.setAttribute("height", "250");
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy");

    card.appendChild(img);

    return card;
}

function filtering(type) {
    switch (type) {
        case "old":
            showTemples(temples.filter((e) => parseInt(e.dedicated.substring(0, 4)) < 1900));
            break;
        case "new":
            showTemples(temples.filter((e) => parseInt(e.dedicated.substring(0, 4)) >= 2000));
            break;
        case "small":
            showTemples(temples.filter((e) => e.area < 10000));
            break;
        case "large":
            showTemples(temples.filter((e) => e.area >= 90000));
            break;
        default:
            break;
    }
}

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
showTemples(temples);

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