// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializePreloader();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeTypewriter();
    initializeParallax();
    initializeParticleSystem();
    initializeMagneticEffect();
    initializeScrollAnimations();
});

// Preloader functionality
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Hide preloader after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Start main animations after preloader
                startMainAnimations();
            }, 500);
        });
    }
}

// Start main animations after preloader
function startMainAnimations() {
    // Add animation classes to elements
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) heroContent.classList.add('reveal-left');
    if (heroImage) heroImage.classList.add('reveal-right');
    
    // Trigger scroll animations
    setTimeout(() => {
        triggerScrollAnimations();
    }, 1000);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate skill bars if they exist
                const skillBars = entry.target.querySelectorAll('.progress-bar');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 500);
                });
                
                // Animate counters
                const counters = entry.target.querySelectorAll('.stat-card h4');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual cards
    const cards = document.querySelectorAll('.project-card, .experience-card, .award-card, .skill-category');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    let current = 0;
    const increment = target / 50;
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 40);
}

// Initialize animations
function initializeAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .experience-card, .award-card, .skill-category, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Social links animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-outline-primary')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Enhanced typewriter effect for hero section
function initializeTypewriter() {
    const texts = [
        "Full Stack Developer & UI/UX Designer",
        "Creative Problem Solver",
        "Innovation Enthusiast"
    ];
    const element = document.querySelector('.hero-content h2');
    
    if (element) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Add blinking cursor
            element.innerHTML = element.textContent + '<span class="cursor">|</span>';
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next text
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 2000);
        
        // Animate cursor separately
        setInterval(() => {
            const cursor = element.querySelector('.cursor');
            if (cursor) {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
    }
}

// Parallax effect for hero section
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    const profileImg = document.querySelector('.profile-img');
    
    if (heroSection && profileImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                profileImg.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formFields = this.querySelectorAll('input, textarea');
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Add success animation
                submitBtn.style.background = '#10b981';
                setTimeout(() => {
                    submitBtn.style.background = '';
                }, 2000);
                
            }, 2000);
        });
        
        // Form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Check if field is required
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Add validation classes
    if (isValid && value) {
        field.classList.add('is-valid');
    } else if (!isValid) {
        field.classList.add('is-invalid');
    }
    
    // Show/hide validation message
    let feedback = field.parentNode.querySelector('.invalid-feedback');
    if (!feedback && !isValid) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        field.parentNode.appendChild(feedback);
    }
    
    if (feedback) {
        feedback.textContent = message;
        feedback.style.display = isValid ? 'none' : 'block';
    }
    
    return isValid;
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} notification-toast`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        border: none;
        border-radius: 12px;
        animation: slideInRight 0.5s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 5000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-toast .btn-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        opacity: 0.7;
    }
    
    .notification-toast .btn-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Add scroll listener for reveals
window.addEventListener('scroll', revealOnScroll);

// Particle system
function initializeParticleSystem() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        
        // Random color
        const colors = ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 15000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 400);
    }
}

// Magnetic effect for elements
function initializeMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add stagger delay for child elements
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('reveal-up');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Trigger scroll animations manually
function triggerScrollAnimations() {
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        showNotification('🎉 Konami Code Activated! You found the secret!', 'success');
        
        // Add some fun effects
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Portfolio loaded in ${pageLoadTime}ms`);
            }, 0);
        });
    }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Black Animated Portfolio initialized!');
        monitorPerformance();
    });
} else {
    console.log('🚀 Black Animated Portfolio initialized!');
    monitorPerformance();
}

// Add custom cursor effect
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #fbbf24, #f59e0b);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Enhance cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .magnetic');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, #10b981, #059669)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #fbbf24, #f59e0b)';
        });
    });
}

// Initialize custom cursor on desktop
if (window.innerWidth > 768) {
    initializeCustomCursor();
}