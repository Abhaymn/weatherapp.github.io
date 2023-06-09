const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city), { origin: "cors" });
        if (resp.status === 404) {
            alert("PLEASE ENTER A VALID CITY");
            return;
        }

        const respData = await resp.json();
        console.log(respData);
        addWeatherToPage(respData);
    } catch (error) {
        console.log(error);
    }
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = search.value;
  
    if (city) {
      getWeatherByLocation(city);
    } else {
        alert("ENTER THE CITY");
    }
  });