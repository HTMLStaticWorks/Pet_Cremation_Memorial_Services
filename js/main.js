// ── Apply saved theme & direction BEFORE page renders (prevents flash) ───────
(function () {
    const savedTheme = localStorage.getItem('fvc-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    const savedDir = localStorage.getItem('fvc-dir');
    if (savedDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // ── Theme Toggle ─────────────────────────────────────────────────────────
    const themeBtn = document.getElementById('theme-toggle-btn');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('fvc-theme', theme);
        // Update button label text
        const label = document.querySelector('.theme-toggle .toggle-label');
        if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }

    // Set initial label state
    if (themeBtn) {
        const label = themeBtn.querySelector('.toggle-label');
        const isDarkOnLoad = document.documentElement.getAttribute('data-theme') === 'dark';
        if (label) label.textContent = isDarkOnLoad ? 'Light' : 'Dark';

        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    // ── RTL Toggle ───────────────────────────────────────────────────────────
    const rtlBtn = document.getElementById('rtl-toggle-btn');

    function applyDir(dir) {
        if (dir === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.removeAttribute('dir');
        }
        localStorage.setItem('fvc-dir', dir);
        const label = document.querySelector('.rtl-toggle .rtl-label');
        if (label) label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }

    if (rtlBtn) {
        // Set initial label
        const rtlLabel = rtlBtn.querySelector('.rtl-label');
        const isRtlOnLoad = document.documentElement.getAttribute('dir') === 'rtl';
        if (rtlLabel) rtlLabel.textContent = isRtlOnLoad ? 'LTR' : 'RTL';

        rtlBtn.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            applyDir(isRtl ? 'ltr' : 'rtl');
        });
    }

    // ── Hamburger Menu Toggle ────────────────────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        if(hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));

    // ── Sticky Header Shrink Effect ──────────────────────────────────────────
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // ── Scroll Fade-in Animations ────────────────────────────────────────────
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
