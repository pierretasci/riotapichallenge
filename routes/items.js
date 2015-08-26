var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');
var ParseDAO = require('../dao/ParseDAO');

/* GET a champ's stats */
router.get('/:id', function(req, res, next) {
  var championListPromise = RiotDAO.getChampions();
  var item = RiotDAO.getItem(req.params.id);
  Promise.all([championListPromise, item]).then(function(results) {
    res.render('item', {
      champions: JSON.parse(results[0]),
      item: JSON.parse(results[1])
    });
  });
});

module.exports = router;
