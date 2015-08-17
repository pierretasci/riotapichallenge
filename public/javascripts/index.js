
// index.js is linked to more than just the home page, the other pages don't have the data variable
var champClass = document.getElementsByClassName('champSquare');
// Search Bar
var searchField = document.getElementById('searchField');

searchField.addEventListener('input',function(e) {
  var inp = searchField.value;
  searchResults(champSearch(inp));
})

var champList = allChamps['data'];


// Input: phrase (string)
// Searches for any champions whose name includes the phrase
// Returns a list of champion objects that are a match
var champSearch = function(phrase) {
  if (phrase.length==0) {return []}
  var matches = [];
  phrase = phrase.toUpperCase();
  phrase = phrase.replace(/\s/g, '');
 
  for(var champion in champList) {
    var champName = champList[champion].name;
    var champTitle = champList[champion].title;
    champName =  champName.toUpperCase();
    champName =  champName.replace(/\s/g, '');
    champName = champName.replace("'",'');

    if(champName.search(phrase)!=-1) {
      matches.push(champList[champion])
    }
  }
return matches;
}

var searchOutput = document.getElementById('searchOutput');
var ddragon = '<img src="http://ddragon.leagueoflegends.com/cdn/5.15.1/img/champion/';

var searchResults = function(objList) {
  searchOutput.innerHTML='';  
  if (objList.length>0) {
    removeClass(searchOutput,'hidden');
    for(var i=0;i<objList.length;i++) {
      // Maybe I should do this with jade
      searchOutput.innerHTML+='<a href="'+objList[i].id+'"<div class="searchResultChamp">' +
                                ddragon+objList[i].key+'.png"/>'
                                + objList[i].name+' '+objList[i].title+'</div></a></br>';
    }
  }
  else { 
    addClass(searchOutput,'hidden')
    removeClass(searchOutput,'scrollBar');
    ;}
  if(searchOutput.clientHeight>300) {addClass(searchOutput,'scrollBar');}
  else {removeClass(searchOutput,'scrollBar');}
}




// GLOBAL HELPER FUNCTIONS
function addClass(el, cls) {
  var classes = el.className.split(' ');
  // if(el.className.search(cls)!=-1){
    classes.push(cls);
    el.className = classes.join(' ');
  // }
}

function removeClass(el, cls) {
  el.className = el.className.replace(cls,'');
}