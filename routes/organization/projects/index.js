var express = require("express");
const projectRouter = require("./projects");
const tasksRouter = require("./tasks");
var router = express.Router({ mergeParams: true });

router.use("/", projectRouter);
router.use("/:project_id/tasks", tasksRouter);
module.exports = router;
