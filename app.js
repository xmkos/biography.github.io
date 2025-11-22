// Clean, modern JavaScript for portfolio site
// Handles navigation, project loading, and smooth interactions

const state = {
    isMenuOpen: false,
    projects: []
};

const dom = {
    nav: null,
    navToggle: null,
    navMenu: null,
    navLinks: null,
    projectGrid: null
};

// Initialize app
function init() {
    cacheDOMElements();
    attachEventListeners();
    loadProjects();
}

function cacheDOMElements() {
    dom.nav = document.getElementById('nav');
    dom.navToggle = document.getElementById('navToggle');
    dom.navMenu = document.getElementById('navMenu');
    dom.navLinks = document.querySelectorAll('.nav-link');
    dom.projectGrid = document.getElementById('projectGrid');
}

function attachEventListeners() {
    // Navigation toggle
    dom.navToggle?.addEventListener('click', toggleMobileMenu);
    
    // Smooth scroll for nav links
    dom.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Close menu on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isMenuOpen) {
            toggleMobileMenu();
        }
    });
    
    // Scroll handler
    window.addEventListener('scroll', throttle(handleScroll, 100));
}

// Load and render projects
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        
        const data = await response.json();
        state.projects = data.projects;
        renderProjects(state.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        if (dom.projectGrid) {
            dom.projectGrid.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <p>Unable to load projects. Please try again later.</p>
                </div>
            `;
        }
    }
}

function renderProjects(projects) {
    if (!dom.projectGrid) return;
    
    const html = projects.map(project => createProjectCard(project)).join('');
    dom.projectGrid.innerHTML = html;
    
    // Attach event listeners to toggle buttons
    document.querySelectorAll('.project-toggle').forEach(button => {
        button.addEventListener('click', handleProjectToggle);
    });
}

function createProjectCard(project) {
    const meta = project.meta || {};
    const metaHTML = Object.entries(meta).map(([key, value]) => 
        `<span>${value}</span>`
    ).join('');
    
    return `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
            </div>
            
            ${metaHTML ? `<div class="project-meta">${metaHTML}</div>` : ''}
            
            <div class="project-tags">
                ${project.stack.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
            
            <p class="project-description">${project.excerpt}</p>
            
            <div class="project-details" style="display: none;">
                <h4>${project.details.heading}</h4>
                <ul>
                    ${project.details.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <div class="project-outcome">
                    <strong>Outcome:</strong> ${project.details.outcome}
                </div>
            </div>
            
            <button class="project-toggle">Show more</button>
        </div>
    `;
}

function handleProjectToggle(e) {
    const button = e.currentTarget;
    const card = button.closest('.project-card');
    const details = card.querySelector('.project-details');
    
    if (!details) return;
    
    const isExpanded = details.style.display !== 'none';
    
    if (isExpanded) {
        details.style.display = 'none';
        button.textContent = 'Show more';
    } else {
        details.style.display = 'block';
        button.textContent = 'Show less';
    }
}

// Navigation handlers
function handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    // Only handle anchor links
    if (!href || !href.startsWith('#')) return;
    
    e.preventDefault();
    
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    
    if (target) {
        const offset = 80; // Account for fixed nav
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    if (state.isMenuOpen) {
        toggleMobileMenu();
    }
}

function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    dom.navMenu?.classList.toggle('active', state.isMenuOpen);
    dom.navToggle?.classList.toggle('active', state.isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}

function handleOutsideClick(e) {
    if (!state.isMenuOpen) return;
    
    // Check if click is outside nav menu and toggle button
    if (!dom.navMenu?.contains(e.target) && !dom.navToggle?.contains(e.target)) {
        toggleMobileMenu();
    }
}

function handleScroll() {
    // Add shadow to nav on scroll
    if (window.scrollY > 10) {
        dom.nav?.classList.add('scrolled');
    } else {
        dom.nav?.classList.remove('scrolled');
    }
}

// Utility: Throttle function
function throttle(func, wait) {
    let timeout = null;
    let previous = 0;
    
    return function(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
