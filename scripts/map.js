const currentTemp = document.querySelector(`#current-temp`);
const weatherIcon = document.querySelector(`#weather-icon`);
const captionDesc = document.querySelector(`figcation`);

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=e8c1860a4d916ff69b865d14428dc98b"

async function getWeatherData() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

getWeatherData();