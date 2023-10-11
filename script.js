const screen = document.querySelector('.screen');
let currentInput = '0';
let currentOperator = null;
let prevValue = null;

document.querySelector('.calc-tasti').addEventListener('click', function (event) {
    const buttonValue = event.target.innerText;

    if (!isNaN(buttonValue) || buttonValue === '.') {
        handleNumberInput(buttonValue);
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '×' || buttonValue === '÷') {
        handleOperatorInput(buttonValue);
    } else if (buttonValue === '=') {
        handleEqualsInput();
    } else if (buttonValue === 'C') {
        handleClearInput();
    } else if (buttonValue === '←') {
        handleBackspaceInput();
    }

    updateScreen();
});

function handleNumberInput(value) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = value;
    } else {
        currentInput += value;
    }
}

function handleOperatorInput(operator) {
    if (currentOperator !== null) {
        handleEqualsInput();
    }
    prevValue = parseFloat(currentInput);
    currentOperator = operator;
    currentInput = '0';
}

function handleEqualsInput() {
    if (currentOperator === null) {
        return;
    }

    const currentValue = parseFloat(currentInput);
    switch (currentOperator) {
        case '+':
            prevValue += currentValue;
            break;
        case '-':
            prevValue -= currentValue;
            break;
        case '×':
            prevValue *= currentValue;
            break;
        case '÷':
            if (currentValue !== 0) {
                prevValue /= currentValue;
            } else {
                currentInput = 'Error';
                currentOperator = null;
                prevValue = null;
                return;
            }
            break;
    }

    currentOperator = null;
    currentInput = prevValue.toString();
}

function handleClearInput() {
    currentInput = '0';
    currentOperator = null;
    prevValue = null;
}

function handleBackspaceInput() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
    }
}

function updateScreen() {
    screen.textContent = currentInput;
}
