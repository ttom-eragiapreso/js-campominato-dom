console.log("app loaded")

// **Consegna**
// L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// **Bonus**
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;



// Mi prendo gli elementi del DOM con i quali dovrò interagire
const container = document.querySelector(".container");
const button = document.querySelector("#inizia");
const select = document.querySelector("#selectDifficoltà");
const reset = document.getElementById("reset");
const mainWrapper = document.querySelector(".main-wrapper")
let BOMBS_NUMBER = 16;
let bombs = [];
let score = 0;


// Aggiungo una funzione custom al click del bottone per iniziare
button.addEventListener("click", initGame);


let isEmpty = true;

// La funzione custom
function initGame(){

  // Appena clicco controllo subito se non ho cliccato prima con questa flag
  if(isEmpty){

    // Per prima cosa rimuovo la classe che rende invisibile il bottone di reset
    reset.classList.remove("hide");
    // Poi inizializzo una variabile che prenderà in conto la difficoltà scelta dall'utente
    let difficoltà;
    let width;
    // Faccio un switch per comparare il valore del select al momento del click e vado a scrivere dentro difficoltà il limite massimo di quadrati che poi andrò a scrivere.
    // Vado anche ad ogni casistica ad assegnare un valore di width da riusare poi nel loop che crea le caselle.
    switch(select.value){
  
      case "2":
        difficoltà = 82;
        width = "calc(100% / 9)"
        break;
        
      case "3":
        difficoltà = 50;
        width = "calc(100% / 7)"
        break
  
      default:
        difficoltà = 101;
        width = "10%"
        break
  } 
  bombs = createBombs(difficoltà -1);

  createCells(difficoltà, width);
  
  assignBombs(bombs);




    isEmpty = false;
  }else {
    console.log("Devi prima resettare")
  }
  
}











// Mostro le bombe 

function assignBombs(bombs){
  console.log(bombs)
  const squares = document.getElementsByClassName("square");
  for(let i = 0; i < squares.length; i++){
    if(bombs.includes(parseInt(squares[i].innerHTML))){
      squares[i].isBomb = true;
    }else squares[i].isBomb = false;
  }
  // console.log(square)
}

// Creo le bombe

function createBombs(limit){
  const bombsGenerated = [];

  while(bombsGenerated.length < BOMBS_NUMBER){

    let random = getRandomNumberInRange(1, limit);
    if(!bombsGenerated.includes(random)){
      bombsGenerated.push(random)
    }
  }
  return bombsGenerated
}




function getRandomNumberInRange(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}



// La funzione di reset che avviene quando il bottone di reset viene premuto semplicemente cancella tutto quello che c'è dentro al container che ospita tutti i quadrati. Infine nasconde se stesso.
reset.addEventListener("click", function(){
  container.innerHTML = "";
  document.querySelector("h1").innerText = "";
  this.classList.add("hide");
  isEmpty = true;
})



// Faccio un loop da 1 fino a il valore trovato con lo switch e per ogni iterazione creo un elemento div, con classe square, che dentro ha il numero al contatore del loop, e infine ad esso stesso gli creo un addEventListener che al click gli assegni una classe per colorarlo e stampo in console il suo numero.


// Una volta che finisce tutta la logica del click inverto il valore della flag.


function createCells(difficoltà, width){
  const squares = document.getElementsByClassName("square");

  for(let i = 1; i < difficoltà; i++){
    let square = document.createElement("div");
    square.style.width = width;
    square.classList.add("square");
    square.innerHTML = i;
    container.append(square);

    square.addEventListener("click", function(){
      console.log(squares[i].isBomb);

      if(square.isBomb){

        for(let i = 0; i < squares.length; i++){

          console.log(squares[i].isBomb)

          if(squares[i].isBomb) {
            squares[i].classList.add("bomb");
            console.log("hai perso");
          } 

          
          squares[i].isBomb = null;
        }
        let msg = document.createElement("h1");
        msg.innerText = `Hai perso, il tuo punteggio è ${score},
         su un massimo di ${difficoltà - BOMBS_NUMBER - 1} `;
        mainWrapper.prepend(msg)
        let overlay = document.createElement("div");
        overlay.classList.add("overlay");
        container.append(overlay);
        score = 0;
      }
      this.classList.add("blue");
      score++;
    })


  }
}







