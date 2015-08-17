// index.js is linked to more than just the home page, the other pages don't have the data variable
var champClass = document.getElementsByClassName('champSquare');
var navButtons = document.getElementsByClassName('navButton');

// Add event listeners for all the champion portraits
if(data) {
  var allChamps = data.data;

  for (var i=0;i<champClass.length;i++) {
  	champClass[i].addEventListener('click',function(e) {
  		var champID = e.currentTarget.dataset.id;
  		window.location+=champID;
  	})
  }
}

//If you click on an <li> in the navBar, you will go to that page
for (var i=0;i<navButtons.length;i++) {
  navButtons[i].addEventListener('click',function(e) {
    var link = e.currentTarget.firstChild;
    link.click();
  }) 
}

// Search Bar
var searchField = document.getElementById('searchField');
