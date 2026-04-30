// ==================== 
// Mobile Navigation
// ====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navMenu.style.backdropFilter = 'blur(20px)';
        navMenu.style.gap = '1rem';
        navMenu.style.padding = '1rem';
        navMenu.style.borderBottom = '1px solid #e5e5e7';
    });

    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ==================== 
// Active Link Tracking
// ====================

function setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentLocation = location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentLocation.includes(href) || 
            (currentLocation === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveLink);

// ==================== 
// Smooth Scroll for Anchor Links
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ensure email button always triggers the mail client explicitly
const emailLink = document.querySelector('.hero-link-email');

if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'mailto:haiyang.liu.q6@elms.hokudai.ac.jp';
    });
}

// ====================
// Citation Count
// ====================

const citationCount = document.querySelector('#citation-count');

if (citationCount) {
    fetch('data/citations.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load citations: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const citations = Number(data.citations);
            citationCount.textContent = Number.isFinite(citations)
                ? citations.toLocaleString('en-US')
                : 'N/A';
        })
        .catch((error) => {
            citationCount.textContent = 'N/A';
            console.error(error);
        });
}

// ==================== 
// Subscribe Form
// ====================

const subscribeForm = document.querySelector('.subscribe-form');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            const button = subscribeForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '已订阅！';
            button.style.backgroundColor = '#34c759';
            
            // Reset after 2 seconds
            setTimeout(() => {
                emailInput.value = '';
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    });
}

// ==================== 
// Intersection Observer for Animations
// ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.featured-card, .blog-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// ==================== 
// Scroll Events
// ====================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to navbar on scroll
    if (scrollTop > 0) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== 
// Dark Mode Toggle (Optional)
// ====================

// Uncomment this section if you want to add a dark mode toggle button

/*
const darkModeToggle = document.querySelector('.dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.style.colorScheme = 
            document.documentElement.style.colorScheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', document.documentElement.style.colorScheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.style.colorScheme = savedTheme;
    }
}
*/

// ==================== 
// Utility Functions
// ====================

/**
 * Debounce function for better performance
 */
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

/**
 * Log page analytics (optional)
 */
function trackPageView() {
    if (typeof window.gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', trackPageView);

console.log('🎉 Welcome to Liu Haiyang\'s personal website!');
