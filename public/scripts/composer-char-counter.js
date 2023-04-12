$(document).ready(function() {
  const textarea = $('#tweet-text');
  textarea.on("input", function() {
    const charLimit = 140;
    let charCount = $('div').find('.counter');
    let charInput = $(this).val().length;
    if (charInput > charLimit) {
      charCount.addClass('over-limit');
    } else if (charInput <= charLimit) {
      charCount.removeClass('over-limit');
    }
    charCount.text(charLimit - charInput); 
  })
});