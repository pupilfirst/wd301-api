var express = require("express");
const { Task } = require("../models");
var router = express.Router({ mergeParams: true });

/* GET home page. */
router.get("/", async function (req, res, next) {
  const projectID = req.params.projectID;
  const all = await Task.getAll(projectID);
  const groupedItems = all.reduce(
    (acc, curr) => {
      const tasks = curr.items.reduce((acc, innerCurr) => {
        return { ...acc, [`${innerCurr.id}`]: innerCurr };
      }, {});
      const taskIDs = curr.items.map((item) => `${item.id}`);
      return {
        ...acc,
        tasks: { ...acc.tasks, ...tasks },
        coloumns: {
          ...acc.coloumns,
          [curr.state]: {
            id: curr.state,
            title: acc.coloumns[curr.state].title,
            taskIDs: taskIDs,
          },
        },
      };
    },
    {
      coloumns: {
        pending: {
          id: "pending",
          title: "Pending",
          taskIDs: [],
        },
        in_progress: {
          id: "in_progress",
          title: "In progress",
          taskIDs: [],
        },
        done: {
          id: "done",
          title: "Done",
          taskIDs: [],
        },
      },
      coloumnOrder: ["pending", "in_progress", "done"],
    }
  );

  res.json(groupedItems);
});

router.post("/", async function (req, res, next) {
  const newTask = await Task.addTask({
    title: req.body.title,
    description: req.body.description,
    dueDate: new Date(req.body.dueDate),
    state: "pending",
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
  const deletedTask = await Task.deleteTask({
    taskID: parseInt(req.params.taskID),
    projectID: parseInt(req.params.projectID),
  });
  return res.json(deletedTask);
});
module.exports = router;
