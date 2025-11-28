import $ from 'jquery';
import 'slick-carousel';

const MainCards = class MainCards {
    constructor(){
        this.sliderInited = false;
        this.$slider = null;
    }

    initSlider() {
        this.$slider = $('.js_mcards');

        const enableSlider = () => {
            if (window.innerWidth <= 1023) {

                if (!this.sliderInited) {
                    this.$slider.slick({
                        variableWidth: true,
                        slidesToScroll: 1,
                        arrows: false,
                        infinite: true,
                        dots: false,
                        mobileFirst: true,
                    });
                    this.sliderInited = true;
                }

            } else {

                if (this.sliderInited) {
                    this.$slider.slick('unslick');
                    this.sliderInited = false;
                }

            }
        };

        // запуск при загрузке
        enableSlider();

        // запуск при изменении размера окна
        window.addEventListener('resize', enableSlider);
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initSlider();
        });
    }
};

export default MainCards;
