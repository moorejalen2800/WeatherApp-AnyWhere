
    var apiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
    var weatherUrl = 'https://api.openweathermap.org';
    var searchHistory = [];
    var input = document.querySelector(".search-bar");


    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);
    
    function fetchWeather (city) {
        var { lat } = location;
        var { lon } = location;
        var city = location.name;
        var apiUrl = `${weatherUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
               renderItems(city, data);
            });
    }

    function fetchCoords (search) {
        apiUrl = `${weatherUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
        fetch(apiUrl)
        .then(function (response) {
            if(!data[0]) {
                alert('Location not found');
            }else {
                appendToHistory(search);
                fetchWeather(data[0]);
            }
            console.log(data);
        })
    }

    function renderItems(city, data) {
        console.log(data);
    }

    function displayWeather (city, data, timezone) {
        const date = dayjs90.format('M/D/YYYY');
        const { name } = data.name;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in" + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = "Description" + data;
        document.querySelector(".temp").innerText; "temp" + temp + "°";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";

    }
    // search: function () {
    //     this.fetchWeather(document.querySelector(".search-bar").value);
    // }





function handleSearch (e) {
    
    input.value.trim();
    fetchCoords(search);
    input.value = '';
}

addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        console.log('search clicked')
    }
});
fetchWeather();
displayWeather();



