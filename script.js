const gameBoard = document.getElementById("game-board");

const pokemonCards = [
  "./assets/pokemon1.png",
  "./assets/pokemon2.png",
  "./assets/pokemon3.png",
  "./assets/pokemon4.png",
  "./assets/pokemon5.png",
  "./assets/pokemon6.png"
];

const pokemonFacts = {
  "./assets/pokemon1.png": {
    name: "Pikachu",
    fact: "Pikachu stores electricity in its cheeks and releases it in battle."
  },
  "./assets/pokemon2.png": {
    name: "Charmander",
    fact: "Charmander's flame on its tail shows its life force. If it goes out, it could die!"
  },
  "./assets/pokemon3.png": {
    name: "Squirtle",
    fact: "Squirtle’s shell helps it swim at high speeds."
  },
  "./assets/pokemon4.png": {
    name: "Bulbasaur",
    fact: "Bulbasaur has a plant bulb on its back that blooms into a flower."
  },
  "./assets/pokemon5.png": {
    name: "Jigglypuff",
    fact: "Jigglypuff’s lullaby makes opponents fall asleep instantly."
  },
  "./assets/pokemon6.png": {
    name: "Eevee",
    fact: "Eevee can evolve into eight different Pokémon depending on conditions!"
  }
};

let cardArray = [...pokemonCards, ...pokemonCards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;
let matchesFound = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  shuffle(cardArray).forEach((imgSrc) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = imgSrc;

    card.innerHTML = `
      <div class="inner">
        <div class="front"></div>
        <div class="back" style="background-image: url('${imgSrc}')"></div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockCard || this === firstCard) return;

  this.classList.add("flip");

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  const matchedImage = firstCard.dataset.image;
  const data = pokemonFacts[matchedImage];

  const factBox = document.getElementById("fact-box");
  factBox.innerHTML = `
    <div id="fact-title">${data.name}</div>
    <div id="fact-text" class="fade-in">${data.fact}</div>
  `;

  matchesFound++;
  if (matchesFound === 6) {
    document.getElementById("restart-btn").style.display = "block";
  }

  resetBoard();
}

function unflipCards() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartGame() {
  gameBoard.innerHTML = "";
  document.getElementById("restart-btn").style.display = "none";
  const factBox = document.getElementById("fact-box");
  factBox.innerHTML = `
    <div id="fact-title">Pokémon Match</div>
    <div id="fact-text">Reveal two of the same Pokémon under the tiles and receive a Pokémon fact!</div>
  `;
  cardArray = [...pokemonCards, ...pokemonCards];
  matchesFound = 0;
  createBoard();
}

createBoard();
