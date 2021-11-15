const username = document.querySelector('#username')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector("#confirm-password");

const signUp = document.querySelector('.btn');



// returns true if the input field is empty
const isRequired = value => value === '' ? false : true;


// returns false if length is not between min and max 
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// to check if the email is valid
const isEmailValid = (email) => {
    const re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}

// to check if password is strong
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};


// highlights input border and display error if the input field is invalid

 const showError = (input, message) => {

    //get the form field element
    const formField = input.parentElement;

    formField.classlist.remove('success');
    formField.classlist.add('error');

    //show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
 }


 // to check for success
 const showSuccess = (input) => {

    const formField = input.parentElement;
 
 // remove error
    formField.classlist.remove('error');
    formField.classlist.add('success');


 // hide message error
    const error = formField.querySelector('small');
    error.textContent = '';
 }



 //Validate the username field

const checkUsername = () => {

    let valid = false;
     const min = 3,
         max = 20;

    const usernameEl = username.value.trim();
    
    if(!isRequired(usernameEl)) {
        showError((username), 'Username cannot be blank.');

    } else if (!isBetween(usernameEl.length, min, max)) {
       showError(username, `Username must be between ${min} and ${max} characters.`)
    } else {
       showSuccess(username);
       valid = true;
    }

    return valid;
}


// Validate Email

const checkEmail = () => {
    let valid = false;

    const emailEl = email.value.trim();

    if(!isRequired(emailEl)) {
        showError(email, 'Email cannot be blank.')
    } else if (!isEmailValid(email)) {
        showError(email, 'Email is not valid')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;

}

// Validate password

const checkPassword = () => {
    
    let valid = false;

    const passwordEl = email.value.trim();

    if(!isRequired(passwordEl)) {
        showError(password, 'Password cannot be blank.')
    } else if(!isPasswordSecure(password)) {
        showError(password, 'Password is not Strong.')
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
}


// Validate Password Confirm

const checkPasswordConfirm = () => {

    let valid = false;

    const passwordConfirmEl = password.value.trim();
    const passwordEl = email.value.trim();

    if(!isRequired(confirmPassword)) {
        showError(confirmPassword, 'Please enter the Password again.')
    } else if(passwordEl !== passwordConfirmEl) {
        showError(confirmPassword, 'Confirm Password does not Match.')
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }

    return valid;

}

// prevent the form from submitting when clicked

signUp.addEventListener('submit', function(e) {
    e.preventDefault();

    // validate the forms

    let isUsernameValid = checkUsername,
        isEmailValid = checkEmail,
        isPasswordValid = checkPassword,
        isConfirmPasswordValid = checkPasswordConfirm;


    let isFormValid = 
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;
                          
 if(isFormValid) {

 }

})


/////////////

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

signUp.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);


