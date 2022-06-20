"use strict";
const cards = document.querySelectorAll(".card");
const button = document.querySelector(".center");
const p = document.querySelector("p");
const winner = document.querySelector(".winner ")
// const audio = new Audio("../sounds/barajar.mp3");


let isTheCardFlipped = false;
let firstCard, secondCard;
let count = 1;
let marker=0;

/**
 * ########################
 * ##Barajamos las cartas##
 * ########################
 */
(function mix() {
  cards.forEach((card) => {
    let posicionRandom = Math.floor(Math.random() * 3);
    card.style.order = posicionRandom;
  });
})();

/*
###############################################
##Sacamos el tablero para comenzar la partida##
###############################################
*/

const showGame = () => {
  button.style.display = "none";
  p.style.display = "block";
  let num = 1;
  let drawCards = setInterval(() => {
    if (num === 5) {
      clearInterval(drawCards);
    } else {
      // audio.play();
      document.querySelector(".card" + num++).style.display = "flex";
      
    }
  }, 80);
};

button.addEventListener("click", () => {
  showGame();
});

/*
#################################################################
##giramos las cartas e incrementamos movimientos cada dos click##
#################################################################
*/

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");

  //Hacemos el primer click
  if (!isTheCardFlipped) {
    isTheCardFlipped = true;
    firstCard = currentCard;
    return;
  }
  //Hacemos el segundo click
  isTheCardFlipped = false;
  secondCard = currentCard;
  p.textContent = "Movimientos " + count++;

  compareCards();
};

/**###############################################
 * ##comparamos con operador ternario las cartas##
 * ###############################################
 */
function compareCards() {
  let same =(firstCard.dataset.emoji === secondCard.dataset.emoji);
  same
    ? removeReveal() 
    : removeFlipped();

    if(same){
      marker++;
     
    }
    if(marker === 2){
   
    
    cards.forEach((card)=>(card.style.display="none"))
     button.style.display = "flex";  
    // winner.style.display = "inline";
    }
    console.log(winner)
   
}
/**
 * eliminamos la funcion click
 */
function removeReveal() {
  firstCard.removeEventListener("click", reveal);
  secondCard.removeEventListener("click", reveal);
  
}
/**
 * eliminamos el giro de la carta
 */
function removeFlipped() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
  }, 1000);
}
for (const card of cards) {
  card.addEventListener("click", reveal);
}
