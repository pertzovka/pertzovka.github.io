document.addEventListener('DOMContentLoaded', function() {
    // ==================== Плавная прокрутка ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.nav').appendChild(menuToggle);

menuToggle.addEventListener('click', function() {
    document.querySelector('.nav-list').classList.toggle('active');
});

    // ==================== Анимации при скролле ====================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.work-item, .section h2, .about-content p, .section, .tech-tags, .email-link'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Инициализация анимаций
    const animatedElements = document.querySelectorAll(
        '.work-item, .section h2, .about-content p, .section, .tech-tags, .email-link'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Запускаем при загрузке и при скролле
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ==================== Управление сертификатами ====================
    const toggleButton = document.getElementById('toggleButton');
    const hiddenBlock = document.getElementById('diplom');
    const toggleIcon = toggleButton.querySelector('i');
    let isVisible = false;

    toggleButton.addEventListener('click', function() {
        isVisible = !isVisible;
        
        if (isVisible) {
            hiddenBlock.style.display = 'grid';
            setTimeout(() => {
                hiddenBlock.style.opacity = '1';
                hiddenBlock.style.transform = 'translateY(0)';
            }, 10);
            toggleButton.innerHTML = '<span>Скрыть сертификаты</span>';
            toggleIcon.className = 'fas fa-chevron-up';
        } else {
            hiddenBlock.style.opacity = '0';
            hiddenBlock.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                hiddenBlock.style.display = 'none';
            }, 300);
            toggleButton.innerHTML = '<span>Показать сертификаты</span>';
            toggleIcon.className = 'fas fa-chevron-down';
        }
        
        // Анимация кнопки
        toggleButton.classList.toggle('active');
    });

    // ==================== Фиксация хедера при скролле ====================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
            // Прокрутка вниз
            header.classList.remove('scrolled-up');
            header.classList.add('scrolled-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
            // Прокрутка вверх
            header.classList.remove('scrolled-down');
            header.classList.add('scrolled-up');
        }
        
        lastScroll = currentScroll;
    });

    // ==================== Кнопка "Наверх" ====================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
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
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
});
