// menu

const pageHeaderNav = document.querySelector('.page-header__nav');
const pageHeaderBackground = document.querySelector('.page-header__background');
const headerToggle = document.querySelector('.main-nav__toggle');

pageHeaderBackground.classList.remove('page-header__background--nojs');
pageHeaderNav.classList.remove('main-nav--nojs');

headerToggle.addEventListener('click', function () {
  if (pageHeaderNav.classList.contains('main-nav--closed')) {
    pageHeaderNav.classList.remove('main-nav--closed');
    pageHeaderNav.classList.add('main-nav--opened');
  } else {
    pageHeaderNav.classList.add('main-nav--closed');
    pageHeaderNav.classList.remove('main-nav--opened');
  }
});
