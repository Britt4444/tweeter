/* eslint-env jquery */
/* eslint-env browser */

$(document).ready(function() {
  // scroll-to-top button appears on window scroll
  const toTopBtn = $('.scroll-up');
  const navBtn = $('#write-tweet span');
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 20) {
      //display scroll-up btn, hide nav bar btn
      toTopBtn.css('display', 'block');
      navBtn.css('display', 'none');
    } else {
      //display nav bar btn, hide scroll-up btn
      toTopBtn.css('display', 'none');
      navBtn.css('display', 'block');
    }
  });
  // return to top of page and focus on textarea when btn is clicked
  toTopBtn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
    $('.new-tweet').css('display', 'block');
    $('.new-tweet textarea').focus();
  });
});