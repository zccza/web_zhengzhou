/**
 * 主入口文件 - 初始化所有模块
 */

// 应用程序类
class ZhengzhouApp {
    constructor() {
        this.navigation = null;
        this.foodDisplay = null;
        this.animations = null;
        this.isInitialized = false;
    }

    /**
     * 初始化应用
     */
    init() {
        if (this.isInitialized) return;

        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initModules());
        } else {
            this.initModules();
        }
    }

    /**
     * 初始化各个模块
     */
    initModules() {
        try {
            // 初始化导航
            this.navigation = new Navigation();
            console.log('✓ 导航模块已加载');

            // 初始化美食展示(仅在美食页面存在时)
            if (document.getElementById('food-display-title')) {
                this.foodDisplay = new FoodDisplay();
                this.foodDisplay.preloadImages();
                console.log('✓ 美食展示模块已加载');
            }

            // 初始化动画
            this.animations = new Animations();
            console.log('✓ 动画模块已加载');

            // 设置其他功能
            this.setupScrollIndicator();
            this.setupPerformanceOptimization();
            this.setupAccessibility();

            // 根据URL hash初始化页面
            this.navigation.initFromHash();

            // 监听URL变化
            window.addEventListener('hashchange', () => {
                this.navigation.initFromHash();
            });

            this.isInitialized = true;
            console.log('✓ 郑州体验应用已完全加载');

            // 触发自定义事件
            window.dispatchEvent(new Event('app-initialized'));
        } catch (error) {
            console.error('应用初始化失败:', error);
        }
    }

    /**
     * 设置滚动指示器
     */
    setupScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;

        indicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });

        // 滚动后隐藏指示器
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            } else {
                indicator.style.opacity = '0.6';
                indicator.style.pointerEvents = 'auto';
            }
        }, { passive: true });
    }

    /**
     * 性能优化
     */
    setupPerformanceOptimization() {
        // 防抖函数
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        // 优化resize事件
        const handleResize = debounce(() => {
            // 可以在这里添加resize相关的逻辑
            window.dispatchEvent(new Event('optimized-resize'));
        }, 250);

        window.addEventListener('resize', handleResize, { passive: true });

        // 预加载关键资源
        this.preloadResources();
    }

    /**
     * 预加载资源
     */
    preloadResources() {
        // 预加载关键图片
        const criticalImages = [
            'images/郑州CBD夜景图.jpg',
            'images/中原福塔俯拍图.jpg',
            'images/郑州商城遗址.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * 辅助功能设置
     */
    setupAccessibility() {
        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            // 左右箭头切换页面
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const pages = ['home', 'history', 'modern', 'food', 'nature'];
                const currentPage = document.querySelector('.page-view.active').id.replace('page-', '');
                const currentIndex = pages.indexOf(currentPage);

                let newIndex;
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
                } else {
                    newIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
                }

                this.navigation.switchPage(pages[newIndex]);
            }
        });

        // 焦点管理
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(el => {
            el.addEventListener('focus', () => {
                el.style.outline = '2px solid var(--accent-gold)';
                el.style.outlineOffset = '2px';
            });

            el.addEventListener('blur', () => {
                el.style.outline = '';
            });
        });
    }

    /**
     * 显示加载状态
     */
    static showLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.id = 'app-loader';
        loader.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
        `;
        document.body.appendChild(loader);
    }

    /**
     * 隐藏加载状态
     */
    static hideLoader() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    }

    /**
     * 获取设备信息
     */
    static getDeviceInfo() {
        return {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isTablet: /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768,
            isDesktop: window.innerWidth >= 1024,
            hasTouch: 'ontouchstart' in window,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        };
    }
}

// 创建全局应用实例
const app = new ZhengzhouApp();

// 自动初始化
app.init();

// 导出到全局
window.ZhengzhouApp = app;

// 开发模式日志
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c郑州体验 | Zhengzhou Experience', 'font-size: 20px; font-weight: bold; color: #d4af37;');
    console.log('%c应用已启动', 'color: #4a90e2;');
    console.log('设备信息:', ZhengzhouApp.getDeviceInfo());
}
