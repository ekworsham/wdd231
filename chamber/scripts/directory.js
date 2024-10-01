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
const lists=document.querySelector("#list");

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function createMemberCards() {
    cards.innerHTML = " ";
    lists.innerHTML = " ";
    const data = await getMemberData();
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

async function createMemberList () {
    cards.innerHTML = " ";
    lists.innerHTML = " ";
    const data = await getMemberData();
    data.forEach(member => {
        const list = document.createElement("div");
        list.setAttribute("class", "businessList");
        list.innerHTML = `
            <div class="listHeader1">
                <div class="contactList">
                    <h3>${member.name}<br>${member.title}</h3>
                    <p>ADDRESS: ${member.address}</p>
                    <p>PHONE: ${member.phoneNumber}</p>
                </div>
            </div>
        `;
        lists.appendChild(list);
    })
}

const cardView = document.querySelector("#cardView");
const listView = document.querySelector("#listView");

cardView.addEventListener(`click`, () => {
    createMemberCards();
})

listView.addEventListener(`click`, () => {
    createMemberList();
})

createMemberCards();
