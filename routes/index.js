var express = require('express');
var router = express.Router();
var RiotDAO = require('../dao/RiotDAO');


/* GET home page. */
router.get('/', function(req, res, next) {
  RiotDAO.getMatch("1907157315").then(function(results) {
    console.log(results);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
