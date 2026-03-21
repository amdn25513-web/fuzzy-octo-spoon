let startBtn = document.querySelector("button[onclick='startGame()']");
let resetBtn = document.getElementById("reset-btn");

let player = {
  name: "Dilshan",
  chips: 145,
};
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let cards = [];

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + " : $" + player.chips;

function getRandom() {
  randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  if (isAlive === false || hasBlackJack === true) {
    isAlive = true;
    let firstCard = getRandom();
    let secondCard = getRandom();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
  }
}

function renderGame() {
  cardsEl.textContent = "Cards : ";

  for (let i = 0; i < cards.length; i++) {
    let cardPosition = i + 1;
    cardsEl.textContent += "card " + cardPosition + " = " + cards[i] + " , ";
  }
  sumEl.textContent = "Sum :" + sum;

  if (sum < 21) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got black jack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }

  messageEl.textContent = message;

  if (isAlive === true) {
    startBtn.classList.add("disabled");
    startBtn.disabled = true;
  } else {
    startBtn.classList.remove("disabled");
    startBtn.disabled = false;
  }

  if (isAlive === false || hasBlackJack === true) {
    resetBtn.style.display = "block";
    startBtn.style.display = "none";
  } else {
    resetBtn.style.display = "none";
    startBtn.style.display = "block";
  }
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandom();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

function resetGame() {
  cards = [];
  sum = 0;
  isAlive = false;
  hasBlackJack = false;

  // Clear the UI text
  cardsEl.textContent = "Cards: ";
  sumEl.textContent = "Sum: ";
  messageEl.textContent = "Want to play a round?";

  startBtn.disabled = false;
  startBtn.classList.remove("disabled");

  // Toggle buttons back
  resetBtn.style.display = "none";
  startBtn.style.display = "block";
}
