
// index.js is linked to more than just the home page, the other pages don't have the data variable
var champClass = document.getElementsByClassName('champSquare');

// Add event listeners for all the champion portraits
if(data) {
  var allChamps = data.data;

  for (var i=0;i<champClass.length;i++) {
  	champClass[i].addEventListener('click',function(e) {
  		var champID = e.currentTarget.dataset.id;
  		window.location.pathname = champID;
  	})
  }
}

// Search Bar
var searchField = document.getElementById('searchField');

searchField.addEventListener('input',function(e) {
  console.log('hi');
  console.log(searchField.value);
})