$(document).ready(function() {

  $(function() {
    $("form").submit(function() { return false; });
  });

  $(".search-field").keyup(function(event) {
    event.preventDefault()

    if(event.keyCode == 13 ) {

      $(".submit-search").click();
    }

  });


  $(".submit-search").click(function() {

    $(".results-container").empty();


    //creat the function to call api
    var apiCall = function() {

      //store value of input field to send to api later
      var inputValue = $(".search-field").val();

      //store and concantate the string to call api.
      var apiString = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + inputValue + "&limit=5&namespace=0&format=json";

      console.log(apiString);

      //get json with apiString;

      $.ajax({
  url: apiString,
  dataType: 'jsonp',
        success: function(x) {

          console.log(x[1][3]);

          var count = 0;


          for (i=0; i < 5; i++ ) {

            if( x[1][i] !== undefined) {
              $(".results-container").append(
            "<div class='result'><h2>" + x[1][i] + "</h2> <p>" + x[2][i] + "</p> <a class='std-button'href=" + x[3][i] + ">Read More</a></div>")
            } else {
              count += 1;
              console.log("No more results found");

            }

          }//closses for loop

          if(count == 5){
            $(".results-container").append(
            "<div class='result'><h2> No Results Found</h2></div>")
          }

        }//closses api success function

      });

    }//closses api call function




    //focus input field if search submitted when empty
    if ( $(".search-field").val() === "") {
      $(".search-field").focus();
    }

    else {
      apiCall();
    }

  });//closses click function

  
});
