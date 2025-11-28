import '@google/model-viewer';
import '@google/model-viewer-effects';

const MainMarketing = class MainMarketing {
    constructor() {
        this.onScroll = this.onScroll.bind(this);
    }

    initAnim() {
        const section    = document.querySelector('.main-marketing');
        const model      = document.getElementById('marketingModel');
        const titles     = document.querySelector('.main-marketing__titles');
        const line       = document.querySelector('.main-marketing__line');
        const blocksWrap = document.querySelector('.main-marketing__blocks');
        const blocksWrap2 = document.querySelector('.main-marketing__titles');
        const blocks     = document.querySelectorAll('.main-marketing__block');
        const sceneBlock = document.querySelector('.main-marketing__scene');

        if (!section || !model) return;

        this.section    = section;
        this.model      = model;
        this.titles     = titles;
        this.line       = line;
        this.blocksWrap = blocksWrap;
        this.blocksWrap2 = blocksWrap2;
        this.blocks     = blocks;
        this.sceneBlock = sceneBlock;

        // если ширина окна <= 1023 — включаем мобильный режим
        if (window.innerWidth <= 1023) {
            this.initMobile();
        } else {
            this.initDesktop();
        }
    }

    initDesktop() {
        // на десктопе автопрокрутку камеры отключаем, управляем сами
        this.model.setAttribute('auto-rotate', 'false');

        window.addEventListener('scroll', this.onScroll);
        this.onScroll(); // сразу один раз посчитать
    }

    initMobile() {
        const { model, line, blocksWrap, blocks, titles, blocksWrap2 } = this;

        // просто шар на фоне — всегда виден, крутится сам
        model.style.opacity = 1;
        model.setAttribute('auto-rotate', 'true');
        model.setAttribute('camera-orbit', '0deg 90deg 3m');

        // заголовок без анимации
        titles.classList.remove('main-marketing__titles--top');
        blocksWrap2.classList.remove('main-marketing__blocks--ovh');
        blocksWrap2.classList.remove('main-marketing__blocks--hidden');

        // линия сразу целиком
        if (line) {
            line.style.opacity = 1;
            line.style.width   = '100%';
        }

        // все блоки сразу показаны
        if (blocksWrap) {
            blocksWrap.classList.add('main-marketing__blocks--visible');
        }
        blocks.forEach(block =>
            block.classList.add('main-marketing__block--visible')
        );

        // на всякий случай убираем обработчик скролла, если он был
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        const {
            section,
            model,
            titles,
            line,
            blocksWrap,
            blocksWrap2,
            blocks,
            sceneBlock
        } = this;

        const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

        const rect = section.getBoundingClientRect();
        const vh   = window.innerHeight;

        const progress = clamp((vh - rect.top) / (rect.height - vh), 0, 1);

        /* === 1. Заголовок уходит вверх === */
        if (progress > 0.1) {
            titles.classList.add('main-marketing__titles--top');
        } else {
            titles.classList.remove('main-marketing__titles--top');
        }

        /* === 2. Появление шара === */
        const appearStart = 0.15;
        const appearEnd   = 0.35;

        let appearProgress = clamp(
            (progress - appearStart) / (appearEnd - appearStart),
            0,
            1
        );

        const grow = Math.pow(appearProgress, 0.9);

        const farRadius  = 20;
        const nearRadius = 5.2;
        const currentRadius = farRadius - grow * (farRadius - nearRadius);

        model.style.opacity = grow;

        /* === 3. Вращение шара === */
        const rotateT = clamp((progress - 0.4) / 0.6, 0, 1);
        const angle   = rotateT * 180;

        model.setAttribute(
            'camera-orbit',
            `${angle}deg 90deg ${currentRadius}m`
        );

        /* === 4. Линия === */
        const lineT = clamp((progress - 0.65) / 0.1, 0, 1);
        line.style.opacity = lineT;
        line.style.width   = `${lineT * 100}%`;

        /* === 5. Появление блока-обёртки === */
        if (progress > 0.7) {
            blocksWrap2.classList.add('main-marketing__blocks--ovh');
            blocksWrap.classList.add('main-marketing__blocks--visible');
            sceneBlock?.classList.add('isVisible');
        } else if (progress > 0.5) {
            blocksWrap2.classList.add('main-marketing__blocks--hidden');
        } else {
            blocksWrap2.classList.remove('main-marketing__blocks--ovh');
            blocksWrap2.classList.remove('main-marketing__blocks--hidden');
            blocksWrap.classList.remove('main-marketing__blocks--visible');
            sceneBlock?.classList.remove('isVisible');
        }

        /* === 6. Блоки по одному === */
        const itemProgress = clamp((progress - 0.75) / 0.25, 0, 1);
        const step = 1 / blocks.length;

        blocks.forEach((block, idx) => {
            const local = (itemProgress - step * idx) / step;
            if (local > 0) {
                block.classList.add('main-marketing__block--visible');
            } else {
                block.classList.remove('main-marketing__block--visible');
            }
        });
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => this.initAnim());
    }
};

export default MainMarketing;
