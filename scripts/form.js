const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

function loadProducts() {
    let select = document.querySelector("#sltProduct");
    if (select != undefined && products != undefined) {
        products.forEach(p => {
            let option = document.createElement("option");
            option.value = p.id;
            option.textContent = p.name;
            select.append(option);
        });
    }
}

function printYearInFooter() {
    const today = new Date();
    document.querySelector("#currentYear").innerHTML = `&copy;${today.getFullYear()}`;
}

function printLastModified() {
    document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
}

function checkOrUncheckAllFeatures() {
    let features = document.querySelectorAll(".chkFeatures input:not(#chkFeatures-ch)");
    let someChecked = false;
    features.forEach(f => {
        if (f.checked) {
            someChecked = true;
        }
    });
    let chkCheckUncheckAll = document.querySelector('#chkFeatures-ch');
    let lblCheckUncheckAll = document.querySelector('#lblFeatures-ch');
    if (someChecked) {
        lblCheckUncheckAll.textContent = "Uncheck All";
        chkCheckUncheckAll.checked = true;
    } else {
        lblCheckUncheckAll.textContent = "Check All";
        chkCheckUncheckAll.checked = false;
    }
}

function attachEventsInFeatures() {
    let features = document.querySelectorAll(".chkFeatures input:not(#chkFeatures-ch)");
    features.forEach(f => {
        f.addEventListener("change", (e) => {
            checkOrUncheckAllFeatures();
        });
    });
    let chkCheckUncheckAll = document.querySelector('#chkFeatures-ch');
    chkCheckUncheckAll.addEventListener("change", (e) => {
        let checked = e.target.checked;
        let features = document.querySelectorAll(".chkFeatures input:not(#chkFeatures-ch)");
        features.forEach(f => {
            f.checked = checked;
            checkOrUncheckAllFeatures();
        });
    });
}

printYearInFooter();
printLastModified();
loadProducts();
attachEventsInFeatures();