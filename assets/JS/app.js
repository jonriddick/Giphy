 //build array of footballers
var ballers = ["Matt Ryan", "Julio Jones"]

//function to create buttons

function renderButtons (){
	$("#buttons").empty();

	for (var i = 0; i < ballers.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("movie");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", movies[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(movies[i]);
          // Adding the button to the HTML
          $("#buttons").append(a);
        }
}

//build button that adds to ballers array

var newBaller = 
ballers.push()