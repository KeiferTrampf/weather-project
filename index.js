const searchButton = document.querySelector("#search");  
const weatherContainer = document.querySelector("#weatherResult"); 
let keyword = document.querySelector("#city"); 
let weatherData = [];

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=505b3cf5f180493ba7102053252103&q=${keyword}&days=1&aqi=no&alerts=no`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    // alert("Unable to fetch weather data. Please try again later.");
    displayError();
    return null;
  }
}
function displayError() {
  weatherContainer.innerHTML = `
    <h2>Error</h2>
    <p>Problem Encountered. Please check spelling or console log.</p>`;
}
function displayWeather(weatherData) {
  weatherContainer.innerHTML = `
  <h2>Weather Result</h2>
  <h3>${weatherData.location.name}, ${weatherData.location.country}</h3>
  <p>Temperature: ${weatherData.current.temp_c}°C</p>`; 
};

keyword.addEventListener("input", (event) => {
  keyword = event.target.value; 
  console.log(keyword); 
});

searchButton.addEventListener("click", async () => {
  weatherData = await fetchWeather(); 
  console.log(weatherData); 
  displayWeather(weatherData);
});