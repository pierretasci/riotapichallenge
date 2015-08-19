// var champ has all the champion info
// champ.name and champ.id will probably be the most useful ones
document.body.style.backgroundImage="url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champ.key+"_0.jpg')";
var numGames = champData.length;
var wins = 0;
var boughtItems = [];

// The final build for each game
var builds = [];
for (var i=0;i<numGames;i++) {
  var winner=false;
  if(champData[i].teamInformation.winner) {
    winner = true;
    wins++; 
  }
  //Item Builds
  builds[i]=[];

  //for each item bought
  for(var j=0;j<6;j++) {
    var itemJ = champData[i].participantInformation.stats['item'+j];
    //save the full build of this game
    builds[i].push(itemJ);
  }
  // Want to know if this build worked or not
  builds[i].push(winner);
}
var winrate = 100*wins/numGames;
winrate = winrate.toFixed(2);
document.getElementById('numGames').innerHTML+=' '+numGames;
document.getElementById('winrate').innerHTML+=' '+winrate+' %';
