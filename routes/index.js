const express = require("express");
const path = require("path");
const router = express.Router();

/* GET Control panel. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/control-panel/index.html"));
});

module.exports = router;
