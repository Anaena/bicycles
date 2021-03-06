'use strict';

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 30;
const TEL_LENGHT = 11;

const pageHeaderNav = document.querySelector('.page-header__nav');
const pageHeaderBackground = document.querySelector('.page-header__container');

pageHeaderBackground.classList.remove('page-header__container--nojs');
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
  } else if (valueLength > MAX_NAME_LENGTH) {
    inputElement.classList.add('form__item--invalid-input');
  } else {
    inputElement.classList.remove('form__item--invalid-input');
  }
};

const checkPhoneValidity = (phoneElement) => {
  const inputElement = phoneElement.parentNode;

  if (phoneElement.validity.patternMismatch) {
    inputElement.classList.add('form__item--invalid-input');
  } else {
    inputElement.classList.remove('form__item--invalid-input');
  }
};

let isStorageSupport = true;
let storage = "";
let storagePhone = "";

try {
  storage = localStorage.getItem('userName');
  storagePhone = localStorage.getItem('phoneNumber');
} catch (err) {
  isStorageSupport = false;
}

userNameInput.addEventListener('input', (evt) => {
  checkNameValidity(userNameInput);
  localStorage.setItem('userName', e.target.value);
});

userPhoneInput.addEventListener('input', (evt) => {
  checkPhoneValidity(userPhoneInput);
  localStorage.setItem('phoneNumber', e.target.value);
});

feedbackForm.addEventListener('submit', (evt) => {
  if (!userNameInput.value || !userPhoneInput.value) {
    evt.preventDefault();
    userPhoneInput.parentNode.classList.add('form__item--invalid-input');
    userNameInput.parentNode.classList.add('form__item--invalid-input');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('userName', userNameInput.value);
      localStorage.setItem('phoneNumber', userPhoneInput.value);
    }
  }
});
