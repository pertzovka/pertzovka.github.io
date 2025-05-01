document.addEventListener('DOMContentLoaded', function() {
    // ==================== Глобальные переменные ====================
    const header = document.querySelector('.header');
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.menu-toggle');
    const toggleButton = document.getElementById('toggleButton');
    const diploms = document.getElementById('diplom');
    const backToTopBtn = document.querySelector('.back-to-top');
    const currentYear = document.getElementById('current-year');

    // ==================== Инициализация года в футере ====================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ==================== Плавная прокрутка ====================
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + 
                                         window.pageYOffset - 
                                         headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Обновляем URL
                    history.pushState?.({}, '', targetId) || (location.hash = targetId);

                    // Закрываем меню если открыто (мобильная версия)
                    if (navList?.classList.contains('active')) {
                        navList.classList.remove('active');
                        menuToggle?.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                }
            });
        });
    }

    // ==================== Анимации при скролле ====================
    function initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll(
            '.work-item, .section h2, .about-content p, .section, .tech-tags, .email-link'
        );

        // Установка начальных стилей
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const checkAnimation = () => {
            elementsToAnimate.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.8;
                
                if (isVisible) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        };

        // Запускаем при загрузке и при скролле
        window.addEventListener('scroll', checkAnimation);
        checkAnimation();
    }

    // ==================== Управление сертификатами ====================
    function setupCertificatesToggle() {
        if (!toggleButton || !diploms) return;

        let isVisible = false;
        const toggleText = toggleButton.querySelector('span');
        const toggleIcon = toggleButton.querySelector('i');

        toggleButton.addEventListener('click', function() {
            isVisible = !isVisible;
            
            if (isVisible) {
                diploms.style.display = 'grid';
                setTimeout(() => {
                    diploms.style.opacity = '1';
                    diploms.style.transform = 'translateY(0)';
                }, 10);
                toggleText.textContent = 'Скрыть сертификаты';
                toggleIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                diploms.style.opacity = '0';
                diploms.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    diploms.style.display = 'none';
                }, 300);
                toggleText.textContent = 'Показать сертификаты';
                toggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
            
            this.classList.toggle('active');
        });
    }

    // ==================== Фиксация хедера при скролле ====================
    function setupHeaderScroll() {
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
                header.classList.remove('scrolled-up');
                header.classList.add('scrolled-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
                header.classList.remove('scrolled-down');
                header.classList.add('scrolled-up');
            }
            
            lastScroll = currentScroll;
        });
    }

    // ==================== Кнопка "Наверх" ====================
    function setupBackToTop() {
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', function() {
            const isVisible = window.pageYOffset > 300;
            backToTopBtn.style.opacity = isVisible ? '1' : '0';
            backToTopBtn.style.visibility = isVisible ? 'visible' : 'hidden';
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== Мобильное меню ====================
    function setupMobileMenu() {
        if (!menuToggle || !navList) return;
        
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // ==================== Инициализация всех функций ====================
    function init() {
        setupSmoothScroll();
        initScrollAnimations();
        setupCertificatesToggle();
        setupHeaderScroll();
        setupBackToTop();
        setupMobileMenu();
    }

    init();
});
