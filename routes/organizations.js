var express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Organization, User } = require("../models");
var router = express.Router({ mergeParams: true });

router.get("/", function (req, res, next) {
  res.render("index", { title: "Org root page" });
});

router.post("/", async function (req, res, next) {
  const name = req.body.name;
  try {
    const org = await Organization.add(name);
    const hashedPwd = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS);
    const user = await User.create({
      name: req.body.user_name,
      email: req.body.email,
      password: hashedPwd,
      organization_id: org.id,
    });
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log(err);
      }
      let sanatisedUser = user.toJSON();
      delete sanatisedUser["password"];
      const token = jwt.sign(sanatisedUser, process.env.JWT_SECRET);
      return res.json({ user: sanatisedUser, token });
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
router.get("/:organizationID", async function (req, res, next) {
  const org = await Organization.show(parseInt(req.params.organizationID));
  return res.json(org);
});

router.delete("/:organizationID", async function (req, res, next) {
  const org = await Organization.delete(parseInt(req.params.organizationID));
  return res.json(org);
});

module.exports = router;
