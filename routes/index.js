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
  var curTime = new Date().getTime();
  var champPromise = RiotDAO.getChampion(req.params.id)
  var championListPromise = RiotDAO.getChampions();
  var itemData = RiotDAO.getItems();

  Promise.all([champPromise, championListPromise, itemData]).then(function(results) {
      console.log("Elapsed time: " + (new Date().getTime() - curTime) + "ms");
      res.render('champion', {
        champInfo: JSON.parse(results[0]),
        champions: JSON.parse(results[1]),
        items: JSON.parse(results[2])
      });
    }, function(error) {
      res.status(500).send("Internal Server Error: " + error);
    });
});

module.exports = router;
