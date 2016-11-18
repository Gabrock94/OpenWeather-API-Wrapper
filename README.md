# OpenWeather-API-Wrapper
Javascript wrapper for the OpenWeather API (http://openweathermap.org)

Get an OpenWeather API key <a href="http://openweathermap.org/appid">here</a>.

<h3>Usage</h3>
Intialize the OpenWeather API Wrapper with your zip code, API Key and the ID of the img element to which you wish to render the <a href='https://openweathermap.org/weather-conditions'>OpenWeather icon</a>. Chain with the fetch() method to make a call to the OpenWeather API. 

	OpenWeather.init({
		zip: '90210',
		appId: '5435495k4h5g4jhglk3nlk345534bkk3', // API Key
		icon: 'weather-icon'
	}).fetch();
