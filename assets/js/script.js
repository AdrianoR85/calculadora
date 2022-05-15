const keyNumbers = document.querySelectorAll('[data-number]');
const keyOperators = document.querySelectorAll('[data-operator]');
const display = document.querySelector('.display__content');
const keyEquals = document.querySelector('[data-equals]');
const keyClear = document.querySelector('[data-clear]');
const keyChangeSignal = document.querySelector('[data-change]');
const KeyDecimal = document.querySelector('[data-decimal]');

let previousNumber;
let CurrentOperator;
let newNumber = true;
let equalsActive = false;

const IsThereOperation = () => CurrentOperator !== undefined;
const isTherePreviousNumber = () => !isNaN(previousNumber);
const isDivisibleByZero = (num) => num != Infinity
const isThereDecimal = () => display.textContent.indexOf(',') != -1
const IsDisplayEmpty = () => display.textContent.length > 0;
 
const insertNumber = (e) => updateDisplay(e.target.textContent)

const updateDisplay = (text) => {
    if(newNumber | equalsActive) {
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    } else {
        display.textContent += text;
    }
}

const SelectOperators = (e) => {
    if(!newNumber) {
        calculate();
        CurrentOperator = e.target.getAttribute('data-operator')
        newNumber = true;
        previousNumber = parseFloat(display.textContent.replace(',', '.'));
    }
}

const calculate = () => {
    if(IsThereOperation() && isTherePreviousNumber()) {
        const currentNumber = parseFloat(display.textContent.replace(',', '.'))
        const result  = eval(`${previousNumber}${CurrentOperator}${currentNumber}`)
        if(isDivisibleByZero(result)) {
            newNumber = true;
            updateDisplay(result);
        } else {
            clearCalculate();
        }
    }
}

const showResult = () => {
    calculate();
    CurrentOperator = undefined;
    equalsActive = true; 
}

const clearCalculate = () => {
    const cleanDisplay = display.textContent = '';
    updateDisplay(cleanDisplay);
    previousNumber = undefined
    CurrentOperator = undefined
    newNumber = true; 
    equalsActive = false;
}

const changeSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1)
} 

const insertDecimal = () => {
    if(!isThereDecimal()) {
        if(newNumber) {
            updateDisplay('0,');
        } else {
            updateDisplay(',');
        }
    }
    if(isThereDecimal() && IsThereOperation()) updateDisplay('0,')
}

keyNumbers.forEach( key => key.addEventListener('click', insertNumber))
keyOperators.forEach((operator) => operator.addEventListener('click', SelectOperators));
keyEquals.addEventListener('click', showResult);
keyClear.addEventListener('click', clearCalculate);
keyChangeSignal.addEventListener('click', changeSignal);
KeyDecimal.addEventListener('click', insertDecimal);