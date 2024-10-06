let currentYear = document.querySelector("#currentYear");
let lastModified = document.querySelector("#lastModified");
const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
todayF = today.getDate();

const currentTemp = document.querySelector(`#current-temp`);
const highTemp = document.querySelector(`#high-temp`);
const lowTemp = document.querySelector(`#low-temp`);
const humidity = document.querySelector(`#humidity`);
const sunrise = document.querySelector(`#rise`);
const sunset = document.querySelector(`#set`);
const weatherIcon = document.querySelector(`#weather-icon`);
const captionDesc = document.querySelector(`figcaption`);
const myTown = document.querySelector(`#my-town`);


// required variables for the url
const mykey = "e8c1860a4d916ff69b865d14428dc98b"
const myLat = "42.34"
const myLong = "-87.88"

// full path to url
const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=imperial&appid=${mykey}`

const urlF = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=imperial&appid=${mykey}`


// ****************************************
// getting the current weather data
// ****************************************
async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }   
}

// displaying the json data into the web page
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}°F`;
    highTemp.innerHTML = `${data.main.temp_max}°F`;
    lowTemp.innerHTML = `${data.main.temp_min}°F`;
    humidity.innerHTML = `${data.main.humidity}%`;

    const sunriseTime = new Date(data.sys.sunrise*1000);
    sunrise.innerHTML = sunriseTime.toLocaleTimeString();

    const sunsetTime = new DataTransfer(data.sys.sunset*1000);
    sunset.innerHTML = sunsetTime.toLocaleTimeString();

    myTown.innerHTML = data.name;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    let desc = data.weather[0].description;
    captionDesc.textContent = `${desc}`;
}
fetchWeather();

// ****************************************
// getting the forecast
// ****************************************
async function fetchForecast() {
    try {
        const response = await fetch(urlF);
        if (response.ok) {
            const dataF = await response.json();
            console.log(dataF);
            displayResults(dataF);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }   
}

// displaying the json data into the web page
// function displayResults(dataF) {
    
    
// }
fetchForecast();