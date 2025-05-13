// Documentation: https://open-meteo.com/en/docs 

document.getElementById("get-weather-btn").addEventListener("click", getWeather);

function convertToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

async function getWeather() {
    let weatherDiv = document.getElementById("weather-info");
    weatherDiv.innerHTML = "Fetching weather...";

    // Get user location
    if (!navigator.geolocation) {
        weatherDiv.innerHTML = "Geolocation is not supported by your browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        try {
            // Reverse geocoding to get the location name
            let locationResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            let locationData = await locationResponse.json();
            let address = locationData.address;
            let locationName = `${address.city || address.town || address.village || ""}, ${address.state || ""},
                 ${address.country || ""}, ${address.postcode || ""}`;

            // Weather data
            let weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`
            );
            let weatherData = await weatherResponse.json();

            let temperature = weatherData.current.temperature_2m;
            let temperatureF = convertToFahrenheit(weatherData.current.temperature_2m);
            let weatherCode = weatherData.current.weathercode;
            let weatherDescription = weatherCodes[weatherCode]?.text || "Unknown";
            let emoji = weatherCodes[weatherCode]?.emoji || "";

            weatherDiv.innerHTML = `
                <p><strong>Location:</strong> ${locationName}</p>
                <p><strong>Temperature:</strong> ${temperature}°C  | ${temperatureF}°F</p>
                <p><strong>Condition:</strong> ${weatherDescription} ${emoji}</p>
            `;
        } catch (error) {
            weatherDiv.innerHTML = "Failed to retrieve weather or location data.";
            console.error("Error:", error);
        }
    }, () => {
        weatherDiv.innerHTML = "Unable to retrieve your location.";
    });
}

// Mapping weather codes to descriptions and emojis
const weatherCodes = {
    0: { text: "Clear sky", emoji: "☀️" },
    1: { text: "Mainly clear", emoji: "🌤️" },
    2: { text: "Partly cloudy", emoji: "⛅" },
    3: { text: "Overcast", emoji: "☁️" },
    45: { text: "Fog", emoji: "🌫️" },
    48: { text: "Depositing rime fog", emoji: "🌫️❄️" },
    51: { text: "Light drizzle", emoji: "🌦️" },
    53: { text: "Moderate drizzle", emoji: "🌧️" },
    55: { text: "Dense drizzle", emoji: "🌧️" },
    56: { text: "Light freezing drizzle", emoji: "🌧️❄️" },
    57: { text: "Dense freezing drizzle", emoji: "🌧️❄️" },
    61: { text: "Slight rain", emoji: "🌧️" },
    63: { text: "Moderate rain", emoji: "🌧️" },
    65: { text: "Heavy rain", emoji: "🌧️🌧️" },
    66: { text: "Light freezing rain", emoji: "🌧️❄️" },
    67: { text: "Heavy freezing rain", emoji: "🌧️❄️❄️" },
    71: { text: "Slight snow fall", emoji: "🌨️" },
    73: { text: "Moderate snow fall", emoji: "🌨️🌨️" },
    75: { text: "Heavy snow fall", emoji: "❄️❄️❄️" },
    77: { text: "Snow grains", emoji: "❄️" },
    80: { text: "Slight rain showers", emoji: "🌦️" },
    81: { text: "Moderate rain showers", emoji: "🌧️" },
    82: { text: "Violent rain showers", emoji: "🌧️🌩️" },
    85: { text: "Slight snow showers", emoji: "🌨️" },
    86: { text: "Heavy snow showers", emoji: "❄️❄️" },
    95: { text: "Thunderstorm", emoji: "🌩️" },
    96: { text: "Thunderstorm with slight hail", emoji: "🌩️🧊" },
    99: { text: "Thunderstorm with heavy hail", emoji: "🌩️🧊🧊" },
};
