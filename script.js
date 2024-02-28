document.addEventListener('DOMContentLoaded', function() {
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const form = document.getElementById('contactForm');
    const responseDiv = document.getElementById('formResponse'); 

    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        clearMessages();

        
        const errors = validateForm(nameInput, emailInput, messageTextarea);

        
        if (errors.length > 0) {
            displayErrors(errors);
        } else {
            displaySuccessMessage(`Thank you, ${nameInput.value}, for your message.`);
            form.reset(); 
        }
    });
});

function validateForm(nameInput, emailInput, messageTextarea) {
    let errors = [];

    
    if (nameInput.value.trim() === '') {
        errors.push({input: nameInput, message: 'Name is required.'});
    } else if (/[\d]/.test(nameInput.value)) { 
        errors.push({input: nameInput, message: 'Name cannot contain numbers.'});
    }

    
    if (!validateEmail(emailInput.value)) {
        errors.push({input: emailInput, message: 'Invalid email format.'});
    }

    
    if (messageTextarea.value.trim() === '') {
        errors.push({input: messageTextarea, message: 'Message is required.'});
    }

    return errors;
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function displayErrors(errors) {
    errors.forEach(error => {
        displayErrorMessage(error.input, error.message);
    });
}

function displayErrorMessage(inputElement, message) {
    let messageElement = inputElement.nextElementSibling;
    if (!messageElement || !messageElement.classList.contains('error-message')) {
        messageElement = document.createElement('span');
        messageElement.className = 'error-message';
        inputElement.parentNode.insertBefore(messageElement, inputElement.nextSibling);
    }
    messageElement.textContent = message;
    messageElement.style.display = 'block'; 
}

function clearMessages() {
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(messageElement => {
        messageElement.style.display = 'none'; 
    });

    
    const successMessageElement = document.getElementById('formResponse');
    if (successMessageElement) {
        successMessageElement.innerHTML = '';
    }
}

function displaySuccessMessage(message) {
    
    const responseDiv = document.getElementById('formResponse');
    responseDiv.innerHTML = `<p>${message}</p>`;
    responseDiv.style.display = 'block'; 
}

function displayOverlayMessage(message, isError = false) {
    
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '1000';

    
    const messageContainer = document.createElement('div');
    messageContainer.style.padding = '20px';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.backgroundColor = '#fff';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.maxWidth = '80%';
    messageContainer.style.margin = '0 auto';
    
    messageContainer.style.backgroundColor = isError ? '#ffcccc' : '#ccffcc';


    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.color = isError ? '#990000' : '#006600';

    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.onclick = function() {
        document.body.removeChild(overlay);
    };

    
    messageContainer.appendChild(messageText);
    messageContainer.appendChild(closeButton);
    overlay.appendChild(messageContainer);
    document.body.appendChild(overlay);
}

function displaySuccessMessage(message) {
    displayOverlayMessage(message);
}

function displayErrors(errors) {
    
    const combinedErrorMessage = errors.map(error => error.message).join('<br>');
    displayOverlayMessage(combinedErrorMessage, true);
}
