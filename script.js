const add = () =>      parseFloat(firstDigit) + parseFloat(secondDigit);
const subtract = () => parseFloat(firstDigit) - parseFloat(secondDigit);
const multiply = () => parseFloat(firstDigit) * parseFloat(secondDigit);
const divide = () => {
    if (firstDigit === "0" || secondDigit === "0") {
        jokeDraw()
    } else {
        return parseFloat(firstDigit) / parseFloat(secondDigit)
    }
}

let firstDigit = "0";
let secondDigit = "";
let operatorSelected = "";
let mathDoneToggle = false;

const operate = () => {
    if (firstDigit && secondDigit && operatorSelected) {
        switch (operatorSelected) {
            case "add": firstDigit = add().toString(); break;
            case "multiply": firstDigit = multiply().toString(); break;
            case "divide": firstDigit = divide().toString(); break;
            case "subtract": firstDigit = subtract().toString(); break;
        }
        secondDigit = ""
        operatorSelected = ""
        mathDoneToggle = true;
        if (firstDigit.length > 16) {
            roundDigit()
        }
        draw()
    }
}

const roundDigit = () => {
    let digitArray = firstDigit.split("")
    if (digitArray.includes("e")) {
        firstDigit = digitArray.slice(0,12).join("") + "e" + firstDigit.split("e")[1]
    } else {
        firstDigit = digitArray.slice(0,15).join("")
    }
}

const parseDigit = (digit) => {
    if (/[0-9]/.test(digit)) {
        !operatorSelected ? addToFirst(digit) : addToSecond(digit);
    } else if (digit === "A/C") {
        resetCalc()
    } else {
        console.log("Not a digit")
    }
    draw();
}

const resetCalc = () => {
    firstDigit = "0";
    secondDigit = "";
    operatorSelected = "";
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
    } else if (mathDoneToggle){
        firstDigit = digit;
        mathDoneToggle = false;
    } else {
        firstDigit = firstDigit.concat(digit).slice(0,13)
    }
}

const addToSecond = (digit) => {
    if (secondDigit === 0 || secondDigit === "") {
        secondDigit = digit;
    } else {
        secondDigit = secondDigit.concat(digit).slice(0,13)
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

const jokeDraw = () => {
    resetCalc();
    calcScreenTop.innerText = "You divided by ZERO!"
    calcScreen.innerText = "Earth Explodes!"
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
