// index.js is linked to more than just the home page, the other pages don't have the data variable
var champClass = document.getElementsByClassName('champSquare');

// Search Bar
var searchField = document.getElementById('searchField');

searchField.addEventListener('input',function(e) {
  var inp = searchField.value;
    console.log('hi');
  
})

var searchChampions = function(phrase) {
  var matches = [];
  phrase = phrase.toUpperCase();
  phrase = phrase.replace(/\s/g, '');
  
  for (var champName in allChamps) {
    var name = champName;
    console.log(allChamps.name);
    name = name.toUpperCase();
    if(name.search(phrase)>-1) {
      matches.push(champName);
    };
  }
  return matches;
}