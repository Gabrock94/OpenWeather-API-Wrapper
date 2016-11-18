/*
OpenWeather API Javascript Wrapper (http://openweathermap.org)
created by Chester Carmer 11/18/2016
*/
var OpenWeather = (function(){
	var self = {};
	
	if (!$)
		throw "JQuery is required for OpenWeather API";

	var 	appId = '', 		// API key consumed by API for validation
		zip = '',		// Get weather for this zip code
		ready = false,		// Validatea that the API has returned data
		rawResponse = {},	// Contains raw response from API
		iconEl = '';		// ID for element containing weather icon
	
	self.zip = function(newZip){
		// Sets new zip code if provided and fetch new data, 
		// 		otherwise returns current zip code
		if (typeof newZip === 'undefined'){
			return zip;
		} else if (typeof newZip == 'string' && newZip.length == 5) {
			zip = newZip;
			retrieveWeather();
			return zip;	
		} else {
			throw 'Invalid Zip: Must be a 5-character string';
			return false;type	
		}
	};
	
	self.appId = function(newAppId){
		// Sets new AppId if provided and fetch new data, 
		// otherwise returns current AppId
		if (typeof newAppId === 'undefined'){
			return appId;
		} else {
			appId = newAppId;
			retrieveWeather();
			return appId;	
		}
	};
	
	self.iconEl = function(newIconEl){
		// Sets new id for element containing the weather icon if provided and render ico, 
		// otherwise returns current id for element containing the weather icon
		if (typeof newIconEl === 'undefined'){
			return iconEl;
		} else {
			iconEl = newIconEl;
			setImageIcon();
			return iconEl;	
		}
	}
	
	
	self.weather = function(){
		// Unpacks raw response data and formats relevant data
		var wthr = {};
		
		wthr.cloudiness = function(){
			// percent cloudiness
			return rawResponse.clouds.all.toString() + '%';
		};
		wthr.humidity = function(){
			// percent humidity
			return rawResponse.main.humidity.toString() + '%';
		};
		wthr.currentTemp = function(){
			// current temperature in degrees F
			return kelvinToF(rawResponse.main.temp).toString() + ' °F';
		};
		wthr.shortDesc = function(){
			// short description of current weather
			return rawResponse.weather[0].main.toString();
		};
		wthr.longDesc = function(){
			// long description of current weather
			return rawResponse.weather[0].description.toString();
		};
		wthr.windDir = function(){
			// cardinal direction of wind
			return degToCardDir(rawResponse.wind.deg);	
		}
		wthr.windSpeed = function(){
			// windspeed in MPH
			return mpsToMph(rawResponse.wind.speed);	
		}
		wthr.wind = function(){
			// wind speed and direction packaged into single string
			return wthr.windSpeed() + 'mph ' + wthr.windDir();	
		}
		wthr.icon = function(){
			// icon type for current weather
			return rawResponse.weather[0].icon;	
		}
	
		return wthr;
	};
	
	var setImageIcon = function(){
		// attaches the weather icon to the element provided
		$('#' + iconEl).attr('src','http://openweathermap.org/img/w/' + self.weather().icon() + '.png')
	}
	
	var apiUrl = function(){	
		// assembled API call URL
		return 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=' + appId;
	};
	
	
	var retrieveWeather = function(){
		// call to API
		$.ajax({
			type: 'GET',
			url: apiUrl(), 
			dataType: 'jsonp',
			success: function(result){
			
				// set raw response data
				rawResponse = result;
				// set icon image
				setImageIcon();
				
				return true;
			}
		});
	};
	
	self.init = function(initData){
		// set intializing data
		if(typeof initData.zip == 'undefined' || typeof initData.appId == 'undefined') {
			throw 'must provide zip and app id';
			return self;
		} else {
			if (typeof initData.icon === 'undefined')
				initData.icon = '';
				
			zip = initData.zip;
			appId = initData.appId;
			iconEl = initData.icon;
			return self;
		}
	};
	
	self.fetch = function(){
		// fetches weather
		return retrieveWeather();
	}
	
	
	// Utilities
	
	function kelvinToF(K){
		return (K*9/5 - 459.67).toFixed(1);
	}
	
	function mpsToMph(mps){
		return (2.236936*mps).toFixed(1).toString();
	}
	
	function degToCardDir(deg){
		var dir = '';
		switch(true) {
			case (deg <= 11.25 && deg > 348.75 ):
				dir = 'N';
				break;
			case (deg <= 33.75 && deg > 11.25 ):
				dir = 'NNE';
				break;
			case (deg <= 56.25 && deg > 33.75 ):
				dir = 'NE';
				break;	
			case (deg <= 78.75 && deg > 56.25 ):
				dir = 'ENE';
				break;
			case (deg <= 101.25 && deg > 78.75 ):
				dir = 'E';
				break;
			case (deg <= 123.75 && deg > 101.25 ):
				dir = 'ESE';
				break;
			case (deg <= 146.25 && deg > 123.75 ):
				dir = 'SE';
				break;
			case (deg <= 168.75 && deg > 146.25 ):
				dir = 'SSE';
				break;
			case (deg <= 191.25 && deg > 168.75 ):
				dir = 'S';
				break;
			case (deg <= 213.75 && deg > 191.25 ):
				dir = 'SSW';
				break;
			case (deg <= 236.25 && deg > 213.75 ):
				dir = 'SW';
				break;
			case (deg <= 258.75 && deg > 236.25 ):
				dir = 'WSW';
				break;
			case (deg <= 281.25 && deg > 258.75 ):
				dir = 'W';
				break;
			case (deg <= 303.75 && deg > 281.25 ):
				dir = 'WNW';
				break;
			case (deg <= 326.25 && deg > 303.75 ):
				dir = 'NW';
				break;
			case (deg <= 348.75 && deg > 326.25 ):
				dir = 'NNW';
				break;
			default:
				break;
		}
		return dir;
	}
	
	return self;
}());
