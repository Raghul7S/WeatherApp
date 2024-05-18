const apiKey ='e4dbac412fea2f95b829ae086273bb37'; // This is the API key for accessing the weather data from OpenWeatherMap.

function getWeather(){
    const city = document.getElementById('city').value; // Get the city name inputted by the user from the input element with id 'city'.

    if(!city){
        alert('Please enter city');
        return;
    } // If no city is entered, display an alert to prompt the user to enter a city, then exit the function.

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // Construct the URL for the API request to get the current weather for the specified city.

    fetch(currentWeatherUrl)
        .then(response => response.json()) // Fetch the data from the API and convert the response to JSON format.
        .then(data => {
            displayWeather(data); // Once the data is fetched, call the displayWeather function to display the weather information.
        })
        .catch(error=>{
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        }); // If there is an error fetching the data, log the error to the console and display an alert to the user.
}

function displayWeather(data) {
    const temDivInfo = document.getElementById('temp-div'); // Get the element with id 'temp-div' to display the temperature information.
    const weatherInfoDiv = document.getElementById('weather-info'); // Get the element with id 'weather-info' to display the weather information.
    const weatherIcon = document.getElementById('Weather-icon'); // Get the image element with id 'Weather-icon' to display the weather icon.

    if (data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`; // If the city is not found (status code 404), display the error message in the weatherInfoDiv.
    } else{
        const cityName = data.name; // Get the name of the city from the data.
        const temperature = Math.round(data.main.temp - 273.15); // Convert the temperature from Kelvin to Celsius and round it.
        const description = data.weather[0].description; // Get the weather description.
        const iconCode = data.weather[0].icon; // Get the weather icon code.
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; // Construct the URL for the weather icon image.

        const temperatureHTML = `<p>${temperature}°C</p>`; // Create an HTML string for the temperature.
        const weatherHTML = `<p>${cityName}</p> <p>${description}</p>`; // Create an HTML string for the city name and weather description.

        temDivInfo.innerHTML = temperatureHTML; // Update the tempDivInfo element with the temperature HTML.
        weatherInfoDiv.innerHTML = weatherHTML; // Update the weatherInfoDiv element with the weather HTML.
        weatherIcon.src = iconUrl; // Set the src attribute of the weatherIcon element to the icon URL.
        weatherIcon.alt = description; // Set the alt attribute of the weatherIcon element to the weather description.

        showImage(); // Call the showImage function to display the weather icon image.
    }
}

function showImage() {
    const weatherIcon = document.getElementById('Weather-icon'); // Get the image element with id 'Weather-icon'.
    weatherIcon.style.display = 'block'; // Set the display style of the weatherIcon element to 'block' to make it visible.
}
