/**
 * 极限视觉冲击控制器
 * 实现超越现实的视觉效果
 */

class UltimateVisuals {
    constructor() {
        this.effects = [];
        this.isRunning = false;
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.createEffectsContainer();
        this.setupPageEffects();
        this.initMouseEffects();
        this.startAnimationLoop();
    }

    createEffectsContainer() {
        this.container = document.createElement('div');
        this.container.className = 'ultimate-visuals-container';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(this.container);
    }

    setupPageEffects() {
        // 监听页面切换
        window.addEventListener('pageChanged', (e) => {
            this.currentPage = e.detail.pageId;
            this.switchEffects(this.currentPage);
        });

        // 初始化首页效果
        this.switchEffects('home');
    }

    switchEffects(page) {
        // 清除所有效果
        this.clearEffects();
        
        // 根据页面创建不同效果
        switch(page) {
            case 'home':
                this.createCosmicEffects();
                break;
            case 'history':
                this.createTimeEffects();
                break;
            case 'modern':
                this.createCyberpunkEffects();
                break;
            case 'food':
                this.createQuantumEffects();
                break;
            case 'nature':
                this.createNatureEffects();
                break;
        }
    }

    clearEffects() {
        this.effects.forEach(effect => {
            if (effect.element && effect.element.parentNode) {
                effect.element.remove();
            }
            if (effect.animationId) {
                cancelAnimationFrame(effect.animationId);
            }
        });
        this.effects = [];
    }

    /* ========== 首页 - 宇宙特效 ========== */
    createCosmicEffects() {
        // 黑洞引力场
        this.createBlackhole();
        
        // 星云爆炸
        this.createNebulaExplosion();
        
        // 超新星爆发
        this.createSupernova();
        
        // 极光效果
        this.createAurora();
    }

    createBlackhole() {
        const blackhole = document.createElement('div');
        blackhole.className = 'blackhole';
        blackhole.style.cssText = `
            top: ${30 + Math.random() * 40}%;
            left: ${30 + Math.random() * 40}%;
        `;
        
        blackhole.innerHTML = `
            <div class="event-horizon"></div>
            <div class="accretion-disk"></div>
        `;
        
        this.container.appendChild(blackhole);
        this.effects.push({
            type: 'blackhole',
            element: blackhole
        });
    }

    createNebulaExplosion() {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-explosion';
        
        // 创建多个星云云团
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'nebula-cloud';
            cloud.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                background: radial-gradient(circle, 
                    hsla(${Math.random() * 360}, 100%, 50%, 0.3) 0%, 
                    transparent 70%);
                animation-delay: ${Math.random() * 20}s;
            `;
            nebula.appendChild(cloud);
        }
        
        // 创建星云粒子
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'nebula-particle';
            particle.style.cssText = `
                left: ${50 + (Math.random() - 0.5) * 200}%;
                top: ${50 + (Math.random() - 0.5) * 200}%;
                --tx: ${(Math.random() - 0.5) * 1000}px;
                --ty: ${(Math.random() - 0.5) * 1000}px;
                animation-delay: ${Math.random() * 3}s;
            `;
            nebula.appendChild(particle);
        }
        
        this.container.appendChild(nebula);
        this.effects.push({
            type: 'nebula',
            element: nebula
        });
    }

    createSupernova() {
        const supernova = document.createElement('div');
        supernova.className = 'supernova';
        supernova.style.cssText = `
            top: ${20 + Math.random() * 60}%;
            left: ${20 + Math.random() * 60}%;
        `;
        
        supernova.innerHTML = `
            <div class="supernova-core"></div>
            <div class="supernova-shockwave"></div>
        `;
        
        this.container.appendChild(supernova);
        this.effects.push({
            type: 'supernova',
            element: supernova
        });
    }

    createAurora() {
        const aurora = document.createElement('div');
        aurora.className = 'aurora';
        
        // 创建多层极光波
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'aurora-wave';
            wave.style.cssText = `
                top: ${10 + i * 20}%;
                animation-delay: ${i * 2}s;
                filter: hue-rotate(${i * 30}deg) blur(${40 + i * 20}px);
            `;
            aurora.appendChild(wave);
        }
        
        this.container.appendChild(aurora);
        this.effects.push({
            type: 'aurora',
            element: aurora
        });
    }

    /* ========== 历史页 - 时间特效 ========== */
    createTimeEffects() {
        // 时间扭曲
        this.createTimeDistortion();
        
        // 维度裂隙
        this.createDimensionCracks();
        
        // 沙漏效果
        this.createHourglass();
    }

    createTimeDistortion() {
        const distortion = document.createElement('div');
        distortion.className = 'time-distortion';
        distortion.style.cssText = `
            top: ${30 + Math.random() * 40}%;
            left: ${30 + Math.random() * 40}%;
        `;
        
        // 创建多个时间涟漪
        for (let i = 0; i < 5; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'time-ripple';
            ripple.style.animationDelay = `${i * 0.5}s`;
            distortion.appendChild(ripple);
        }
        
        this.container.appendChild(distortion);
        this.effects.push({
            type: 'time-distortion',
            element: distortion
        });
    }

    createDimensionCracks() {
        for (let i = 0; i < 10; i++) {
            const crack = document.createElement('div');
            crack.className = 'dimension-crack';
            crack.style.cssText = `
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                transform: rotate(${Math.random() * 360}deg);
                animation-delay: ${Math.random() * 4}s;
                width: ${100 + Math.random() * 200}px;
            `;
            this.container.appendChild(crack);
            this.effects.push({
                type: 'crack',
                element: crack
            });
        }
    }

    createHourglass() {
        // 实现沙漏时间流动效果
        const hourglass = document.createElement('div');
        hourglass.style.cssText = `
            position: fixed;
            top: 50%;
            right: 5%;
            width: 100px;
            height: 200px;
            transform: translateY(-50%);
            z-index: -1;
        `;
        
        // 这里可以添加具体的沙漏粒子效果
        this.container.appendChild(hourglass);
        this.effects.push({
            type: 'hourglass',
            element: hourglass
        });
    }

    /* ========== 现代页 - 赛博朋克特效 ========== */
    createCyberpunkEffects() {
        // 全息投影
        this.createHolographic();
        
        // 矩阵雨
        this.createMatrixRain();
        
        // 数据流瀑布
        this.createDataWaterfall();
        
        // DNA螺旋
        this.createDNAHelix();
    }

    createHolographic() {
        const holo = document.createElement('div');
        holo.className = 'holographic-interface';
        
        const grid = document.createElement('div');
        grid.className = 'holo-grid';
        holo.appendChild(grid);
        
        this.container.appendChild(holo);
        this.effects.push({
            type: 'holographic',
            element: holo
        });
    }

    createMatrixRain() {
        const matrix = document.createElement('div');
        matrix.className = 'matrix-rain';
        
        // 创建多列矩阵雨
        for (let i = 0; i < 30; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = `${i * 3.33}%`;
            column.style.animationDuration = `${2 + Math.random() * 3}s`;
            column.style.animationDelay = `${Math.random() * 2}s`;
            
            // 生成随机字符
            let chars = '';
            for (let j = 0; j < 50; j++) {
                chars += String.fromCharCode(0x30A0 + Math.random() * 96) + '<br>';
            }
            column.innerHTML = chars;
            
            matrix.appendChild(column);
        }
        
        this.container.appendChild(matrix);
        this.effects.push({
            type: 'matrix',
            element: matrix
        });
    }

    createDataWaterfall() {
        // 创建多条数据流
        for (let i = 0; i < 20; i++) {
            const waterfall = document.createElement('div');
            waterfall.className = 'data-waterfall';
            waterfall.style.left = `${Math.random() * 100}%`;
            waterfall.style.animationDuration = `${1 + Math.random() * 2}s`;
            waterfall.style.animationDelay = `${Math.random() * 2}s`;
            
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            waterfall.appendChild(stream);
            
            this.container.appendChild(waterfall);
            this.effects.push({
                type: 'data-waterfall',
                element: waterfall
            });
        }
    }

    createDNAHelix() {
        const dna = document.createElement('div');
        dna.className = 'dna-helix';
        
        const strand = document.createElement('div');
        strand.className = 'dna-strand';
        
        // 创建DNA节点
        for (let i = 0; i < 50; i++) {
            const node1 = document.createElement('div');
            node1.className = 'dna-node';
            node1.style.cssText = `
                transform: rotateY(${i * 36}deg) translateZ(200px) translateY(${i * 10}px);
                background: rgba(0, 242, 255, ${0.5 + Math.random() * 0.5});
                animation-delay: ${i * 0.1}s;
            `;
            
            const node2 = document.createElement('div');
            node2.className = 'dna-node';
            node2.style.cssText = `
                transform: rotateY(${i * 36 + 180}deg) translateZ(200px) translateY(${i * 10}px);
                background: rgba(255, 0, 150, ${0.5 + Math.random() * 0.5});
                animation-delay: ${i * 0.1 + 0.5}s;
            `;
            
            strand.appendChild(node1);
            strand.appendChild(node2);
        }
        
        dna.appendChild(strand);
        this.container.appendChild(dna);
        this.effects.push({
            type: 'dna',
            element: dna
        });
    }

    /* ========== 美食页 - 量子特效 ========== */
    createQuantumEffects() {
        // 量子场
        this.createQuantumField();
        
        // 量子纠缠
        this.createQuantumEntanglement();
        
        // 引力透镜
        this.createGravitationalLens();
    }

    createQuantumField() {
        const field = document.createElement('div');
        field.className = 'quantum-field';
        
        // 创建量子波动
        for (let i = 0; i < 10; i++) {
            const wave = document.createElement('div');
            wave.className = 'quantum-wave';
            wave.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                border-color: hsla(${Math.random() * 360}, 100%, 50%, 0.5);
                animation-delay: ${Math.random() * 4}s;
            `;
            field.appendChild(wave);
        }
        
        this.container.appendChild(field);
        this.effects.push({
            type: 'quantum-field',
            element: field
        });
    }

    createQuantumEntanglement() {
        const entanglement = document.createElement('div');
        entanglement.className = 'quantum-entanglement';
        
        // 创建量子连接线
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'quantum-line';
            line.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${50 + Math.random() * 200}px;
                transform: rotate(${Math.random() * 360}deg);
                animation-delay: ${Math.random() * 2}s;
            `;
            entanglement.appendChild(line);
        }
        
        this.container.appendChild(entanglement);
        this.effects.push({
            type: 'quantum-entanglement',
            element: entanglement
        });
    }

    createGravitationalLens() {
        const lens = document.createElement('div');
        lens.className = 'gravitational-lens';
        lens.style.cssText = `
            top: ${20 + Math.random() * 60}%;
            left: ${20 + Math.random() * 60}%;
        `;
        
        const distortion = document.createElement('div');
        distortion.className = 'lens-distortion';
        lens.appendChild(distortion);
        
        this.container.appendChild(lens);
        this.effects.push({
            type: 'gravitational-lens',
            element: lens
        });
    }

    /* ========== 自然页 - 自然特效 ========== */
    createNatureEffects() {
        // 生命之树
        this.createTreeOfLife();
        
        // 分形生长
        this.createFractalGrowth();
        
        // 粒子生命
        this.createParticleLife();
    }

    createTreeOfLife() {
        // 使用Canvas绘制生命之树
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.3;
        `;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        this.drawTree(ctx, canvas.width / 2, canvas.height, -90, 10);
        
        this.container.appendChild(canvas);
        this.effects.push({
            type: 'tree-of-life',
            element: canvas
        });
    }

    drawTree(ctx, x, y, angle, depth) {
        if (depth === 0) return;
        
        const length = depth * 10;
        const endX = x + Math.cos(angle * Math.PI / 180) * length;
        const endY = y + Math.sin(angle * Math.PI / 180) * length;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(0, 255, 100, ${depth / 10})`;
        ctx.lineWidth = depth / 2;
        ctx.stroke();
        
        this.drawTree(ctx, endX, endY, angle - 20, depth - 1);
        this.drawTree(ctx, endX, endY, angle + 20, depth - 1);
    }

    createFractalGrowth() {
        // 实现分形生长动画
        const fractal = document.createElement('div');
        fractal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            z-index: -1;
            opacity: 0.2;
        `;
        
        // 使用SVG创建分形图案
        fractal.innerHTML = `
            <svg width="600" height="600" viewBox="0 0 600 600">
                <defs>
                    <pattern id="fractal-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0, 255, 150, 0.5)" stroke-width="1"/>
                        <circle cx="0" cy="0" r="15" fill="none" stroke="rgba(0, 255, 150, 0.3)" stroke-width="0.5"/>
                        <circle cx="100" cy="100" r="15" fill="none" stroke="rgba(0, 255, 150, 0.3)" stroke-width="0.5"/>
                    </pattern>
                </defs>
                <rect width="600" height="600" fill="url(#fractal-pattern)"/>
                <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="60s" repeatCount="indefinite"/>
            </svg>
        `;
        
        this.container.appendChild(fractal);
        this.effects.push({
            type: 'fractal',
            element: fractal
        });
    }

    createParticleLife() {
        // 创建生命粒子系统
        const lifeContainer = document.createElement('div');
        lifeContainer.className = 'particle-life';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(0, 255, 100, 0.8), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleLife ${5 + Math.random() * 10}s ease-in-out infinite;
            `;
            
            // 创建生命周期动画
            const style = document.createElement('style');
            style.textContent = `
                @keyframes particleLife {
                    0% {
                        transform: scale(0) translate(0, 0);
                        opacity: 0;
                    }
                    20% {
                        transform: scale(1) translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px);
                        opacity: 1;
                    }
                    80% {
                        transform: scale(1) translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 300}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            lifeContainer.appendChild(particle);
        }
        
        this.container.appendChild(lifeContainer);
        this.effects.push({
            type: 'particle-life',
            element: lifeContainer
        });
    }

    /* ========== 鼠标交互效果 ========== */
    initMouseEffects() {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });
        
        // 平滑跟随
        const animateMouse = () => {
            mouseX += (targetX - mouseX) * 0.1;
            mouseY += (targetY - mouseY) * 0.1;
            
            // 影响附近的粒子
            this.effects.forEach(effect => {
                if (effect.type === 'quantum-field' || effect.type === 'nebula-particle') {
                    const rect = effect.element.getBoundingClientRect();
                    const distance = Math.sqrt(
                        Math.pow(mouseX - rect.left, 2) + 
                        Math.pow(mouseY - rect.top, 2)
                    );
                    
                    if (distance < 200) {
                        const force = (200 - distance) / 200;
                        effect.element.style.transform = `scale(${1 + force * 0.2})`;
                    }
                }
            });
            
            requestAnimationFrame(animateMouse);
        };
        
        animateMouse();
    }

    /* ========== 动画循环 ========== */
    startAnimationLoop() {
        const animate = () => {
            // 更新所有动态效果
            this.updateEffects();
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateEffects() {
        // 根据时间更新效果
        const time = Date.now() * 0.001;
        
        this.effects.forEach(effect => {
            if (effect.type === 'blackhole') {
                // 黑洞吸力效果
                const rotation = time * 20;
                effect.element.querySelector('.accretion-disk').style.transform = 
                    `rotate(${rotation}deg)`;
            }
        });
    }

    /* ========== 性能优化 ========== */
    pause() {
        this.isRunning = false;
    }

    resume() {
        this.isRunning = true;
    }

    destroy() {
        this.clearEffects();
        if (this.container.parentNode) {
            this.container.remove();
        }
    }
}

// 初始化极限视觉效果
document.addEventListener('DOMContentLoaded', () => {
    // 延迟加载，确保不影响主要功能
    setTimeout(() => {
        window.ultimateVisuals = new UltimateVisuals();
    }, 500);
});

// 导出供其他模块使用
window.UltimateVisuals = UltimateVisuals;