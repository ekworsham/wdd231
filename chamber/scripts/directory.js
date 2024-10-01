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

const url="https://ekworsham.github.io/wdd231/chamber/data/members.json";

const cards=document.querySelector("#card");

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();

    createMemberCards(data);
}

function createMemberCards(data) {

    data.forEach(member => {
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

getMemberData();