"use strict";

const listCards = document.querySelector(".js-list-cards");
const saveBtn = document.querySelector(".js-save-btn");
const loadBtn = document.querySelector(".js-load-btn");

let results;
let cardsArray = [];

fetch("https://randomuser.me/api/?results=10")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    results = data.results;
    loopResults();
  });

function loopResults() {
  let listHtml = "";
  for (let index = 0; index < results.length; index++) {
    const fName = results[index]["name"]["first"];
    const lName = results[index]["name"]["last"];
    const city = results[index]["location"]["city"];
    const image = results[index]["picture"]["large"];
    const userName = results[index]["login"]["username"];

    listHtml += `<li class="js-li card"><img class="image" src="${image}" alt="${userName}"><p>${userName}</p><p>${fName} ${lName}</p><p>${city}</p></li>`;

    let card = {
      name: fName + " " + lName,
      city: city,
      image: image,
      userName: userName,
      isFriend: false,
    };
    cardsArray.push(card);
  }
  listCards.innerHTML = listHtml;

  eventList();
}

function loopCards() {
  let listHtml = "";
  for (let index = 0; index < cardsArray.length; index++) {
    const name = cardsArray[index]["name"];
    const city = cardsArray[index]["city"];
    const image = cardsArray[index]["image"];
    const userName = cardsArray[index]["userName"];
    const isFriend = cardsArray[index]["isFriend"];
    let classList = "";
    if (isFriend) {
      classList = "card-friend";
    }
    listHtml += `<li class="js-li card ${classList}"><img class="image" src="${image}" alt="${userName}"><p>${userName}</p><p>${name}</p><p>${city}</p></li>`;
  }
  listCards.innerHTML = listHtml;
  eventList();
}

function eventList() {
  let listElements = document.querySelectorAll(".js-li");
  for (let i = 0; i < listElements.length; i++) {
    listElements[i].addEventListener("click", () => {
      let isFriend = cardsArray[i]["isFriend"];
      if (isFriend) {
        cardsArray[i]["isFriend"] = false;
      } else {
        cardsArray[i]["isFriend"] = true;
      }
      loopCards();
    });
  }
}

saveBtn.addEventListener("click", (event) => {
  event.preventDefault();
  save();
});

loadBtn.addEventListener("click", (event) => {
  event.preventDefault();
  load();
});

function save() {
  localStorage.setItem("cardsLocalStorage", JSON.stringify(cardsArray));
}

function load() {
  const loadCards = localStorage.getItem("cardsLocalStorage");
  if (loadCards != null) {
    cardsArray = JSON.parse(loadCards);
    loopCards();
  }
}
