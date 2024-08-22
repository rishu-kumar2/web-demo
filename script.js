const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');
let currentInput = '';
let previousInput = '';
let operator = '';

keys.addEventListener('click', function(event) {
    const { target } = event;
    const { value } = target;
    
    if (!target.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'all-clear':
            clear();
            break;
        case '.':
            appendDecimal();
            break;
        default:
            appendNumber(value);
    }
    updateScreen();
});

function handleOperator(nextOperator) {
    if (operator && currentInput) {
        calculate();
    }
    operator = nextOperator;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(previous) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            result = previous / current;
            break;
        default:
            return;
    }
    
    currentInput = result;
    operator = '';
    previousInput = '';
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
}

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    currentInput = currentInput + number;
}

function appendDecimal() {
    if (currentInput === '') {
        currentInput = '0';
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function updateScreen() {
    screen.value = currentInput;
}
