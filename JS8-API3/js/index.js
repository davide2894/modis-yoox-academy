const API_KEY_UNSPLASH = "b05a82af60d6e6a680acb01cceaeaace92ef08415be82950852bf312cb58fd20";
const chuckDiv = document.getElementById('chuckNorris');
const picsDiv = document.getElementById('unsplash');
const musicDiv = document.getElementById('musicGenres');
const musicGenresForm = document.getElementById('music');
const musicGenresSelect = document.getElementById('genres');
const resultsDiv = document.createElement('div');
resultsDiv.setAttribute('class', 'musicResults');

musicGenresForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
		
	musicDiv.appendChild(resultsDiv);	
	
	const options = musicGenresSelect.options;
	
	let selectedCount = 0;
		
	let content = 'Results: Genres: ';
	
	for(option of options){
		if(option.selected){
			content += `${option.textContent} /// `;
			selectedCount++;
		}
	}
	
	content += `Number of selected elements: ${selectedCount}`;
		
	resultsDiv.innerHTML = content;
	
})




const openTab = (evt, tabName) => {
	let i, 
		tabs,
		tabsLength,
		tablinks;
	
	tabs = document.getElementsByClassName("tabContent");
	
	tabsLength = tabs.length;
	
	for (i = 0; i < tabsLength; i++) {
		tabs[i].style.display = "none";
	}
	
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tabsLength; i++) {
		tablinks[i].style.borderBottom = 'none';
	}
	
	document.getElementById(tabName).style.display = "grid";
  
	evt.currentTarget.firstElementChild.style.borderBottom = '10px solid #0085B6';
	
	if(tabName === 'chuckNorris'){
	
		if(chuckDiv.children.length){
			console.log(chuckDiv.children[0]);
			chuckDiv.removeChild(chuckDiv.children[0]);
		}
		
		showChuck();
	
	}
		
	if(tabName === 'unsplash'){			
		showPics();
	}
	
	evt.currentTarget.firstElementChild.className += " border";
}

const showChuck = async () => {
	
		
	let blockquote = document.createElement('blockquote');
	let response = await fetch('https://api.chucknorris.io/jokes/random');
	let jsonRes = await response.json();
	
	/*
		Add blockquote as element. This implies each joke
		gets appended on the page
	*/
		blockquote.setAttribute('cite', jsonRes.url);

		let q = document.createElement('q');
			q.innerHTML = jsonRes.value;

		blockquote.appendChild(q);

	chuckDiv.appendChild(blockquote);	
	
	/*
	chuckDiv.innerHTML = `"${jsonRes.value}"`;*/
}

const showPics = async () => {
	
	let response = await fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY_UNSPLASH}`);	
	
	handleErrors(response);
	
	let jsonRes = await response.json();
		console.log(jsonRes);
	let i = 0,
		len = jsonRes.length;
	
	for(i; i < len ; i++){
							
		let imgDiv = document.createElement('div');
		imgDiv.setAttribute('class', 'unsplashImgDiv');
		
		let img = document.createElement('img');
		img.setAttribute('src', jsonRes[i].urls.small);
		img.setAttribute('class', 'unsplashImg');
		
		imgDiv.appendChild(img);
		picsDiv.appendChild(imgDiv);
	}
	
}

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

