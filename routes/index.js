var express = require("express");
const organizationRouter = require("./organization/organizations");
var router = express.Router({ mergeParams: true });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "root page" });
});
router.use("/organization", organizationRouter);
module.exports = router;
