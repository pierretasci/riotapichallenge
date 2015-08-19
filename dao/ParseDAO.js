var Parse = require('parse').Parse;
var Champ = Parse.Object.extend("Champs");
var Promise = require('bluebird');

module.exports = {
  getChamp: function(champId) {
    if(!champId) {
      return Promise.reject("No champ id was supplied");
    }

    var query = new Parse.Query(Champ);
    query.equalTo("champID", champId);

    return query.find().then(function(results) {
      // Transform array of results into json
      return Parse.Promise.as(results.map(function(item) {
        return item.toJSON();
      }));
    }).then(function(returnedPromiseValue) {
      return Promise.resolve(returnedPromiseValue);
    });
  }
}