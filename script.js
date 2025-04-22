document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate Stats Counter
    const animateCounters = () => {
        const counters = document.querySelectorAll('.number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Trigger counter animation when stats section is in view
    const statsSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Carousel Functionality
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const itemCount = items.length;
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Update active class
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }
    
    // Auto-rotate carousel
    let carouselInterval;
    
    function startCarousel() {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }
    
    function stopCarousel() {
        clearInterval(carouselInterval);
    }
    
    if (carousel) {
        startCarousel();
        
        // Pause on hover
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }
    
    // Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const city = document.getElementById('city').value;
            const role = document.getElementById('role').value;
            
            // Here you would typically send this data to a server
            console.log('Form submitted:', { name, email, city, role });
            
            // Show success message
            alert(`Thanks for signing up, ${name}! We'll contact you soon about volunteering opportunities.`);
            
            // Reset form
            signupForm.reset();
        });
    }
    
    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.service-card, .story-card, .partner-logos img, .contact-info, .contact-form', {
        interval: 200
    });
    
    // Add animation to hero text
    ScrollReveal().reveal('.hero-content', { 
        delay: 300,
        duration: 1000,
        distance: '50px',
        origin: 'left'
    });
    
    ScrollReveal().reveal('.hero-image', { 
        delay: 600,
        duration: 1000,
        distance: '50px',
        origin: 'right'
    });
    
    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '20px 0';
        }
    });
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send this data to a server
            console.log('Contact form submitted:', { name, email, message });
            
            // Show success message
            alert(`Thanks for your message, ${name}! We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send this data to a server
            console.log('Newsletter subscription:', { email });
            
            // Show success message
            alert(`Thanks for subscribing to our newsletter! You'll receive updates at ${email}.`);
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Add toggle functionality to burger menu
    if (burger) {
        burger.addEventListener('click', () => {
            burger.querySelector('.line1').classList.toggle('toggle1');
            burger.querySelector('.line2').classList.toggle('toggle2');
            burger.querySelector('.line3').classList.toggle('toggle3');
        });
    }
    
    // Add active class to current navigation item based on section in view
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide form and show success message
    this.style.display = 'none';
    const formContainer = this.parentElement;
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div class="success-message">
            <h3>🎉 Welcome to the PawsomeCity family! 🎉</h3>
            <p>Thank you for joining our movement to make cities more pet-friendly!</p>
            <div class="success-icon">🐾</div>
        </div>
    `;
    formContainer.appendChild(successMessage);
    
    // Trigger celebrations
    showCelebration();
    
    // You can still submit the form data to your backend here
    // setTimeout(() => { this.submit(); }, 3000);
});

function showCelebration() {
    // Show dancing cat
    const dancingCat = document.getElementById('dancing-cat');
    dancingCat.style.display = 'block';
    
    // Create fireworks
    const container = document.getElementById('fireworks-container');
    container.style.display = 'block';
    
    // Fireworks animation
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#292f36'];
    const fireworksCount = 30;
    
    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'absolute';
            firework.style.width = '5px';
            firework.style.height = '5px';
            firework.style.borderRadius = '50%';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = `${Math.random() * 100}%`;
            firework.style.boxShadow = `0 0 10px 2px ${colors[Math.floor(Math.random() * colors.length)]}`;
            container.appendChild(firework);
            
            // Animate
            const animation = firework.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(30)', opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0,0.2,0.8,1)'
            });
            
            animation.onfinish = () => firework.remove();
        }, i * 200);
    }
    
    // Hide after animation
    setTimeout(() => {
        container.style.display = 'none';
        dancingCat.style.display = 'none';
    }, 5000);
}

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Partner logo hover effects
    const partnerItems = document.querySelectorAll('.partner-item');
    
    partnerItems.forEach(item => {
        const img = item.querySelector('img');
        const description = item.querySelector('.partner-description');
        
        // Mobile touch support
        let touchTimer;
        
        img.addEventListener('touchstart', () => {
            touchTimer = setTimeout(() => {
                description.classList.add('force-show');
            }, 300); // Long press 300ms to show
        });
        
        img.addEventListener('touchend', () => {
            clearTimeout(touchTimer);
            description.classList.remove('force-show');
        });
        
        // Click to show on mobile
        img.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                description.classList.toggle('mobile-show');
                
                // Hide other descriptions
                partnerItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.partner-description').classList.remove('mobile-show');
                    }
                });
            }
        });
    });
    
    // Hide descriptions when clicking elsewhere on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !e.target.closest('.partner-item')) {
            document.querySelectorAll('.partner-description').forEach(desc => {
                desc.classList.remove('mobile-show');
            });
        }
    });
});