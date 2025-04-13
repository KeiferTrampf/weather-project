const main = document.querySelector("main");
const searchButton = document.querySelector("#search");
const weatherContainer = document.querySelector(".container");
const clearButton = document.querySelector("#clear");
const weatherCard = document.querySelector(".card");
const weatherInfo = document.querySelector(".weather");
let keyword = document.querySelector("#city");
let weatherData = [];

var map = L.map("map").setView([49.25, -123.33], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=505b3cf5f180493ba7102053252103&q=${city}&days=1&aqi=no&alerts=no`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    displayError();
    return null;
  }
}
function displayError() {
  weatherContainer.innerHTML = `
    <h2>Error</h2>
    <p>Problem Encountered. Please check spelling or console log.</p>`;
}
// function displayWeather(weatherData) {
//   weatherContainer.innerHTML = `
//   <h2>Weather Result</h2>
//   <h3>${weatherData.location.name}, ${weatherData.location.country}</h3>
//   <p>Temperature: ${weatherData.current.temp_c}°C</p>`;
// };
function displayWeatherCard(weatherData) {
  const card = document.createElement("div"); // Create a new div element
  card.classList.add("card");
  card.innerHTML = `
      <h2>${weatherData.location.name}</h2>
        <div id=cdnImg>
          <img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
        </div>
        <p>Temperature: ${weatherData.current.temp_c}°C<br>
        <p>Last Updated: ${weatherData.current.last_updated}<br>
        <p>Condition: ${weatherData.current.condition.text}</p>
        `;
  weatherContainer.appendChild(card); // Append the card to the container
}
function displayWeather(weatherData) {
  weatherInfo.innerHTML = `
    <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
    <h3>Temperature: ${weatherData.current.temp_c}°C</h3>
    <p>Feels Like: ${weatherData.current.feelslike_c}°C</p>
    <p>Condition: ${weatherData.current.condition.text}</p>
    <p>Humidity: ${weatherData.current.humidity}%</p>
    <p>Wind Speed: ${weatherData.current.wind_kph} kph</p>
    <p>Last Updated: ${weatherData.current.last_updated}</p>`;
}
function setMap(weatherData) {
  map.setView([weatherData.location.lat, weatherData.location.lon], 13); // Set the map view to the location's coordinates
  L.marker([weatherData.location.lat, weatherData.location.lon])
    .addTo(map)
    .bindPopup(weatherData.location.name)
    .openPopup();
}
function clearWeatherCard() {
  weatherContainer.innerHTML = ""; // Clear the container
  weatherInfo.innerHTML = ""; // Clear the weather info
}
async function onMapClick(e) {
  const lat = e.latlng.lat; // Get the latitude from the click event
  const lon = e.latlng.lng; // Get the longitude from the click event
  console.log(`Latitude: ${lat}, Longitude: ${lon}`); // Log the coordinates to the console
  fetchWeather(`${lat},${lon}`);
  const weatherData = await fetchWeather(`${lat},${lon}`);
  displayWeatherCard(weatherData); // Display the weather data for the clicked location
  setMap(weatherData); // Set the map to the clicked location
  displayWeather(weatherData); // Display the weather data
}
keyword.addEventListener("input", (event) => {
  keyword = event.target.value;
  console.log(keyword);
});
clearButton.addEventListener("click", () => {
  clearWeatherCard();
});
searchButton.addEventListener("click", async () => {
  weatherData = await fetchWeather(keyword); // Fetch weather data for the input city
  console.log(weatherData);
  displayWeatherCard(weatherData);
  setMap(weatherData);
  displayWeather(weatherData); // Display the weather data
});
document.body.addEventListener("click", async function (event) {
  if (event.target.classList.contains("card")) {
    const cityName = event.target.querySelector("h2").textContent; // Get the city name from the clicked card
    console.log(cityName); // Log the city name to the console
    keyword.value = cityName; // Set the input field to the clicked city name
    const weatherData = await fetchWeather(cityName); // Fetch weather data for the clicked city
    setMap(weatherData); // Set the map to the clicked city's location
    displayWeather(weatherData); // Display the weather data
  }
});
map.on("dblclick", onMapClick);
