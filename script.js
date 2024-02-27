document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactForm');

    const responseOverlay = document.createElement('div');
    Object.assign(responseOverlay.style, {
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
    document.body.appendChild(responseOverlay);

    
    responseOverlay.addEventListener('click', function() {
        this.style.display = 'none';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let validationPassed = true;
        const formData = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value,
        };

        
        form.querySelectorAll('.error-message').forEach(span => span.textContent = '');

        
        if (!formData.name || /\d/.test(formData.name)) {
            document.getElementById('errorName').textContent = 'Please enter a valid name without numbers.';
            validationPassed = false;
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            document.getElementById('errorEmail').textContent = 'Please enter a valid email address.';
            validationPassed = false;
        }

        if (!formData.message) {
            document.getElementById('errorMessage').textContent = 'Please enter your message.';
            validationPassed = false;
        }

        
        if (validationPassed) {
            const thankYouMessage = `Thank you, ${formData.name}, for reaching out. We appreciate your message and will contact you at ${formData.email}.`;
            responseOverlay.innerHTML = `<div><p>${thankYouMessage}</p><p>Click anywhere to close this message.</p></div>`;
            responseOverlay.style.display = 'flex';
            form.reset();
        }
    });

    
    document.querySelector('input[name="name"]').addEventListener('input', function() {
        const errorSpan = this.nextElementSibling;
        errorSpan.textContent = /\d/.test(this.value) ? 'Names cannot contain numbers.' : '';
    });
});
