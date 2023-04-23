/* eslint-env jquery */
/* eslint-env browser */
/* elsint-env timeago */


$(document).ready(() => {

  // $("time.timeago").timeago(); //this is not a function?

  // tweet element html content
  const createTweetElement = (tweet) => {
    return `<article>
              <header>
                <img src=${tweet.user.avatars} alt="my avatar">
                <h3>${tweet.user.name}</h3>
                <address>${tweet.user.handle}</address>
              </header>
              <p>${tweet.content.text}</p>
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

  //ajax POST request to submit-tweet form and prevent default behaviour
  $('.new-tweet form').submit(function (e) {
    e.preventDefault();
    let formData = $(this).serialize();
    //use textarea input to verify conditionals
    const textarea = $.trim($('#tweet-text').val());
    if (!textarea.length) {
      alert ("No tweet submitted!");
    } else if (textarea.length > 140) {
      alert("Your tweet is too long!");
    } else {
      $.ajax({
        url: $(this).attr('action'),
        type: "POST",
        data: formData,
        success: function () {
          //empty textarea
          $('#tweet-text').val('');
          //reset counter to 140
          $('.counter').text('140');
          loadTweets();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('error: ', errorThrown);
        },
      });
    }
  });
});
