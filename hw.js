$(document).ready(function(){

    //Array of the variable 'topics' that has list of cars
	var topics = ["bmw e30", "Mercedes-Benz AMG", "Subaru WRX STI", "Ferrari F40", 
				  "McClaren P1", "Porsche 918 Spyder", "BMW e60 M5", "Nissan Skyline R34",
				  "Lamborghini Aventador SV", "Pagani Zonda R", "Ford GT", "Datsun 240Z"];

	//Pull the strings from the variable 'topics' and display them as buttons on the page
	for (var i = 0; i < topics.length; i++) {
		var cars = $('<button>');
		cars.text(topics[i]).attr("data-car", topics[i]);
		$("#topicButtons").append(cars);
	}

	//When you click one of the buttons, it appends and calls on Giphy API
	$("button").click(function(){		

		var Car = $(this).attr("data-car");

		//variable queryURL to search Giphy for BMW (example being used currently)
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Car + "&api_key=dc6zaTOxFJmzC&limit=10"
	 
		//ajax call
		$.ajax({
	        url: queryURL,
	        method: "GET"
	    })

	    // After the data comes back from the API
	    .done(function(response){
	        console.log(response);

	        //storing an array of results in the results variable
	        var results = response.data

	        //looping over every result item
	        for (var i = 0; i < results.length; i++) {
	        	
	        	//Display results based upon ratings (displaying all ratings)
	        	if (results[i].rating){

	        		//storing the result item's rating
	        		var rating = results[i].rating;

	        		//make paragraph tag with result item's rating
	        		var p = $("<p>").text("Rating: " + rating);

	        		//Create image tag and apply it to every still result
	        		var carImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-state", "still").attr("class", "gif");

	        		//Create image tag and apply it to every still result
	        		var animateImate = $("<img>").attr("src", results[i].images.fixed_height.url).attr("data-state", "animate").attr("class", "gif");

	        		//Append paragraph and carIamge created to "gifDiv"
	        		$("#cars").prepend(p);
	        		$("#cars").prepend(carImage);

	        		$(".gif").on("click", function(){
	        			var state = $(this).attr("data-state");

	        			
	        			for (var i = 0; i < results.length; i++) {
		        			if (state === "still"){
		        				$(this).attr("src", $(this).attr("data-animate"));
		        				$(this).attr("data-state", "animate");
		        			} else {
		        				$(this).attr("src", $(this).attr("data-still"));
		        				$(this).attr("data-state", "still");
		        			}	
	        			}
	        		})

	        	}
	        }
	    })		

	})

})





//q = search query, term, or phrase
//limit = number of results to return 
//rating = limit results of those rated (g, pg, pg-13, or r)


//results[i].images.fixed_height_still.url gets the still image of the gif
//results[i].images.fixed_height.url gets the animated gif version
