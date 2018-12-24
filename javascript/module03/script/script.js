'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const isLoginValid = function (login) {
  if (login.length >= 4 && login.length <= 16) {
    return true;
  }
  return false;
};

const isLoginUnique = function (logins, login) {
  if (!logins.includes(login)) {
    return true;
  }
  return false;
};

const addLogin = function (logins, login) {
  if (isLoginValid(login) === true) {
    if (isLoginUnique(logins, login) === true) {
      logins.push(login);
      return console.log('Логин добавлен');
    }
    return console.log('Такой логин уже используется');
  }
  return console.log('Ошибка! Логин должен быть от 4 до 16 символов!');
};

addLogin(logins, 'Ajax');
addLogin(logins, 'robotGoogles');
addLogin(logins, 'Zod');
addLogin(logins, 'jqueryisextremelyfast');
addLogin(
  logins,
  prompt('Введите логин. Он должен содержать от 4 до 16 символов!'),
);