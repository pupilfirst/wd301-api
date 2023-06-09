var express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const swaggerUi = require('swagger-ui-express');
const organisationRouter = require("./organisations");
const projectsRouter = require("./projects");
const tasksRouter = require("./tasks");
const commentsRouter = require("./comments");
const usersRouter = require("./users");
var router = express.Router({ mergeParams: true });
const swaggerDocument = require('../swagger.json');

/* GET home page. */

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));
router.use("/organisations", organisationRouter);
router.post("/users/sign_in", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      } // generate a signed json web token with the contents of user object and return it in the response
      let sanatisedUser = user.toJSON();
      delete sanatisedUser["password"];
      const token = jwt.sign(sanatisedUser, process.env.JWT_SECRET || "your_jwt_secret");
      return res.json({ user: sanatisedUser, token });
    });
  })(req, res);
});
router.use(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  projectsRouter
);
router.use(
  "/projects/:projectID/tasks",
  passport.authenticate("jwt", { session: false }),
  tasksRouter
);
router.use(
  "/projects/:projectID/tasks/:taskID/comments",
  passport.authenticate("jwt", { session: false }),
  commentsRouter
);
router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);
module.exports = router;
