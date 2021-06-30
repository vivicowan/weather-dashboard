var apiKey = "78a975a991c3d2cafd3350be28944d97";

// function forecastWeather(city) {
	// var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
	var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=" + apiKey;

	fetch(currentUrl)
	.then(function (response) {
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

			for (var i = 0; i < 5; i++) {
				var tempF = (forecast.daily[i].temp.day - 273.15) * 1.8 + 32;

				$("#card-body" + i).find("#temp").text("Temp: " + tempF.toFixed(2) + "°F");
				$("#card-body" + i).find("#wind").text("Wind: " + forecast.daily[i].wind_speed + " mph");
				$("#card-body" + i).find("#humidity").text("Humidity:" + forecast.daily[i].humidity + " %");

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

			
			



	   })
  })
// }


