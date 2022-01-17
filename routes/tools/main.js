const bottomTextBar = require("./bottom-text-bar");

module.exports = (app) => {
  app.use("/tools/bottom-text-bar", bottomTextBar);
};
