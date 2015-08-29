var imageSource = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/"
document.body.style.backgroundImage="url('"+imageSource+item.image.full+"')";

var buildPathContainer = document.getElementById('buildPathContainer');
var buildPath = [];
// input: item ID 
// output: item name
var itemName = function(itemId) {
  return items.data[itemId].name;
}

var itemImage = function(itemId) {
  return items.data[itemId].image.full
}

// Returns the required items of the inputted item
var findPreviousItems = function(itemId) {
  var thisItem = items.data[itemId];
  var previousItems = [];
  if (thisItem.from) {
    for(var i=0;i<thisItem.from.length;i++) {
      previousItems.push(thisItem.from[i]);
    }
  }
  else {return null}
  return previousItems;
}


// var printPreviousItems = function(itemId) {
//   console.log(itemName(itemId));
//   buildPathContainer.innerHTML+="<img class='requiredItem' src='"+imageSource+itemImage(itemId)+"'>"
//   // See what the required items are
//   var requiredItems = findPreviousItems(itemId);

//   // If this item doesn't build out of anything
//   if(!requiredItems) {
//   }
//   // If it does have a build path
//   else {buildPathContainer.innerHTML+="<br>"
//     // For each required item
//     for (var i=0;i<requiredItems.length;i++) {
//       printPreviousItems(requiredItems[i]);
//       if(i==requiredItems.length-1) {buildPathContainer.innerHTML+="<br>"}
//     }
//   }
// }

var printPreviousItems = function(itemId) {
  if(buildPath.length==0) {
    buildPath.push(itemId);
  }
  var requiredItems = items.data[itemId].from;
  // If the item does have a build path
  if(requiredItems) {
    for (var i=0;i<requiredItems.length;i++) {
    }
      buildPath.push(findPreviousItems(itemId));
  }
  else {
    buildPath.push(itemId);
  }
}

printPreviousItems(item.id);
console.log(buildPath);