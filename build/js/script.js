// menu
const pageHeaderNav = document.querySelector('.page-header__nav');
const headerToggle = document.querySelector('.main-nav__toggle');

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
