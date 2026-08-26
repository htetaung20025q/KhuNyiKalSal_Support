document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initRouter();
    initForms();
}

function initRouter() {
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin) && !link.href.includes('#') && !link.getAttribute('target')) {
            // Check if it's a downloadable file or an external protocol
            if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return;
            
            e.preventDefault();
            const url = new URL(link.href);
            navigate(url.pathname);
        }
    });

    window.addEventListener('popstate', () => {
        navigate(window.location.pathname, false);
    });
}

async function navigate(path, push = true) {
    const contentDiv = document.getElementById('page-content');
    
    // Start transition out
    contentDiv.classList.add('fade-out');
    
    try {
        const response = await fetch(path);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newContent = doc.getElementById('page-content');
        if (newContent) {
            // Add a small delay for the animation to look smooth
            setTimeout(() => {
                contentDiv.innerHTML = newContent.innerHTML;
                document.title = doc.title;
                
                if (push) {
                    history.pushState(null, '', path);
                }
                
                window.scrollTo(0, 0);
                updateNavActiveState(path);
                
                // Close mobile offcanvas/navbar if open
                const offcanvasEl = document.getElementById('sidebarOffcanvas');
                if (offcanvasEl) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
                    if (bsOffcanvas) bsOffcanvas.hide();
                }
                const navbarCollapse = document.getElementById('mainNavbar');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }

                // Re-initialize any page-specific JS (like forms)
                initForms();
                
                // Transition in
                contentDiv.classList.remove('fade-out');
            }, 150);
        } else {
            window.location.href = path; // Fallback
        }
    } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = path; // Fallback to normal navigation
    }
}

function updateNavActiveState(path) {
    // Determine current filename, default to index.html if empty /
    let filename = path.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.navbar-nav .nav-link, .sidebar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === filename || (filename === 'index.html' && linkHref === './')) {
            link.classList.add('active');
        }
    });
}

function initForms() {
    const form = document.getElementById('complaintForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const alertSuccess = document.getElementById('alertSuccess');
            const alertError = document.getElementById('alertError');
            
            // Reset alerts
            alertSuccess.classList.add('d-none');
            alertError.classList.add('d-none');
            
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
            
            // EmailJS variables setup matching the prompt
            const templateParams = {
                from_name: document.getElementById('from_name').value,
                from_email: document.getElementById('from_email').value,
                subject: document.getElementById('subject').value,
                category: document.getElementById('category').value,
                message: document.getElementById('message').value,
            };
            
            emailjs.send('service_khunyikalsal', 'template_8z5yl82', templateParams)
                .then(() => {
                    alertSuccess.classList.remove('d-none');
                    form.reset();
                    form.classList.remove('was-validated');
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    alertError.classList.remove('d-none');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                });
        });
    }
}
