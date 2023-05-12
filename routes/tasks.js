var express = require("express");
const { Task } = require("../models");
var router = express.Router({ mergeParams: true });

/* GET home page. */
router.get("/", async function (req, res, next) {
  const projectID = req.params.projectID;
  const tasks = await Task.getAll(projectID);
  res.json(tasks);
});

router.post("/", async function (req, res, next) {
  const newTask = await Task.addTask({
    title: req.body.title,
    description: req.body.description,
    dueDate: new Date(req.body.dueDate),
    state: "new",
    projectID: parseInt(req.params.projectID),
    organisationID: req.user.organisation_id,
  });
  res.json(newTask);
});

router.get("/:taskID", async function (req, res, next) {
  const task = await Task.show(parseInt(req.params.taskID));
  return res.json(task);
});
router.patch("/:taskID", async function (req, res, next) {
  const { title, description, dueDate, state, assignee } = req.body;
  const task = await Task.show(parseInt(req.params.taskID));
  if (title) {
    task.title = title;
  }
  if (description) {
    task.description = description;
  }
  if (dueDate) {
    task.dueDate = new Date(dueDate);
  }
  if (state) {
    task.state = state;
  }
  if (assignee) {
    task.assignee = assignee;
  }
  await task.save();
  return res.json(task);
});
router.delete("/:taskID", async function (req, res, next) {
  const newTask = await Task.deleteTask({
    taskID: parseInt(req.params.taskID),
    projectID: parseInt(req.params.projectID),
  });
  return res.json(newTask);
});
module.exports = router;
