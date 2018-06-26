const body = document.querySelector('body');
const wrapper = document.getElementById('wrapper');
let responsePosts = null;
let responseUsers = null;
let jsonResPosts  = null;
let jsonResUsers = null;


var populateHtml = async () => {
	
	responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
	responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
	
	handleErrors(responsePosts);
	handleErrors(responseUsers);
	
	jsonResPosts = await responsePosts.json();
	jsonResUsers = await responseUsers.json();
        
    
    let postsDiv = document.createElement('div');

    postsDiv.setAttribute('id', 'posts');

    let i;

    // Iterate over each post
    for(i = 0; i < jsonResPosts.length; i++){

        let singlePost = document.createElement('article');
        singlePost.setAttribute('class', 'post');
        
        // Add grey background to even posts
        if(i % 2 === 0){
            singlePost.style.backgroundColor = '#A74F5D';
        }

        // For each posts, iterate over each user
        for(let j = 0; j < jsonResUsers.length; j++){

            // If user ids match, add user name to post
            if (jsonResPosts[i].userId === jsonResUsers[j].id){
				
				let h2 = document.createElement('h2');
				h2.innerHTML = jsonResUsers[j].name;
	
				let h3 = document.createElement('h3');
					h3.innerHTML = jsonResPosts[j].title;
				
				let p = document.createElement('p');
				p.innerHTML = jsonResPosts[i].body;
				
				/*
                singlePost.innerHTML = `
                    <h2>${jsonResUsers[j].name}</h2>
                    <h3>${jsonResPosts[i].title}</h3>
                    <p>${jsonResPosts[i].body}</p>
                `;
				*/
				
				singlePost.appendChild(h2);
				singlePost.appendChild(h3);
				singlePost.appendChild(p);
				
                postsDiv.appendChild(singlePost);
            }
        }

    }

    // when a user post is clicked, show a modal that shows all the posts from the clicked user
    wrapper.appendChild(postsDiv);        
}

populateHtml();

setTimeout(function(){

    let articles = document.querySelectorAll('.post');

    articles.forEach(article => {

        article.addEventListener('click', function(){
            let name = article.querySelector('h2').innerHTML;
            let i = 0;
            let user = jsonResUsers.filter(user => user.name === name);
            let userID = user[0].id; 
            
            let userPosts = jsonResPosts.filter(post => post.userId === userID);
            
            let modalDiv = document.createElement('div');
            modalDiv.setAttribute('id', 'modal');
			
			let modalDivContent = document.createElement('div');
			modalDivContent.setAttribute('id', 'modalContent');
			
			let modalHeader = document.createElement('div');
			modalHeader.setAttribute('id', 'modalHeader');
			
			let h2 = document.createElement('h2');
				h2.innerHTML = name;
			
			let close = document.createElement('span');
				close.setAttribute('id', 'modalClose');
				close.innerHTML = '&times;';
			
			close.addEventListener('click', function(){
				modalDiv.style.display = 'none';
				body.style.overflowY = 'scroll';
			})
			
			let email = document.createElement('span');
				email.innerHTML = user[0].email;
			
			modalHeader.appendChild(h2);
			modalHeader.appendChild(close);
			
			modalDivContent.appendChild(modalHeader);
			modalDivContent.appendChild(email);
            
            for(i = 0; i < userPosts.length; i++){
				
				let h3 = document.createElement('h3');
					h3.innerHTML = userPosts[i].title;
				let p = document.createElement('p');
					p.innerHTML = userPosts[i].body;
				
                /*modalDivInnerHtml += `
                    <div>
                        <h3>${userPosts[i].title}</h3>
                        <p>${userPosts[i].body}</p>
                    </div>
                `;*/
				
				modalDivContent.appendChild(h3);
				modalDivContent.appendChild(p);
            }

			modalDiv.appendChild(modalDivContent);
            
			wrapper.appendChild(modalDiv);
			
			body.style.overflowY = "hidden";
            
			modalDiv.style.display = "block";
		
        })

    })
	
	
	
}, 1000);


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