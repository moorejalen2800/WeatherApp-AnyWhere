var apiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
var weatherUrl = 'https://api.openweathermap.org';
var searchHistory = [];
var input = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form")
var todayContainer = document.querySelector("#today")
var forcastContainer = document.querySelector("#forcast")


    dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
    var apiUrl = `${weatherUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            renderItems(city, data);
        });
}

function fetchCoords(search) {
    apiUrl = `${weatherUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data[0]) {
                alert('Location not found');
            } else {
                // appendToHistory(search);
                fetchWeather(data[0]);
            }
            console.log(data);
           
        })
}

function handleSearch(e) {
    if (!input.value) {
        return;
    }
   e.preventDefault();
   var search = input.value.trim();
    fetchCoords(search);
    input.value = '';
}

searchForm.addEventListener('submit', handleSearch);
function displayWeather(city, data, timezone) {
    var date = dayjs().format('M/D/YYYY');
    // const  name  = data.name;
    // const  icon, description  = data.weather[0];
    var tempF = data.temp;
    var wind  = data.wind_speed;
    var humidity = data.humidity;

    var card= document.createElement ('div');
    var cardBody = document.createElement ('div');
    
    
    var heading = document.querySelector("#city");
    // document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    // document.querySelector(".description").innerText = "Description" + data;
    var tempEl = document.querySelector("#temp");
    var humidityEl = document.querySelector("#humidity");
    var windEl = document.querySelector("#wind");

    card.append(cardBody);

    heading.textContent = `${city} (${date})`;
    tempEl.textContent = `"temp" + ${tempF} + "°"`;
    humidityEl.textContent = `"Humidity: " + ${humidity} + "%"`;
    windEl.textContent = `"wind: " + ${wind}`;

    cardBody.append(heading, tempEl, windEl, humidityEl);

    todayContainer.innerHTML = '';
    todayContainer.append (card);

    console.log(data);

}
// search: function () {
//     this.fetchWeather(document.querySelector(".search-bar").value);
// }







function renderItems(city, data) {
    displayWeather(city, data.current, data.timezone);
}
    
