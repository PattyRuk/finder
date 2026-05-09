'use strict';

const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('.login-btn');
const errorMsg = document.querySelector('.error-msg');

localStorage.setItem('username', 'Jane123');
localStorage.setItem('email', 'Jane.Doe@email.com');
localStorage.setItem('password', 'password123');

loginBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

     errorMsg.textContent = '';

   
    if (!username && !password) {
        errorMsg.textContent = 'Username and Password are required';
        return;
    }
    if (!username) {
        errorMsg.textContent = 'Username or Email is required';
        return;
    }
    if (!password) {
        errorMsg.textContent = 'Password is required';
        return;
    }

    if ((username === storedUsername || username === storedEmail) && password === storedPassword) {
        window.location.href = './user.html';
    } else {
        errorMsg.textContent = 'Incorrect username or password';
    }
});