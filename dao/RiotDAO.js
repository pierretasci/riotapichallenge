var rp = require("request-promise");
var sprintf = require("sprintf-js").sprintf;
var config = require("config");

// CONSTANTS
var BASE_ENDPOINT = "https://na.api.pvp.net";
var API_KEY = config.get("RIOT_API_KEY");

// HELPER METHODS
var getMatchEndpoint = function(region, matchId, includeTimeline) {
  includeTimeline = includeTimeline == null ? false : includeTimeline;
  return BASE_ENDPOINT + 
    sprintf("/api/lol/%s/v2.2/match/%s", region, matchId) +
    "?api_key=" + API_KEY + 
    "&includeTimeline=" + includeTimeline;
}

var getChampionsEndpoint = function(region, types) {
  types = types == null ? [] : types;
  return BASE_ENDPOINT + 
    sprintf("/api/lol/static-data/%s/v1.2/champion", region) + 
    "?api_key=" + API_KEY + 
    "&champData=" + types.join(",");
}

module.exports = {
  getMatch: function(matchId) {
    return rp(getMatchEndpoint("na", matchId));
  },

  getChampions: function(types) {
    if(types == null) {
      types = ["info", "image"];
    }

    return rp(getChampionsEndpoint("na", types));
  }
}