// script for calculator project

//global variabes needed for operation
let digit1, digit2, operator, flag;

// functions for the math operations

function add(a, b) {
  console.log(a + b);
}

function subtract(a, b) {
  console.log(a - b);
}

function multiply(a, b) {
  console.log(a * b);
}

function divide(a, b) {
  console.log(a / b);
}

// functions for operations

function clear() {
  const screen = document.querySelector(".screen > div");
  screen.textContent = "0";
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "*":
      multiply(a, b);
      break;
    case "/":
      divide(a, b);
      break;
  }
}

function decimal() {}

function writeNumber(e) {
  const screen = document.querySelector(".screen > div");
  screen.textContent += e.target.id;
}

//event listeners

// event listner for numbers
const digitKeys = document.querySelectorAll(".number");

digitKeys.forEach((digit) => {
  digit.addEventListener("click", writeNumber);
});
