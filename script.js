const add = () => firstDigit + secondDigit;
const multiply = () => firstDigit * secondDigit
//need to add divide by zero math
const divide = () => firstDigit / secondDigit
const minus = () => firstDigit - secondDigit

let firstDigit = "0";
let secondDigit = "";
let operatorSelected = "";

const operate = () => {
    if (firstDigit && secondDigit && operatorSelected) {
        switch (operatorSelected) {
            case "+": return add()
            case "x": return multiply()
            case "/": return divide()
            case "-": return minus()
        }
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
    draw();
}

const addToFirst = (digit) => {
    if (firstDigit === "0") {
        firstDigit = digit;
    } else {
        firstDigit = firstDigit.concat(digit)
    }
    console.log("First digit ", firstDigit)
}

const addToSecond = (digit) => {
    if (secondDigit === 0 || secondDigit === "") {
        secondDigit = digit;
    } else {
        secondDigit.concat(digit)
    }
    console.log(secondDigit)
}


const draw = () => {
    calcScreen.innerText = !operatorSelected ? firstDigit : secondDigit;
}



const calcDigits = document.querySelectorAll(".calc-digits > div")
calcDigits.forEach(function (digit) {
    digit.addEventListener("click", () => parseDigit(digit.innerText))
});

const calcOperators = document.querySelectorAll(".calc-operators > div")
calcOperators.forEach(operator => operator.addEventListener("click", () => console.log(operator.innerText)));

const calcScreen = document.querySelector("#screen > span")
