var express = require('express');
const { Comment } = require("../models");
var router = express.Router({mergeParams: true});

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  const taskID = parseInt(req.params.taskID);
  const comments = await Comment.getAll(taskID);
  return res.json(comments);
});

router.post('/', async function(req, res, next) {
  const organizationID = req.user.organization_id;
  const projectID = parseInt(req.params.projectID);
  const taskID = parseInt(req.params.taskID);
  const description = req.body.description;
  const owner = req.user.id;
  const newComment = await Comment.add({
    organizationID,
    projectID,
    taskID,
    description,
    owner,
  });
  return res.json(newComment);
});

module.exports = router;
