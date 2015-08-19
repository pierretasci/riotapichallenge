var rp = require("request-promise");
var sprintf = require("sprintf-js").sprintf;
var config = require("config");
var cache = require('./MemCache');

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

var getChampionEndpoint = function(region, id) {
  return BASE_ENDPOINT + 
    sprintf("/api/lol/static-data/%s/v1.2/champion/%s", region, id) + 
    "?api_key=" + API_KEY;
}

var getChampionsCacheKey = function(types) {
  return "getChampions|"+JSON.stringify(types);
}

module.exports = {
  getMatch: function(matchId) {
    return rp(getMatchEndpoint("na", matchId));
  },

  getChampions: function(types) {
    if(types == null) {
      types = ["info", "image"];
    }

    var champPromise = cache.get(getChampionsCacheKey(types));

    if(champPromise) {
      return champPromise;
    } else {
      var champPromise = rp(getChampionsEndpoint("na", types));

      // Cache this
      cache.set(getChampionsCacheKey(types), champPromise);

      return champPromise;
    }
  },

  getChampion: function(id) {
    return rp(getChampionEndpoint("na", id));
  }
}