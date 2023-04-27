var express = require('express');
const commentsRouter = require('./comments')
const tasksRouter = require('./tasks')
var router = express.Router({mergeParams: true});

/* GET home page. */
router.use("/", tasksRouter);
router.use("/:taskID/comments", commentsRouter);

module.exports = router;
