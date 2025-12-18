/**
 * 导航栏功能模块
 */

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navItems = document.querySelectorAll('.nav-item');
        this.mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupPageButtons();
    }

    /**
     * 导航栏滚动效果
     */
    setupScrollEffect() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // 添加滚动样式
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // 向下滚动时隐藏导航栏（可选）
            // if (currentScroll > lastScroll && currentScroll > 100) {
            //     this.navbar.style.transform = 'translateY(-100%)';
            // } else {
            //     this.navbar.style.transform = 'translateY(0)';
            // }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * 设置导航点击事件
     */
    setupNavigation() {
        // 桌面端导航
        this.navItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const pages = ['home', 'history', 'modern', 'food', 'nature'];
                this.switchPage(pages[index]);
            });
        });

        // 移动端导航
        this.mobileNavItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const pages = ['home', 'history', 'modern', 'food', 'nature'];
                this.switchPage(pages[index]);
                this.closeMobileMenu();
            });
        });
    }

    /**
     * 设置页面内按钮点击事件
     */
    setupPageButtons() {
        // 为所有带有 data-page 属性的按钮添加点击事件
        const pageButtons = document.querySelectorAll('[data-page]');
        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPage = button.getAttribute('data-page');
                if (targetPage) {
                    this.switchPage(targetPage);
                }
            });
        });
    }

    /**
     * 移动端菜单控制
     */
    setupMobileMenu() {
        if (!this.menuToggle || !this.mobileMenuOverlay) return;

        this.menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // 点击遮罩层关闭
        this.mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === this.mobileMenuOverlay) {
                this.closeMobileMenu();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOverlay.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.menuToggle.classList.toggle('active');
        this.mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = this.mobileMenuOverlay.classList.contains('active')
            ? 'hidden'
            : '';
    }

    closeMobileMenu() {
        this.menuToggle.classList.remove('active');
        this.mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * 页面切换
     */
    switchPage(pageId) {
        // 更新导航状态
        this.updateNavState(pageId);

        // 切换页面
        const pages = document.querySelectorAll('.page-view');
        pages.forEach(page => {
            page.style.opacity = '0';
            setTimeout(() => {
                page.classList.remove('active');
                if (page.id === `page-${pageId}`) {
                    page.classList.add('active');
                    // 强制重绘
                    void page.offsetWidth;
                    page.style.opacity = '1';
                }
            }, 400);
        });

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 更新URL（不刷新页面）
        if (history.pushState) {
            history.pushState(null, null, `#${pageId}`);
        }
    }

    /**
     * 更新导航激活状态
     */
    updateNavState(pageId) {
        const pages = ['home', 'history', 'modern', 'food', 'nature'];
        const index = pages.indexOf(pageId);

        // 桌面端
        this.navItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 移动端
        this.mobileNavItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * 根据URL hash初始化页面
     */
    initFromHash() {
        const hash = window.location.hash.slice(1);
        const validPages = ['home', 'history', 'modern', 'food', 'nature'];

        if (hash && validPages.includes(hash)) {
            this.switchPage(hash);
        }
    }
}

// 导出供全局使用
window.Navigation = Navigation;
