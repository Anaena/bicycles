'use strict';

const pageHeaderNav = document.querySelector('.page-header__nav');
const pageHeaderBackground = document.querySelector('.page-header__background');

pageHeaderBackground.classList.remove('page-header__background--nojs');
pageHeaderNav.classList.remove('main-nav--nojs');
pageHeaderNav.classList.remove('main-nav--opened');
pageHeaderNav.classList.add('main-nav--closed');

// Menu
const body = document.querySelector('body');
const mainHeaderElement = document.querySelector('.page-header');
const menuButtonElement = document.querySelector('.main-nav__toggle');

// Utils
const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}

// Menu
menuButtonElement.addEventListener('click', () => {
  body.dataset.scrollY = getBodyScrollTop();
  body.style.top = `-${body.dataset.scrollY}px`;

  if (pageHeaderNav.classList.contains('main-nav--closed')) {
    pageHeaderNav.classList.remove('main-nav--closed');
    pageHeaderNav.classList.add('main-nav--opened');
    body.classList.add('page__body--locked');
  } else {
    pageHeaderNav.classList.add('main-nav--closed');
    pageHeaderNav.classList.remove('main-nav--opened');
    body.classList.remove('page__body--locked');
  }
});

mainHeaderElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('site-list__link')) {
    evt.preventDefault();
    body.classList.remove('page__body--locked');
    pageHeaderNav.classList.remove('main-nav--opened');
    pageHeaderNav.classList.add('main-nav--closed');
    document.querySelector(evt.target.hash).scrollIntoView({ behavior: 'smooth'});
  }
});
