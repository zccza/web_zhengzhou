/**
 * 美食展示交互模块
 */

class FoodDisplay {
    constructor() {
        this.foodData = {
            soup: {
                title: "胡辣汤",
                desc: "郑州人的清晨唤醒剂。汤汁浓郁粘稠,胡椒味重,加入牛肉丁、面筋、木耳、海带丝等数十种食材,搭配油条或水煎包,一口下去大汗淋漓,通体舒畅。这一碗热腾腾的胡辣汤,承载着郑州人对家乡的深深眷恋。无论走到哪里,郑州人最想念的早餐就是这一碗麻辣鲜香的胡辣汤。",
                img: "images/郑州美食话辣汤.jpg",
                fallback: "https://placehold.co/800x600/5d4037/fff?text=Soup",
                location: "方中山 · 逍遥镇 · 北舞渡"
            },
            noodle: {
                title: "羊肉烩面",
                desc: "郑州的招牌美食,宽面筋道有嚼劲,汤底用羊肉羊骨熬制数小时,汤色乳白醇厚。加入海带丝、豆腐丝、粉条、香菜,浇上特制辣椒油,一碗下肚,满口留香。这不仅是一碗面,更是郑州人的待客之道和家乡味道。每一根面条都承载着中原人的热情好客,每一口汤都是时间熬制的精华。",
                img: "images/郑州美食话辣汤.jpg", // 这里应该是烩面的图，但目前代码里写错了
                fallback: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
                location: "合记 · 萧记 · 四厂烩面"
            },
            bbq: {
                title: "健康路夜市",
                desc: "郑州最具人气的夜市,从晚上7点到凌晨2点,这里是城市的深夜食堂。红柳烤肉、烤面筋、烤鱿鱼、砂锅、炒凉粉、铁板鱿鱼……烟火缭绕中,食客们围坐在小摊前,大快朵颐。这里有郑州最不加修饰的热情和最地道的江湖气。霓虹灯下,每一串烧烤都是城市烟火气的缩影。",
                img: "images/炒凉粉.jpg",
                fallback: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                location: "健康路 · 汝河路 · 农科路夜市"
            }
        };

        this.currentFood = 'soup';
        this.isAnimating = false;

        this.elements = {
            title: document.getElementById('food-display-title'),
            desc: document.getElementById('food-display-desc'),
            img: document.getElementById('food-display-img'),
            location: document.getElementById('food-display-location')
        };

        this.init();
    }

    init() {
        this.setupButtons();
        this.setupImageError();
    }

    setupButtons() {
        const buttons = document.querySelectorAll('.food-display-nav .btn');
        buttons.forEach((btn, index) => {
            const foodTypes = ['soup', 'noodle', 'bbq'];
            btn.addEventListener('click', () => {
                if (!this.isAnimating) {
                    this.updateDisplay(foodTypes[index]);
                    this.updateButtonState(buttons, index);
                }
            });
        });
    }

    setupImageError() {
        if (this.elements.img) {
            this.elements.img.addEventListener('error', (e) => {
                const currentData = this.foodData[this.currentFood];
                if (currentData && currentData.fallback) {
                    e.target.src = currentData.fallback;
                }
            });
        }
    }

    updateButtonState(buttons, activeIndex) {
        buttons.forEach((btn, i) => {
            if (i === activeIndex) {
                btn.classList.add('btn-gold');
                btn.style.background = 'var(--accent-gold)';
                btn.style.color = 'var(--bg-deep)';
            } else {
                btn.classList.remove('btn-gold');
                btn.style.background = 'transparent';
                btn.style.color = 'var(--text-main)';
            }
        });
    }

    updateDisplay(foodType) {
        if (!this.foodData[foodType] || this.currentFood === foodType) return;

        this.isAnimating = true;
        const data = this.foodData[foodType];

        // 淡出动画
        this.fadeOut(() => {
            // 更新内容
            if (this.elements.title) this.elements.title.textContent = data.title;
            if (this.elements.desc) this.elements.desc.textContent = data.desc;
            if (this.elements.img) this.elements.img.src = data.img;
            if (this.elements.location) this.elements.location.textContent = data.location;

            this.currentFood = foodType;

            // 淡入动画
            this.fadeIn(() => {
                this.isAnimating = false;
            });
        });
    }

    fadeOut(callback) {
        const duration = 300;
        Object.values(this.elements).forEach(el => {
            if (el) {
                el.style.transition = `opacity ${duration}ms ease`;
                el.style.opacity = '0';
            }
        });

        setTimeout(callback, duration);
    }

    fadeIn(callback) {
        const duration = 300;
        setTimeout(() => {
            Object.values(this.elements).forEach(el => {
                if (el) {
                    el.style.opacity = '1';
                }
            });
            setTimeout(callback, duration);
        }, 50);
    }

    /**
     * 预加载图片
     */
    preloadImages() {
        Object.values(this.foodData).forEach(food => {
            const img = new Image();
            img.src = food.img;
        });
    }
}

// 导出供全局使用
window.FoodDisplay = FoodDisplay;
