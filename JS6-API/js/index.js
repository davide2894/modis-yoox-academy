const API_KEY = "62e92316587bc572373ff0fd626fd2d8";
const body = document.querySelector('body');
const wrapper = document.getElementById('wrapper');	
const conditionTag = document.querySelector('.city-conditions');
let jsonRes = null;
let btn = document.getElementById('submitBtn');
let input = document.getElementById('cityInput');


// GET weather data
const weatherRes = async (userInput) => {
	
    let city = userInput;
    	
	let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

	handleErrors(response);
	
	jsonRes = await response.json();
	    
	console.log(jsonRes);
	
    let cityName = jsonRes.name;
    let weather = jsonRes.weather[0];
    let main = jsonRes.main;
    let wind = jsonRes.wind;

    let conditions = {
        sky: weather.description,
        humidity: main.humidity,   
        pressure: main.pressure,
        temp: main.temp,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
        windDeg: wind.deg,
        windSpeed: wind.speed
    }   

	/*
    let h2 = document.createElement('h2');
	let p = document.createElement('p');

	h2.innerHTML = cityName;
	p.setAttribute('class', 'weatherDetails');
	
	p.innerHTML = `		
		<span class='weatherDetails__span'>Sky:</span> ${conditions.sky}<br>
		<span class='weatherDetails__span'>Humidity:</span> ${conditions.humidity}<br>
		<span class='weatherDetails__span'>Pressure:</span> ${conditions.pressure}<br>
		<span class='weatherDetails__span'>Temperature:</span> ${conditions.temp}<br>
		<span class='weatherDetails__span'>Max temperature:</span> ${conditions.tempMax}<br>
		<span class='weatherDetails__span'>Min temperature:</span> ${conditions.tempMin}<br>
		<span class='weatherDetails__span'>Wind degree:</span> ${conditions.windDeg}<br>
		<span class='weatherDetails__span'>Min speed:</span> ${conditions.windSpeed}<br>
	`
    conditionTag.appendChild(h2);
    conditionTag.appendChild(p);
	*/
	
	let content = `
		<p class="weatherDetails">
			<span class='weatherDetails__span'>Sky:</span> ${conditions.sky}<br>
			<span class='weatherDetails__span'>Humidity:</span> ${conditions.humidity}<br>
			<span class='weatherDetails__span'>Pressure:</span> ${conditions.pressure}<br>
			<span class='weatherDetails__span'>Temperature:</span> ${conditions.temp}<br>
			<span class='weatherDetails__span'>Max temperature:</span> ${conditions.tempMax}<br>
			<span class='weatherDetails__span'>Min temperature:</span> ${conditions.tempMin}<br>
			<span class='weatherDetails__span'>Wind degree:</span> ${conditions.windDeg}<br>
			<span class='weatherDetails__span'>Min speed:</span> ${conditions.windSpeed}<br>
		</p>
	`;
	
	conditionTag.innerHTML = content;
	
	let weatherIdGroup = jsonRes.weather[0].id.toString().charAt(0);
	
	// choose and set background img
	chooseBackground(weatherIdGroup);
	
}

input.addEventListener('keypress', function(e){
    if(e.which == 13 || e.keyCode == 13){
		let city = input.value;
		weatherRes(city);
		input.style = "position: unset; margin-top: 1em; text-align: center";
		
	}
});

let handleErrors = (resp) => {	
    try {
		// See https://gist.github.com/subfuzion/669dfae1d1a27de83e69
		if(resp.status === 400) throw  'Invalid request';
		if(resp.status === 401) throw  'Invalid API_KEY';
		if(resp.status === 403) throw  'Request refused';
		if(resp.status === 410) throw  'An API endopoint went off';
		if(resp.status === 429) throw  'Too many requests. Exceeded limit';
		if(resp.status === 500) throw  'INTERNAL SERVER ERROR';
		if(resp.status === 502) throw  'BAD GATEWAY: The service is down or being upgraded. Try again later.';
		if(resp.status === 503) throw  'SERVICE UNAVAILABLE: The service is up, but overloaded with requests. Try again later.';
		if(resp.status === 504) throw  'GATEWAY TIMEOUT';
	}
	catch(error){
		console.log(error);
	}
}

/*
const colorize = arr => {
	let colorArr = arr,
		randomIdx= Math.floor(Math.random() * Math.floor(colorArr.length));
	body.style.backgroundColor = colorArr[randomIdx];
	console.log(colorArr[randomIdx]);
};

colorize(["5E005E", "AB2F52", "E55D4A", "E88554", "FFAF53"]);
*/

let chooseBackground = (groupID) => {
	console.log(groupID);
	if(groupID === "2"){ setBackground('thunderstorm'); } 
	else if(groupID === "3"){ setBackground('drizzle'); }
	else if(groupID === "5"){ setBackground('rain'); }
	else if(groupID === "6"){ setBackground('snow'); }
	else if(groupID === "7"){ setBackground('fog'); }
	else if(groupID === "8"){ setBackground('clearsky'); }
}

let setBackground = (imgName) => {
	body.style.backgroundImage = `url(images/${imgName}.jpg)`;
	if(imgName === 'clearsky'){
		body.style.backgroundSize = 'cover';
	}
	
	if((imgName === 'drizzle') || (imgName === 'rain')){
		body.style.color = "#f5f5f5";
	}

}
