document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactForm');
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageTextarea = form.querySelector('textarea[name="message"]');
    const responseOverlay = document.createElement('div');

    setupResponseOverlay(responseOverlay);
    document.body.appendChild(responseOverlay);

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

    setupRealTimeValidation(nameInput, emailInput, messageTextarea);
});

function setupResponseOverlay(overlay) {
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#FFF',
        flexDirection: 'column',
        textAlign: 'center',
        zIndex: '1000',
    });
    overlay.addEventListener('click', function() {
        this.style.display = 'none';
    });
}

function displaySuccessMessage(name, email, overlay) {
    const thankYouMessage = `Thank you, ${name}, for reaching out. We appreciate your message and will contact you at ${email}.`;
    overlay.innerHTML = `<div><p>${thankYouMessage}</p><p>Click anywhere to close this message.</p></div>`;
    overlay.style.display = 'flex';
}

function validateForm(nameInput, emailInput, messageTextarea) {
    let errors = [];

    if (!nameInput.value || /\d/.test(nameInput.value)) {
        errors.push('Name cannot be empty or contain numbers.');
    }

    if (!emailInput.value || !/\S+@\S+\.\S+/.test(emailInput.value)) {
        errors.push('Please enter a valid email address.');
    }

    if (!messageTextarea.value) {
        errors.push('Message cannot be empty.');
    }

    return errors;
}

function displayErrors(errors) {
    
    const errorDiv = document.getElementById('formErrors');
    errorDiv.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    errorDiv.style.display = 'block';
}

function setupRealTimeValidation(nameInput, emailInput, messageTextarea) {
    nameInput.addEventListener('input', function() {
        this.nextElementSibling.textContent = /\d/.test(this.value) ? 'Names cannot contain numbers.' : '';
    });

    emailInput.addEventListener('input', function() {
        this.nextElementSibling.textContent = !/\S+@\S+\.\S+/.test(this.value) && this.value ? 'Invalid email format.' : '';
    });

    messageTextarea.addEventListener('input', function() {
        this.nextElementSibling.textContent = !this.value ? 'Message cannot be empty.' : '';
    });
}
