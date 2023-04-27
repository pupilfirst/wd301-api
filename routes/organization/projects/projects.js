var express = require("express");
const { Project } = require("../../../models");
var router = express.Router({ mergeParams: true });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(req.params.organizationID)
});

router.post("/", async function (req, res, next) {
  const project = await Project.addProject({
    name: req.body.name,
    organizationID: parseInt(req.params.organizationID),
  });
  return res.json(project);
});

router.get("/:project_id", async function (req, res, next) {
  const project = await Project.show(req.params.project_id);
  console.log(project);
  return res.json(project);
});

module.exports = router;
