var express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var router = express.Router({ mergeParams: true });

router.get("/", async function (req, res, next) {
  const users = await User.list(req.user.organization_id);
  res.json(users);
});

router.post("/", async function (req, res, next) {
  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd,
      organization_id: req.user.organization_id
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



router.get("/:userID", function (req, res, next) {
  res.render("index", { title: "user detail page" });
});

module.exports = router;
