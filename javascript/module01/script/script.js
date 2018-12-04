'use strict';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message = '';

let userLogin = prompt('Введите логин');
let userPassword;

if (userLogin === null) {
  alert((message = 'Отменено пользователем!'));
} else if (userLogin === ADMIN_LOGIN) {
  userPassword = prompt('Введите пароль!');

  if (userPassword === null) {
    alert((message = 'Отменено пользователем!'));
  } else if (userPassword === ADMIN_PASSWORD) {
    alert((message = 'Добро пожаловать!'));
  } else {
    alert((message = 'доступ запрещен!'));
  }
} else {
  alert('Доступ запрещен, неверный логин');
}
