// index.js is linked to all the pages

//If you click on an <li> in the navBar, you will go to that page
var navButtons = document.getElementsByClassName('navButton');
for (var i=0;i<navButtons.length;i++) {
  navButtons[i].addEventListener('click',function(e) {
    var link = e.currentTarget.firstChild;
    link.click();
  }) 
}

// Search Bar
var searchField = document.getElementById('searchField');

searchField.addEventListener('input',function(e) {
  
})