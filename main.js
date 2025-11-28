// Main JavaScript for Luxe Cuts & Beauty Studio

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Luxe Cuts & Beauty Studio - Website Loaded');
    
    // Initialize all functionality
    initMobileMenu();
    initBookingButtons();
    initBookingForm();
    initSmoothScrolling();
    initAnimations();
    initScrollEffects();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change hamburger icon to X when menu is open
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Booking Button Functionality
function initBookingButtons() {
    const bookingButtons = [
        'bookingBtn',
        'mobileBookingBtn', 
        'heroBookingBtn',
        'ctaBookingBtn'
    ];
    
    bookingButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToBookingForm();
            });
        }
    });
}

// Scroll to booking form
function scrollToBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Focus on the first input field
        setTimeout(() => {
            const firstInput = bookingForm.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 500);
    } else {
        // If on services page, redirect to home page contact section
        window.location.href = 'index.html#contact';
    }
}

// Booking Form Functionality
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmission(this);
        });
        
        // Add input validation and formatting
        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidationError);
        });
        
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
    }
}

// Handle booking form submission
function handleBookingSubmission(form) {
    const formData = new FormData(form);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message') || ''
    };
    
    // Validate all fields
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Show loading state
    showBookingStatus('loading');
    
    // Simulate API call (replace with actual booking system integration)
    setTimeout(() => {
        // Simulate successful booking
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            showBookingStatus('success', bookingData);
            form.reset();
            
            // Send confirmation email (simulated)
            sendBookingConfirmation(bookingData);
        } else {
            showBookingStatus('error');
        }
    }, 2000);
}

// Validate booking form
function validateBookingForm(data) {
    let isValid = true;
    const errors = {};
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Please enter your full name';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.phone = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Service validation
    if (!data.service) {
        errors.service = 'Please select a service';
        isValid = false;
    }
    
    // Display errors
    Object.keys(errors).forEach(field => {
        showFieldError(field, errors[field]);
    });
    
    return isValid;
}

// Show field validation error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('border-red-500');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

// Clear validation error
function clearValidationError(e) {
    const field = e.target;
    field.classList.remove('border-red-500');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    switch(field.id) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError('email', 'Please enter a valid email address');
            }
            break;
        case 'phone':
            if (value && value.length > 0 && value.length < 14) {
                showFieldError('phone', 'Please enter a complete phone number');
            }
            break;
    }
}

// Format phone number
function formatPhoneNumber(e) {
    const input = e.target;
    let value = input.value.replace(/\D/g, ''); // Remove all non-digits
    
    if (value.length >= 6) {
        value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0,3)}) ${value.slice(3)}`;
    }
    
    input.value = value;
}

// Show booking status
function showBookingStatus(status, data = null) {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    
    // Remove existing status messages
    const existingStatus = form.querySelector('.booking-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.className = 'booking-status';
    
    switch(status) {
        case 'loading':
            statusDiv.innerHTML = `
                <div class="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md flex items-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-800 mr-3"></div>
                    Processing your booking request...
                </div>
            `;
            break;
        case 'success':
            statusDiv.innerHTML = `
                <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-check-circle mr-2"></i>
                        <strong>Booking Request Submitted!</strong>
                    </div>
                    <p class="text-sm">Thank you ${data?.name}! We'll contact you within 2 hours to confirm your ${data?.service} appointment.</p>
                    <p class="text-sm mt-1">Confirmation will be sent to ${data?.email}</p>
                </div>
            `;
            break;
        case 'error':
            statusDiv.innerHTML = `
                <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        <strong>Booking Error</strong>
                    </div>
                    <p class="text-sm">We're sorry, there was an issue processing your request. Please call us directly at (512) 555-LUXE or try again.</p>
                </div>
            `;
            break;
    }
    
    form.appendChild(statusDiv);
    
    // Auto-remove success/error messages after 10 seconds
    if (status !== 'loading') {
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.remove();
            }
        }, 10000);
    }
}

// Send booking confirmation (simulated)
function sendBookingConfirmation(bookingData) {
    console.log('Booking confirmation sent to:', bookingData.email);
    console.log('Booking details:', bookingData);
    
    // In a real application, this would integrate with:
    // - Email service (SendGrid, Mailgun, etc.)
    // - Calendar system (Google Calendar, Calendly, etc.)
    // - CRM system
    // - SMS notifications
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize scroll animations
function initAnimations() {
    // Add entrance animations to elements when they become visible
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .package-card, .contact-info-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow to navigation on scroll
        if (scrollTop > 10) {
            nav?.classList.add('shadow-lg');
        } else {
            nav?.classList.remove('shadow-lg');
        }
        
        // Hide/show navigation on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav?.classList.add('-translate-y-full');
        } else {
            // Scrolling up
            nav?.classList.remove('-translate-y-full');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Utility function to show notifications
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    switch(type) {
        case 'success':
            notification.className += ' bg-green-500 text-white';
            break;
        case 'error':
            notification.className += ' bg-red-500 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-white';
            break;
        default:
            notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${message}</span>
            <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto-remove notification
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send errors to a logging service
});

// Console welcome message
console.log(`
🌟 Welcome to Luxe Cuts & Beauty Studio! 🌟
📍 2847 South Lamar Boulevard, Austin, TX 78704
📞 (512) 555-LUXE (5893)
✨ Your One-Stop Beauty & Grooming Destination
`);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPhoneNumber,
        validateBookingForm,
        showNotification
    };
}
