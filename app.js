const state = { isMenuOpen: false, activeSection: 'landingKostiantyn', isLoaded: false, particles: [] };

const elements = {
    loader: null,
    navbar: null,
    navLinks: null,
    menuToggle: null,
    navMenu: null,
    typewriter: null,
    particlesContainer: null,
    backToTop: null,
    filterButtons: null,
    projectCards: null,
    expandButtons: null
};

function init() {
    cacheDOM();
    wireEvents();
    watchSections();
    prepParticles();
    runTypewriter();
    fadeLoader();
}

function cacheDOM() {
    elements.loader = document.getElementById('portfolioLoader');
    elements.navbar = document.getElementById('siteNav');
    elements.navLinks = document.querySelectorAll('.menuAnchor');
    elements.menuToggle = document.getElementById('menuToggle');
    elements.navMenu = document.getElementById('menuLinks');
    elements.typewriter = document.getElementById('introTypewriter');
    elements.particlesContainer = document.getElementById('landingAmbient');
    elements.backToTop = document.getElementById('backToTop');
    elements.filterButtons = document.querySelectorAll('.filterButton');
    elements.projectCards = document.querySelectorAll('.projectPanel');
    elements.expandButtons = document.querySelectorAll('.expandButton');
}

function wireEvents() {
    elements.navLinks.forEach(anchor => anchor.addEventListener('click', handleNavClick));
    elements.menuToggle?.addEventListener('click', toggleMobileMenu);
    elements.backToTop?.addEventListener('click', scrollToTop);
    elements.filterButtons.forEach(btn => btn.addEventListener('click', handleFilterClick));
    elements.expandButtons.forEach(btn => btn.addEventListener('click', toggleProjectDetails));
    window.addEventListener('scroll', throttle(handleScroll, 20));
    window.addEventListener('resize', throttle(handleResize, 120));
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    // TODO: add keyboard shortcuts for section jumps
}

function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
        const offset = target.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
    if (state.isMenuOpen) toggleMobileMenu();
    highlightNav(targetId);
}

function highlightNav(id) {
    elements.navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    state.activeSection = id;
}

function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    elements.navMenu.classList.toggle('active', state.isMenuOpen);
    elements.menuToggle.classList.toggle('active', state.isMenuOpen);
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}

function handleScroll() {
    const y = window.scrollY;
    if (y > 50) {
        elements.navbar?.classList.add('scrolled');
    } else {
        elements.navbar?.classList.remove('scrolled');
    }
    if (y > 500) {
        elements.backToTop?.classList.add('show');
    } else {
        elements.backToTop?.classList.remove('show');
    }
    syncActiveSection();
}

function syncActiveSection() {
    const ids = ['landingKostiantyn', 'profileStory', 'craftCatalogue', 'buildLog', 'learningTimeline', 'contactBridge'];
    const marker = window.scrollY + 110;
    for (let index = ids.length - 1; index >= 0; index--) {
        const section = document.getElementById(ids[index]);
        if (section && section.offsetTop <= marker) {
            if (state.activeSection !== ids[index]) highlightNav(ids[index]);
            break;
        }
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleResize() {
    if (window.innerWidth > 768 && state.isMenuOpen) toggleMobileMenu();
    if (elements.particlesContainer) prepParticles();
}

function handleOutsideClick(event) {
    if (!state.isMenuOpen) return;
    if (elements.navMenu.contains(event.target)) return;
    if (elements.menuToggle.contains(event.target)) return;
    toggleMobileMenu();
}

function handleKeyDown(event) {
    if (event.key === 'Escape' && state.isMenuOpen) toggleMobileMenu();
    // TODO: surface a focus trap for the mobile menu
}

function handleFilterClick(event) {
    const filter = event.currentTarget.getAttribute('data-filter');
    elements.filterButtons.forEach(btn => btn.classList.toggle('active', btn === event.currentTarget));
    filterProjects(filter);
}

function filterProjects(filter) {
    elements.projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        const visible = filter === 'all' || categories.includes(filter);
        if (visible) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 80);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px)';
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 260);
        }
    });
}

function toggleProjectDetails(event) {
    const button = event.currentTarget;
    const panel = button.closest('.projectPanel');
    const details = panel.querySelector('.projectDetails');
    const willOpen = details.style.display === 'none' || !details.style.display;
    if (willOpen) {
        details.style.display = 'block';
        button.textContent = 'Show less';
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }, 12);
    } else {
        details.style.opacity = '0';
        details.style.transform = 'translateY(-12px)';
        setTimeout(() => {
            details.style.display = 'none';
            button.textContent = 'Learn more';
        }, 220);
    }
}

function prepParticles() {
    if (!elements.particlesContainer) return;
    elements.particlesContainer.innerHTML = '';
    state.particles = [];
    const count = Math.min(40, Math.floor(window.innerWidth / 40));
    for (let i = 0; i < count; i++) createParticle();
    animateParticles();
}

function createParticle() {
    const node = document.createElement('div');
    node.className = 'ambientParticle';
    const size = Math.random() * 3 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speedX = (Math.random() - 0.5) * 0.4;
    const speedY = (Math.random() - 0.5) * 0.4;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.animationDelay = `${Math.random() * 5}s`;
    elements.particlesContainer.appendChild(node);
    state.particles.push({ element: node, x, y, speedX, speedY, size });
}

function animateParticles() {
    if (!state.isLoaded || !elements.particlesContainer) {
        requestAnimationFrame(animateParticles);
        return;
    }
    state.particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x > window.innerWidth) particle.x = -particle.size;
        if (particle.x < -particle.size) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = -particle.size;
        if (particle.y < -particle.size) particle.y = window.innerHeight;
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
    });
    requestAnimationFrame(animateParticles);
}

function runTypewriter() {
    if (!elements.typewriter) return;
    const text = "Hi! I'm Kostiantyn";
    let index = 0;
    elements.typewriter.textContent = '';
    function typeNext() {
        if (index < text.length) {
            elements.typewriter.textContent += text.charAt(index);
            index += 1;
            setTimeout(typeNext, 95);
        }
    }
    setTimeout(typeNext, 900);
}

function watchSections() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    const selectors = '.sectionHeading, .profileLayout, .skillBlock, .projectPanel, .learningPanel, .contactRow, .socialEntry';
    document.querySelectorAll(selectors).forEach((node, idx) => {
        node.classList.add('animateTarget');
        if (idx % 3 === 0) node.classList.add('animateRise');
        else if (idx % 3 === 1) node.classList.add('animateSlideLeft');
        else node.classList.add('animateSlideRight');
        observer.observe(node);
    });
}

function fadeLoader() {
    if (!elements.loader) {
        state.isLoaded = true;
        return;
    }
    setTimeout(() => {
        elements.loader.classList.add('loaderFade');
        state.isLoaded = true;
        setTimeout(() => {
            elements.loader.style.display = 'none';
        }, 460);
    }, 1200);
}

function throttle(func, wait) {
    let timeout;
    return function throttled(...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();