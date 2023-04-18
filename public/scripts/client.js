/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-env jquery */
/* eslint-env browser */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const $tweet = $("<article>").addClass("tweet-container");
    const content =
    `<header>
      <img src=${tweet.user.avatars} alt="my avatar">
      <h3>${tweet.name}</h3>
      <address>${tweet.user.handle}</address>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <time>${tweetTimestamp(tweet)}</time>
      <span class="fa-solid fa-flag" style="color:#4056A1">
        <i class="fa-solid fa-retweet" style="color:#4056A1"></i>
        <i class="fa-solid fa-heart" style="color:#4056A1"></i>
      </span>
    </footer>`;
    $tweet.append(content);
    return $tweet;
  };

  const tweetTimestamp = (tweet) => {
    const current = Date.now();
    const tweetTime = tweet.created_at;
    const timeDiff = current - tweetTime;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like

  $('#tweet-container').append($tweet);

});