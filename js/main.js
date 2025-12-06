// WhatsApp Medic Scheduler - Documentation JS

// Highlight active navbar link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Copy code to clipboard
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#25D366';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link on page load
    setActiveNavLink();
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Highlight active section in sidebar
    const sections = document.querySelectorAll('.doc-section');
    const sidebarLinks = document.querySelectorAll('.docs-sidebar a');
    
    if (sections.length && sidebarLinks.length) {
        const observerOptions = {
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    sidebarLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });
    }

    // Mobile menu toggle (if needed in future)
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Add syntax highlighting classes (basic)
    document.querySelectorAll('pre code').forEach(block => {
        // Basic JSON highlighting
        if (block.classList.contains('json')) {
            let html = block.innerHTML;
            html = html.replace(/"([^"]+)":/g, '<span style="color:#9cdcfe">"$1"</span>:');
            html = html.replace(/: "([^"]+)"/g, ': <span style="color:#ce9178">"$1"</span>');
            html = html.replace(/: (\d+)/g, ': <span style="color:#b5cea8">$1</span>');
            html = html.replace(/: (true|false)/g, ': <span style="color:#569cd6">$1</span>');
            block.innerHTML = html;
        }
        
        // Basic Python highlighting
        if (block.classList.contains('python')) {
            let html = block.innerHTML;
            html = html.replace(/\b(def|class|return|if|else|elif|for|while|import|from|as|try|except|with)\b/g, '<span style="color:#c586c0">$1</span>');
            html = html.replace(/'([^']+)'/g, '<span style="color:#ce9178">\'$1\'</span>');
            html = html.replace(/"([^"]+)"/g, '<span style="color:#ce9178">"$1"</span>');
            html = html.replace(/#(.+)$/gm, '<span style="color:#6a9955">#$1</span>');
            block.innerHTML = html;
        }
        
        // Basic Bash highlighting
        if (block.classList.contains('bash')) {
            let html = block.innerHTML;
            html = html.replace(/#(.+)$/gm, '<span style="color:#6a9955">#$1</span>');
            html = html.replace(/\b(cd|git|docker|pip|python|curl|npm|yarn)\b/g, '<span style="color:#dcdcaa">$1</span>');
            block.innerHTML = html;
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Console welcome message
console.log('%c🏥 WhatsApp Medic Scheduler', 'color: #25D366; font-size: 20px; font-weight: bold;');
console.log('%cDocumentation powered by GitHub Pages', 'color: #888;');
