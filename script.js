document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactForm');
    const responseOverlay = document.createElement('div');
    responseOverlay.id = 'responseOverlay';
    responseOverlay.style.display = 'none'; 
    document.body.appendChild(responseOverlay);

    
    responseOverlay.addEventListener('click', function() {
        this.style.display = 'none'; 
    });

    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;
        const errorMessages = form.querySelectorAll('.error-message');
        let validationPassed = true;

        
        if (!name || !email || !message) {
            alert('Please fill in all the fields.');
            validationPassed = false;
        }

        
        if (/\d/.test(name)) {
            alert('Please enter a valid name without numbers.');
            validationPassed = false;
        }

        
        if (!message) {
            const messageError = form.querySelector('textarea[name="message"]').nextElementSibling;
            messageError.textContent = 'Please enter your message.';
            validationPassed = false;
        }

        if (validationPassed) {
            const thankYouMessage = `Thank you, ${name}, for reaching out. We appreciate your message and will contact you at ${email}.`;
            responseOverlay.innerHTML = `<div class="overlay-content"><p>${thankYouMessage}</p><p>Click anywhere to close this message.</p></div>`;
            responseOverlay.style.display = 'flex'; 

            form.reset(); 
        }
    });

   
    document.querySelector('input[name="name"]').addEventListener('input', function() {
        const errorSpan = this.nextElementSibling; 
        if (/\d/.test(this.value)) {
            errorSpan.textContent = 'Names cannot contain numbers.';
            errorSpan.style.display = 'inline';
        } else {
            errorSpan.style.display = 'none';
        }
    });
});
