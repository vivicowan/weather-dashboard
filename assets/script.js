var apiKey = "78a975a991c3d2cafd3350be28944d97";

function forecastWeather(city) {
	var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

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




	   })
  })
}
