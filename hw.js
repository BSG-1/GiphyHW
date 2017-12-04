$(document).ready(function(){

    //Array of the variable 'topics' that has list of cars
	var topics = ["BMW M3", "Mercedes-Benz AMG", "Subaru WRX STI", "Ferrari 458 Speciale", 
				  "McClaren P1", "Porsche 918 Spyder", "BMW e60 M5", "Nissan Skyline R34"];

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
	        	
	        	//only taking action if the photo has an appropriate rating (everything)
	        	if (results[i].rating){

	        		//create a div with the class "item"
	        		var gifDiv = $("<div class='item'>");

	        		//storing the result item's rating
	        		var rating = results[i].rating;

	        		//make paragraph tag with result item's rating
	        		var p = $("<p>").text("Rating: " + rating);

	        		//Create image tag
	        		var carImage = $("<img>");

	        		//Giving the img tag a src attr of a property pulled off the result item
	        		carImage.attr("src", results[i].images.fixed_height.url);

	        		//Append paragraph and carIamge created to "gifDiv"
	        		$("#cars").prepend(p);
	        		$("#cars").prepend(carImage);



	        	}
	        }
	    })		

	})

})





//q = search query, term, or phrase
//limit = number of results to return 
//rating = limit results of those rated (g, pg, pg-13, or r)
