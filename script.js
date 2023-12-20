const apiKey = "ecb2320e2edebfb44db0dfb5c6cca0ca";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const countryApiUrl = "https://restcountries.com/v3.1/name/";

const searchInput = document.getElementById("searchInput");
const weatherIcon = document.querySelector(".weather-icon");

async function search() {
    const city = searchInput.value;

    // Fetching weather data
    const weatherResponse = await fetch(weatherApiUrl + city + `&appid=${apiKey}`);
    const weatherData = await weatherResponse.json();
    displayWeatherData(weatherData);
    let countryName = weatherData.sys.country
    if (countryName === "US") {
        countryName = "USA"
    }
    if (countryName === "RU") {
        countryName = "Russia"
    }
    // Fetched country data
    const countryResponse = await fetch(countryApiUrl + countryName);
    const countryData = await countryResponse.json();
    console.log(weatherData)
        // Displaying the weather and the country data:

    displayCountryData(countryData);
    document.getElementById('show').style.display = 'inline-block';
    document.getElementById('hide').style.display = 'none';
    document.getElementById('countryData').style.display = 'none';;
    document.getElementById("searchInput").value = "";
}

function displayWeatherData(data) {
    console.log(data.cod)
    if (data.cod === "404") {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector("#show").style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
        document.querySelector(".temp").innerHTML = "<b>Temperature: </b>" + Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = "<b>Humidity: </b>" +
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = "<b>Wind Speed: </b>" + data.wind.speed + "km/h";
        document.querySelector(".wName").innerHTML = "<b>Weather Type: </b>" + data.weather[0].main;

        setWeatherIcon(data.weather[0].main);

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
// Setting icon for the weather
function setWeatherIcon(weatherMain) {
    const iconPath = `images/${weatherMain.toLowerCase()}.png`;



    if (weatherMain === "Clouds") {
        weatherIcon.src = "images/clouds.jpg"
    } else
    if (weatherMain === "Clear") {
        weatherIcon.src = "images/clear.png"
    } else if (weatherMain === "Rain" || weatherMain == "Rainy") {
        weatherIcon.src = "images/rain.png"
    } else if (weatherMain === "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    } else if (weatherMain === "Mist") {
        weatherIcon.src = "images/mist.png"
    } else if (weatherMain === "Haze") {
        weatherIcon.src = "images/haze.png"
    } else(
        weatherIcon.src = "images/rainy.jpg"
    )
}

function displayCountryData(data) {
    const countryDataContainer = document.getElementById("countryData");
    countryDataContainer.innerHTML = "";

    data.forEach(country => {
        const card = document.createElement("div");
        card.className = "shadow-lg p-3 mb-5 bg-white rounded country-card";

        card.innerHTML = `
        <h1><b>Name:</b> ${country.name.official} </h1>
            <div class="grid-container">
                <div><b>Population:</b></div>
                <div>${country.population}</div>
    
                <div><b>Capital:</b></div>
                <div>${country.capital}</div>
    
                <div><b>Flag of the country:</b></div>
                <div><img src="${country.flags.svg}" alt="Flag" class="flag-image" width='300px'></div>
    
                <div><b>Currency:</b></div>
                <div>${Object.keys(country.currencies)}</div>
            </div>
        `;

        countryDataContainer.appendChild(card);
    });

}
// Making the Show More Button functional
function showMore() {
    document.getElementById('countryData').style.display = 'block';
    document.getElementById('hide').style.display = 'inline-block';
    document.getElementById('show').style.display = 'none';
}
//Making Hide Details button functional
function hide() {
    document.getElementById('countryData').style.display = 'none';
    document.getElementById('hide').style.display = 'none';
    document.getElementById('show').style.display = 'inline-block';
}