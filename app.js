const container = document.querySelector('.main-container');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const addition = document.querySelector('#add');
const subtraction = document.querySelector('#subtract');
const division = document.querySelector('#divide');
const multiplication = document.querySelector('#multiply');
const equals = document.querySelector('#enter');
const display = document.querySelector('.display p');
const answer = document.querySelector('.display h3');
const clear = document.querySelector('#clear');
const decimal = document.querySelector('.decimal');
const negate = document.querySelector('.negate');
const percentage = document.querySelector('#percentage')
const deleteBtn = document.getElementById('delete');
const allBtns = document.querySelectorAll('.button');

fitty(answer)
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
        numberFunc(this)
    })
})

function numberFunc(button) {

    if (!operationRunning) {
        if (num1.includes('.') && button.innerText.includes('.')) {
            return
        } else {
            answer.innerText = '';
            operand = '';
            num1 = button.innerText;
            calculations.forEach(calc => calc.operating = false)
            num2 = '';
            operationRunning = true;
        }
    }
    else if (testForOperating()) {

        if (num2.includes('.') && button.innerText.includes('.')) {
            return
        } else {
            if (num2.length < 16)
                num2 += button.innerText
        }
    } else {
        if (num1.includes('.') && button.innerText.includes('.')) {
            return
        } else {
            if (num1.length < 16)
                num1 += button.innerText;
        }
    }
    calculation = `${num1} ${operand} ${num2}`
    display.innerText = calculation

}
operators.forEach(operator => {
    operator.addEventListener('click', function (e) {
        operatorFunc(this)
    })
})

function operatorFunc(button) {
    if (!num1) {
        return
    }
    operationRunning = true;
    if (answer.innerText) {
        num1 = answer.innerText
        num2 = '';
        answer.innerText = ''
    }
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
        if (calc.name === button.id) {
            calc.operating = true
            operand = calc.operator;
        } else {
            calc.operating = false
        }
    })
    calculation = `${num1} ${operand} ${num2}`
    display.innerText = calculation
}

equals.addEventListener('click', e => {
    equalsFunc();
})

function equalsFunc() {
    calculations.forEach(calc => {
        if (calc.operating === true && num2) {
            answer.innerText = calc.calc(num1, num2)
            operationRunning = false;
        }
    })
}
negate.addEventListener('click', e => {
    if (num1 && !num2) {
        num1 = reverseNum(num1)
        calculation = `${num1} ${operand} ${num2}`
        display.innerText = calculation
    } else if (num2 && !answer.innerText) {
        num2 = reverseNum(num2)
        calculation = `${num1} ${operand} ${num2}`
        display.innerText = calculation
    } else {
        answer.innerText = reverseNum(answer.innerText)
    }
})

function reverseNum(num) {
    if (parseFloat(num) > 0) {
        return num = '-' + num
    } else {
        return `${Math.abs(num)}`
    }
}

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
    percentageFunc();
})

function percentageFunc() {
    if (num1 && num2) {
        calcPercent = true;
        num2 /= Math.pow(10, 2);
        console.log(num2)
        calculation = `${num1} ${operand}= (${num2} * ${num1}`;
        calculations.forEach(calc => {
            if (calc.operating === true && num2) {
                let getResults = calc.calc(num1, num2, calcPercent)
                console.log(getResults)
                answer.innerText = getResults.result;
                num2 = getResults.percentage;
                calculation = `${num1} ${operand} ${num2}`
                display.innerText = calculation
                operationRunning = false;
            }
        })
    }
}

deleteBtn.addEventListener('click', e => {
    deleteFunc()
})

function deleteFunc() {
    if (num1 && !num2) {
        num1 = num1.slice(0, -1);
        calculation = `${num1} ${operand} ${num2}`
        display.innerText = calculation
    } else {
        num2 = num2.slice(0, -1);
        calculation = `${num1} ${operand} ${num2}`
        display.innerText = calculation

    }
}
// basic math functions
function add(a, b, calcPercent) {
    if (calcPercent) {
        let percentAnswer = {};
        percentAnswer.result = parseFloat(num1) + (num2 * num1);
        percentAnswer.percentage = num2 * num1;
        console.log(percentAnswer);
        return percentAnswer
    } else {
        return parseFloat(a) + parseFloat(b)
    }
}

function subtract(a, b, calcPercent) {
    if (calcPercent) {
        let percentAnswer = {};
        percentAnswer.result = parseFloat(num1) - (num2 * num1);
        percentAnswer.percentage = num2 * num1;
        console.log(percentAnswer);
        return percentAnswer
    } else {
        return parseFloat(a) - parseFloat(b)
    }
}


function multiply(a, b, calcPercent) {
    if (calcPercent) {
        let percentAnswer = {};
        percentAnswer.result = parseFloat(num1) * (num2 * num1);
        percentAnswer.percentage = num2 * num1;
        console.log(percentAnswer);
        return percentAnswer
    } else {
        return parseFloat(a) * parseFloat(b)
    }
}


function divide(a, b, calcPercent) {
    if (calcPercent) {
        let percentAnswer = {};
        percentAnswer.result = parseFloat(num1) / (num2 * num1);
        percentAnswer.percentage = num2 * num1;
        console.log(percentAnswer);
        return percentAnswer
    } else {
        return parseFloat(a) / parseFloat(b)
    }
}

document.addEventListener('keydown', e => {
    console.log(e.key)
    for (let button of allBtns) {
        if (Array.from(button.classList).includes('number') && e.key == button.innerText) {
            console.log('clicked a number')
            return numberFunc(button)
        }
    }
    for (let button of allBtns) {
        if (Array.from(button.classList).includes('operator') && e.key == button.innerText) {
            console.log('clicked an operator')
            return operatorFunc(button)
        }
    }
    for (let button of allBtns) {
        if (button.id === 'delete' && e.key.toLowerCase() === button.id) {
            console.log('clicked delete')
            return deleteFunc()
        }
    }
    for (let button of allBtns) {
        if (button.id === 'enter' && e.key.toLowerCase() === button.id) {
            return equalsFunc()
        }
    }
    for (let button of allBtns) {
        if (button.innerText === '%' && e.key === button.innerText) {
            return percentageFunc()
        }
    }
})