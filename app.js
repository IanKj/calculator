const container = document.querySelector('.main-container');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const addition = document.querySelector('#add');
const subtraction = document.querySelector('#subtract');
const division = document.querySelector('#divide');
const multiplication = document.querySelector('#multiply');
const equals = document.querySelector('#equals');
const display = document.querySelector('.display p');
const answer = document.querySelector('.display h3');
const clear = document.querySelector('#clear');
const decimal = document.querySelector('.decimal');
const negate = document.querySelector('.negate');


let selectedNumber;
let operationRunning = false;
let num1 = '';
let num2 = '';
let operand = '';
let calculation = '';

let calculations = [
    {
        name: 'add',
        operating: false,
        calc: add,
        operator: '+'
    },
    {
        name: 'subtract',
        operating: false,
        calc: subtract,
        operator: '-'
    },
    {
        name: 'multiply',
        operating: false,
        calc: multiply,
        operator: '*'
    },
    {
        name: 'divide',
        operating: false,
        calc: divide,
        operator: '/'
    }
];

function testForOperating() {
    let operatorActive;
    calculations.forEach(calc => {
        if (calc.operating === true) {
            operatorActive = true
        }
    })
    return operatorActive
}
numbers.forEach(number => {
    number.addEventListener('click', e => {
        // negateThis(parseFloat(num1) > 0)
        if (!operationRunning) {
            if (num1.includes('.') && e.target.innerText.includes('.')) {
                return
            } else {
                answer.innerText = '';
                operand = '';
                num1 = e.target.innerText;
                calculations.forEach(calc => calc.operating = false)
                num2 = '';
                operationRunning = true;
            }
        }
        else if (testForOperating()) {

            if (num2.includes('.') && e.target.innerText.includes('.')) {
                return
            } else {
                num2 += e.target.innerText

            }
        } else {
            if (num1.includes('.') && e.target.innerText.includes('.')) {
                return
            } else {
                num1 += e.target.innerText;

            }
        }
        calculation = `${num1} ${operand} ${num2}`
        display.innerText = calculation
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', e => {
        operationRunning = true;
        if (num1 && num2) {
            calculations.forEach(calc => {
                if (calc.operating === true) {
                    answer.innerText = calc.calc(num1, num2)
                    num1 = answer.innerText

                    operand = '';
                    num2 = '';
                }
            })

        }
        calculations.forEach(calc => {
            if (calc.name === e.target.id) {
                calc.operating = true
                operand = calc.operator;
            } else {
                calc.operating = false
            }
        })
        calculation = `${num1} ${operand} ${num2}`
        display.innerText = calculation
    })
})

equals.addEventListener('click', e => {

    calculations.forEach(calc => {
        if (calc.operating === true && num2) {
            answer.innerText = calc.calc(num1, num2)
            operationRunning = false;
        }

    })
})

// function negateThis(boolean) {
//     if (boolean === true) {
//         console.log('its working!')
//     }
// }
// negate.addEventListener('click', () => {
//     negateThis(parseFloat(num1) > 0)
//     console.log(this)
// })

clear.addEventListener('click', e => {
    num1 = '';
    num2 = '';
    operand = ''
    answer.innerText = operand
    calculation = `${num1} ${operand} ${num2}`
    display.innerText = calculation;
    calculations.forEach(calc => {
        calc.operating = false;
    })
})


// basic math functions
function add(a, b) {
    return parseFloat(a) + parseFloat(b)
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b)
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b)
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b)
}