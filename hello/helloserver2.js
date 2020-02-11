const http = require('http');
const nodeStatic = require('node-static');
console.log(resolve('http'));
console.log(nodeStatic.version);

const fileServer = new nodeStatic.Server(__dirname);
http.createServer(function(req, res) {
  fileServer.serve(req, res);
}).listen(80);