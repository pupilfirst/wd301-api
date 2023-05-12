var express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Organisation, User } = require("../models");
var router = express.Router({ mergeParams: true });

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");
router.get("/", function (req, res, next) {
  res.render("index", { title: "Org root page" });
});

router.post("/", async function (req, res, next) {
  const name = req.body.name;
  try {
    const org = await Organisation.add(name);
    const hashedPwd = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({
      name: req.body.user_name,
      email: req.body.email,
      password: hashedPwd,
      organisation_id: org.id,
    });
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log(err);
      }
      let sanatisedUser = user.toJSON();
      delete sanatisedUser["password"];
      const token = jwt.sign(sanatisedUser, process.env.JWT_SECRET || "your_jwt_secret" );
      return res.json({ user: sanatisedUser, token });
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
router.get("/:organisationID", async function (req, res, next) {
  const org = await Organisation.show(parseInt(req.params.organisationID));
  return res.json(org);
});

router.delete("/:organisationID", async function (req, res, next) {
  const org = await Organisation.delete(parseInt(req.params.organisationID));
  return res.json(org);
});

module.exports = router;
