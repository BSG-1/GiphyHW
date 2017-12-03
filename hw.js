$(document).ready(function(){

    //Array of the variable 'topics' that has list of cars
	var topics = ["BMW e30 ", "BMW e36 ", "BMW e46 ", "BMW e92 ", "BMW f80 "];

	//Pull the strings from the variable 'topics' and display them as buttons on the page
	for (var i = 0; i < topics.length; i++) {
		var cars = $('<button>');
		$('<button>').attr('id', topics[i])
		cars.text(topics[i]);
		$("#topicButtons").append(cars);
	}

	//When you click one of the buttons, it appends 
	$("button").click(function(){		
		//variable queryURL to search Giphy for bmw m3's (example being used currently)
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=bmw+m3&api_key=dc6zaTOxFJmzC"
	
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
	        	if (results[i].rating !== "r" && results[i].rating !== "pg-13"){

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
	        		$("#cars").append(p);
	        		$("#cars").append(carImage);




	        	}
	        }
	    })		

	})

})





//q = search query, term, or phrase
//limit = number of results to return 
//rating = limit results of those rated (g, pg, pg-13, or r)
