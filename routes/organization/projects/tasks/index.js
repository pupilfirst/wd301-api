var express = require('express');
const commentsRouter = require('./comments')
var router = express.Router({mergeParams: true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tasks root page' });
});


router.use("/:task_id/comments", commentsRouter);

module.exports = router;
