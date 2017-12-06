//jQuery ready to go
$(document).ready(function(){

    //Array of the variable 'topics' that has list of cars
	var topics = ["BMW e30", "Mercedes-Benz AMG", "Subaru WRX STI", "Ferrari F40", 
				  "McClaren P1", "Porsche 918 Spyder", "BMW M5", "Nissan Skyline R34",
				  "Lamborghini Aventador", "Pagani Zonda R", "Ford GT", "Datsun 240Z"];

	//Pull the strings from the variable 'topics' and display them as buttons on the page
	//when it loads
	function renderCars(){
		$("#topicButtons").empty();
		for (var i = 0; i < topics.length; i++) {
			var cars = $('<button>' + topics[i] + '</button>');
			cars.addClass('ffs')
			cars.text(topics[i]).attr("data-car", topics[i]);
			$("#topicButtons").append(cars);
		}	
	}
	//display initial list of cars
	renderCars();

	//Submit/add a new car from the form to the topics array
	$("#addCar").on("click", function(event){
		event.preventDefault();
		var txt = $("#carInput").val();
		topics.push(txt);
		console.log(txt);
		renderCars();
	})

	//When you click one of the buttons, it appends and calls on Giphy API
	$(document).on("click", '.ffs', function(){		

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
	        		var carImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr(
	        			"data-still", results[i].images.fixed_height_still.url).attr(
	        			"data-animate", results[i].images.fixed_height.url).attr(
	        			"data-state", "still").attr(
	        			"class", "gif");

	        		//Append paragraph and carIamge created to "gifDiv"
	        		$("#cars").prepend(p);
	        		$("#cars").prepend(carImage);
	        	}
	        }

	        //On every click of the "gif" class, it will change its 'data-state' from still to
	        // animate & vice-versa
	        $(".gif").on("click", function(){
	        	var state = $(this).attr("data-state");
	        			
		        if (state === "still"){
		        	$(this).attr("src", $(this).attr("data-animate"));
		        	$(this).attr("data-state", "animate");
		       	} else {
		      		$(this).attr("src", $(this).attr("data-still"));
		       		$(this).attr("data-state", "still");
		       	}	
	        })
	    })		
	})
})





//q = search query, term, or phrase
//limit = number of results to return 
//rating = limit results of those rated (g, pg, pg-13, or r)


//results[i].images.fixed_height_still.url gets the still image of the gif
//results[i].images.fixed_height.url gets the animated gif version
