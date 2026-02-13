function setLanguage(lang) {
    // Save preference
    localStorage.setItem('preferredLang', lang);

    // Update active button
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(lang === 'is' ? 'id-is' : `btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update document lang
    document.documentElement.lang = lang;
}

// Scroll Animations
const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .product-card, .substrate-item').forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);
    revealOnScroll();
});

// Add extra CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal-init {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .product-card:nth-child(2) { transition-delay: 0.1s; }
    .product-card:nth-child(3) { transition-delay: 0.2s; }
    .product-card:nth-child(4) { transition-delay: 0.3s; }
    .product-card:nth-child(5) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);
