// var champ has all the champion info
// champ.name and champ.id will probably be the most useful ones
document.body.style.backgroundImage="url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champ.key+"_0.jpg')";
var itemImage = function(itemId) {
  return "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/"+itemId+".png"
}

nanoajax.ajax('/api/champ/'+champ.id, function(code, res) {
  console.log(code);
  if(code != 200) {
    return;
  }
  var champData = JSON.parse(res);
 
  var numGames = champData.length;
  var wins = 0;
  var boughtItems = [];
  var itemsById = {};

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
      boughtItems.push({"itemId":itemJ,"timesBought":1,"timesWon":1*winner});
    }
    // Want to know whether this build won
    builds[i].push(winner);
  }
  var winrate = 100*wins/numGames;
  winrate = winrate.toFixed(2);
  document.getElementById('numGames').innerHTML+=' '+numGames;
  document.getElementById('winrate').innerHTML+=' '+winrate+' %';

  //Fill table of full builds from each game
  var buildsTableBody = document.getElementById('buildsTableBody');
  var fillBuildsTable = function() {
    for(var i=0;i<builds.length;i++) {
      var rowData = "";
      for(var k=0;k<builds[i].length-1;k++) {
        if(builds[i][k]!=0){
          rowData+="<td>"+"<img class='itemImage' data-id='"+builds[i][k]+"' alt='"+builds[i][k]+"' src='"+itemImage(builds[i][k])+"'/></td>";
        }
        else {
          rowData+="<td></td>"
        }
      }
      var xOrCheck; //symbol showing a win or loss
      if(builds[i][builds[i].length-1]) {
        xOrCheck = '<img class="checkMark" src="/images/checkmark.svg">';
      }
      else {
        xOrCheck = '<img class="crossMark" src="/images/cross.svg">';
      }
      rowData+="<td>"+xOrCheck+"</td>";
      buildsTableBody.innerHTML+="<tr>"+rowData+"</tr>";
    }
  }

  //Combine all the instances of the same item into one
  for(var i=0;i<boughtItems.length;i++) {
    var itemI = boughtItems[i];
    for(var j=i;j<boughtItems.length;j++){
      if(boughtItems[j]["itemId"]==itemI["itemId"]) {
        itemI["timesBought"]++;
        itemI["timesWon"]+=boughtItems[j]["timesWon"];
        boughtItems.splice(j,1);
        boughtItems[i]=itemI;
      }
    }
  }

  var fillItemTable = function() {
    for(var i=0;i<boughtItems.length;i++) {
      var winrate = boughtItems[i]["timesWon"]/boughtItems[i]["timesBought"]*100;
      var rowData="";
      if(boughtItems[i]["itemId"]==0) {continue;}
      winrate = winrate.toFixed(2);
      rowData+="<td>"+"<img alt='"+boughtItems[i]["itemId"]+"' src='"+itemImage(boughtItems[i]["itemId"])+"'/></td>";
      rowData+="<td>"+boughtItems[i]["itemId"]+"</td>";
      rowData+="<td>"+boughtItems[i]["timesBought"]+"</td>";
      rowData+="<td>"+winrate+" %</td>";
      document.getElementById("itemTableBody").innerHTML+="<tr>"+rowData+"</tr>";
    }
  }
}


fillBuildsTable();

  // Init the chart
  var chart;
  nv.addGraph(function() {
      chart = nv.models.scatterChart()
          .showDistX(true)
          .showDistY(true)
          .useVoronoi(true)
          .color(d3.scale.category20().range())
          .duration(300)
          .showLegend(false);
      chart.xAxis.tickFormat(d3.format('.02f'));
      chart.yAxis.tickFormat(d3.format('.02f'));
      d3.select('#chart svg')
          .datum(collectData())
          .call(chart);
      nv.utils.windowResize(chart.update);
      chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });
      return chart;
  });


  function collectData() {
    var data = [];

    for(var key in itemsById) {
      data.push({
        key: allItems.data[key].name,
        values: [{
          x: itemsById[key].timesBought/numGames,
          y: itemsById[key].timesWon/itemsById[key].timesBought,
          size: 2
        }]
      });
    }

    return data;
  }
});

var itemImages = document.getElementsByClassName('itemImage');
var itemInfo = document.getElementById('itemInfo');

var itemHoverOn = function(e) {
  itemInfo.style.display='block';
  var itemId = e.target.dataset["id"];
  itemInfo.getElementsByTagName('h3')[0].innerHTML=allItems.data[itemId].name;
  itemInfo.getElementsByTagName('h5')[0].innerHTML=allItems.data[itemId].plaintext;
  itemInfo.getElementsByTagName('div')[0].innerHTML="Cost: "+allItems.data[itemId].gold.base+"g";
  itemInfo.getElementsByTagName('div')[1].innerHTML=allItems.data[itemId].description;
  itemInfo.style.top=(e.clientY+5+document.body.scrollTop)+"px";
  itemInfo.style.left=(e.clientX+5)+"px";
}

var itemHoverOff = function (e) {
  itemInfo.style.display='none';
}

for (var i=0;i<itemImages.length;i++) {
  itemImages[i].addEventListener('mouseover',itemHoverOn);
  itemImages[i].addEventListener('mouseenter',itemHoverOn);
  itemImages[i].addEventListener('mouseout',itemHoverOff);
}
