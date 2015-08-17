// Add event listeners for all the champion portraits
var champClass = document.getElementsByClassName('champSquare');

for (var i=0;i<champClass.length;i++) {
  champClass[i].addEventListener('click',function(e) {
    var champID = e.currentTarget.dataset.id;
    window.location+=champID;
  })
}

