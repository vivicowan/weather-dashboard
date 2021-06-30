var apiKey = "78a975a991c3d2cafd3350be28944d97";
var searched = document.getElementById("searched");
var searchInput = document.getElementById("search-input");


function fetchWeather(city) {
	var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

	fetch(currentUrl)
	.then(function (response) {
		if(response.status != 200){
			throw (response.statusText);
		}
		return response.json();
	})
	.then(function (current) {
		console.log(current);

		var lat = current.coord.lat;
			console.log(lat);
		var lon = current.coord.lon;
			console.log(lon);

		var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
	
		fetch(forecastUrl)
			.then(function (response) {
	   	return response.json();
		})
			.then(function (forecast) {
	   	console.log(forecast);

			var tempFdegrees = (forecast.current.temp - 273.15) * 1.8 + 32;

			$("#current-temp").text(tempFdegrees.toFixed(2) + "°F");
			$("#current-wind").text(forecast.current.wind_speed + " mph");
			$("#current-humidity").text(forecast.current.humidity + " %");
			$("#current-uvi").text(forecast.current.uvi);
			
			var currentIconUrl =
			"http://openweathermap.org/img/wn/" + forecast.current.weather[0].icon + "@2x.png";
	 
			var currentIconImg = $("<img>").attr({
				src: currentIconUrl,
				alt: forecast.current.weather[0].icon,
			});
			
			$("#current-weather-icon").empty().append(currentIconImg);
	
			var currentDay = moment.unix(forecast.current.dt).format("M/DD/YYYY");

			$("#city-name").text(current.name + " (" + currentDay + ")");



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

			$("#weather-info").show();
	   })
   })
	.catch(function (error) {
      return false;
    });

	return true;
}

$("#search-form").on("submit", function (event) {
	event.preventDefault();

	var city = $("#search-input").val().trim();

	if (city && fetchWeather(city)) {
		searched.innerHTML += "<div class=\"list-group btn btn-primary m-2\" onclick=\"fetchWeather('"+ city +"');\" >" + city + "</div>";
	} else {
		alert('Please Enter a VALID City');
	}
	searchInput.value = '';
});

 
	




