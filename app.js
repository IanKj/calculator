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
const percentage = document.querySelector('.percentage')

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
    number.addEventListener('click', function (e) {
        if (!operationRunning) {
            if (num1.includes('.') && e.target.innerText.includes('.')) {
                return
            } else {
                console.log(this)
                answer.innerText = '';
                operand = '';
                num1 = e.target.innerText;

                calculations.forEach(calc => calc.operating = false)
                num2 = '';
                operationRunning = true;
                // negateThis(num1)
                console.log(num1)
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

// function negateThis(number) {
//     negate.addEventListener('click', e => {
//         if (parseFloat(number) > 0) {
//             console.log(this)
//             number = '-' + number;
//             num1 = number
//             calculation = `${num1} ${operand} ${num2}`
//             display.innerText = calculation
//         }
//     })
// }

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

percentage.addEventListener('click', e => {
    if (num1 && num2) {
        calcPercent = true;
        num2 /= Math.pow(10, 2);
        console.log(num2)
        calculation = `${num1} ${operand}= (${num2} * ${num1}`;
        calculations.forEach(calc => {
            if (calc.operating === true && num2) {
                answer.innerText = calc.calc(num1, num2, calcPercent)
                operationRunning = false;
            }

        })
    }
})
// basic math functions
function add(a, b, calcPercent) {
    if (calcPercent) {
        return parseFloat(num1) + (num2 * num1)
    } else {
        return parseFloat(a) + parseFloat(b)
    }
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

// function percentage(a, b) {
//     return
// }