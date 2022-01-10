#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app");
var { createServer } = require("http");
const { Server } = require("socket.io");

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var httpServer = createServer(app);

/**
 * Socket io Server
 */
const io = new Server(httpServer, {
  path: "/obs-element-socket",
});

module.exports = {
  io,
  httpServer,
  settings: {
    port,
  },
};
