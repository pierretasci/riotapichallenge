var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');
var ParseDAO = require('../dao/ParseDAO');

/* GET a champ's stats */
router.get('/champ/:id', function(req, res, next) {
  ParseDAO.getChamp(req.params.id).then(function(results) {
    res.send('index', results);
  });
});

module.exports = router;
