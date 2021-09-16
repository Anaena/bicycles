'use strict';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 30;

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

// Form
const sectionPromo = document.querySelector('.promo');
const feedbackForm = sectionPromo.querySelector('.form');
const userNameInput = feedbackForm.querySelector('#name');
const userPhoneInput = feedbackForm.querySelector('[type="tel"]');
const userPhone = userPhoneInput.value;
const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

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
    document.querySelector(evt.target.hash).scrollIntoView({ behavior: 'smooth' });
  }
});

// Form

const checkNameValidity = (nameElement) => {
  const inputElement = nameElement.parentNode;
  const valueLength = nameElement.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    inputElement.classList.add('form__item--invalid-input');
    nameElement.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    inputElement.classList.add('form__item--invalid-input');
    nameElement.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    inputElement.classList.remove('form__item--invalid-input');
    nameElement.setCustomValidity('');
  }
  nameElement.reportValidity();
};

const checkPhoneValidity = (phoneElement) => {
  const inputElement = phoneElement.parentNode;

  if (phoneElement.validity.patternMismatch) {
    inputElement.classList.add('form__item--invalid-input');
    phoneElement.setCustomValidity(`Введите Ваш номер телефона`);
  } else {
    inputElement.classList.remove('form__item--invalid-input');
    phoneElement.setCustomValidity('');
  }
  phoneElement.reportValidity();
};

userNameInput.addEventListener('input', () => {
  checkNameValidity(userNameInput);
});

userPhoneInput.addEventListener('input', () => {
  checkPhoneValidity(userPhoneInput);
});
