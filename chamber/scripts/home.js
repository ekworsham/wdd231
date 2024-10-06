const currentTemp = document.querySelector(`#current-temp`);
const highTemp = document.querySelector(`#high-temp`);
const lowTemp = document.querySelector(`#low-temp`);
const weatherIcon = document.querySelector(`#weather-icon`);
const captionDesc = document.querySelector(`figcaption`);
const myTown = document.querySelector(`#my-town`);


// required variables for the url
const mykey = "e8c1860a4d916ff69b865d14428dc98b"
const myLat = "42.34"
const myLong = "-87.88"

// full path to url
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=imperial&appid=${mykey}`

// grabbing the current weather data
async function apiFetch() {
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
    highTemp.innerHTML = `${data.main.temp}°F`;
    lowTemp.innerHTML = `${data.main.temp}°F`;
    myTown.innerHTML = data.name;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    let desc = data.weather[0].description;
    captionDesc.textContent = `${desc}`;
}
apiFetch();