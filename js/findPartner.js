"use strict";
const cards = document.querySelectorAll(".card");
const button = document.querySelector(".center");
const p = document.querySelector("p");
const winner = document.querySelector(".winner");
const newGame = document.getElementById("newGame");
const pasaste=document.getElementById("pasasteLiga");


let isTheCardFlipped = false;
let firstCard, secondCard;
let count = 1;
let marker = 0;
let waitTurn = false;

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
    if (num === 17) {
      clearInterval(drawCards);
    } else {
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
  if (waitTurn) return;

  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");
  if (currentCard === firstCard) return;

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
console.log("soy movimientos",count)
  compareCards();
};

/**###############################################
 * ##comparamos con operador ternario las cartas##
 * ###############################################
 */
function compareCards() {
  let same = firstCard.dataset.emoji === secondCard.dataset.emoji;
  same ? removeReveal() : removeFlipped();
  if (same) {
    marker++;
    console.log(marker);
    console.log(count)
  }
  //ganaste!!
  if (marker === 8) {
    cards.forEach((card) => (card.style.display = "none"));
    winner.style.display = "flex";
    newGame.style.display = "flex";
  }
  if(marker===8 && count===9){
   pasaste.style.display="flex"
  }
}
/**
 * ########################
 * ##REINICIAR LA PARTIDA##
 * ########################
 */
// newGame.addEventListener("click", () => {
//   showGame();

//   newGame.style.display = "none";
//   winner.style.display = "none";
//   p.textContent = "Movimientos 0";
//   count = 1;
//   marker = 0;

//   cards.forEach((card) => {
//     card.classList.remove("flipped");
//     card.addEventListener("click", reveal);
//     let posicionRandom = Math.floor(Math.random() * 3);
//     card.style.order = posicionRandom;
//   });
// });

/**
 * eliminamos la funcion click
 */
function removeReveal() {
  firstCard.removeEventListener("click", reveal);
  secondCard.removeEventListener("click", reveal);
  nullBoard();
}
/**
 * eliminamos el giro de la carta
 */
function removeFlipped() {
  waitTurn = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    nullBoard();
  }, 1000);
}
function nullBoard() {
  [isTheCardFlipped, waitTurn] = [false, false];
  [firstCard, secondCard] = [null, null];
}
for (const card of cards) {
  card.addEventListener("click", reveal);
}
/**
 * #######################
 * ##Entramos en la liga##
 * #######################
 */
const input = document.querySelector("#inputName");
const form = document.forms.formulario;
const gold = document.querySelector(".gold");
const buttonRegistro=document.querySelector(".registrarse")

let nameUser = input;
const savedName = localStorage.getItem("names");

//sacar el nombre del localStorage a la página
if(savedName){
  nameUser = savedName;
  gold.textContent = "🏆 " + nameUser;
}

function addChampion(){
  const elementName = form.elements.user
  console.log(elementName)

  //guardamos el nombre en localStorage
  localStorage.setItem("names", elementName.value)
  gold.textContent = "🏆 " + elementName.value;
  
  //resetear el input
  elementName.value="";
   
}
buttonRegistro.addEventListener("click", ()=>{
  addChampion();
})