var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');
var ParseDAO = require('../dao/ParseDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  RiotDAO.getChampions().then(function(results) {
    res.render('index', {
      champions: JSON.parse(results), 
      title: "Black Market Browser"
    });
  });
});

router.get('/:id', function(req, res, next) {
  var champPromise = RiotDAO.getChampion(req.params.id)
  var championListPromise = RiotDAO.getChampions();
  var champData = ParseDAO.getChamp(req.params.id);

  Promise.settle([champPromise, championListPromise, champData]).then(function(results) {
      res.render('champion', {
        champInfo: JSON.parse(results[0].value()),
        champions: JSON.parse(results[1].value()),
        champData: results[2].value()
      });
    }, function(error) {
      res.status(500).send("Internal Server Error: " + error);
    });
});

module.exports = router;
