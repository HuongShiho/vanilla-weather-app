//function show date and time
function showDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let showday = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${showday} ${hours}:${min}`;
}

//Search engine: show city
let APIkey = "5863935ee9cca4c02ed68203f807c65b";
function showCity(response) {
  //real time local data
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}km/h`;
  document.querySelector("#describe").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;
  celsius = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsius);
  document.querySelector("#timestamps").innerHTML = showDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

//forecast data
function getForecast(forecast) {
  let lat = forecast.lat;
  let lon = forecast.lon;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function formatForecastDay(timestamps) {
  let day = new Date(timestamps * 1000);
  day = day.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `   
        <div class="col-2">
          <div class="week-day">
              ${formatForecastDay(forecastDay.dt)}
              <div class="image">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  id="icon"
                />
              </div>
              <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span>
              <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getURL(cityInput) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIkey}&units=metric`;
  axios.get(url).then(showCity);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  getURL(cityInput);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(myLocation);
}
function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
  axios.get(url).then(showCity);
}

getURL("Tsukuba");
let city = document.querySelector("form");
city.addEventListener("submit", handleSubmit);
let current = document.querySelector("#current-button");
current.addEventListener("click", getLocation);
