# OpenWeather-API-Wrapper
Javascript wrapper for the OpenWeather API (http://openweathermap.org)

Get an OpenWeather API key <a href="http://openweathermap.org/appid">here</a>.

<h3>Initialization</h3>
Intialize the OpenWeather API Wrapper with your zip code, API Key and the ID of the img element to which you wish to render the <a href='https://openweathermap.org/weather-conditions'>OpenWeather icon</a>. Chain with the fetch() method to make a call to the OpenWeather API. 

	OpenWeather.init({
		zip: '90210',                              // zip, required
		appId: '5435495k4h5g4jhglk3nlk345534bkk3', // API Key, required
		icon: 'weather-icon',                      // icon ID, optional
		info: 'weather-info'                       // info ID, optional
	}).fetch();
	
If the the 'icon' or 'info' properties are provided, the OpenWeather icon and current weather info will be appended to their respective elements.
<h3>Usage</h3>
Access formatted weather data using subsequent methods on the OpenWeather.weather() method:
	
	OpenWeather.weather() ...
	
		.cloudiness()   // percent cloudiness
		.humidity()     // percent humidity
		.currentTemp()  // current temperature in degrees F
		.shortDesc()    // short description of current weather
		.longDesc()     // long description of current weather
		.windDir()      // cardinal direction of wind
		.windSpeed()    // windspeed in MPH
		.wind()         // wind speed and direction packaged into single string
		
