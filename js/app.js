"use strict";

const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("startButton");
const selectUserNumber = document.getElementById("userGuessNumber");
const formContainer = document.querySelector(".form-container");
const formUserNumber = document.getElementById("form-inputNumber");
const inputNumber = document.getElementById("guessNumberId");
const tries = document.getElementById("tries");
const alertUser = document.querySelector(".alert-msj");
const alertOverlay = document.getElementById("overlay");
const textAlert = document.getElementsByClassName("text-alert");
const btnAlert = document.querySelector(".btn-continue");
const btnReset = document.querySelector(".btn-reset");
const jsConfetti = new JSConfetti();
let randomNumber;
let triesCount = 0;

// crea un numero aleatorio
const getRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber + 1);
};

// función para mostrar la alerta al usuario
const showAlert = (message, continues = true) => {
  textAlert[0].innerHTML = message;
  alertUser.style.display = "block";
  alertOverlay.style.display = "block";

  if (!continues) {
    btnAlert.style.display = "none";
    btnReset.style.display = "block";
  }
};
// función para cerrar el alerta
const closeAlert = () => {
  alertUser.style.display = "none";
  alertOverlay.style.display = "none";
};

// fn que chequea si el numero es el correcto
const checkNumber = (numberUser) => {
  if (numberUser === randomNumber) {
    showAlert("🎉 Haz encontrado el numero secreto 🎉", false);
    jsConfetti.addConfetti();
  } else {
    tries.innerHTML += "💀";
    triesCount++;
    if (triesCount === 4) {
      showAlert("Haz perdido😔", false);
      return;
    }
    if (numberUser > randomNumber) {
      showAlert(`El numero secreto es menor 🙄`);
    } else if (numberUser < randomNumber) {
      showAlert(`El numero secreto es mayor 🙄`);
    }
  }
};

// fn que comienza el juego
const handlerClick = () => {
  const userNumber = parseInt(selectUserNumber.value);
  if (Number.isNaN(userNumber)) {
    showAlert("Ingrese un numero por favor!!");
    return;
  }
  randomNumber = getRandomNumber(userNumber);
  startContainer.style.display = "none";
  formContainer.style.display = "block";
};

// fn del formulario donde el usuario ingresa un numero
const handlerSubmit = (e) => {
  e.preventDefault();
  const numberUser = parseInt(inputNumber.value);
  checkNumber(numberUser);
};

// fn para resetear el juego
const resetGame = () => {
  closeAlert();
  startContainer.style.display = "block";
  formContainer.style.display = "none";
  btnAlert.style.display = "block";
  btnReset.style.display = "none";
  triesCount = 0;
  tries.innerHTML = "";
  selectUserNumber.value = "";
  inputNumber.value = "";
};

// eventos !!!
startButton.addEventListener("click", handlerClick);
formUserNumber.addEventListener("submit", handlerSubmit);
btnAlert.addEventListener("click", closeAlert);
btnReset.addEventListener("click", resetGame);
