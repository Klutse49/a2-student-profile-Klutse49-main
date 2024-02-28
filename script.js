document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm'); 
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const errors = validateForm(nameInput, emailInput, messageTextarea);

        if (errors.length > 0) {
            displayErrors(errors);
        } else {
            displaySuccessMessage(nameInput.value, emailInput.value, responseOverlay);
            form.reset();
        }
    });
});

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function displayErrorMessage(inputElement, message) {
    const id = inputElement.name + '-error'; 
    let messageElement = document.getElementById(id);
    if (!messageElement) {
        messageElement = document.createElement('span');
        messageElement.id = id;
        messageElement.className = 'error-message';
        inputElement.parentNode.insertBefore(messageElement, inputElement.nextSibling);
    }
    messageElement.textContent = message;
}

function clearMessages() {
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(messageElement) {
        messageElement.textContent = '';
    });

    
    const successMessageElement = document.getElementById('formResponse');
    if (successMessageElement) {
        successMessageElement.textContent = '';
    }
}

function displaySuccessMessage(message) {
    const responseDiv = document.getElementById('formResponse'); 
    responseDiv.innerHTML = `<p>${message}</p>`;
}
