var express = require('express');
const commentsRouter = require('./comments')
const tasksRouter = require('./tasks')
var router = express.Router({mergeParams: true});

/* GET home page. */
router.use("/", tasksRouter);
router.use("/:task_id/comments", commentsRouter);

module.exports = router;
