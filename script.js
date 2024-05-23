const add = () =>      parseFloat(firstDigit) + parseFloat(secondDigit);
const multiply = () => parseFloat(firstDigit) * parseFloat(secondDigit)
//need to add divide by zero math
const divide = () =>   parseFloat(firstDigit) / parseFloat(secondDigit)
const subtract = () =>    parseFloat(firstDigit) - parseFloat(secondDigit)

let firstDigit = "0";
let secondDigit = "";
let operatorSelected = "";

const operate = () => {
    if (firstDigit && secondDigit && operatorSelected) {
        console.log (add().toString(), operatorSelected)
        switch (operatorSelected) {
            case "add": firstDigit = add().toString(); break;
            case "multiply": firstDigit = multiply().toString(); break;
            case "divide": firstDigit = divide().toString(); break;
            case "subtract": firstDigit = subtract().toString(); break;
        }
        secondDigit = ""
        operatorSelected = ""
        draw()
    }
}


const parseDigit = (digit) => {
    if (/[0-9]/.test(digit)) {
        !operatorSelected ? addToFirst(digit) : addToSecond(digit);
    } else if (digit === "A/C") {
        firstDigit = "0";
        secondDigit = "";
        operatorSelected = "";
    } else {
        console.log("Not a digit")
    }
    console.log(firstDigit, secondDigit, operatorSelected)    
    draw();
}

const parseOperator = (operator) => {
        if (!secondDigit) {
            operatorSelected = operator
        } else {
            operate();
            operatorSelected = operator;
        }
        draw(); 
}

const addToFirst = (digit) => {
    if (firstDigit === "0") {
        firstDigit = digit;
    } else {
        firstDigit = firstDigit.concat(digit)
    }
}

const addToSecond = (digit) => {
    if (secondDigit === 0 || secondDigit === "") {
        secondDigit = digit;
    } else {
        secondDigit = secondDigit.concat(digit)
    }
}

const operatorSymbol = () => {
    switch (operatorSelected) {
        case "add": return "+"; break;
        case "multiply": return "X"; break;
        case "divide": return "÷"; break;
        case "subtract": return "-"; break;
        default: return "";
}}

const draw = () => {
    calcScreen.innerText = !operatorSelected ? firstDigit : secondDigit ? secondDigit : firstDigit;
    calcScreenTop.innerText = firstDigit + " " + operatorSymbol() + " " + secondDigit
}



const calcDigits = document.querySelectorAll(".calc-digits > div")
calcDigits.forEach(function (digit) {
    digit.addEventListener("click", () => parseDigit(digit.innerText))
});

const addButton = document.querySelector("#add")
const subtractButton = document.querySelector("#subtract")
const divideButton = document.querySelector("#divide")
const multiplyButton = document.querySelector("#multiply")
const equalsButton = document.querySelector("#equals")

addButton.addEventListener("click", () => parseOperator("add"))
subtractButton.addEventListener("click", () => parseOperator("subtract"))
divideButton.addEventListener("click", () => parseOperator("divide"))
multiplyButton.addEventListener("click", () => parseOperator("multiply"))
equalsButton.addEventListener("click", () => operate())

const calcScreen = document.querySelector("#screen > .bottom-row")
const calcScreenTop = document.querySelector("#screen > .top-row")
