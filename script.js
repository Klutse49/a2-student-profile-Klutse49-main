document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact form');
    const responseDiv = document.getElementById('formResponse');

    // Form submission event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;
        let validationPassed = true;

        // Check if any field is empty
        if (!name || !email || !message) {
            alert('Please fill in all the fields.');
            validationPassed = false;
        }

        // Check if the name contains any numbers
        if (/\d/.test(name)) {
            alert('Please enter a valid name without numbers.');
            validationPassed = false;
        }

        // If validation passes, process the form
        if (validationPassed) {
            const thankYouMessage = `Thank you, ${name}, for reaching out. We appreciate your message and will contact you at ${email}.`;
            responseDiv.innerHTML = `<p>${thankYouMessage}</p>`;
            responseDiv.style.display = 'block'; // Make the response div visible

            form.reset(); // Clear the form fields
        }
    });

    // Real-time input validation for the name field
    document.querySelector('input[name="name"]').addEventListener('input', function() {
        const errorSpan = this.nextElementSibling; // Assuming an <span class="error"> is next to each input
        if (/\d/.test(this.value)) {
            errorSpan.textContent = 'Names cannot contain numbers.';
            errorSpan.style.display = 'inline';
        } else {
            errorSpan.style.display = 'none';
        }
    });
});
