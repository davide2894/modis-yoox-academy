const body = document.querySelector('body');
const article = document.querySelector('article');
const form = document.querySelector('form');
const copyright = document.getElementById('copyright');
const modalDivContent = document.createElement('article');
const modalHeader = document.createElement('div');
const h3 = document.createElement('h3');
const close = document.createElement('span');
const content = document.createElement("p");
let email = document.getElementById('newsteller');
let links = document.querySelectorAll(".linkArticle");
let modalDiv = document.createElement('div');



var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	
	if (n > slides.length) {
		slideIndex = 1
	}
	
	if (n < 1) {
		slideIndex = slides.length
	}

	// Hide slides and set dots as unactive
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

for(let link of links){
	link.addEventListener("click", async () => {
		let postId = link.id.match(/(\d+)/g)[0];

		let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);	
		
		handleErrors(response);
	
		let jsonRes = await response.json();

		console.log(jsonRes);

		let h2 = jsonRes.title;
		console.log(h2);
		let p = jsonRes.body;

		let newsContent = `
			<h3>${h2}</h3><br>
			<p>${p}</p><br>
			<p>${p}</p><br>
			<p>${p}</p><br>
			<p>${p}</p><br>
			<p>${p}</p><br>
		`;
		
		article.innerHTML = newsContent;

	})
}

form.addEventListener('submit', (evt) => {
	evt.preventDefault();

	let your_email = email.value;
	console.log(email.value);
	
	let msg = `You have been subscribed width ${your_email}`;
	
	form.querySelector('div').innerHTML = msg;

})

copyright.addEventListener('click', (evt) => {

	evt.preventDefault();

	
	modalDiv.setAttribute('id', 'modal');
	
	modalDivContent.setAttribute('id', 'modalContent');
	
	modalHeader.setAttribute('id', 'modalHeader');
	
		h3.innerHTML = 'Lorem ipsum';
		close.setAttribute('id', 'modalClose');
		close.innerHTML = '&times;';
	
	close.addEventListener('click', function(){
		modalDiv.style.display = 'none';
		body.style.overflowY = 'scroll';
	})

	content.innerHTML = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
				   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
				   when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
				   It has survived not only five centuries, but also the leap into electronic typesetting, 
				   remaining essentially unchanged. 
				   It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
				   and more recently with desktop publishing software like Aldus PageMaker including versions of 
				   Lorem Ipsum.
				   Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
				   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
				   when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
				   It has survived not only five centuries, but also the leap into electronic typesetting, 
				   remaining essentially unchanged. 
				   It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
				   and more recently with desktop publishing software like Aldus PageMaker including versions of 
				   Lorem Ipsum
				   
				   `;
	
	modalHeader.appendChild(h3);
	modalHeader.appendChild(close);

	modalDivContent.appendChild(modalHeader);	
	modalDivContent.appendChild(content);

	modalDiv.appendChild(modalDivContent);
	
	wrapper.appendChild(modalDiv);
	
	body.style.overflowY = "hidden";
	
	modalDiv.style.display = "block";

})

// Check if there is any error in the response status
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