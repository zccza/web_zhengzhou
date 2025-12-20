/**
 * 高级视觉效果控制器
 * 负责粒子效果、3D转场、动态背景等
 */

class AdvancedEffects {
    constructor() {
        this.particles = [];
        this.currentPage = 'home';
        this.isTransitioning = false;
        this.mouseGlow = null;
        this.init();
    }

    init() {
        this.createParticlesContainer();
        this.setupMouseGlow();
        this.setupScrollIndicator();
        this.initParticles();
        this.setupPageTransitions();
    }

    /**
     * 创建粒子容器
     */
    createParticlesContainer() {
        const container = document.createElement('div');
        container.className = 'particles-container';
        document.body.appendChild(container);
        this.particlesContainer = container;
    }

    /**
     * 初始化粒子效果
     */
    initParticles() {
        const particleCount = window.innerWidth > 768 ? 50 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 100);
        }

        // 定期清理和添加新粒子
        setInterval(() => {
            this.cleanupParticles();
            if (this.particles.length < particleCount) {
                this.createParticle();
            }
        }, 5000);
    }

    /**
     * 创建单个粒子
     */
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        // 根据当前页面设置不同的粒子样式
        this.setParticleStyle(particle);
        
        this.particlesContainer.appendChild(particle);
        this.particles.push(particle);
        
        // 启动粒子动画
        this.animateParticle(particle);
    }

    /**
     * 根据页面设置粒子样式
     */
    setParticleStyle(particle) {
        const pageStyles = {
            home: {
                size: Math.random() * 3 + 1,
                animationDuration: Math.random() * 3 + 2,
                animationDelay: Math.random() * 2
            },
            history: {
                size: Math.random() * 2 + 1,
                animationDuration: Math.random() * 10 + 15,
                animationDelay: Math.random() * 5
            },
            modern: {
                size: Math.random() * 2 + 1,
                width: Math.random() * 30 + 10,
                animationDuration: Math.random() * 2 + 2,
                animationDelay: Math.random() * 2
            },
            food: {
                size: Math.random() * 10 + 5,
                animationDuration: Math.random() * 5 + 5,
                animationDelay: Math.random() * 3
            },
            nature: {
                size: Math.random() * 15 + 10,
                animationDuration: Math.random() * 10 + 10,
                animationDelay: Math.random() * 4
            }
        };

        const style = pageStyles[this.currentPage] || pageStyles.home;
        
        if (this.currentPage === 'modern') {
            particle.style.width = style.width + 'px';
            particle.style.height = style.size + 'px';
        } else if (this.currentPage === 'nature') {
            particle.style.width = style.size + 'px';
            particle.style.height = style.size + 'px';
            particle.style.borderRadius = '0 100% 0 100%';
        } else {
            particle.style.width = style.size + 'px';
            particle.style.height = style.size + 'px';
            particle.style.borderRadius = '50%';
        }
        
        particle.style.animationDuration = style.animationDuration + 's';
        particle.style.animationDelay = style.animationDelay + 's';
    }

    /**
     * 粒子动画
     */
    animateParticle(particle) {
        // 动画由CSS处理
    }

    /**
     * 清理超出屏幕的粒子
     */
    cleanupParticles() {
        this.particles = this.particles.filter(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                particle.remove();
                return false;
            }
            return true;
        });
    }

    /**
     * 设置鼠标光晕效果
     */
    setupMouseGlow() {
        this.mouseGlow = document.createElement('div');
        this.mouseGlow.className = 'mouse-glow';
        document.body.appendChild(this.mouseGlow);

        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                this.mouseGlow.style.left = e.clientX + 'px';
                this.mouseGlow.style.top = e.clientY + 'px';
                this.mouseGlow.style.opacity = '1';
            }
        });

        document.addEventListener('mouseleave', () => {
            this.mouseGlow.style.opacity = '0';
        });
    }

    /**
     * 设置高级滚动指示器
     */
    setupScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator-advanced';
        
        const pages = [
            { id: 'home', title: '首页' },
            { id: 'history', title: '历史' },
            { id: 'modern', title: '现代' },
            { id: 'food', title: '美食' },
            { id: 'nature', title: '自然' }
        ];

        pages.forEach(page => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.setAttribute('data-title', page.title);
            dot.setAttribute('data-page', page.id);
            
            if (page.id === 'home') dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                if (window.nav) {
                    window.nav.navigateTo(page.id);
                }
            });
            
            indicator.appendChild(dot);
        });

        document.body.appendChild(indicator);
        this.scrollIndicator = indicator;

        // 更新活动指示器
        window.addEventListener('pageChanged', (e) => {
            const dots = indicator.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-page') === e.detail.pageId) {
                    dot.classList.add('active');
                }
            });
        });
    }

    /**
     * 设置3D页面切换效果
     */
    setupPageTransitions() {
        // 页面切换监听
        window.addEventListener('pageChanged', (e) => {
            const newPage = e.detail.pageId;
            if (newPage !== this.currentPage && !this.isTransitioning) {
                this.performPageTransition(this.currentPage, newPage);
            }
        });
    }

    /**
     * 执行页面切换动画
     */
    performPageTransition(fromPage, toPage) {
        this.isTransitioning = true;
        
        // 创建3D转场容器
        const transitionContainer = document.createElement('div');
        transitionContainer.className = 'page-3d-transition';
        transitionContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            perspective: 1000px;
            pointer-events: none;
        `;

        // 创建立方体面
        const faces = this.createCubeFaces(fromPage, toPage);
        faces.forEach(face => transitionContainer.appendChild(face));

        document.body.appendChild(transitionContainer);

        // 动画序列
        setTimeout(() => {
            transitionContainer.style.transform = 'rotateY(90deg)';
            transitionContainer.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 50);

        // 清理
        setTimeout(() => {
            transitionContainer.remove();
            this.currentPage = toPage;
            this.isTransitioning = false;
            
            // 更新粒子样式
            this.updateParticlesStyle();
        }, 900);
    }

    /**
     * 创建立方体面
     */
    createCubeFaces(fromPage, toPage) {
        const faces = [];
        const currentPageEl = document.getElementById(`page-${fromPage}`);
        const nextPageEl = document.getElementById(`page-${toPage}`);

        // 当前页面面
        const currentFace = document.createElement('div');
        currentFace.className = 'cube-face cube-face-current';
        currentFace.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: ${getComputedStyle(document.documentElement).getPropertyValue('--bg-deep')};
            backface-visibility: hidden;
            transform-origin: left center;
        `;
        
        // 克隆当前页面内容
        if (currentPageEl) {
            const clone = currentPageEl.cloneNode(true);
            clone.style.display = 'block';
            clone.style.opacity = '1';
            currentFace.appendChild(clone);
        }
        
        faces.push(currentFace);

        // 新页面面
        const nextFace = document.createElement('div');
        nextFace.className = 'cube-face cube-face-next';
        nextFace.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: ${getComputedStyle(document.documentElement).getPropertyValue('--bg-deep')};
            backface-visibility: hidden;
            transform: rotateY(-90deg) translateX(-100%);
            transform-origin: left center;
        `;
        
        // 克隆新页面内容
        if (nextPageEl) {
            const clone = nextPageEl.cloneNode(true);
            clone.style.display = 'block';
            clone.style.opacity = '1';
            nextFace.appendChild(clone);
        }
        
        faces.push(nextFace);

        return faces;
    }

    /**
     * 更新粒子样式以匹配新页面
     */
    updateParticlesStyle() {
        this.particles.forEach(particle => {
            // 移除旧粒子
            particle.style.opacity = '0';
            setTimeout(() => {
                particle.remove();
            }, 500);
        });
        
        // 清空数组并创建新粒子
        this.particles = [];
        setTimeout(() => {
            this.initParticles();
        }, 600);
    }

    /**
     * 创建扫描线效果
     */
    createScanLine() {
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        document.body.appendChild(scanLine);
        
        // 多条扫描线
        for (let i = 0; i < 3; i++) {
            const line = scanLine.cloneNode(true);
            line.style.animationDelay = (i * 2.67) + 's';
            document.body.appendChild(line);
        }
    }

    /**
     * 创建故障效果
     */
    createGlitchEffect() {
        const glitch = document.createElement('div');
        glitch.className = 'glitch-effect';
        glitch.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9998;
            pointer-events: none;
            opacity: 0;
            background: linear-gradient(
                transparent 50%,
                rgba(255, 255, 255, 0.03) 50%
            );
            background-size: 100% 4px;
        `;
        
        document.body.appendChild(glitch);
        
        // 随机触发故障效果
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitch.style.opacity = '1';
                glitch.style.transform = `translateX(${Math.random() * 20 - 10}px)`;
                
                setTimeout(() => {
                    glitch.style.opacity = '0';
                    glitch.style.transform = 'translateX(0)';
                }, 100);
            }
        }, 3000);
    }

    /**
     * 增强卡片悬停效果
     */
    enhanceCardHover() {
        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            card.classList.add('enhanced');
            
            // 添加磁性效果
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const rotateX = (y / rect.height) * -10;
                const rotateY = (x / rect.width) * 10;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(20px)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /**
     * 添加波浪动画效果
     */
    addWaveEffect() {
        const waveContainer = document.createElement('div');
        waveContainer.className = 'wave-container';
        waveContainer.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            z-index: -1;
            overflow: hidden;
        `;

        // 创建多个波浪
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'wave';
            wave.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                width: 200%;
                height: 100px;
                background: linear-gradient(90deg, transparent, rgba(197, 160, 40, 0.1), transparent);
                border-radius: 45% 55% 0 0;
                animation: wave ${10 + i * 2}s linear infinite;
                animation-delay: ${i * 0.5}s;
                opacity: ${0.3 - i * 0.1};
            `;
            waveContainer.appendChild(wave);
        }

        document.body.appendChild(waveContainer);

        // 添加波浪动画CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes wave {
                0% { transform: translateX(0) translateY(0); }
                50% { transform: translateX(-25%) translateY(-20px); }
                100% { transform: translateX(-50%) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化高级效果
document.addEventListener('DOMContentLoaded', () => {
    window.advancedEffects = new AdvancedEffects();
    
    // 延迟加载一些效果
    setTimeout(() => {
        window.advancedEffects.createScanLine();
        window.advancedEffects.createGlitchEffect();
        window.advancedEffects.enhanceCardHover();
        window.advancedEffects.addWaveEffect();
    }, 1000);
});

// 导出类供其他模块使用
window.AdvancedEffects = AdvancedEffects;