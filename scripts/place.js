
const temperature = 26;
const conditions = "Partly Cloudy";
const wind = 20;


function loadDataInFooter() {
    const today = new Date();
    document.querySelector("#currentYear").innerHTML = `&copy;${today.getFullYear()}`;
    document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
}

function loadWeatherData() {
    document.querySelector("#tempValue").textContent = `${temperature}ºC`;
    document.querySelector("#condValue").textContent = conditions;
    document.querySelector("#windValue").textContent = `${wind}Km/h`;
    document.querySelector("#chillValue").textContent = (calculateWindChill(temperature, wind) != "N/A") ? `${calculateWindChill(temperature, wind)}ºC` : "N/A";
}

const calculateWindChill = (t, w) => (t > 10 || w <= 4.8) ? "N/A" : (13.12 + 0.6215 * t - 11.37 * Math.pow(w, 0.16) + 0.3965 * t * Math.pow(w, 0.16)).toFixed(2);




loadDataInFooter();
loadWeatherData();