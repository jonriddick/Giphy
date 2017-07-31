//build array of footballers
var ballers = ["Matt Ryan", "Julio Jones", "Aaron Rodgers", "Von Miller", "Vic Beasley", "Russell Wilson", "Devonta Freeman", "Deion Sanders"];

//function to create buttons

function renderButtons (){
     $("#buttons").empty();

     for (var i = 0; i < ballers.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("baller");
          a.addClass("btn");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", ballers[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(ballers[i]);
          // Adding the button to the HTML
          $("#buttons").append(a);
        }
}

// This function adds players to the array & creates buttons for them
      $("#addBaller").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var hmm = $("#ballerInput").val().trim();
        // The movie from the textbox is then added to our array
        ballers.push(hmm);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();

//
//This code gets giphys for the players
//

$(document).on("click", ".baller", function() {
      $("#giphy").empty();
      // In this case, the "this" keyword refers to the button that was clicked
      var player = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        player + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          //var gifDiv = $("<div class='item'>");
          
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");
              
              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var playerImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              playerImage.attr("src", results[i].images.downsized_still.url);
              playerImage.attr("data-still", results[i].images.downsized_still.url)
              playerImage.attr("data-animate", results[i].images.downsized.url)
              playerImage.attr("data-state", "still")
              playerImage.addClass("pause");

              // Appending the paragraph and playerImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(playerImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#giphy").prepend(gifDiv);
            }
          }
        });
    });


//Pause Giphys
$(document).on("click", ".pause", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });