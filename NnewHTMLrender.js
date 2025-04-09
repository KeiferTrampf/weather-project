function displayWeather(weatherData) {
    const weatherContainer = document.querySelector("#weatherresult"); 
    weatherContainer.innerHTML = "";
    weatherContainer.innerHTML = `
    <h2>Weather Result</h2>
    <h3>${weatherData.location.name}, ${weatherData.location.country}</h3>
    <p>Temperature: ${weatherData.current.temp_c}°C</p>`; 
};
