const Header = class Header {
    constructor({ isMobileMenuOpened = false, isFixed = false } = {}) {
        this.isMobileMenuOpened = isMobileMenuOpened;
        this.isFixed = isFixed;

        this.headerEl = null;
        this.headerHeight = 0;
    }

    toogleMobileMenu() {
        this.isMobileMenuOpened = !this.isMobileMenuOpened;
    }

    closeMobileMenu() {
        this.isMobileMenuOpened = false;
    }

    measureHeaderHeight() {
        if (!this.headerEl) return;

        const inner = this.headerEl.querySelector('.header__in');
        const h = inner ? inner.offsetHeight : this.headerEl.offsetHeight;

        this.headerHeight = h;
    }

    updateBodyPadding() {
        if (!this.headerEl) return;

        if (!this.headerHeight) {
            this.measureHeaderHeight();
        }

        if (this.isFixed && this.headerHeight) {
            document.body.style.paddingTop = this.headerHeight + 'px';
        } else {
            document.body.style.paddingTop = '';
        }
    }

    handleScroll() {
        const currentScroll = window.scrollY || window.pageYOffset || 0;
        const shouldBeFixed = currentScroll > 30;

        if (shouldBeFixed !== this.isFixed) {
            this.isFixed = shouldBeFixed;
            this.updateBodyPadding();
        }
    }

    setEventListener() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('.header__burger--body') || event.target.closest('.header__burger')) return;
            this.closeMobileMenu();
        });

        window.addEventListener('scroll', this.handleScroll.bind(this));

        window.addEventListener('resize', () => {
            this.measureHeaderHeight();
            if (this.isFixed) {
                this.updateBodyPadding();
            }
        });
    }

    init() {
        this.headerEl = document.querySelector('.header');

        this.measureHeaderHeight();
        this.setEventListener();
        this.handleScroll();
    }
}

export default Header;
