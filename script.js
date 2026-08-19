document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if(menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = menuToggle.querySelectorAll('.bar');
            if(mainNav.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-4px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Toggle Dropdown on Mobile (Accordion)
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownParent = document.querySelector('.dropdown');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            // Only toggle on mobile view (width < 992px)
            if (window.innerWidth < 992) {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
                dropdownParent.classList.toggle('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // close menu on mobile after click
                if(mainNav.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
    // Search Functionality
    const searchBtns = document.querySelectorAll('.search-btn');
    const searchBars = document.querySelectorAll('.search-bar-container');
    const closeSearchBtns = document.querySelectorAll('.close-search-btn');

    searchBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if(searchBars[index]) {
                searchBars[index].classList.toggle('active');
                if(searchBars[index].classList.contains('active')) {
                    const input = searchBars[index].querySelector('input');
                    if(input) input.focus();
                }
            }
        });
    });

    closeSearchBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if(searchBars[index]) {
                searchBars[index].classList.remove('active');
            }
        });
    });

    // Close search if clicking outside
    document.addEventListener('click', (e) => {
        if(!e.target.closest('.search-wrapper')) {
            searchBars.forEach(bar => bar.classList.remove('active'));
        }
    });

    // Execute Frontend Search on 'Enter'
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = input.value.toLowerCase().trim();
                if(!query) return;

                // Simple Keyword Router for Static Site
                if(query.includes('contact') || query.includes('touch') || query.includes('mail')) {
                    window.location.href = 'contact.html';
                } else if(query.includes('about') || query.includes('story') || query.includes('ethos')) {
                    window.location.href = 'about.html';
                } else if(query.includes('privacy') || query.includes('policy')) {
                    window.location.href = 'privacy-policy.html';
                } else if(query.includes('term') || query.includes('condition')) {
                    window.location.href = 'terms.html';
                } else if(query.includes('living') || query.includes('bed') || query.includes('kitchen') || query.includes('bath') || query.includes('room')) {
                    window.location.href = 'index.html#categories';
                } else if(query.includes('blog') || query.includes('article') || query.includes('post') || query.includes('read')) {
                    window.location.href = 'index.html#blog';
                } else {
                    alert(`We couldn't find any direct matches for "${query}". Try searching for categories like 'Bedroom', 'Kitchen', or 'Blog'.`);
                }
            }
        });
    });

    // Category Filter Interactivity
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Auto-highlight active filter based on current page URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    filterBtns.forEach(btn => {
        const btnPath = btn.getAttribute('href');
        if (currentPath === btnPath) {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', (e) => {
            // Add a subtle click animation before navigation
            btn.style.transform = 'scale(0.95)';
            // Note: Navigation happens naturally since it's an <a> tag now
        });
    });

    // Newsletter Form Interception 
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const email = input ? input.value : 'friend';
            
            // Replace form content with success message
            form.innerHTML = `
                <div style="padding: 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: rgba(58, 63, 62, 0.05); animation: fadein 0.5s;">
                    <h3 style="color: var(--color-accent); margin-bottom: 0.5rem;">Welcome to the Sanctuary!</h3>
                    <p style="color: var(--color-text-light); margin: 0; font-size: 0.95rem;">Thank you for subscribing. We've added <strong>${email}</strong> to our VIP aesthetic list.</p>
                </div>
            `;
        });
    });

    // Contact Form Interception
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = form.querySelector('#fullName');
            const name = nameInput ? nameInput.value : 'friend';
            
            form.innerHTML = `
                <div style="padding: 2rem; text-align: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: rgba(58, 63, 62, 0.05); animation: fadein 0.5s;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" style="margin-bottom: 1rem;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 style="color: var(--color-accent); margin-bottom: 0.5rem;">Message Sent!</h3>
                    <p style="color: var(--color-text-light); margin: 0; font-size: 0.95rem;">Thank you, <strong>${name}</strong>. Your message has been received. Our team will get back to you shortly.</p>
                </div>
            `;
        });
    });
});
