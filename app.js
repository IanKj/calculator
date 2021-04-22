const container = document.querySelector('.main-container');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const addition = document.querySelector('#add');
const subtraction = document.querySelector('#subtract');
const division = document.querySelector('#divide');
const multiplication = document.querySelector('#multiply');
const equals = document.querySelector('#equals');

let operator = '';
let selectedNumber;
let operationRunning = false;
let adding = false;
let subtracting = false;
let dividing = false;
let multiplying = false;

let nums2Calc = []

let calculations = [
    {
        name: 'add',
        operating: false,
        calc: add
    },
    {
        name: 'subtract',
        operating: false,
        calc: subtract
    },
    {
        name: 'multiply',
        operating: false,
        calc: multiply
    },
    {
        name: 'divide',
        operating: false,
        calc: divide
    }
];

numbers.forEach(number => {
    number.addEventListener('click', e => {
        nums2Calc.push(parseInt(e.target.innerText))
        console.log(nums2Calc);
    })

})

operators.forEach(operator => {
    operator.addEventListener('click', e => {
        operationRunning = true;
        calculations.forEach(calc => {
            if (calc.name === e.target.id) {
                calc.operating = true
                // operator = e.target.id
                // console.log(operator)
            }
        })

    })
})

equals.addEventListener('click', e => {
    console.log('equals clicked')
    calculations.forEach(calc => {
        if (calc.operating === true) {
            console.log('an operator is true')
            return calc.calc(nums2Calc)
        }
    })

})

// basic math functions
function add(array) {
    return array.reduce((a, b) => a + b)
}

function subtract(array) {
    return array.reduce((a, b) => a - b)
}

function multiply(array) {
    return array.reduce((a, b) => a * b)
}

function divide(array) {
    return array.reduce((a, b) => a / b)
}