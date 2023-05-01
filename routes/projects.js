var express = require("express");
const { Project } = require("../models");
var router = express.Router({ mergeParams: true });


router.get("/", async function (req, res, next) {
  const projects = await Project.getAll(req.user.organization_id);
  res.json(projects)
});

router.post("/", async function (req, res, next) {
  const project = await Project.addProject({
    name: req.body.name,
    organizationID: req.user.organization_id,
  });
  return res.json(project);
});

router.get("/:projectID", async function (req, res, next) {
  const project = await Project.show(req.params.projectID);
  console.log(project);
  return res.json(project);
});

router.patch("/:projectID", async function (req, res, next) {
  await Project.changeName(parseInt(req.params.projectID), req.body.name);
  const project = await Project.show(req.params.projectID);
  console.log(project);
  return res.json(project);
});

module.exports = router;
