var express = require("express");
const { Project } = require("../../../models");
var router = express.Router({ mergeParams: true });


router.get("/", async function (req, res, next) {
  const projects = await Project.getAll();
  res.json(projects)
});

router.post("/", async function (req, res, next) {
  const project = await Project.addProject({
    name: req.body.name,
    organizationID: parseInt(req.params.organizationID),
  });
  return res.json(project);
});

router.get("/:projectID", async function (req, res, next) {
  const project = await Project.show(req.params.projectID);
  console.log(project);
  return res.json(project);
});

module.exports = router;
