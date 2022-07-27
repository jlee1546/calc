// script for calculator project

//global variabes needed for operation
let digit1 = 0,
  digit2 = 0,
  operator = "",
  flag = false,
  flag2 = false;

// functions for the math operations

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? `E-- divison by 0` : a / b;
}

// functions for operations

function clearScreen() {
  const screen = document.querySelector(".screen > div");
  screen.textContent = "0";
  flag = false;
  digit1 = 0;
  digit2 = 0;
  operator = "";
}

function operate(operator, a, b) {
  switch (operator) {
    case "plus":
      return add(a, b);

    case "minus":
      return subtract(a, b);

    case "multiply":
      return multiply(a, b);

    case "divide":
      return divide(a, b);
  }
}

function addDecimal() {
  const screen = document.querySelector(".screen > div");
  let content = screen.textContent;

  if (!content.includes(".") && flag) {
    screen.textContent = "0.";
  } else if (!content.includes(".")) {
    screen.textContent += ".";
  } else if (content.includes(".") && flag) {
    screen.textContent = "";
    screen.textContent = "0.";
  }
  flag2 = false;
  console.log(
    `flag ${flag}, flag2 ${flag2}, digit1 ${digit1}, digit2 ${digit2}, operator ${operator}`
  );
}

function writeDigitToScreen(e) {
  const screen = document.querySelector(".screen > div");
  if (flag2) {
    screen.textContent = "";
    screen.textContent = e.target.textContent;
    flag2 = false;
  } else if (screen.textContent === "0") {
    screen.textContent = e.target.textContent;
  } else {
    if (digitCounter(screen.textContent) >= 8) {
      return;
    } else {
      screen.textContent += e.target.textContent;
    }
  }
  console.log(
    `NUMBER ${e.target.textContent}, flag ${flag}, flag2 ${flag2}, digit1 ${digit1}, digit2 ${digit2}, operator ${operator}`
  );
}

// function to update digit1
function updateDigitOne() {
  const numberOnScreen = document.querySelector(".screen > div").textContent;
  digit1 = +numberOnScreen;
}

// function update operator
function updateOperator(operation) {
  operator = operation;
}

//count digits on screen
function digitCounter(string) {
  return string.length;
}

//event listeners

// event listner for numbers
const digitKeys = document.querySelectorAll(".number");

digitKeys.forEach((digit) => {
  digit.addEventListener("click", writeDigitToScreen);
});

const operations = document.querySelectorAll(".operator");
operations.forEach((operation) =>
  operation.addEventListener("click", (e) => {
    if (flag) {
      const screen = document.querySelector(".screen > div");
      digit2 = +screen.textContent;
      screen.textContent = `${+operate(operator, digit1, digit2).toFixed(5)}`;
      digit1 = +screen.textContent;
    } else {
      updateDigitOne();
      flag = true;
    }
    updateOperator(e.target.id);
    flag2 = true;
    console.log(
      `OPERATOR ${e.target.id}, flag ${flag}, flag2 ${flag2}, digit1 ${digit1}, digit2 ${digit2}, operator ${operator}`
    );
  })
);

const clear = document.getElementById("clr");
clear.addEventListener("click", clearScreen);

const equals = document.getElementById("equal");
equals.addEventListener("click", () => {
  const screen = document.querySelector(".screen > div");
  digit2 = +screen.textContent;
  if (operator === "") {
    screen.textContent = "0";
  } else {
    screen.textContent = +operate(operator, digit1, digit2).toFixed(5);
    flag = false;

    flag2 = false;
  }

  console.log(
    `flag ${flag}, flag2 ${flag2}, digit1 ${digit1}, digit2 ${digit2}, operator ${operator}`
  );
});

const decimalPoint = document.getElementById("decimal");
decimalPoint.addEventListener("click", function () {
  addDecimal();
});
