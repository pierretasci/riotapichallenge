var express = require('express');
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');


/* GET home page. */
router.get('/', function(req, res, next) {
 
<<<<<<< Updated upstream
  RiotDAO.getChampions().then(function(results) {
    res.render('index', { rawData:  results});
=======
  RiotDAO.getMatch("1907157315").then(function(results) {
    res.render('index', { matchData:  results, title:'Black Market Bureaucrats'});
>>>>>>> Stashed changes
  });
});

module.exports = router;
