var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('green-screen', { title: 'Green Screen' });
});

module.exports = router;
