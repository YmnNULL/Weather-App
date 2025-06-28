document.querySelector('#nav i').addEventListener('click', () => {
    document.querySelector('#nav i').classList.toggle('fa-bars');
    document.querySelector('#nav i').classList.toggle('fa-xmark');
});

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("btn");
const content = document.querySelector(".content");

showWeather()

function showWeather(city = "Cairo") {
    document.getElementById("spinner").classList.remove("d-none");
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b30442408a3486988e105935252506&q=${city}&days=3`)
        .then(response => response.json())
        .then(data => {


            const arrOfThreeDays = [];

            for (let i = 0; i < 3; i++) {
                arrOfThreeDays.push({
                    dayName: returnDate(data.forecast.forecastday[i].date).date,
                    formattedDate: returnDate(data.forecast.forecastday[i].date).formatted,
                    location: data.location.name,
                    tempC: data.forecast.forecastday[i].day.avgtemp_c,
                    dataText: data.forecast.forecastday[i].day.condition.text,
                    icon: data.forecast.forecastday[i].day.condition.icon,
                    wind: data.forecast.forecastday[i].day.maxwind_kph,
                    avghumidity: data.forecast.forecastday[i].day.avghumidity,
                    windDir: data.forecast.forecastday[i].hour[0].wind_dir,
                })
            }

            for (let i = 0; i < arrOfThreeDays.length; i++) {
                makeOutPut(arrOfThreeDays[i].dayName, arrOfThreeDays[i].formattedDate, arrOfThreeDays[i].location, arrOfThreeDays[i].tempC, arrOfThreeDays[i].dataText, arrOfThreeDays[i].icon, arrOfThreeDays[i].wind, arrOfThreeDays[i].avghumidity, arrOfThreeDays[i].windDir)
            }
        }).catch((e) => {

        }).finally(() => {
            document.getElementById("spinner").classList.add("d-none");
        });
}

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        content.innerHTML = "";
        showWeather(searchInput.value);
    }
})

searchBtn.addEventListener("click", () => {
    content.innerHTML = "";
    showWeather(searchInput.value);
});


function returnDate(myDate) {
    const date = new Date(myDate);
    const day = date.getDate();

    const month = date.toLocaleString("en-US", { month: "short" });
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = `${day} ${month}`;

    return {
        date: dayName,
        formatted: formattedDate
    }
}



function makeDivAddClass(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
}

function makeOutPut(nameDay, date, currentCountryName, tempC, conditionTextCurrent, conditionIcon, maxwind_kph, avghumidityTEXT, windDir) {
    const container = makeDivAddClass("col-lg-4")

    const mainContent = makeDivAddClass("bg-content rounded-3")

    const headToday = makeDivAddClass("head p-3 d-flex align-items-center justify-content-between")

    const nameToday = document.createElement("div");
    nameToday.innerHTML = nameDay;

    const dateToDay = document.createElement("div");
    dateToDay.innerHTML = date;

    headToday.appendChild(nameToday);
    headToday.appendChild(dateToDay);

    mainContent.appendChild(headToday);

    const body = makeDivAddClass("pt-4 pb-4 px-4");

    const countryName = document.createElement("h4");
    countryName.innerHTML = currentCountryName;

    const temp_c = document.createElement("h1");
    temp_c.className = "display-2 fw-bold ms-1";
    temp_c.innerHTML = `${tempC}<sup>o</sup>C`;

    const icon = document.createElement("img");
    icon.className = "w-100px";
    icon.src = conditionIcon;

    const conditionText = document.createElement("p");
    conditionText.className = "text-info fs-5";
    conditionText.innerHTML = conditionTextCurrent;

    const footer = makeDivAddClass("d-flex align-items-center justify-content-between pb-3 px-3");

    const wind = document.createElement("span");

    const imgWind = document.createElement("img");
    imgWind.className = "me-2"
    imgWind.src = "icon-wind.png";

    const maxwind = document.createElement("span");
    maxwind.innerHTML = `${maxwind_kph} k.m/h`;

    wind.appendChild(imgWind);
    wind.appendChild(maxwind);

    const avghumidity = document.createElement("span");

    const imgavghumidity = document.createElement("img");
    imgavghumidity.className = "me-2";
    imgavghumidity.src = "icon-umberella.png";

    const avghumidityText = document.createElement("span");
    avghumidityText.innerHTML = `${avghumidityTEXT}%`;

    avghumidity.appendChild(imgavghumidity);
    avghumidity.appendChild(avghumidityText);

    const dir = document.createElement("span");

    const imgDir = document.createElement("img");
    imgDir.className = "me-2";
    imgDir.src = "icon-compass.png";

    const dirText = document.createElement("span");
    dirText.innerHTML = windDir;

    dir.appendChild(imgDir);
    dir.appendChild(dirText);



    footer.appendChild(wind);
    footer.appendChild(avghumidity);
    footer.appendChild(dir);

    body.appendChild(countryName);
    body.appendChild(temp_c);
    body.appendChild(icon);
    body.appendChild(conditionText);

    mainContent.appendChild(body);
    mainContent.appendChild(footer);

    container.appendChild(mainContent);
    content.appendChild(container);
}