var express = require('express');
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');


/* GET home page. */
router.get('/', function(req, res, next) {
  RiotDAO.getChampions().then(function(results) {
    res.render('index', {
      rawData:  results, 
      title: "Black Market Bureaucrats"
    });
  });
});

module.exports = router;
