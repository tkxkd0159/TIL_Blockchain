// Make a Ganache's WebSocket server

var ganache = require("ganache-cli");
var server = ganache.server();
server.listen(9999, function(err, blockchain) {console.log(blockchain)});