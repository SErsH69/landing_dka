import $ from 'jquery';
import 'slick-carousel';

const MainSlider = class MainSlider {
    constructor(){}
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
             $('.js-phone').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                focusOnSelect: true,
                asNavFor: '.js-phone-nav'
            });
            $('.js-phone-nav').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                asNavFor: '.js-phone',
                dots: false,
            });
        });
    }
    init() {
        this.initSlider();
    }
}

export default MainSlider;