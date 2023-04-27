const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const iconElement = document.querySelector('.icon');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const windSpeedElement = document.querySelector('.wind-speed');
const precipitationElement = document.querySelector('.precipitation');
const forecastElement = document.querySelector('.forecast');
const API_KEY = '3e69e2759b1ae274d4201a027343096e'; 
searchBtn.addEventListener('click', async () => {
    const city = searchInput.value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const weatherData = await fetchWeatherData(city);

    if (weatherData) {
        updateUI(weatherData);
    }
});

async function fetchWeatherData(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data.cod !== 200) {
        alert('Error: Unable to fetch weather data. Please try again.');
        return;
    }

    return {
        location: data.name,
        temperature: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        // OpenWeatherMap doesn't provide precipitation directly, so we use rain or snow data if available
        precipitation: data.rain?.['1h'] || data.snow?.['1h'] || 0,
    };
}

function updateUI(weatherData) {
    locationElement.textContent = weatherData.location;
    temperatureElement.textContent = `${weatherData.temperature.toFixed(1)}°F`;
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.icon}@2x.png" alt="${weatherData.description}">`;
    descriptionElement.textContent = weatherData.description;
    humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${weatherData.windSpeed} m/s`;
    precipitationElement.textContent = `Precipitation: ${weatherData.precipitation} mm`;

    // Clear the forecast element
    forecastElement.innerHTML = '';

    // Optionally, you can fetch and display the weather forecast here
}
