var server = module.exports,
  net = require("net"),
  EventEmitter = require("events").EventEmitter;

server.create = function () {
  var server = net.createServer(function (client) {
    var data = "";
    client.on("data", function (chunk) {
      data += chunk.toString();
      // if (data.indexOf("\n") === -1) return;
      var messagesToProcess = data.split("\n");
      for (var i = 0; i < messagesToProcess.length - 1; i++) {
        processData(server, client, messagesToProcess[i]);
      }
      data = data.slice(data.lastIndexOf("\n") + 1);
    });
  });
  server.trackers = new EventEmitter();
  return server;
};

function processData(server, client, data) {
  console.log(`server: ${JSON.stringify(server)}`);
  console.log(`client: ${JSON.stringify(client)}`);
  console.log(`data: ${data}`);
  console.log(`---------------`);
}

server.create().listen(5050, function () {
  console.log("listening your gps trackers on port", 5050);
});
