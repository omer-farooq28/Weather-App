const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            alert(data.error?.message || "City not found.");
            return;
        }

        // Location
        document.getElementById("cityName").textContent =
            `${data.location.name}, ${data.location.country}`;

        // Temperature
        document.getElementById("temperature").textContent =
            `${data.current.temp_c}°C`;

        // Weather Condition
        document.getElementById("condition").textContent =
            data.current.condition.text;

        // Local Date & Time
        document.getElementById("date").textContent =
            data.location.localtime;

        // Weather Icon
        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;
        document.getElementById("weatherIcon").alt =
            data.current.condition.text;

        // Feels Like
        document.getElementById("feelsLike").textContent =
            `${data.current.feelslike_c}°C`;

        // Humidity
        document.getElementById("humidity").textContent =
            `${data.current.humidity}%`;

        // Wind
        document.getElementById("wind").textContent =
            `${data.current.wind_kph} km/h`;

        // Visibility
        document.getElementById("visibility").textContent =
            `${data.current.vis_km} km`;

        // UV Index
        document.getElementById("uv").textContent =
            data.current.uv;

        // AQI (PM2.5)
        if (data.current.air_quality) {
            document.getElementById("aqi").textContent =
                Math.round(data.current.air_quality.pm2_5);
        } else {
            document.getElementById("aqi").textContent = "N/A";
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
}