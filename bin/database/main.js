const sqlite3 = require("sqlite3").verbose();
var debug = require("debug")("obs-elements:db");

let db = new sqlite3.Database(__dirname + "/main.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  debug("Connected to the chinook database.");
});

module.exports = db;
