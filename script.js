let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekDays[now.getDay()];
let currentDay = document.querySelector("#day");
currentDay.innerHTML = `${day}`;
let currentHour = document.querySelector("#hours");
currentHour.innerHTML = `${hours}`;
let currentMinutes = document.querySelector("#minutes");
currentMinutes.innerHTML = `${minutes}`;
// Date
function currentDate(date) {
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];
  let todayDate = now.getDate();
  if (todayDate < 10) {
    todayDate = `0${todayDate}`;
  }
  let year = now.getFullYear();
  return `${todayDate}/${month}/${year}`;
}
let date = document.querySelector(".date");
date.innerHTML = currentDate(now);
// Search form
function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city-search");
  let headCity = document.querySelector("#city");
  headCity.innerHTML = `${inputCity.value}`;
  let apiKey = "427e704ef746829b25864c7ff811b8fc";
  let units = "metric";
  let apiEnpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEnpoint}q=${inputCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let city = response.data.name;
  let humidity = document.querySelector("li#humi");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let headCity = document.querySelector("#city");
  headCity.innerHTML = city;
}
//current weather button
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "427e704ef746829b25864c7ff811b8fc";
  let units = "metric";
  let apiUrl = `${endpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrent);

// Temperature
// let celciusDegrees = document.querySelector(".celciusLink");
// let fahrenheitDegrees = document.querySelector(".fahrenheitLink");
// function celciusTemp(event) {
//   event.preventDefault();
//   let celTem = document.querySelector("#current-temperature");
//   celTem.innerHTML = 19;
// }
// celciusDegrees.addEventListener("click", celciusTemp);
// function fahrenheitTemp(event) {
//   event.preventDefault();
//   let fahTem = document.querySelector("#current-temperature");
//   fahTem.innerHTML = 66;
// }
// fahrenheitDegrees.addEventListener("click", fahrenheitTemp);
// //night temperature
// let nightCelDegree = document.querySelector(".celciusLinkNight");
// let nightFahDegree = document.querySelector(".fahrenheitLinkNight");
// function nightCel(event) {
//   event.preventDefault();
//   let nightCel = document.querySelector("#night-temperature");
//   nightCel.innerHTML = 8;
// }
// nightCelDegree.addEventListener("click", nightCel);
// function nightFah(event) {
//   event.preventDefault();
//   let nightFah = document.querySelector("#night-temperature");
//   nightFah.innerHTML = 48;
// }
// nightFahDegree.addEventListener("click", nightFah);
