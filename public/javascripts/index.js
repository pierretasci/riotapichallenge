
// index.js is linked to more than just the home page, the other pages don't have the data variable
var champClass = document.getElementsByClassName('champSquare');
// Search Bar
var searchField = document.getElementById('searchField');

searchField.addEventListener('input',function(e) {
  var inp = searchField.value;
    console.log('hi');
})

var champList = allChamps['data'];

var searchChampions = function(phrase) {
  var matches = [];
  phrase = phrase.toUpperCase();
  phrase = phrase.replace(/\s/g, '');
 
  for(var champion in champList) {
    var champName = champList[champion].name
    champName =  champName.toUpperCase();
    champName =  champName.replace(/\s/g, '');
    champName = champName.replace("'",'');
    if(champName.search(phrase)!=-1) {matches.push(champList[champion].name)}
  }
return matches;
}
