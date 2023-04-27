var express = require('express');
const { Task } = require("../../../../models");
var router = express.Router({mergeParams: true});

/* GET home page. */
router.get('/', async function(req, res, next) {
  const tasks = await Task.getAll();
  res.json(tasks)
});

router.post('/', async function(req, res, next) {
  const newTask = await Task.addTask({
    title: req.body.title,
    description: req.body.description,
    state: "new",
    projectID: parseInt(req.params.projectID),
    organizationID: parseInt(req.params.organizationID)
  })
  res.json(newTask);
});

module.exports = router;
