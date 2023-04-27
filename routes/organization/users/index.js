var express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var router = express.Router({ mergeParams: true });

router.get("/", function (req, res, next) {
  res.render("index", { title: "users root page" });
});

router.post("/signup", async function (req, res, next) {
  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd,
    });
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log(err);
      }
      let sanatisedUser = user.toJSON();
      delete sanatisedUser["password"];
      const token = jwt.sign(sanatisedUser, "your_jwt_secret");
      return res.json({ user: sanatisedUser, token });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      } // generate a signed json web token with the contents of user object and return it in the response
      let sanatisedUser = user.toJSON();
      delete sanatisedUser["password"];
      const token = jwt.sign(sanatisedUser, "your_jwt_secret");
      return res.json({ user: sanatisedUser, token });
    });
  })(req, res);
});

router.get("/:userID", function (req, res, next) {
  res.render("index", { title: "user detail page" });
});

module.exports = router;
