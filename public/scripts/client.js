/* eslint-env jquery */
/* eslint-env browser */
/* elsint-env timeago */

$(document).ready(() => {

  //safely render possible insecure text by escaping it
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // $("time.timeago").timeago(); //this is not a function?

  // tweet element html content
  const createTweetElement = (tweet) => {
    return `<article>
              <header>
                <img src=${tweet.user.avatars} alt="my avatar">
                <h3>${tweet.user.name}</h3>
                <address>${tweet.user.handle}</address>
              </header>
              <p>${escape(tweet.content.text)}</p>
              <footer>
                <time class="timeago">${tweet.created_at}</time>
                <span class="fa-solid fa-flag" style="color:#4056A1">
                  <i class="fa-solid fa-retweet" style="color:#4056A1"></i>
                  <i class="fa-solid fa-heart" style="color:#4056A1"></i>
                </span>
              </footer>
            </article>`;
  };

  //calculate how many days ago tweet was written
  // const tweetTimestamp = (tweet) => {
  //   const current = Date.now();
  //   const tweetTime = tweet.created_at;
  //   const timeDiff = $.timeago(current - tweetTime);
  //   console.log(timeDiff);
  //   return timeDiff;
  // };

  // fn to append each individual tweet from array of tweet data to the tweet-container
  const renderTweets = function(tweets) {
    // dynamically empty tweet-container of contents
    $('#tweet-container').empty();
    tweets.forEach((tweet) => {
      //use prepend to add to the top/beginning of the tweet section
      $('#tweet-container').prepend(createTweetElement(tweet));
    });
  };

  //async fetch request to /tweets
  async function loadTweets() {
    const response = await fetch('http://localhost:8080/tweets');
    const data = await response.json();
    renderTweets(data);
  }

  loadTweets();

  // slide textarea into view and focus it when nav bar button clicked
  $('#write-tweet span').on('click', function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });

  //ajax POST request to submit-tweet form and prevent default behaviour
  $('.new-tweet form').submit(function (e) {
    e.preventDefault();
    const errorMsg = $(this).siblings('h3');
    const textarea = $(this).children('textarea');
    const input = textarea.val().trim();

    //use textarea input to verify conditionals
    if (!input.length) {
      error = 'Cannot submit an empty tweet!';
      errorMsg.show();
      $("#error-msg").text(error);
      errorMsg.slideDown(600);
    } else if (input.length > 140) {
      error = 'Your tweet is too long!';
      errorMsg.show();
      $("#error-msg").text(error);
      errorMsg.slideDown(600);
    } else {
      errorMsg.slideUp(600);
      $.ajax({
          url: $(this).attr('action'),
          type: "POST",
          data: $(this).serialize(),
          success: function () {
          //empty textarea
            $('#tweet-text').val('');
          //reset counter to 140
            $('.counter').text('140');
            loadTweets();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log('error: ', error);
          },
      });
    };
  });
});


$('.new-tweet p').append('<b>Error:</b> All tweets must contain at least one character. Your tweet currently does not.');
      setTimeout(() => {
        $('.new-tweet p').slideDown();
      }, 600);
