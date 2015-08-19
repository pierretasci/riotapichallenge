var NodeCache = require('node-cache');

module.exports = new NodeCache({
  stdTTL: 300,
  checkPeriod: 300,
  useClones: false
});