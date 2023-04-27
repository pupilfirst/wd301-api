var express = require('express');
const { Organization } = require("../../models");
var router = express.Router({mergeParams: true});
const projectsRouter = require("./projects")
const usersRouter = require("./users")


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Org root page' });
});



router.post('/', async function(req, res, next) {
  const name = req.body.name;
  const org = await Organization.add(name);
  return res.json(org);
});
router.get('/:organizationID', async function(req, res, next) {
  const org = await Organization.show(parseInt(req.params.organizationID));
  return res.json(org);
});

router.delete('/:organizationID', async function(req, res, next) {
  const org = await Organization.delete(parseInt(req.params.organizationID));
  return res.json(org);
});

router.use("/:organizationID/projects", projectsRouter);
router.use("/:organizationID/users", usersRouter);


module.exports = router;
