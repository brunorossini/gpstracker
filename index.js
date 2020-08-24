var server = module.exports,
  net = require("net"),
  EventEmitter = require("events").EventEmitter;

server.create = function () {
  var server = net.createServer(function (client) {
    var data = "";
    client.on("data", function (chunk) {
      data += chunk.toString();
      if (data.indexOf(";") === -1) return;
      var messagesToProcess = data.split(";");
      for (var i = 0; i < messagesToProcess.length - 1; i++) {
        processData(server, client, messagesToProcess[i]);
      }
      data = data.slice(data.lastIndexOf(";") + 1);
    });
  });
  server.trackers = new EventEmitter();
  return server;
};

function processData(server, client, data) {
  console.log(`server: ${server}`);
  console.log(`client: ${client}`);
  console.log(`data: ${data}`);
  console.log(`---------------`);
}

server.create().listen(8000, function () {
  console.log("listening your gps trackers on port", 8000);
});
