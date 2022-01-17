const express = require("express");
const router = express.Router();
const db = require("../../bin/database/main");

/* GET home page. */
router.get("/:SETTING_NAME", function (req, res, next) {
  db.all(
    `SELECT rowid AS id,* FROM "main"."bottom-text-bar" WHERE "SETTING_NAME" = ?`,
    [req.params.SETTING_NAME],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.json({
          status: "error",
          response: err.message,
        });
      }
      res.render("tools/bottom-text-bar", { row });
    }
  );
});

module.exports = router;
