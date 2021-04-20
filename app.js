const container = document.querySelector('.main-container');
const numbers = document.querySelectorAll('.number');

let selectedNumber;

numbers.forEach(number => {
    number.addEventListener('click', e => {
        selectedNumber = e.target.innerText;
        console.log(selectedNumber)
    })
})



















//basic math functions
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}



// function createButtonGrid(num) {
//     let i = 0;
//     while (i < num) {
//         const gridElement = document.createElement('div');
//         gridElement.classList.add('button');
//         container.append(gridElement);
//         i++
//     }
// }

