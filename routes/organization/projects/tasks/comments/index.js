var express = require('express');
var router = express.Router({mergeParams: true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Comment root page' });
});

module.exports = router;
