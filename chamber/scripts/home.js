let currentYear = document.querySelector("#currentYear");
let lastModified = document.querySelector("#lastModified");
const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
})

const currentTemp = document.querySelector(`#current-temp`);
if (currentTemp) {
    const highTemp = document.querySelector(`#high-temp`);
    const lowTemp = document.querySelector(`#low-temp`);
    const humidity = document.querySelector(`#humidity`);
    const sunrise = document.querySelector(`#rise`);
    const sunset = document.querySelector(`#set`);
    const weatherIcon = document.querySelector(`#weather-icon`);
    const captionDesc = document.querySelector(`figcaption`);
    // ******************************
    // required variables for the url
    // ******************************
    const mykey = "e8c1860a4d916ff69b865d14428dc98b"
    const myLat = "42.34"
    const myLong = "-87.88"
    
    // ****************
    // full path to url
    // ****************
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
    
    // ******************************************
    // displaying the json data into the web page
    // ******************************************
    function displayWeatherResults(data) {
        currentTemp.innerHTML = `${data.main.temp}°F`;
        highTemp.innerHTML = `${data.main.temp_max}°F`;
        lowTemp.innerHTML = `${data.main.temp_min}°F`;
        humidity.innerHTML = `${data.main.humidity}%`;
    
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        sunrise.innerHTML = sunriseTime.toLocaleTimeString();
    
        const sunsetTime = new Date(data.sys.sunset * 1000);
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
    
    // ******************************************
    // displaying the json data into the web page
    // ******************************************
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
}


// ************************
// get member cards
// ************************
const memberUrl = "https://ekworsham.github.io/wdd231/chamber/data/members.json";

const cards = document.querySelector("#card");

// **************************
// Home Page
// **************************
if (cards) {
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
        const filterData = data;
    
        for (let i = filterData.length; i > 3; i--) {
            const randonIndex = Math.floor(Math.random() * filterData.length);
            filterData.splice(randonIndex, 1);
            console.log(filterData);
        }
    
        filterData.forEach(member => {
            const card = document.createElement("div");
            card.setAttribute("class", "businessCard1");
            card.innerHTML = `
                <div class="cardHeader1">
                    <img src="${member.image}" alt="${member.name}" class="profileImg1">
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
    createMemberCards();
}


// **********************************
// For Join HTML
// **********************************

const membershipLevels = [
    {
        "name": "Non-Profit",
        "cost": "20 monthly",
        "benefits": [
            "Buisness listed in online directory",
            "Promote business on social media and digital platforms",
            "Your business displayed in monthly newsletter"
        ]
    },
    {
        "name": "Bronze",
        "cost": "41 monthly",
        "benefits": [
            "All of Non-Profit PLUS:",
            "Priority placement on our online directory",
            "Enhanced marketing support",
            "Discount advertising in newsletter and on digital sign"
        ]
    },
    {
        "name": "Silver",
        "cost": "100 monthly",
        "benefits": [
            "All of Non-Profit and Bronze PLUS:",
            "1 Free Advertisement in a monthly newsletter",
            "1 Diamond Sponsorship of an Annual Chamber Event"
        ]
    },
    {
        "name": "Gold",
        "cost": "400 monthly",
        "benefits": [
            "All of Non-Profit, Bronze and Silver PLUS:",
            "Free Advertisement in a all newsletter ",
            "Priority placement in newsletters",
            "Business included in promotional video marketing"
        ]
    }
]

const membershipLevelsElement = document.querySelector(".membership-levels")

if (membershipLevelsElement) {

// **************************
// Creates membership card
// **************************

    function createMembershipCard(membership) {
        const membershipCard = document.createElement("div")
        membershipCard.innerHTML = `
        
            <h4>${membership.name} Membership Level</h4>
            <button class="open-button-${membership.name}">Learn More</button>
        `
        membershipLevelsElement.appendChild(membershipCard)

        document
            .querySelector(`.open-button-${membership.name}`)
            .addEventListener("click", () => {
                createMembershipModal(membership)
            })
    }

// *****************************
// Create membership level modal
// *****************************
    function createMembershipModal(membership) {
        let membershipDialogBox = document.querySelector(".dialog-box")
        membershipDialogBox.innerHTML = `
            <p>Cost: $${membership.cost}</p>
            <h4>Benefits:</h4>
        `   
        membership.benefits.forEach(benefits => {
            membershipDialogBox.innerHTML += `${benefits}<br>`
        });          
                
        membershipDialogBox.innerHTML += `<button class="close-button-${membership.name}">Close</button>`

        membershipDialogBox.showModal()

        document
            .querySelector(`.close-button-${membership.name}`)
            .addEventListener("click", () => {
                membershipDialogBox.close()
            })
    }

    membershipLevels.forEach(membership => {
        createMembershipCard(membership)
    });
}