const username = document.querySelector('#username')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector("#confirm-password");

const signUp = document.querySelector('.btn');


// prevent the form from submitting when clicked

signUp.addEventListener('submit', function(e) {
    e.preventDefault();
})