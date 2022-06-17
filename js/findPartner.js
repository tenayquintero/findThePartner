"use strict"
const cards = document.querySelectorAll(".card");

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");
  

  setTimeout(() => {
    currentCard.classList.remove("flipped");
  }, 1000);
};


for (const card of cards) {
  card.addEventListener("click", reveal);
}

//barajar cartas
(function mezclar() {
cards. forEach(card=>{
  let posicionRandom = Math.floor(Math.random()*3);
  card.style.order= posicionRandom
})
})();