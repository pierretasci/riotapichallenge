var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');

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
  Promise.settle([champPromise, championListPromise])
    .then(function(results) {
      res.render('champion', {
        champInfo: JSON.parse(results[0].value()),
        champions: JSON.parse(results[1].value())
      });
    });
});

module.exports = router;
