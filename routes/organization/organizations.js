var express = require('express');
var router = express.Router({mergeParams: true});
const projectsRouter = require("./projects")
const usersRouter = require("./users")


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Org root page' });
});

router.use("/:organizationID/projects", projectsRouter);
router.use("/:organizationID/users", usersRouter);


module.exports = router;
