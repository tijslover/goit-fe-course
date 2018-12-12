'use strict';

let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введите число');
  const message =
    userInput !== '' && !Number.isNaN(Number(userInput));
  if (userInput === null) {
    alert('Cancel');
    break;
  }
  if (message) {
    numbers.push(Number(userInput));
  } else {
    alert('Введите именно число');
  }
} while (userInput !== null);
console.log(numbers);

if (numbers.length > 0) {
  for (let i = 0, max = numbers.length; i < max; i += 1) {
    total = total + numbers[i];
  }
  alert(`сумма введенных чисел = ${total}`);
}
console.log(total);