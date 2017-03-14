//WARNING: still a JS n00b so lots of this code I'm sure could be done better and will update when I improve. Also focused on the JS first instead of making the site responsive.

//There's lots of code repetition which goes against 'DRY' will work on improving that.

$(document).ready(function() {

  var tweetText =""; //empty variable to store the text for the tweet button later

  $.ajaxSetup({ cache: false }); //stops the browser from caching the json file, making refreshing the quote possible.

  //on document load issue a random quote
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(json) {
      $(".quote-box").append(json[0].content)
      $(".quote-box").append("- " + json[0].title)

     tweetText = '"' + $('p').text() + '"' + " - " + json[0].title; //detail the text for the tweet and make it the same as current quote + title

     twttr.ready(function() {

      twttr.widgets.createShareButton(
      '/',
      document.getElementById("twitter-button"),
      {
      text: tweetText,
      size: 'large'
      }
      );

      });

    });

  //on click add a new quote and new title.

  $("#new-quote").on("click", function() {

    $(".quote-box").empty(); //remove existing quote to make space for new one.

    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(json) {
      $(".quote-box").append(json[0].content)//adds quote content
      $(".quote-box").append("- " + json[0].title)//adds quote title



     tweetText = '"' + $('p').text() + '"' + " - " + json[0].title;

     twttr.ready(function() {

      $("#twitter-button").empty(); //remove the existing tweet button and add a new one with the new text and title of the quote.

      twttr.widgets.createShareButton(
      '/',
      document.getElementById("twitter-button"),
      {
      text: tweetText,
      size: 'large'
      }
      );

      });

    });


  });//closses click function

});//closses ready function
