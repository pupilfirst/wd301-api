var express = require('express');
const { Task } = require("../models");
var router = express.Router({mergeParams: true});

/* GET home page. */
router.get('/', async function(req, res, next) {
  const projectID = req.params.projectID;
  const tasks = await Task.getAll(projectID);
  res.json(tasks)
});

router.post('/', async function(req, res, next) {
  const newTask = await Task.addTask({
    title: req.body.title,
    description: req.body.description,
    dueDate: new Date(req.body.dueDate),
    state: "new",
    projectID: parseInt(req.params.projectID),
    organizationID: req.user.organization_id
  })
  res.json(newTask);
});

router.delete('/:taskID', async function(req, res, next) {
  const newTask = await Task.deleteTask({
    taskID: parseInt(req.params.taskID),
    projectID: parseInt(req.params.projectID)
  })
  res.json(newTask);
});
module.exports = router;
