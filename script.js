document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async function(e) { // Add 'async' keyword here
    e.preventDefault(); // Prevent the default form submission (which would redirect)

    const formData = new FormData(this); // Get all form data
    const actionUrl = this.action; // Get the action URL from the form

    try {
        const response = await fetch(actionUrl, {
            method: 'POST',
            body: formData, // Send the form data
            headers: {
                'Accept': 'application/json' // Important for Formspree to send JSON response
            }
        });

        if (response.ok) { // Check if the submission was successful
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            formMessage.style.display = 'block';

            // Clear the form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            // Handle errors (e.g., validation errors from Formspree)
            const data = await response.json();
            if (data.errors) {
                formMessage.textContent = data.errors.map(error => error.message).join(', ');
            } else {
                formMessage.textContent = 'Oops! There was an error sending your message.';
            }
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Submission error:', error);
        formMessage.textContent = 'Network error. Please try again later.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
    }
});

    // Scroll Reveal Animation (Basic example, can be enhanced with Intersection Observer)
    const sections = document.querySelectorAll('section');

    const revealSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (sectionTop < screenHeight - 100) { // Adjust 100 as needed
                section.classList.add('active');
            } else {
                section.classList.remove('active'); // Optional: remove active if scrolled back up
            }
        });
    };

    // Add 'reveal' class to sections initially for the transition effect
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    window.addEventListener('scroll', revealSection);
    revealSection(); // Initial check on load
});