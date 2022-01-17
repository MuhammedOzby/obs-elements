const bottomTextBar = require("./bottom-text-bar");

module.exports = (app) => {
  app.use("/api/bottom-text-bar", bottomTextBar);
};
