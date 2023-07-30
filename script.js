const formEl = document.querySelector('.signup-form');
const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}


const renderError = (element, msg='') => {
    element.classList.add('signup-form__input-error');
    element.nextElementSibling.classList.remove('hidden');
    if (msg.length !== 0) {
        element.nextElementSibling.innerText = msg;
    }
}

const clearError = element => {
    element.classList.remove('signup-form__input-error');
    element.nextElementSibling.classList.add('hidden');
}

const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    return emailPattern.test(email);
}

const validateText = text => {
    return text.length !== 0;
}

const validateInput = inputEl => {
    const inputElValue = inputEl.value.trim();
    const inputElId = inputEl.getAttribute('id');

    if (inputElId !== 'email' && !validateText(inputElValue)) {
        renderError(inputEl);
        return;
    }

    if (inputElId === 'email' && inputElValue.length === 0) {
        renderError(inputEl, 'Email cannot be empty');
        return;
    }

    if (inputElId === 'email' && !validateEmail(inputElValue)) {
        renderError(inputEl, 'Looks like this is not an email');
        return;
    }

    user[inputEl.getAttribute('name')] = inputElValue;
}

const handleFormSubmit = event => {
    event.preventDefault();

    // get all input elements
    const inputEls = formEl.querySelectorAll('.signup-form__input');

    // clear any error rendered before
    inputEls.forEach(clearError);

    // check all input elements for errors
    inputEls.forEach(validateInput);

    if (Object.values(user).every(item => item.length != 0)) {
        console.log('Success! Ready to send to server: ', user);

        // after data sent or processed clear user object
        for (const key in user) {
            user[key] = '';
        }
    }    
}

const handleKeyDownEvent = event => {
    // with Enter submit form
    if (event.key === 'Enter') {
        handleFormSubmit(event);
    }

    // with Escape clear all fields
    if (event.key === 'Escape') {
        const inputEls = formEl.querySelectorAll('.signup-form__input');
        inputEls.forEach(inputEl => {
            clearError(inputEl);
            inputEl.value = '';
        });
    }
}

formEl.addEventListener('submit', handleFormSubmit);
formEl.addEventListener('keydown', handleKeyDownEvent);