//Listen for form submit
//document.getElementById('myForm') targets the div tag in index.html
//.addEventListener('submit', saveBookmark); is the event listener waiting for the submit button too be triggers and carry out
//the function 'saveBookmark'
document.getElementById('myForm').addEventListener('submit', saveBookmark);
var y;
function saveBookmark(e){
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validateForm(siteName, siteURL)){
		return false;
	}
	//Bookmark Object
	var bookmark = {
		name: siteName,
		url: siteURL
	}

	/*
	//Local Storage Test
	//Sets item to local storage
	localStorage.setItem('test', 'Hello World');
	//fetches Item from local storage
	console.log(localStorage.getItem('test'));
	//Deletes Item from local storage
	localStorage.removeItem('test');
	*/

	if(localStorage.getItem('bookmarks') === null){
		//init array
		var bookmarks = [];
		//Add bookmark to array
		bookmarks.push(bookmark);
		//set To Local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		//get bookmark from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//reset back to localStorag
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	alert('Bookmark Added!');

	//Clear form
	document.getElementById('myForm'.reset());
	//Re-Fetch bookmarks
	fetchBookmarks();

	e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
	//Get bookmark from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url === url){
			bookmarks.splice(i, 1);
		}
	}
	//Reset back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Re-Fetch bookmarks
	fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
	//Get bookmark from local storage, JSON.pase() turns a json object into
	//A regular javascript object
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output id
	var bookmarksResults = document.getElementById('bookmarkResults');

	//Build output
	bookmarksResults.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">' +
											'<h3>' + name +
												'<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
												'<a onClick="deleteBookmark(\'' + url +'\')" class="btn btn-danger" href="#">Delete</a>' +
											'</h3>' +
										'</div>';
	}
}

function validateForm(siteName, siteURL){
	if(!siteName || !siteURL){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]8)?/gi;
	var regex = new RegExp(expression);

	if(!siteurl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}