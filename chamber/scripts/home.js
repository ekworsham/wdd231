let currentYear = document.querySelector("#currentYear");
let lastModified = document.querySelector("#lastModified");
const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
// todayF = today.getDate();

const currentTemp = document.querySelector(`#current-temp`);
const highTemp = document.querySelector(`#high-temp`);
const lowTemp = document.querySelector(`#low-temp`);
const humidity = document.querySelector(`#humidity`);
const sunrise = document.querySelector(`#rise`);
const sunset = document.querySelector(`#set`);
const weatherIcon = document.querySelector(`#weather-icon`);
const captionDesc = document.querySelector(`figcaption`);

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
            displayWeatherResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }   
}

// displaying the json data into the web page
function displayWeatherResults(data) {
    currentTemp.innerHTML = `${data.main.temp}°F`;
    highTemp.innerHTML = `${data.main.temp_max}°F`;
    lowTemp.innerHTML = `${data.main.temp_min}°F`;
    humidity.innerHTML = `${data.main.humidity}%`;
    
    const sunriseTime = new Date(data.sys.sunrise*1000);
    sunrise.innerHTML = sunriseTime.toLocaleTimeString();
    
    const sunsetTime = new Date(data.sys.sunset*1000);
    sunset.innerHTML = sunsetTime.toLocaleTimeString();
    
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
const todayA = document.querySelector("#today-a");
const todayB = document.querySelector("#today-b");
const todayC = document.querySelector("#today-c");

async function fetchForecast() {
    try {
        const response = await fetch(urlF);
        if (response.ok) {
            const dataF = await response.json();
            console.log(dataF);
            displayForecastResults(dataF);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }   
}

// // displaying the json data into the web page

function displayForecastResults(dataF) {
    const date2 = `${dataF.list[8].dt_txt}`;
    const dateB = new Date(date2); 
    const dayName2 = dateB.toLocaleDateString('en-US', { weekday: 'long' });

    const date3 = `${dataF.list[16].dt_txt}`;
    const dateC = new Date(date3); 
    const dayName3 = dateC.toLocaleDateString('en-US', { weekday: 'long' });
    
 

    todayA.innerHTML = `Today: ${dataF.list[0].main.temp}°F`;
    todayB.innerHTML = `${dayName2}: ${dataF.list[1].main.temp}°F`;
    todayC.innerHTML = `${dayName3}: ${dataF.list[2].main.temp}°F`;
    
}
fetchForecast();

// ************************
// get member cards
// ************************
const memberUrl = "https://github.com/ekworsham/wdd231/blob/main/chamber/data/home.json";

const cards=document.querySelector("#card");

async function getMemberData() {
    try {
        const response = await fetch(memberUrl);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

async function createMemberCards() {
    cards.innerHTML = " ";
    const data = await getMemberData();
    console.log(data)

    if (data) {
        data.forEach(home => {
        const card = document.createElement("div");
            card.setAttribute("class", "businessCard1");
            card.innerHTML = `
                <div class="cardHeader1">
                    <img src="${home.image}" alt="${home.name}" class="profileImg1">
                    <div class="contactInfo1">
                        <h3>${member.name}<br>${member.title}</h3>
                        <p>ADDRESS: ${member.address}</p>
                        <p>PHONE: ${member.phoneNumber}</p>
                        <p>URL: ${member.url}</p>
                        <p>MEMBER LEVEL: ${member.membershipLevel}</p>
                    </div>
                </div>
            `;
            cards.appendChild(card);
         });
    }
}
createMemberCards();