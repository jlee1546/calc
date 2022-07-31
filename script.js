// SCRIPT FOR CALCULATOR PROJECT

// VARIABLES USED IN APP
let digit1 = 0,
  digit2 = 0,
  operator = "",
  flag = false,
  flag2 = false,
  flag3 = false;
const digitKeys = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clear = document.getElementById("clr");
const equals = document.getElementById("equal");
const decimalPoint = document.getElementById("decimal");
const sign = document.getElementById("posNegSign");
const percent = document.getElementById("percent");
const sqrRoot = document.getElementById("root");

// FUNCTIONS PERFORMING INDIVIDUAL CALCULATIONS

// function to return the sum of two values
function add(a, b) {
  return a + b;
}

// fucntion to return the result of subtraction of two values
function subtract(a, b) {
  return a - b;
}

// function to return product of two values
function multiply(a, b) {
  return a * b;
}

// function to return the result of division of two values
function divide(a, b) {
  return b === 0 ? `E-- divison by 0` : a / b;
}

// FUNCTIONS REQUIRED IN OPERATION OF CALCULATOR APP

// function to clear display
function clearScreen() {
  const screen = document.querySelector(".screen > div");
  screen.textContent = "0";
  flag = false;
  digit1 = 0;
  digit2 = 0;
  operator = "";
}

// function to call an operator and two values for a calculation
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

// fucntion to add a decimal point to screen
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
}
// function to write digits to the screen
function writeDigitToScreen(e) {
  const screen = document.querySelector(".screen > div");
  console.log(typeof screen.textContent);
  if (flag2) {
    screen.textContent = "";
    screen.textContent = e.target.textContent;
    flag2 = false;
  } else if (screen.textContent === "0") {
    screen.textContent = e.target.textContent;
  } else if (flag3 === true) {
    screen.textContent = "";
    screen.textContent = e.target.textContent;
    flag3 = false;
  } else {
    if (digitCounter(screen.textContent) >= 12) {
      return;
    } else {
      screen.textContent += e.target.textContent;
    }
  }
}

// function to update digit1 value
function updateDigitOne(value) {
  digit1 = +value;
}

// function to update digit2 value
function updateDigitTwo(value) {
  digit2 = +value;
}

// function to update operator
function updateOperator(operation) {
  operator = operation;
}

// function to count digits on screen
function digitCounter(string) {
  return string.length;
}

// function to change sign of value
function changeSign() {
  const screen = document.querySelector(".screen > div");
  let number = screen.textContent;
  screen.textContent = -number;
}

// function to change value into a percentage
function toPercentage() {
  const screen = document.querySelector(".screen > div");
  let number = screen.textContent;
  screen.textContent = number / 100;
}

// function to take square root of value
function squareRoot() {
  const screen = document.querySelector(".screen > div");
  let number = screen.textContent;
  screen.textContent = +Math.sqrt(number).toFixed(5);
}

// function to shorten length of string value for output to screen
function shortenValueLength(value) {
  return value.length > 12 ? NaN : value;
}

// function to assign operator
function assignOperator(e) {
  const screen = document.querySelector(".screen > div");
  if (flag) {
    updateDigitTwo(+screen.textContent);
    screen.textContent = `${+operate(operator, digit1, digit2)}`;
    updateDigitOne(+screen.textContent);
  } else {
    updateDigitOne(+screen.textContent);
    flag = true;
  }
  updateOperator(e.target.id);
  flag2 = true;
}

// function to call calculation
function callCalculation() {
  const screen = document.querySelector(".screen > div");
  updateDigitTwo(+screen.textContent);
  if (operator === "") {
    screen.textContent = "0";
  } else {
    let value = operate(operator, digit1, digit2).toString(10);
    let ammendedValue = shortenValueLength(value);
    isNaN(ammendedValue)
      ? (screen.textContent = "E-- value too large")
      : (screen.textContent = +ammendedValue);

    flag = false;
    flag2 = false;
    flag3 = true;
  }
}

// EVENT LISTENERS

// event listner for number keys
digitKeys.forEach((digit) => {
  digit.addEventListener("click", writeDigitToScreen);
});

// event listener for operator keys
operations.forEach((operation) =>
  operation.addEventListener("click", assignOperator)
);

// event listener for clr key
clear.addEventListener("click", clearScreen);

// event listener for equals key
equals.addEventListener("click", callCalculation);

// event listener for  decimal key
decimalPoint.addEventListener("click", addDecimal);

// event listener for sign key
sign.addEventListener("click", changeSign);

//event listener for percent key
percent.addEventListener("click", toPercentage);

// event listener for square root key
sqrRoot.addEventListener("click", squareRoot);
