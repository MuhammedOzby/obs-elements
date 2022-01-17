const { io } = require("./server");
var debug = require("debug")("obs-elements:socket-io");

io.on("connection", (socket) => {
  debug("connected socket!");

  socket.on("storeClientInfo", function (data) {
    var clientInfo = new Object();
    clientInfo.customId = data.customId;
    clientInfo.clientId = socket.id;
    clients.push(clientInfo);
  });

  socket.on("greet", function (data) {
    debug(data);
    socket.emit("respond", { hello: "Hey, Mr.Client!" });
  });

  socket.on("disconnect", function () {
    debug("Socket disconnected");
  });

  return socket;
});
