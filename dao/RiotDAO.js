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

module.exports = {
  getMatch: function(matchId) {
    return rp(getMatchEndpoint("na", matchId));
  }
}