let keyword = document.querySelector("#city") // Default keyword
const searchButton = document.querySelector("#search");  
let weatherData = []; // Global variable to store weather data

async function fetchWeather() {
  try {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=505b3cf5f180493ba7102053252103&q=${keyword}&days=1&aqi=no&alerts=no`
  );
  const data = await response.json();
  return data;
  } catch (error) {
    console.error("Error fetching weather data:", error); // Log any errors
    return null; // Return null in case of an error
  };
};
keyword.addEventListener("input", (event) => {
  keyword = event.target.value; // Update the keyword with the input value
  console.log(keyword); // Log the updated keyword
});


// Add event listener to the search button



searchButton.addEventListener("click", async () => {
  try {
  weatherData = await fetchWeather(); // Wait for the Promise to resolve
  console.log(weatherData); // Log the fetched weather data
function displayWeather(weatherData) {
  const weatherContainer = document.querySelector("#weatherresult"); 
  weatherContainer.innerHTML = ""; // Clear previous weather data
  const header = document.createElement("h2");
  header.innerHTML = "Weather Result";
  weatherContainer.appendChild(header); // Append header to the container
  const location = document.createElement("h3");
  location.innerHTML = `${weatherData.location.name}, ${weatherData.location.country}`; // Display location name and country
  weatherContainer.appendChild(location); // Append location to the container
  const temp = document.createElement("p");
  temp.innerHTML = `Temperature: ${weatherData.current.temp_c}°C`; // Display temperature
  weatherContainer.appendChild(temp); // Append temperature to the container
} } catch (error) {
    console.error("Error fetching weather data:", error); // Log any errors
    const weatherContainer = document.querySelector("#weatherresult"); 
    weatherContainer.innerHTML = "<p>Error fetching weather data. Please try again.</p>"; // Display error message
  }
  displayWeather(weatherData);
});

