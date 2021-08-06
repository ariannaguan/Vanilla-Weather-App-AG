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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2 weather-forecast-day">
  <div >${formatDay(forecastDay.dt)}</div>
    <img 
    src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" 
    alt=""
    />              
    <div class="weather-forecast-temperatures>
    <span class="max-temp"><strong>${Math.round(
      forecastDay.temp.max
    )}</strong></
    span>
     | 
    <span >${Math.round(forecastDay.temp.min)}°</
    span>
    </div>
  </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "63e5d82d6246e7e494e19e9c5b4326e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celciusTemperaure = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;

  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = Math.round(celciusTemperaure);

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

  getForecast(response.data.coord);
}

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
