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
  const organisationID = req.user.organisation_id;
  const projectID = parseInt(req.params.projectID);
  const taskID = parseInt(req.params.taskID);
  const description = req.body.description;
  const owner = req.user.id;
  const newComment = await Comment.add({
    organisationID,
    projectID,
    taskID,
    description,
    owner,
  });
  return res.json(newComment);
});

router.patch("/:commentID", async function (req, res, next) {
  const { description} = req.body;
  const comment = await Comment.show(parseInt(req.params.commentID));
  
  if (description) {
    comment.description = description;
  }
  
  await comment.save();
  return res.json(comment);
});

module.exports = router;
