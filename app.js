// Application State
const state = {
    isMenuOpen: false,
    activeSection: 'hero',
    isLoaded: false,
    particles: []
};

// DOM Elements
const elements = {
    loader: null,
    navbar: null,
    navLinks: null,
    mobileMenuToggle: null,
    navMenu: null,

    typewriter: null,
    particlesContainer: null,
    backToTop: null,
    filterBtns: null,
    projectCards: null,
    expandBtns: null
};

// Initialize application
function init() {
    cacheDOM();
    bindEvents();
    setupIntersectionObserver();
    initParticles();
    initTypewriter();
    showLoader();
}

// Cache DOM elements
function cacheDOM() {
    elements.loader = document.getElementById('loader');
    elements.navbar = document.getElementById('navbar');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    elements.navMenu = document.getElementById('nav-menu');

    elements.typewriter = document.getElementById('typewriter');
    elements.particlesContainer = document.getElementById('particles');
    elements.backToTop = document.getElementById('back-to-top');
    elements.filterBtns = document.querySelectorAll('.filter-btn');
    elements.projectCards = document.querySelectorAll('.project-card');
    elements.expandBtns = document.querySelectorAll('.expand-btn');
}

// Bind event listeners
function bindEvents() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Mobile menu toggle
    elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);



    // Back to top
    elements.backToTop?.addEventListener('click', scrollToTop);

    // Project filters
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    // Project expand buttons
    elements.expandBtns.forEach(btn => {
        btn.addEventListener('click', handleExpandClick);
    });

    // Scroll events
    window.addEventListener('scroll', throttle(handleScroll, 16));
    window.addEventListener('resize', throttle(handleResize, 100));

    // Close mobile menu when clicking outside
    document.addEventListener('click', handleOutsideClick);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
}

// Navigation click handler
function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Close mobile menu if open
    if (state.isMenuOpen) {
        toggleMobileMenu();
    }

    // Update active nav link
    updateActiveNavLink(targetId);
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
    state.activeSection = activeId;
}

// Mobile menu toggle
function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    elements.navMenu.classList.toggle('active', state.isMenuOpen);
    elements.mobileMenuToggle.classList.toggle('active', state.isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}



// Scroll handler
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Update navbar appearance
    if (scrollY > 50) {
        elements.navbar?.classList.add('scrolled');
    } else {
        elements.navbar?.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (scrollY > 500) {
        elements.backToTop?.classList.add('show');
    } else {
        elements.backToTop?.classList.remove('show');
    }

    // Update active section based on scroll position
    updateActiveSectionOnScroll();
}

// Update active section based on scroll position
function updateActiveSectionOnScroll() {
    const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            if (state.activeSection !== sections[i]) {
                updateActiveNavLink(sections[i]);
            }
            break;
        }
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle resize
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && state.isMenuOpen) {
        toggleMobileMenu();
    }

    // Reinitialize particles on resize
    if (elements.particlesContainer) {
        initParticles();
    }
}

// Handle outside clicks (close mobile menu)
function handleOutsideClick(e) {
    if (state.isMenuOpen && 
        !elements.navMenu.contains(e.target) && 
        !elements.mobileMenuToggle.contains(e.target)) {
        toggleMobileMenu();
    }
}

// Keyboard navigation
function handleKeyDown(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && state.isMenuOpen) {
        toggleMobileMenu();
    }


}

// Project filter handler
function handleFilterClick(e) {
    const filter = e.target.getAttribute('data-filter');
    
    // Update active filter button
    elements.filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filter projects
    filterProjects(filter);
}

// Filter projects
function filterProjects(filter) {
    elements.projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            // Trigger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 300);
        }
    });
}

// Project expand handler
function handleExpandClick(e) {
    const button = e.target;
    const card = button.closest('.project-card');
    const details = card.querySelector('.project-details');
    
    if (details.style.display === 'none' || !details.style.display) {
        details.style.display = 'block';
        button.textContent = 'Show Less';
        // Animate in
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }, 10);
    } else {
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            details.style.display = 'none';
            button.textContent = 'Learn More';
        }, 300);
    }
}

// Initialize particles animation
function initParticles() {
    if (!elements.particlesContainer) return;
    
    // Clear existing particles
    elements.particlesContainer.innerHTML = '';
    state.particles = [];

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    animateParticles();
}

// Create a single particle
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speedX = (Math.random() - 0.5) * 0.5;
    const speedY = (Math.random() - 0.5) * 0.5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    
    elements.particlesContainer.appendChild(particle);
    
    state.particles.push({
        element: particle,
        x: x,
        y: y,
        speedX: speedX,
        speedY: speedY,
        size: size
    });
}

// Animate particles
function animateParticles() {
    if (!state.isLoaded || !elements.particlesContainer) return;
    
    state.particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x > window.innerWidth) particle.x = -particle.size;
        if (particle.x < -particle.size) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = -particle.size;
        if (particle.y < -particle.size) particle.y = window.innerHeight;
        
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
    });
    
    requestAnimationFrame(animateParticles);
}

// Initialize typewriter effect
function initTypewriter() {
    if (!elements.typewriter) return;
    
    const text = "Hi! I'm Kostiantyn";
    const speed = 100;
    let index = 0;
    
    elements.typewriter.textContent = '';
    
    function typeChar() {
        if (index < text.length) {
            elements.typewriter.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, speed);
        }
    }
    
    setTimeout(typeChar, 1000); // Start after 1 second
}

// Setup Intersection Observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-title, .about-content, .skill-category, .project-card, .education-card, .contact-item'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        
        // Add different animation classes
        if (index % 3 === 0) {
            el.classList.add('animate-fade-up');
        } else if (index % 3 === 1) {
            el.classList.add('animate-fade-left');
        } else {
            el.classList.add('animate-fade-right');
        }
        
        observer.observe(el);
    });
}

// Loading screen handler
function showLoader() {
    if (!elements.loader) return;
    
    // Simulate loading time
    setTimeout(() => {
        elements.loader.classList.add('fade-out');
        state.isLoaded = true;
        
        setTimeout(() => {
            elements.loader.style.display = 'none';
        }, 500);
    }, 1500);
}

// Utility functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling polyfill for older browsers
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
            }, 0);
        });
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Initialize performance monitoring
measurePerformance();

// Expose some functions for debugging
if (typeof window !== 'undefined') {
    window.portfolioApp = {
        state,
        elements,
        filterProjects,
        initParticles
    };
}