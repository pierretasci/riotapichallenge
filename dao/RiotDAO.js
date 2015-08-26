var rp = require("request-promise");
var sprintf = require("sprintf-js").sprintf;
var config = require("config");
var _ = require('lodash');
var cache = require('./MemCache');

// CONSTANTS
var BASE_ENDPOINT = "https://na.api.pvp.net";
var API_KEY = process.env.RIOT_API_KEY || config.get("RIOT_API_KEY");

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

var getItemsEndpoint = function(region, types) {
  types = types == null ? [] : types;
  return BASE_ENDPOINT + 
    sprintf("/api/lol/static-data/%s/v1.2/item", region) + 
    "?api_key=" + API_KEY + 
    "&itemListData=" + types.join(",");
}

var getChampionEndpoint = function(region, id) {
  return BASE_ENDPOINT + 
    sprintf("/api/lol/static-data/%s/v1.2/champion/%s", region, id) + 
    "?api_key=" + API_KEY;
}

var getItemEndpoint = function(region, id, types) {
  types = types == null ? [] : types;
  return BASE_ENDPOINT + 
    sprintf("/api/lol/static-data/%s/v1.2/item/%s", region, id) + 
    "?api_key=" + API_KEY +
    "&itemData=" + types.join(",");
}

/**
 * This is a generic api calling function that supports options to 
 * cache the result
 * @param  {String} endpoint [description]
 * @param  {Hash} options  A hash of options. Possible keys:
 *   cache: [Boolean] (Default: true). If false, will not cache the result.
 * @return {Promise}          A promise for the value at the end of the endpoint
 */
var getAPI = function(endpoint, options) {
  options = _.defaults(options || {}, {
    cache: true
  });

  var retVal = cache.get(endpoint);

  if(retVal) {
    return retVal;
  } else {
    retVal = rp(endpoint);

    if(options.cache) {
      // Cache this
      cache.set(endpoint, retVal);
    }
    return retVal;
  }
}

module.exports = {
  getMatch: function(matchId) {
    return getAPI(getMatchEndpoint("na", matchId));
  },

  getChampions: function(types) {
    if(types == null) {
      types = ["info", "image"];
    }

    return getAPI(getChampionsEndpoint("na", types));
  },

  getChampion: function(id) {
    return getAPI(getChampionEndpoint("na", id));
  },

  getItems: function(types) {
    if(types == null) {
      types = ["gold", "image", "tree"];
    }

    return getAPI(getItemsEndpoint("na", types));
  },

  getItem: function(id, types) {
    if(types == null) {
      types = ["gold", "from", "image", "stacks"];
    }

    return getAPI(getItemEndpoint("na", id, types));
  }
}