// Add event listeners for all the champion portraits
var champClass = document.getElementsByClassName('champSquare');
for (var i=0;i<champClass.length;i++) {
  champClass[i].addEventListener('click',function(e) {
    var champID = e.currentTarget.dataset.id;
    window.location.pathname = champID;
  })
}
var itemClass = document.getElementsByClassName('itemSquare');
for (var i=0;i<itemClass.length;i++) {
  itemClass[i].addEventListener('click',function(e) {
    var itemID = e.currentTarget.dataset.id;
    window.location.pathname = "/item/"+itemID;
  })
}