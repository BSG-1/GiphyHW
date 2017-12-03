$(document).ready(function(){


	//variable queryURL to search Giphy for bmw m3's (example being used currently)
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=cars&api_key=dc6zaTOxFJmzC"
	
	//ajax call
	$.ajax({
        url: queryURL,
        method: "GET"
    })
    // After the data comes back from the API
    .done(function(response){
        console.log(response);
    })
    //Array of  variable
	var topics = ["BMW e30", "BMW e36", "BMW e46", "BMW e92", "BMW f80"];

	//Pull the strings from the variable topics and display them as buttons on the page
	for (var i = 0; i < topics.length; i++) {
		$("#topicButtons").append('<button/>').data(topics[i])
	}

})





//q = search query, term, or phrase
//limit = number of results to return 
//rating = limit results of those rated (g, pg, pg-13, or r)
