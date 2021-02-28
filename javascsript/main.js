'use strict';
let isActive = false;
let navBtn = document.querySelector(`.navigation__button`);
let linkBtns = document.querySelectorAll(`.navigation__link`);

navBtn.addEventListener(`click`, (e) => {
  e.preventDefault();

  if (isActive) {
    closeNavMenu();
  } else {
    openNavMenu();
  }
  isActive = !isActive;
});

document.querySelector(`.navigation__nav`).addEventListener(`click`, (e) => {
  closeNavMenu();
  isActive = false;
});

for (let i = 0; i < linkBtns.length; i++) {
  linkBtns[i].addEventListener(`click`, (e) => {
    closeNavMenu();
    isActive = !isActive;
  });
}

function closeNavMenu() {
  openCloseNav(`scale(0)`, `translateX(-20rem)`, `0`, `0`);

  document.querySelector(`.navigation__icon-close`).classList.add(`hidden`);
  document.querySelector(`.navigation__icon`).classList.remove(`hidden`);
}
function openNavMenu() {
  openCloseNav(`scale(80)`, `translateX(0)`, `100%`, `1`);

  document.querySelector(`.navigation__icon`).classList.add(`hidden`);
  document.querySelector(`.navigation__icon-close`).classList.remove(`hidden`);
}

function openCloseNav(scale, translateX, width, opacity) {
  document.querySelector(`.navigation__background`).style.transform = `${scale}`;
  document.querySelector(`.navigation__nav`).style.transform = `${translateX}`;
  document.querySelector(`.navigation__nav`).style.width = `${width}`;
  document.querySelector(`.navigation__nav`).style.opacity = `${opacity}`;
}

/* MODAL WORK */
let modal = document.querySelector(`.modal__overlay`);
let btnCloseModal = document.querySelector(`.modal__close-modal`);
let modalBtn = document.querySelector(`.show-modal`);

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal__close')) {
    modal.classList.add(`hidden`);
  } else if (e.target.classList.contains('modal__overlay')) {
    modal.classList.add(`hidden`);
  }
});
modalBtn.addEventListener(`click`, openCloseModal);

document.addEventListener(`keydown`, (e) => {
  if (e.key === 'Escape') {
    modal.classList.add(`hidden`);
  }
});

function openCloseModal() {
  modal.classList.toggle(`hidden`);
}
