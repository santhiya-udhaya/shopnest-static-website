// ==================== SHOPPING CART FUNCTIONALITY ====================

// Cart counter variable
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const newsletterForm = document.getElementById('newsletter-form');

/**
 * Add to cart button click handler
 * Increments cart count and provides visual feedback
 */
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Increment cart count
        cartCount++;
        updateCartCount();

        // Visual feedback: change button text temporarily
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="bi bi-check-circle"></i> Added to Cart!';
        this.style.backgroundColor = '#28a745';

        // Reset button after 2 seconds
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.backgroundColor = '';
        }, 2000);

        // Show a small notification
        showNotification('Product added to cart!');
    });
});

/**
 * Update cart count display
 */
function updateCartCount() {
    cartCountElement.textContent = cartCount;
    
    // Animate cart badge
    cartCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 300);
}

// ==================== NEWSLETTER SUBSCRIPTION ====================

/**
 * Newsletter form submission handler
 */
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        const emailValue = emailInput.value;

        // Validate email
        if (!isValidEmail(emailValue)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Subscribing...';

        // Simulate subscription delay
        setTimeout(() => {
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;

            // Clear input
            emailInput.value = '';

            // Show success message
            showNotification(`Welcome! Confirmation sent to ${emailValue}`, 'success');
        }, 1500);
    });
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'success') {
    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1050;
            max-width: 400px;
        `;
        document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.role = 'alert';
    notification.style.cssText = `
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        animation: slideInRight 0.3s ease-out;
        margin-bottom: 10px;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to container
    notificationContainer.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// ==================== SMOOTH SCROLL LINKS ====================

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or if it's a data-bs-toggle link (Bootstrap)
        if (href === '#' || this.getAttribute('data-bs-toggle')) {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR ACTIVE STATE ====================

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link on page load
updateActiveNavLink();

// ==================== LAZY LOADING SUPPORT ====================

/**
 * Initialize Intersection Observer for lazy-loaded images
 * (HTML5 loading="lazy" attribute is supported in modern browsers)
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== FORM VALIDATION ====================

/**
 * Bootstrap form validation on submit
 */
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms that need to be validated
        const forms = document.querySelectorAll('form');

        Array.prototype.slice.call(forms).forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// ==================== PAGE LOAD ANIMATIONS ====================

/**
 * Add entrance animations when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Animate product cards on load
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });

    // Animate category cards on load
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, (categoryCards.length + index) * 50);
    });
});

// ==================== MOBILE MENU CLOSE ON LINK CLICK ====================

/**
 * Close mobile navbar when a link is clicked
 */
const navbarToggle = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggle.click();
        }
    });
});

// ==================== CONSOLE MESSAGES ====================

console.log('%c🛍️ Welcome to ShopNest!', 'font-size: 20px; font-weight: bold; color: #007bff;');
console.log('%cA professional e-commerce website built with HTML5, CSS3, and Bootstrap 5', 'font-size: 14px; color: #666;');
console.log('%cVersion 1.0 | © 2026 ShopNest', 'font-size: 12px; color: #999;');
