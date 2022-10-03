//function show date and time
function showDate(now) {
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
//call function
let dateText = document.querySelector("#timestamps");
let now = new Date();
dateText.innerHTML = showDate(now);
//

//Search engine: show city
let APIkey = "c95d60a1e3adbeb286133f1ebebc2579";
function showCity(response) {
  console.log(response.data.weather);
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}km/h`;
  document.querySelector("#describe").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
  myLocation();
}

function myLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
  axios.get(url).then(showCity);
}

let city = document.querySelector("form");
city.addEventListener("submit", handleSubmit);
navigator.geolocation.getCurrentPosition(myLocation);
let current = document.querySelector("#current-button");
current.addEventListener("click", getLocation);
