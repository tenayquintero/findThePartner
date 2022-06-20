"use strict";
const cards = document.querySelectorAll(".card");
const button = document.querySelector(".center");
const p = document.querySelector("p");

let isTheCardFlipped = false;
let firstCard, secondCard;
let count=1;

const showGame = () => {
  button.style.display = "none";
  p.style.display="block"
  let num = 1;
  let drawCards = setInterval(() => {
    if (num === 17) {
      clearInterval(drawCards);
    } else {
      document.querySelector(".card" + num++).style.display = "flex";
    }
  }, 50);

  // p.style.display = "block";

  // cards.forEach((element) => {
  //   element.style.display = "flex";
  // });
};

button.addEventListener("click", () => {
  showGame();
});

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");

  if (!isTheCardFlipped) {
    isTheCardFlipped = true;
    firstCard = currentCard;

    console.log("soy", firstCard.dataset.emoji);
  } else {
    isTheCardFlipped = false;
    secondCard = currentCard;
    p.textContent = "Movimientos " + count++

    console.log("soy", secondCard.dataset.emoji);
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard.removeEventListener("click", reveal);
      secondCard.removeEventListener("click", reveal);
      console.log(" somos iguales");
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
      }, 1000);
    }
  }
};

for (const card of cards) {
  card.addEventListener("click", reveal);
}

//barajar cartas
(function mezclar() {
  cards.forEach((card) => {
    let posicionRandom = Math.floor(Math.random() * 3);
    card.style.order = posicionRandom;
  });
})();
