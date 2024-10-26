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

// **********************
// resident resource page
// ********************** 
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
    
]

const whoResourcesElement = document.querySelector(".who-resources")

if (whoResourcesElement) {

// **************************
// Creates Who card
// **************************

    function createWhoCard(resource) {
        const contactCard = document.createElement("div")
        contactCard.innerHTML = `
            <h4>${resource.business} Business Resource</h4>
            <button class="open-button-${resource.business}">Information Details</button>
        `
        whoResourcesElement.appendChild(contactCard)

        document
            .querySelector(`.open-button-${resource.business}`)
            .addEventListener("click", () => {
                createContactModal(resource)
            })
    }



// *****************************
// Create resource modal
// *****************************
    function createContactModal(resource) {
        let whoDialogBox = document.querySelector(".who-box")
        whoDialogBox.innerHTML = `
            <p><b>Business</b>: ${resource.business}</p>
            <h4>Contact Info:</h4>
        `   
        resource.contactInfo.forEach(info => {
            whoDialogBox.innerHTML += `${info}<br>`
        });          
                
        whoDialogBox.innerHTML += `<button class="close-button-${resource.business}">Close</button>`
        whoDialogBox.showModal()
        document
            .querySelector(`.close-button-${resource.business}`)
            .addEventListener("click", () => {
                whoDialogBox.close()
            })
    }

    whoResources.forEach(resource => {
        createWhoCard(resource)
    });
}