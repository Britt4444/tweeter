/* eslint-env jquery */
/* eslint-env browser */

$(document).ready(function() {
  const textarea = $('#tweet-text');
  textarea.on("input", function() {
    const charLimit = 140;
    //$(this) refers to textarea
    let charInput = $(this).val().length;
    //$(this).siblings = textarea siblings in DOM tree, identifying class 'counter' here
    let charCount = $(this).siblings('.counter');
    //if input exceeds limit, create new class to assign red counter into the negatives
    if (charInput > charLimit) {
      charCount.addClass('over-limit');
    //if input is within limit, remove class and counter is original colour
    } else if (charInput <= charLimit) {
      charCount.removeClass('over-limit');
    }
    //set the value out output counter
    charCount.text(charLimit - charInput);
  });
});