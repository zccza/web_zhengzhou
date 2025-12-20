/**
 * 增强主控制器 - 修复版
 * 修复导航冲突问题
 */

document.addEventListener('DOMContentLoaded', function() {
    // 等待主应用初始化
    setTimeout(() => {
        initEnhancedFeatures();
    }, 500);
    
    function initEnhancedFeatures() {
        // 获取已初始化的导航
        const nav = window.ZhengzhouApp ? window.ZhengzhouApp.navigation : null;
        if (nav) {
            window.nav = nav; // 导出全局引用
        }
        
        // 初始化极限视觉效果
        if (window.UltimateVisuals) {
            const ultimateVisuals = new UltimateVisuals();
            window.ultimateVisuals = ultimateVisuals;
        }
        
        // 设置增强事件监听
        setupEnhancedListeners();
        
        // 增强视觉效果
        enhanceVisualElements();
    }
    
    function setupEnhancedListeners() {
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
                
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                } else {
                    document.body.classList.remove('low-performance');
                }
            }
            requestAnimationFrame(measureFPS);
        }
        
        measureFPS();
        
        // 键盘快捷键增强
        document.addEventListener('keydown', (e) => {
            // 数字键快速切换页面
            if (e.key >= '1' && e.key <= '5') {
                e.preventDefault();
                const pages = ['home', 'history', 'modern', 'food', 'nature'];
                const pageIndex = parseInt(e.key) - 1;
                if (nav && pages[pageIndex]) {
                    nav.switchPage(pages[pageIndex]);
                }
            }
            
            // F键全屏
            if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                toggleFullscreen();
            }
        });
    }
    
    function enhanceVisualElements() {
        // 为卡片添加增强效果
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.classList.add('enhanced');
        });
        
        // 为按钮添加液体效果
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.classList.add('btn-liquid');
        });
        
        // 为标题添加效果
        const titles = document.querySelectorAll('.header-title');
        titles.forEach(title => {
            title.classList.add('text-3d');
        });
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    // 导出控制API
    window.zhengzhouExperience = {
        navigate: (page) => {
            if (nav) nav.switchPage(page);
        },
        pauseEffects: () => {
            document.body.classList.add('animations-paused');
        },
        resumeEffects: () => {
            document.body.classList.remove('animations-paused');
        },
        getActivePage: () => {
            const activePage = document.querySelector('.page-view.active');
            return activePage ? activePage.id.replace('page-', '') : 'home';
        }
    };
    
    // 添加性能优化样式
    const style = document.createElement('style');
    style.textContent = `
        .animations-paused * {
            animation-play-state: paused !important;
        }
        
        .low-performance .particles-container,
        .low-performance .ultimate-visuals-container {
            opacity: 0.3;
        }
        
        .low-performance .glass-card {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
        
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body.loaded > * {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 页面加载完成标记
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    console.log('%c✨ 增强视觉效果已加载', 'color: #c5a028;');
    console.log('快捷键：1-5 切换页面 | F 全屏');
});