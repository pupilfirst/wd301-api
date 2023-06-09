var express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");
var router = express.Router({ mergeParams: true });

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

router.get("/", async function (req, res, next) {
  const users = await User.list(req.user.organisation_id);
  res.json(users);
});

router.post("/", async function (req, res, next) {
  const hashedPwd = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd,
      organisation_id: req.user.organisation_id,
    });
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log(err);
      }
      let sanatisedUser = user.toJSON();
      delete sanatisedUser["password"];
      const token = jwt.sign(
        sanatisedUser,
        process.env.JWT_SECRET || "your_jwt_secret"
      );
      return res.json({ user: sanatisedUser, token });
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:userID", async function (req, res, next) {
  const userDetails = await User.details(parseInt(req.params.userID));
  return res.json(userDetails);
});

router.patch("/:userID", async function (req, res, next) {
  const { email, password, name } = req.body;
  const userDetails = await User.details(parseInt(req.params.userID));
  if (email) {
    userDetails.email = email;
  }
  if (password) {
    const hashedPwd = await bcrypt.hash(password, SALT_ROUNDS);
    userDetails.password = hashedPwd;
  }

  if (name) {
    userDetails.name = name;
  }
  await userDetails.save();
  const sanatisedUser = userDetails.toJSON();
  delete sanatisedUser["password"];
  return res.json(sanatisedUser);
});

router.delete("/:userID", async function (req, res, next) {
  const userID = parseInt(req.params.userID);
  if (req.user.id === userID) {
    return res.status(422).json({ error: "Cannot delete the current user." });
  }
  const deletedUser = await User.deleteUser({ userID, organisationID: req.user.organisation_id });
  return res.json(deletedUser);
});

module.exports = router;
