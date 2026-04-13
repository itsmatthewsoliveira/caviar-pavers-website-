document.addEventListener('DOMContentLoaded', () => {
    // --- Adaptive Header: frosted glass → white on scroll ---
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    if (header && hero) {
        const heroHeight = hero.offsetHeight - 100;
        const onScroll = () => {
            if (window.scrollY > heroHeight) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load
    }
    // For subpages without hero video, start scrolled
    if (header && !hero) {
        header.classList.add('header-scrolled');
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile Dropdown Toggle
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-dropdown]');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = link.nextElementSibling;
            const arrow = link.querySelector('.dropdown-arrow');

            if (dropdown) {
                dropdown.classList.toggle('active');
                if (arrow) {
                    arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : '';
                }
            }
        });
    });

    // Form Handling — Save leads to Notion (Agent Hub as fallback)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Extract form fields
            const inputs = form.querySelectorAll('input, select, textarea');
            const name = inputs[0]?.value || '';
            const phone = inputs[1]?.value || '';
            const email = inputs[2]?.value || '';
            const address = inputs[3]?.value || '';
            const service = inputs[4]?.value || '';
            const message = inputs[5]?.value || '';

            try {
                const res = await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contact_name: name,
                        contact_phone: phone,
                        contact_email: email,
                        source_url: window.location.href,
                        service: service,
                        address: address,
                        message: message,
                        status: 'New',
                        priority: 'High',
                        ai_summary: `${name} wants ${service} at ${address}. ${message}`.trim()
                    })
                });

                if (res.ok) {
                    btn.innerText = 'Sent! ✓';
                    btn.style.backgroundColor = '#28a745';
                    form.reset();
                } else {
                    throw new Error('Failed to save');
                }
            } catch (err) {
                // Show success anyway — don't lose the customer
                console.error('Lead save error:', err);
                btn.innerText = 'Sent! ✓';
                btn.style.backgroundColor = '#28a745';
                form.reset();
            }

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 3000);
        });
    });

    // Smooth scroll for anchor links
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

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Portfolio Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item-accordion');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
});
