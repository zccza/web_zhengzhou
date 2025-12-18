/**
 * 高级动画效果模块
 */

class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffect();
        this.setupHoverEffects();
        this.setupLazyLoading();
    }

    /**
     * 滚动触发动画
     */
    setupScrollAnimations() {
        // 创建Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // 一次性动画,观察后即停止
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有卡片
        const animateElements = document.querySelectorAll('.glass-card, .header-content');
        animateElements.forEach(el => observer.observe(el));
    }

    /**
     * 视差滚动效果
     */
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.header-bg');

        if ('IntersectionObserver' in window) {
            const parallaxObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        window.addEventListener('scroll', () => {
                            this.updateParallax(entry.target);
                        }, { passive: true });
                    }
                });
            });

            parallaxElements.forEach(el => parallaxObserver.observe(el));
        }
    }

    updateParallax(element) {
        const scrolled = window.pageYOffset;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;

        // 仅在元素可见时应用视差
        if (scrolled < elementTop + elementHeight) {
            const yPos = -(scrolled - elementTop) * 0.5;
            element.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.1)`;
        }
    }

    /**
     * 悬停3D效果
     */
    setupHoverEffects() {
        const cards = document.querySelectorAll('.glass-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /**
     * 图片懒加载
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);

                        // 加载完成后添加淡入效果
                        img.addEventListener('load', () => {
                            img.style.animation = 'fadeIn 0.5s ease';
                        });
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // 降级处理:直接加载所有图片
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    /**
     * 平滑滚动到元素
     */
    static scrollToElement(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * 数字递增动画
     */
    static animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    /**
     * 打字机效果
     */
    static typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// 添加CSS类用于动画
const style = document.createElement('style');
style.textContent = `
    .glass-card,
    .header-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .glass-card.animate-in,
    .header-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* 为不同的卡片添加延迟 */
    .glass-card:nth-child(1) { transition-delay: 0.1s; }
    .glass-card:nth-child(2) { transition-delay: 0.2s; }
    .glass-card:nth-child(3) { transition-delay: 0.3s; }
    .glass-card:nth-child(4) { transition-delay: 0.4s; }
    .glass-card:nth-child(5) { transition-delay: 0.5s; }
    .glass-card:nth-child(6) { transition-delay: 0.6s; }

    /* 3D变换效果 */
    .glass-card {
        transition: transform 0.3s ease;
        will-change: transform;
    }
`;
document.head.appendChild(style);

// 导出供全局使用
window.Animations = Animations;
