const express = require("express");
const router = express.Router();
const db = require("../../bin/database/main");

/**
 * Bottom text bar API routes:
 * GET
 * POST
 * PUT
 * DELETE
 * Path: /api/bottom-text-bar
 */

/**
 *  GET bottom text bar list
 */
router.get("/", function (req, res, next) {
  db.all(`SELECT * FROM "main"."bottom-text-bar"`, (err, row) => {
    if (err) {
      console.error(err.message);
      res.json({
        status: "error",
        response: err.message,
      });
    }
    res.json(row);
  });
});
/**
 * POST create bottom text bar
 */
router.post("/", function (req, res, next) {
  db.run(
    `INSERT INTO "main"."bottom-text-bar" ("SETTING_NAME", "MAIN_TEXT", "BACKGROUND_COLOR_CODE") VALUES (?, ?, ?);`,
    [req.body.SETTING_NAME, req.body.MAIN_TEXT, req.body.BACKGROUND_COLOR_CODE],
    (err) => {
      if (err) {
        console.error(err);
        res.json({
          status: "error",
          response: err.message,
        });
      } else {
        res.json({
          status: "success",
          response: `A row has been inserted with rowid: ${this.lastID} / ${this.SETTING_NAME}`,
        });
      }
    }
  );
});
/**
 * PUT edit bottom text bar
 *
 * @param  {SETTING_NAME}
 */
router.put("/:SETTING_NAME", function (req, res, next) {
  db.run(
    `UPDATE "main"."bottom-text-bar" SET "MAIN_TEXT"=?, "BACKGROUND_COLOR_CODE"=? WHERE "SETTING_NAME"=?`,
    [
      req.body.MAIN_TEXT,
      req.body.BACKGROUND_COLOR_CODE,
      req.params.SETTING_NAME,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.json({
          status: "error",
          response: err.message,
        });
      } else {
        /* socketIO.BOTTOM_TEXT_BAR({
          SETTING_NAME: req.params.SETTING_NAME,
          BACKGROUND_COLOR_CODE: req.body.BACKGROUND_COLOR_CODE,
          MAIN_TEXT: req.body.MAIN_TEXT,
        }); */
        res.json({
          status: "success",
          response: `A row has been inserted with rowid: ${this.lastID} / ${this.SETTING_NAME}`,
        });
      }
    }
  );
});
/**
 * DELETE bottom bar text
 *
 * @param  {SETTING_NAME}
 */
router.delete("/:SETTING_NAME", (req, res, next) => {
  db.run(
    `DELETE FROM "main"."bottom-text-bar" WHERE "SETTING_NAME"=?;`,
    [req.params.SETTING_NAME],
    (err) => {
      if (err) {
        console.error(err);
        res.json({
          status: "error",
          response: err.message,
        });
      } else {
        res.json({
          status: "success",
          response: `A row has been inserted with rowid: ${this.lastID} / ${this.SETTING_NAME}`,
        });
      }
    }
  );
});

module.exports = router;
