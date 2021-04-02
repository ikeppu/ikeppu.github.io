`use strict`;

/* NAVIGATOR CLASS */
class NavigatorCl {
  #isActive = false;

  constructor() {
    this.navBtn = document.querySelector(`.navigation__button`);
    this.linkBtns = document.querySelectorAll(`.navigation__link`);
    this.navBackground = document.querySelector(`.navigation__background`);
    this.nav = document.querySelector(`.navigation__nav`);
    this.navIcon = document.querySelector(`.navigation__icon`);
    this.navIconClose = document.querySelector(`.navigation__icon-close`);

    /* FUNCTIONALITY */
    this.navBtn.addEventListener(`click`, (e) => {
      e.preventDefault();
      if (this.#isActive) {
        this._closeNavMenu();
      } else {
        this._openNavMenu();
      }
      this.#isActive = !this.#isActive;
    });

    document.body.addEventListener(`click`, (e) => {
      if (e.target.closest(`.navigation__nav`)) {
        this._closeNavMenu();
        this.#isActive = !this.#isActive;
      }
    });
  }

  _openCloseNav(scale, translateX, width, opacity) {
    this.navBackground.style.transform = `${scale}`;
    this.nav.style.transform = `${translateX}`;
    this.nav.style.width = `${width}`;
    this.nav.style.opacity = `${opacity}`;
  }

  _closeNavMenu() {
    this._openCloseNav(`scale(0)`, `translateX(-20rem)`, `0`, `0`);
    this.navIconClose.classList.add(`hidden`);
    this.navIcon.classList.remove(`hidden`);
  }

  _openNavMenu() {
    this._openCloseNav(`scale(80)`, `translateX(0)`, `100%`, `1`);
    this.navIconClose.classList.remove(`hidden`);
    this.navIcon.classList.add(`hidden`);
  }
}
const nav = new NavigatorCl();

/* MODAL CLASS */
class Modal {
  constructor() {
    this.modal = document.querySelector(`.modal__overlay`);
    this.btnCloseModal = document.querySelector(`.modal__close-modal`);
    this.modalBtn = document.querySelectorAll(`.show-modal`);
    this.body = document.querySelector(`body`);

    this.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal__close')) {
        this.modal.classList.add(`hidden`);
      } else if (e.target.classList.contains('modal__overlay')) {
        this.modal.classList.add(`hidden`);
      }
    });

    this.modalBtn.forEach((i) => i.addEventListener(`click`, this._openCloseModal.bind(this)));

    document.addEventListener(`keydown`, (e) => {
      if (e.key === 'Escape') {
        this.modal.classList.add(`hidden`);
      }
    });
  }
  _openCloseModal() {
    this.modal.classList.toggle(`hidden`);
  }
}

const modal = new Modal();

/* SLIDER CLASS */
class Slider {
  //$ Fields
  currentSlide = 0;
  constructor() {
    this.slides = document.querySelectorAll(`.slide`);
    this.maxSlide = this.slides.length;
    this.slider = document.querySelector(`.slider`);
    this.btnLeft = document.querySelector(`.slider__btn--left`);
    this.btnRight = document.querySelector(`.slider__btn--right`);
    this.dotsContainer = document.querySelector(`.dots`);

    document.addEventListener(`keydown`, (e) => {
      // e.preventDefault();
      e.key === `ArrowLeft` && this._previousSlide();
      e.key === `ArrowRight` && this._nextSlide();
    });

    this.slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * i}%)`;
    });
    this._createDots();
    this._activateDots(0);
    this._goToSlide(0);
    this.btnRight.addEventListener(`click`, this._nextSlide.bind(this));
    this.btnLeft.addEventListener(`click`, this._previousSlide.bind(this));
  }

  _nextSlide() {
    if (this.currentSlide === this.maxSlide - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }

    this._goToSlide(this.currentSlide);
    this._activateDots(this.currentSlide);
  }

  _previousSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.maxSlide - 1;
    } else {
      this.currentSlide--;
    }
    this._goToSlide(this.currentSlide);
    this._activateDots(this.currentSlide);
  }

  _goToSlide(s) {
    this.slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - s)}%)`;
    });
  }

  _createDots() {
    this.slides.forEach((_, i) => {
      this.dotsContainer.insertAdjacentHTML(`beforeend`, `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  }

  _activateDots(s) {
    document.querySelectorAll(`.dots__dot`).forEach((dot) => {
      dot.classList.remove(`dots__dot--active`);
    });
    document.querySelector(`.dots__dot[data-slide="${s}"]`).classList.add(`dots__dot--active`);
  }
}

const slider = new Slider();
