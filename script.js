
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

const latitude = 41.5800;
const longitude = -74.9168;
const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,windspeed_10m&timezone=auto`;

const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: light",
    53: "Drizzle: moderate",
    55: "Drizzle: dense",
    61: "Rain: slight",
    63: "Rain: moderate",
    65: "Rain: heavy",
    71: "Snow: slight",
    73: "Snow: moderate",
    75: "Snow: heavy",
    95: "Thunderstorm"
};

const weatherIcons = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
    51: "🌧️", 53: "🌧️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
    71: "❄️", 73: "❄️", 75: "❄️", 95: "⛈️"
};

fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        const weather = data.current;
        const temp = weather.temperature_2m;
        const code = weather.weathercode;
        const wind = weather.windspeed_10m;

        document.getElementById('temperature').textContent = `${temp}°F`;
        document.getElementById('description').textContent = weatherDescriptions[code] || "Weather";
        document.getElementById('weather-icon').alt = weatherIcons[code] || "";
        document.getElementById('windspeed').textContent = `Wind: ${wind} mph`;
    })
    .catch(console.error);
