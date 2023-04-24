/* eslint-env jquery */
/* eslint-env browser */

$(document).ready(function() {
  // scroll-to-top button appears on window scroll
  const toTopBtn = $('.scroll-up');
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 20) {
      toTopBtn.css('display', 'block');
    } else {
      toTopBtn.css('display', 'none');
    }
  });
  // remove button and focus on textarea when button is clicked
  toTopBtn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
    $('.new-tweet textarea').focus();
  });
});