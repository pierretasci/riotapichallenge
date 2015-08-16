var express = require('express');
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  RiotDAO.getChampions().then(function(results) {
    res.render('index', {
      rawData: JSON.parse(results), 
      title: "Black Market Bureaucrats"
    });
  });
});

router.get('/:id', function(req, res, next) {
  RiotDAO.getChampion(req.params.id).then(function(results) {
    res.render('champion', {
      rawData: JSON.parse(results)
    });
  });
});

module.exports = router;
