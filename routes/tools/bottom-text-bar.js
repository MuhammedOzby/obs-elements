const express = require("express");
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get("/bottom-text-bar", function (req, res, next) {
  res.render("tools/bottom-text-bar");
});

module.exports = router;
