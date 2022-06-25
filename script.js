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
function search(city) {
  let apiKey = "427e704ef746829b25864c7ff811b8fc";
  let units = "metric";
  let apiEnpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEnpoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city-search");
  search(inputCity.value);
}
let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

search("Kyiv");
function showTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  celciusTemperature = response.data.main.temp;
  currentTemperature.innerHTML = Math.round(celciusTemperature);
  let city = response.data.name;
  let humidity = document.querySelector("li#humi");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let description = document.querySelector("li#description");
  description.innerHTML = response.data.weather[0].main;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;
  let headCity = document.querySelector("#city");
  headCity.innerHTML = city;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//current weather
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
window.onload = getCurrent;
//main cities
let cityLisbon = document.querySelector("#lisbon");
cityLisbon.addEventListener("click", () => search("lisbon"));
let cityWarsaw = document.querySelector("#warsaw");
cityWarsaw.addEventListener("click", () => search("warsaw"));
let cityRiga = document.querySelector("#riga");
cityRiga.addEventListener("click", () => search("riga"));
let cityVilnius = document.querySelector("#vilnius");
cityVilnius.addEventListener("click", () => search("vilnius"));
let citySofia = document.querySelector("#sofia");
citySofia.addEventListener("click", () => search("sofia"));
// Temperature
function dispalyFahrenheitTemp(event) {
  event.preventDefault();
  celciusDegrees.classList.remove("active");
  fahrenheitDegrees.classList.add("active");
  let currentTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}
function dispalyCelciusTemp(event) {
  event.preventDefault();
  celciusDegrees.classList.add("active");
  fahrenheitDegrees.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;
let fahrenheitDegrees = document.querySelector("#fahrenheit-link");
fahrenheitDegrees.addEventListener("click", dispalyFahrenheitTemp);
let celciusDegrees = document.querySelector("#celcius-link");
celciusDegrees.addEventListener("click", dispalyCelciusTemp);
