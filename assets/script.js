// Setting a variable for API key and declaring other variables.
var apiKey = "78a975a991c3d2cafd3350be28944d97";
var searched = document.getElementById("searched");
var searchInput = document.getElementById("search-input");


// Huge function that fetches data and displays it.
function fetchWeather(city) {
	// Setting required parameters into a concattinated variable.
	var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

	fetch(currentUrl)
	.then(function (response) {
		if(response.status != 200){
			throw (response.statusText);
		}
		return response.json();
	})
	.then(function (current) {
		console.log(current);  // Fetching the current weather api to target a city's name, latitude, and longitude.

		var lat = current.coord.lat;
			console.log(lat);
		var lon = current.coord.lon;
			console.log(lon);

		// Setting required parameters into a concattinated variable.
		var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
	
		fetch(forecastUrl)
			.then(function (response) {
	   	return response.json();
		})
			.then(function (forecast) {
	   	console.log(forecast); // Fetching the one call api to gather information needed for displaying weather.

			// Creating a variable that converts Kelvin into Farenheit.
			var tempFdegrees = (forecast.current.temp - 273.15) * 1.8 + 32;
			
			// Using jQuery to add text into HTML id's.
			$("#current-temp").text(tempFdegrees.toFixed(2) + "°F");
			$("#current-wind").text(forecast.current.wind_speed + " mph");
			$("#current-humidity").text(forecast.current.humidity + " %");
			$("#current-uvi").text(forecast.current.uvi);
			
			$("#current-uvi").is(function(){
				var uvi = forecast.current.uvi;
				if (uvi >= 6) {
					$('#current-uvi').removeClass('badge bg-success').removeClass('badge bg-warning text-dark').addClass('badge bg-danger');;
				 } else if (uvi >= 3) {
					$('#current-uvi').removeClass('badge bg-danger').removeClass('badge bg-success').addClass('badge bg-warning text-dark');
				 } else {
					$('#current-uvi').removeClass('badge bg-danger').removeClass('badge bg-warning text-dark').addClass('badge bg-success');
				}
			});
		   
			var currentIconUrl =
			"https://openweathermap.org/img/wn/" + forecast.current.weather[0].icon + "@2x.png";
			
			var currentIconImg = $("<img>").attr({
				src: currentIconUrl,
				alt: forecast.current.weather[0].icon,
			});
			
			$("#current-weather-icon").empty().append(currentIconImg);
			
			// Changing the unix time to a more readable format.
			var currentDay = moment.unix(forecast.current.dt).format("M/DD/YYYY");
			
			$("#city-name").text(current.name + " (" + currentDay + ")");
			
			// Creating a loop that runs through each empty card body and fills it with the correct correct forecast for the next five days.
			for (var i = 0; i < 5; i++) {
				var tempF = (forecast.daily[i].temp.day - 273.15) * 1.8 + 32;
				
				$("#card-body" + i).find("#temp").text("Temp: " + tempF.toFixed(2) + "°F");
				$("#card-body" + i).find("#wind").text("Wind: " + forecast.daily[i].wind_speed + " mph");
				$("#card-body" + i).find("#humidity").text("Humidity: " + forecast.daily[i].humidity + " %");
				
				var iconUrl =
				"http://openweathermap.org/img/wn/" + forecast.daily[i].weather[0].icon + "@2x.png";
	 
				var iconImg = $("<img>").attr({
					src: iconUrl,
					alt: forecast.daily[i].weather[0].icon,
				});
			
				$("#card-body" + i).find("#weather-icon").empty().append(iconImg);

				var unixFormat = moment.unix(forecast.daily[i].dt).format("M/DD/YYYY");

				$("#card-body" + i).find("#city-date").text(unixFormat);

			}
			// displays cards once city is typed in and searched for by user.
			$("#weather-info").show();
	   })
   })
	.catch(function (error) {
		return false;
   });
	
	return true;
}

// Using jQuery to make a submit event and display weather cards 
$("#search-form").on("submit", function (event) {
	event.preventDefault();

	// targets the city user put into the search form.
	var city = $("#search-input").val().trim();

	// Creating a conditional that checks if city is valid.
	if (city) {
		fetchWeather(city);
		
		// Adding a div class into HTML, making a button of user searched city by user. 
		// If user presses button, city is targeted and weather will be displayed once again. 
		searched.innerHTML += "<div class=\"list-group btn btn-primary m-2\" onclick=\"fetchWeather('"+ city +"');\" >" + city + "</div>"; 
	} else {
		alert('Please Enter a VALID City');
	}
	// clearing input box.
	searchInput.value = '';
});

 
	




