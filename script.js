// Day & Time
function formatDate(now) {
  let dayIndex = now.getDay();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[dayIndex];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}  ${hour} : ${minute}`;
}

let dateElement = document.querySelector("#day-time");
let now = new Date();
dateElement.innerHTML = formatDate(now);
// Weather
function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;

  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let discriptionElement = document.querySelector("#description");
  discriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconTodayElement = document.querySelector("#icon-today");
  iconTodayElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconTodayElement.setAttribute("alt", response.data.weather[0].description);
}

// Search engine
function search(city) {
  let apiKey = "63e5d82d6246e7e494e19e9c5b4326e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input").value;
  search(cityInputElement);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("perth");
