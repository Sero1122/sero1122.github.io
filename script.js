/* ===== БУРГЕР-МЕНЮ ===== */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const headerLinks = document.querySelectorAll('.header__link');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Закрытие меню при клике на ссылку
headerLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* ===== ПЛАВНАЯ ПРОКРУТКА ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== FAQ АККОРДЕОН ===== */
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрываем все
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Открываем текущий (если был неактивен)
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/* ===== АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ===== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

/* ===== КНОПКА НАВЕРХ ===== */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===== ЛИПКАЯ ШАПКА (тень при скролле) ===== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

/* ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ ===== */
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
}