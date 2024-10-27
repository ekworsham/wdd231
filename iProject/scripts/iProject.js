


// Update current year and last modified date
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();
if (currentYear) {
    currentYear.textContent = today.getFullYear();
}
if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

// Hamburger menu functionality
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');
if (hamburgerElement && navElement) {
    hamburgerElement.addEventListener('click', () => {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
    });
}


const communityMain = document.querySelector('#communityMain')

if(communityMain) {
    // Fetch and display events from Ticketmaster API
    const url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=NqV0MPSDnoQvubip9OQMn2WmbSmm6m6o&city=nashville";
    async function getData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            return json._embedded.events;
        } catch (error) {
            console.error(error.message);
        }
    }
    
    async function buildItems() {
        const events = await getData();
        const container = document.querySelector('.events-container');
        if (events && container) {
            events.slice(0, 15).forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.textContent = event.name;
                eventItem.addEventListener('click', () => displayEventDetail(event));
                container.appendChild(eventItem);
            });
        }
    }
    
    const eventInfo = document.querySelector('#eventInfo');
    
    function displayEventDetail(event) {
        eventInfo.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${event.name}</h2>
            <p>${event.dates.start.localDate}</p>
            <p>${event._embedded.venues[0].name}</p>
            <p>${event.info || 'No additional information available.'}</p>
        `
        
        
        eventInfo.showModal() 
        const closeModal = document.querySelector("#closeModal");
        if (closeModal) {
            closeModal.addEventListener("click", () => {
                eventInfo.close();
            });
        } else {
            console.error("Close button not found");
        }
    }
    buildItems();
}

const residentMain = document.querySelector('#residentMain')

if(residentMain) {

    // *************************************
    // Creates Who card
    // *************************************
    const whoResources = [
        {
            "business": "Blacksmith",
            "contactInfo": [
                "ADDRESS: 42 Horton Ave.",
                "WHO PHONE: 1-800-Who-Work",
                "EMAIL: blacksmith@whomail.com"
            ]
        },
        {
            "business": "Grinch-Trash-Service",
            "contactInfo": [
                "ADDRESS: 1 Mt. Crumpit Overlook",
                "WHO PHONE: 1-800-GRINCH",
                "EMAIL: grinch.max@whomail.com"
            ]
        },
        {
            "business": "Electric",
            "contactInfo": [
                "ADDRESS: 18 Main St.",
                "WHO PHONE: 1-800-SPARKY",
                "EMAIL: MrSpark@whomail.com"
            ]
        },
        {
            "business": "Plumbing",
            "contactInfo": [
                "ADDRESS: 202 Clover Flower Blvd.",
                "WHO PHONE: 1-800-PIPES",
                "EMAIL: piping@whomail.com"
            ]
        },
        {
            "business": "Water-Department",
            "contactInfo": [
                "ADDRESS: 812 Springs Rd.",
                "WHO PHONE: 1-800-YOUR-H20",
                "EMAIL: H2O@whomail.com"
            ]
        },
        {
            "business": "Handy-Who",
            "contactInfo": [
                "ADDRESS: 4339 Snowflake Ln.",
                "WHO PHONE: 1-800-HANDY",
                "EMAIL: HandyMan@whomail.com"
            ]
        }
    ];
    
    const whoResourcesElement = document.querySelector(".who-resources");
    if (whoResourcesElement) {
        function createWhoCard(resource) {
            const contactCard = document.createElement("div");
            contactCard.innerHTML = `
                <h4>${resource.business} Business Resource</h4>
                <button class="open-button-${resource.business}">Information Details</button>
            `;
            whoResourcesElement.appendChild(contactCard);
            document
                .querySelector(`.open-button-${resource.business}`)
                .addEventListener("click", () => {
                    createContactModal(resource);
                });
        }
    
        function createContactModal(resource) {
            const whoDialogBox = document.querySelector(".who-box");
            if (whoDialogBox) {
                whoDialogBox.innerHTML = `
                    <p><b>Business</b>: ${resource.business}</p>
                    <h4>Contact Info:</h4>
                `;
                resource.contactInfo.forEach(info => {
                    whoDialogBox.innerHTML += `${info}<br>`;
                });
                whoDialogBox.innerHTML += `<button class="close-button-${resource.business}">Close</button>`;
                whoDialogBox.showModal();
                document
                    .querySelector(`.close-button-${resource.business}`)
                    .addEventListener("click", () => {
                        whoDialogBox.close();
                    });
            }
        }
    
        whoResources.forEach(resource => {
            createWhoCard(resource);
        });
    }
    // ***********************
    // local Storage
    // ***********************
    
    
    // Retrieve the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    
    // Get the visit message element
    const visitMessage = document.getElementById('message');
    const currentDate = new Date();
    
    if (lastVisit) {
        // Calculate the difference in milliseconds between visits
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
    
        // Convert the difference to days
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
        // Display the appropriate message
        if (daysDifference < 1) {
            visitMessage.textContent = "You're here again, and it feel so right! How awesome, how grand, what a wonderful suprise, It's joy upon you in Whooville-sized skies!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = "Oh my, oh me, could it really be so? you were here just one day ago! Why, time must fly in the blink of an eye, welcom back, dear friend-oh my, oh my!";
        } else {
            visitMessage.textContent = `Well, looks who's back, hip-hip-hooray! It's been ${daysDifference} days since you went away.`;
        }
    } else {
        // If this is the first visit
        visitMessage.textContent = "Whoo-hoo! With great cheer, we're thrilled to have you here! If help is what you need, just share details, and we'll take the lead!";
    }
    
    // Store the current visit date in localStorage
    localStorage.setItem('lastVisit', currentDate.toISOString());
    
    
}



// ***********************
// thank you page
// ***********************
const urlData = window.location.href;
const thankYouSelector = document.querySelector('#thankYou')
const thanksData = document.createElement('div');

if (thankYouSelector) {
    const infoArray = urlData.split('?')[1].split('&');

    function show(field) {
        infoArray.forEach(element => {
            if (element.startsWith(field)) {
                result = element.split('=')[1];
                result = result.replaceAll('%40', '@');
                result = result.replaceAll('+', ' ');
            }
        });
        return result
    }

    thanksData.innerHTML = `
        <p><span class="thank-you-label">First Name: </span>${show("firstName")}</p>
        <p><span class="thank-you-label">Last Name: </span>${show("lastName")}</p>
        <p><span class="thank-you-label">Email: </span>${show("email")}</p>
        <p><span class="thank-you-label">Mobile: </span>${show("mobile")}</p>
    `;

    thankYouSelector.appendChild(thanksData);
    localStorage.setItem('firstName', show("firstName"));
}
