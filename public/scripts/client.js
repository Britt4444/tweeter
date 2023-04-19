/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-env jquery */
/* eslint-env browser */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(() => {

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
                <time>${tweetTimestamp(tweet)}</time>
                <span class="fa-solid fa-flag" style="color:#4056A1">
                  <i class="fa-solid fa-retweet" style="color:#4056A1"></i>
                  <i class="fa-solid fa-heart" style="color:#4056A1"></i>
                </span>
              </footer>
            </article>`;
  };

  // calculate how many days ago tweet was written
  const tweetTimestamp = (tweet) => {
    const current = Date.now();
    const tweetTime = tweet.created_at;
    const timeDiff = current - tweetTime;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  // fn to append each individual tweet from array of tweet data to the tweet-container
  const renderTweets = function(tweets) {
    // dynamically empty tweet-container of contents
    $('#tweet-container').empty();
    tweets.forEach((tweet) => {
      $('#tweet-container').append(createTweetElement(tweet));
    });
  };

  renderTweets(tweetData);

});
