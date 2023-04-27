var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'users root page' });
});

router.get('/:user_id', function(req, res, next) {
  res.render('index', { title: 'user detail page' });
});

module.exports = router;
