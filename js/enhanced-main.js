/**
 * 增强主控制器 - 整合所有视觉效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有模块
    let nav, animations, advancedEffects, ultimateVisuals;
    
    // 延迟初始化，确保页面加载完成
    setTimeout(() => {
        // 等待主应用初始化完成
        if (window.ZhengzhouApp && window.ZhengzhouApp.navigation) {
            nav = window.ZhengzhouApp.navigation;
            window.nav = nav;
        }
        
        initModules();
        setupEventListeners();
        enhanceVisuals();
    }, 200);
    
    function initModules() {
        // 导航已由main.js初始化，这里不再重复初始化
        
        // 初始化基础动画（如果还没有初始化）
        if (window.Animations && !window.ZhengzhouApp.animations) {
            animations = new Animations();
        }
        
        // 初始化高级效果
        if (window.AdvancedEffects) {
            advancedEffects = new AdvancedEffects();
        }
        
        // 初始化极限视觉效果（延迟更久，确保不影响性能）
        setTimeout(() => {
            if (window.UltimateVisuals) {
                ultimateVisuals = new UltimateVisuals();
            }
        }, 500);
    }
    
    function setupEventListeners() {
        // 页面加载完成事件
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // 添加页面进入动画
            const activePage = document.querySelector('.page-view.active');
            if (activePage) {
                activePage.classList.add('page-load-animation');
            }
        });
        
        // 性能优化：页面不可见时暂停动画
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // 暂停所有动画
                if (ultimateVisuals) ultimateVisuals.pause();
                document.body.classList.add('animations-paused');
            } else {
                // 恢复动画
                if (ultimateVisuals) ultimateVisuals.resume();
                document.body.classList.remove('animations-paused');
            }
        });
        
        // 窗口大小改变时重新计算
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                handleResize();
            }, 250);
        });
        
        // 添加键盘快捷键
        document.addEventListener('keydown', (e) => {
            handleKeyboardShortcuts(e);
        });
    }
    
    function enhanceVisuals() {
        // 为所有卡片添加增强效果
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.classList.add('enhanced');
        });
        
        // 为按钮添加液体效果
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.classList.add('btn-liquid');
        });
        
        // 添加磁性区域
        const magneticElements = document.querySelectorAll('.btn, .nav-item');
        magneticElements.forEach(el => {
            el.classList.add('magnetic-area');
        });
        
        // 为标题添加3D和霓虹效果
        const titles = document.querySelectorAll('.header-title');
        titles.forEach(title => {
            title.classList.add('text-3d', 'neon-text');
        });
    }
    
    function handleResize() {
        // 重新初始化需要响应式的效果
        if (ultimateVisuals) {
            ultimateVisuals.switchEffects(ultimateVisuals.currentPage);
        }
        
        // 调整粒子数量
        const particleCount = window.innerWidth > 768 ? 50 : 20;
        if (advancedEffects) {
            // 调整粒子数量逻辑
        }
    }
    
    function handleKeyboardShortcuts(e) {
        // 数字键快速切换页面
        if (e.key >= '1' && e.key <= '5') {
            const pages = ['home', 'history', 'modern', 'food', 'nature'];
            const pageIndex = parseInt(e.key) - 1;
            if (nav && pages[pageIndex]) {
                nav.navigateTo(pages[pageIndex]);
            }
        }
        
        // 空格键暂停/恢复动画
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            document.body.classList.toggle('animations-paused');
        }
        
        // F键全屏模式
        if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    // 性能监控
    let fps = 60;
    let lastTime = performance.now();
    let frames = 0;
    
    function measureFPS() {
        frames++;
        const currentTime = performance.now();
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
            
            // 如果FPS过低，自动降低效果质量
            if (fps < 30) {
                document.body.classList.add('low-performance');
            } else {
                document.body.classList.remove('low-performance');
            }
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    // 启动性能监控
    measureFPS();
    
    // 添加全局样式用于性能优化
    const performanceStyles = document.createElement('style');
    performanceStyles.textContent = `
        /* 性能优化样式 */
        .animations-paused * {
            animation-play-state: paused !important;
        }
        
        .low-performance .particles-container,
        .low-performance .ultimate-visuals-container {
            opacity: 0.3;
        }
        
        .low-performance .glass-card {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
        }
        
        /* 加载状态 */
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded) > * {
            opacity: 0;
        }
        
        body.loaded > * {
            animation: pageLoad 1s ease forwards;
        }
        
        /* 平滑过渡 */
        .page-view {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        /* 增强滚动体验 */
        html {
            scroll-behavior: smooth;
        }
        
        /* 防止文本选中影响体验 */
        .nav-item, .btn, .glass-card {
            user-select: none;
            -webkit-user-select: none;
        }
        
        /* 高对比度模式支持 */
        @media (prefers-contrast: high) {
            .glass-card {
                background: rgba(0, 0, 0, 0.9);
                border: 2px solid var(--accent-gold);
            }
        }
        
        /* 移动端触摸优化 */
        @media (hover: none) and (pointer: coarse) {
            .magnetic-area {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(performanceStyles);
    
    // 导出全局控制器
    window.zhengzhouExperience = {
        navigate: (page) => {
            if (nav) nav.navigateTo(page);
        },
        pauseEffects: () => {
            if (ultimateVisuals) ultimateVisuals.pause();
            document.body.classList.add('animations-paused');
        },
        resumeEffects: () => {
            if (ultimateVisuals) ultimateVisuals.resume();
            document.body.classList.remove('animations-paused');
        },
        getCurrentFPS: () => fps,
        getActivePage: () => ultimateVisuals ? ultimateVisuals.currentPage : 'home'
    };
    
    // 控制台提示
    console.log('%c🏙️ 郑州数字体验门户', 'font-size: 20px; color: #c5a028; font-weight: bold;');
    console.log('%c按数字键 1-5 快速切换页面 | 空格键暂停动画 | F键全屏', 'color: #888;');
    console.log('%czhengzhouExperience API:', 'color: #3a82d6;');
    console.log({
        navigate: '导航到指定页面',
        pauseEffects: '暂停所有视觉效果',
        resumeEffects: '恢复视觉效果',
        getCurrentFPS: '获取当前帧率',
        getActivePage: '获取当前页面'
    });
});